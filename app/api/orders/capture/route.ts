import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPayPalAccessToken, baseUrl } from "@/lib/paypal";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { orderID } = await req.json();
        if (!orderID) {
            return NextResponse.json({ error: "Missing orderID" }, { status: 400 });
        }

        // 1. 获取 access_token
        const accessToken = await getPayPalAccessToken();

        // 2. 调用订单捕获接口
        const captureRes = await fetch(`${baseUrl}/v2/checkout/orders/${orderID}/capture`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        });

        if (!captureRes.ok) {
            const errorData = await captureRes.json();
            console.error("PayPal capture failed:", errorData);
            return NextResponse.json({ error: "Payment capture failed" }, { status: 400 });
        }

        const captureData = await captureRes.json();

        if (captureData.status !== "COMPLETED") {
            return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
        }

        // 3. 更新数据库订单
        const payment = captureData.purchase_units?.[0]?.payments?.captures?.[0];

        if (!payment) {
            return NextResponse.json({ error: "Invalid PayPal response" }, { status: 400 });
        }

        const order = await prisma.order.findUnique({
            where: { paypalId: orderID },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        const updatedOrder = await prisma.order.update({
            where: { id: order.id },
            data: {
                status: "PAID",
                paymentStatus: "COMPLETED",
                paidAt: new Date(),
                transactionId: payment.id,
                amountPaid: parseFloat(payment.amount.value),
            },
        });

        return NextResponse.json({
            status: "COMPLETED",
            order: updatedOrder,
        });
    } catch (error) {
        console.error("PayPal capture error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
