// app/api/order/[id]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // 注意这里是 Promise<{ id: string }>
) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const orderId = parseInt(id);

        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
                userId: session.user.id,
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!order) {
            return NextResponse.json(
                { error: "Order not found or access denied" },
                { status: 404 }
            );
        }

        const totalAmount = Number(order.totalAmount);

        const items = order.items.map(item => ({
            product: {
                name: item.product.name,
                price: Number(item.product.price),
            },
            quantity: item.quantity,
        }));

        const responseData = {
            id: order.id,
            orderNumber: order.orderNumber,
            createdAt: order.createdAt.toISOString(),
            totalAmount,
            items,
        };

        return NextResponse.json(responseData);
    } catch (error) {
        console.error("Failed to fetch order:", error);
        return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
    }
}