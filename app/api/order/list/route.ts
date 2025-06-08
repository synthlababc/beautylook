import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    const userId = session.user.id;

    try {
        const [orders, totalCount] = await Promise.all([
            prisma.order.findMany({
                where: {
                    userId,
                },
                orderBy: {
                    createdAt: "desc",
                },
                skip: (page - 1) * pageSize,
                take: pageSize,
                include: {
                    items: {
                        include: {
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                    shippings: {
                        select: {
                            id: true,
                            trackingNumber: true,
                            trackingCompany: true,
                            status: true,
                        },
                    },
                },
            }),
            prisma.order.count({ where: { userId } }),
        ]);

        // 手动将 Decimal 转换为 number，并格式化数据
        const formattedOrders = orders.map(order => ({
            ...order,
            totalAmount: Number(order.totalAmount),
            items: order.items.map(item => ({
                ...item,
                price: Number(item.price), // 将商品价格转为数字
            })),
        }));

        return NextResponse.json({
            orders: formattedOrders,
            pagination: {
                page,
                pageSize,
                total: totalCount,
                totalPages: Math.ceil(totalCount / pageSize),
            },
        });
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}