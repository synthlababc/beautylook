import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const clientId = process.env.PAYPAL_CLIENT_ID!;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;
// ✅ 从环境变量读取 API base URL
const baseUrl = process.env.PAYPAL_API_BASE_URL!;

async function getAccessToken() {
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const res = await fetch(`${baseUrl}/v1/oauth2/token`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch PayPal access token");
    }

    const data = await res.json();
    return data.access_token as string;
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!session.user?.id) {
        return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    try {
        const { cartId, ...formData } = await request.json();

        // 获取购物车信息
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

        // 创建地址记录
        const address = await prisma.address.create({
            data: {
                userId: session.user.id!,
                fullName: formData.fullName,
                phone: formData.telephone,
                address: formData.address,
                city: formData.city,
                country: "US",
                isDefault: false,
            },
        });

        // ---------------------------
        // ✅ 调用 PayPal API 创建订单
        // ---------------------------
        // 1. 获取 access_token
        const accessToken = await getAccessToken();
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
        // ✅ 保存订单到数据库
        // -------------------------------
        const order = await prisma.order.create({
            data: {
                userId: session.user.id!,
                addressId: address.id,
                totalAmount,
                paypalId: paypalOrderId,
                status: "PENDING",
                paymentStatus: "CREATED",
                items: {
                    create: cart.items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.product.price,
                    })),
                },
            },
        });

        // 清空购物车
        await prisma.cartItem.deleteMany({
            where: { cartId },
        });

        // -------------------------------
        // ✅ 返回 orderID 给前端
        // -------------------------------
        return NextResponse.json({
            success: true,
            orderID: paypalOrderId,
        });
    } catch (error) {
        console.error("Order creation failed:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
