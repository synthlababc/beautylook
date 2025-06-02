"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Form validation schema
const formSchema = z.object({
    contact: z.string().email("Please enter a valid email address"),
    fullName: z.string().min(1, "Full name is required"),
    telephone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface CartItem {
    id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        price: number;
    };
}

interface CartResponse {
    id: number;
    items: CartItem[];
}

export default function CheckoutPage() {
    const [cart, setCart] = useState<CartResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // 获取购物车数据
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await fetch("/api/cart");
                const data = await res.json();
                setCart(data);
            } catch (error) {
                console.error("Failed to fetch cart:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const methods = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            contact: "",
            fullName: "",
            telephone: "",
            address: "",
            city: "",
        },
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log("提交的数据：", data);
    };

    const totalPrice = cart?.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    ) ?? 0;

    return (
        <div className="flex gap-6 p-6">
            {/* 左侧 - 表单 */}
            <Card className="w-1/2">
                <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="contact">Email Address</Label>
                                <Input {...methods.register("contact")} />
                                {methods.formState.errors.contact && (
                                    <p className="text-red-500 text-sm">{methods.formState.errors.contact.message}</p>
                                )}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input {...methods.register("fullName")} />
                                {methods.formState.errors.fullName && (
                                    <p className="text-red-500 text-sm">{methods.formState.errors.fullName.message}</p>
                                )}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="telephone">Phone Number</Label>
                                <Input {...methods.register("telephone")} />
                                {methods.formState.errors.telephone && (
                                    <p className="text-red-500 text-sm">{methods.formState.errors.telephone.message}</p>
                                )}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="address">Address</Label>
                                <Input {...methods.register("address")} />
                                {methods.formState.errors.address && (
                                    <p className="text-red-500 text-sm">{methods.formState.errors.address.message}</p>
                                )}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="city">City</Label>
                                <Input {...methods.register("city")} />
                                {methods.formState.errors.city && (
                                    <p className="text-red-500 text-sm">{methods.formState.errors.city.message}</p>
                                )}
                            </div>
                        </div>

                        <Button type="submit" className="mt-4 w-full">Place Order</Button>
                    </form>
                </CardContent>
            </Card>

            {/* 右侧 - 订单摘要 */}
            <Card className="w-1/2">
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p>Loading cart...</p>
                    ) : (
                        <>
                            {cart?.items.length === 0 ? (
                                <p>Your cart is empty.</p>
                            ) : (
                                <div className="space-y-4">
                                    {cart?.items.map((item) => (
                                        <div key={item.id} className="flex items-start gap-4 border-b pb-4">
                                            {/* 商品图片（占位图） */}
                                            <div className="w-16 h-16 bg-gray-200 rounded"></div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{item.product.name}</h3>
                                                <p>Qty: {item.quantity}</p>
                                                <p>${(item.product.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* 显示总价 */}
                            <div className="mt-6 space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Discount</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="flex justify-between font-bold pt-2 border-t">
                                    <span>Total</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-gray-500">(Includes tax $0.00)</p>
                            </div>

                            <textarea
                                placeholder="Add a note to your order..."
                                className="w-full h-16 mt-4 p-2 border rounded-md"
                            ></textarea>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}