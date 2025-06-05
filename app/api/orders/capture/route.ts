import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const clientId = process.env.PAYPAL_CLIENT_ID!;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;
const baseUrl = process.env.PAYPAL_API_BASE_URL!; // 例如 https://api-m.sandbox.paypal.com

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
        const accessToken = await getAccessToken();

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
