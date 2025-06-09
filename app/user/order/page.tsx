"use client";

import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useRouter } from 'next/navigation'

// 定义数据类型
interface Product {
    id: number;
    name: string;
}

interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    product: Product;
}

interface Shipping {
    id: number;
    trackingNumber: string;
    trackingCompany: string;
    status: string;
}

interface Order {
    id: number;
    orderNumber: string;
    totalAmount: number;
    paymentStatus: string;
    paidAt: string | null;
    createdAt: string;
    items: OrderItem[];
    shippings: Shipping[];
}

interface Pagination {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}

interface OrderApiResponse {
    orders: Order[];
    pagination: Pagination;
}

export default function OrderPage() {
    const [data, setData] = useState<OrderApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const router = useRouter()

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            const res = await fetch(`/api/order/list?page=${page}&pageSize=${pageSize}`);
            const result = await res.json();

            if (res.ok) {
                setData(result);
            } else if (res.status === 401) {
                router.push('/login')
                return
            } else {
                console.error("Failed to fetch orders:", result.error);
            }

            setLoading(false);
        };

        fetchOrders();
    }, [page]);

    if (loading) {
        return <div className="p-4">Loading orders...</div>;
    }

    if (!data || data.orders.length === 0) {
        return <div className="p-4">No orders found.</div>;
    }

    const { orders, pagination } = data;

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold">My Orders</h1>

            {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 space-y-2 shadow-sm">
                    <div className="flex justify-between">
                        <div>
                            <p className="font-medium">{order.orderNumber}</p>
                            <p className="text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">${order.totalAmount.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">{order.paymentStatus}</p>
                        </div>
                    </div>

                    {/* 商品信息 */}
                    <Table className="mt-2">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order.items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.product.name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>${item.price.toFixed(2)}</TableCell>
                                    <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* 运单信息 */}
                    {order.shippings.length > 0 && (
                        <div className="mt-2">
                            <h3 className="text-sm font-semibold">Shipping:</h3>
                            <ul className="text-sm">
                                {order.shippings.map((ship) => (
                                    <li key={ship.id}>
                                        <span className="font-medium">{ship.trackingCompany}</span>: {ship.trackingNumber} -{" "}
                                        <span className="text-green-600">{ship.status}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}

            {/* 分页控件 */}
            <div className="flex justify-between items-center pt-2">
                <span className="text-sm text-muted-foreground">
                    Showing {(pagination.page - 1) * pagination.pageSize + 1} to{" "}
                    {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{" "}
                    {pagination.total} entries
                </span>
                <div className="space-x-1">
                    <button
                        className="px-2 py-1 border rounded text-xs"
                        disabled={pagination.page <= 1}
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    >
                        Prev
                    </button>
                    <button
                        className="px-2 py-1 border rounded text-xs"
                        disabled={pagination.page >= pagination.totalPages}
                        onClick={() =>
                            setPage((prev) => Math.min(prev + 1, pagination.totalPages))
                        }
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}