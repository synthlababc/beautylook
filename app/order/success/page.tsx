"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, HomeIcon, Receipt } from "lucide-react";
import Link from "next/link";

interface OrderItem {
    product: {
        name: string;
        price: number;
    };
    quantity: number;
}

interface Order {
    id: string;
    orderNumber: string,
    createdAt: string;
    totalAmount: number;
    items: OrderItem[];
}

export default function OrderSuccessPage() {
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    useEffect(() => {
        if (!orderId) return;

        const fetchOrder = async () => {
            try {
                const res = await fetch(`/api/order/${orderId}`);
                const data = await res.json();
                setOrder(data);
            } catch (error) {
                console.error("Failed to fetch order:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background px-4">
                <Card className="w-full max-w-lg shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Loading order...</CardTitle>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background px-4">
                <Card className="w-full max-w-lg shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Order not found</CardTitle>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <Card className="w-full max-w-lg shadow-lg">
                <CardHeader className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                        <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Order Successful!</CardTitle>
                    <CardDescription className="mt-2">
                        Thank you for your purchase. Your order has been confirmed.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Order ID:</span>
                            <span className="font-medium">#{order.orderNumber}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Date:</span>
                            <span className="font-medium">
                                {new Date(order.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Total Amount:</span>
                            <span className="font-medium">${order.totalAmount.toFixed(2)}</span>
                        </div>

                        <div className="pt-4 border-t">
                            <h3 className="font-medium mb-2">Order Items</h3>
                            {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                    <span>
                                        {item.product.name} x {item.quantity}
                                    </span>
                                    <span className="font-medium">
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-3 pt-6">
                    <Button asChild className="w-full">
                        <Link href="/">
                            <HomeIcon className="mr-2 h-4 w-4" /> Back to Home
                        </Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                        <Link href="/user/orders">
                            <Receipt className="mr-2 h-4 w-4" /> View Order Details
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
