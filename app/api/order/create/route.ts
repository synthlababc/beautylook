import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPayPalAccessToken, baseUrl } from "@/lib/paypal";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { cartId, ...formData } = await request.json();

        // 获取购物车信息（加锁避免并发修改）
        const cart = await prisma.cart.findUnique({
            where: { id: cartId },
            include: { items: { include: { product: true } } },
        });

        if (!cart || cart.items.length === 0) {
            return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
        }

        // 计算总金额
        const totalAmount = cart.items.reduce(
            (sum, item) => sum + Number(item.product.price) * item.quantity,
            0
        );
        const totalAmountFormatted = totalAmount.toFixed(2);
        const fullName = `${formData.firstName || ""} ${formData.lastName || ""}`.trim();

        // ---------------------------
        // ✅ 调用 PayPal API 创建订单
        // ---------------------------
        const accessToken = await getPayPalAccessToken();
        const paypalRes = await fetch(`${baseUrl}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: totalAmountFormatted,
                        },
                    },
                ],
            }),
        });

        const paypalData = await paypalRes.json();

        if (!paypalRes.ok || !paypalData.id) {
            console.error("PayPal error", paypalData);
            return NextResponse.json({ error: "Failed to create PayPal order" }, { status: 500 });
        }

        const paypalOrderId = paypalData.id;

        // -------------------------------
        // ✅ 使用 Prisma Transaction 保证一致性
        // -------------------------------
        const userId = session.user.id;
        const result = await prisma.$transaction(async (tx) => {
            // 1. 创建地址
            const address = await tx.address.create({
                data: {
                    userId: userId,
                    fullName,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    country: "US",
                    isDefault: false,
                },
            });

            // 2. 保存订单
            const order = await tx.order.create({
                data: {
                    orderNumber: generateOrderNumber(),
                    userId: userId,
                    addressId: address.id,
                    totalAmount,
                    paypalId: paypalOrderId,
                    status: "PENDING",
                    paymentStatus: "CREATED",
                    contact: formData.contact,
                    items: {
                        create: cart.items.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.product.price,
                        })),
                    },
                },
            });

            // 3. 清空购物车
            await tx.cartItem.deleteMany({
                where: { cartId },
            });

            return order;
        });

        console.log("Order created with ID:", result.id);

        // 返回给前端
        return NextResponse.json({
            success: true,
            orderID: paypalOrderId,
        });

    } catch (error) {
        console.error("Order creation failed:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

function generateOrderNumber() {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // 20250608
    const randomSuffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // 001
    return `ORD-${dateStr}-${randomSuffix}`;
}
