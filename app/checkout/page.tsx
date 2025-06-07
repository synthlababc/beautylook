"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

interface OnApproveData {
    orderID: string;
    // 你也可以根据需要添加其他字段
}

export default function CheckoutPage() {
    const [cart, setCart] = useState<CartResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [paypalLoading, setPaypalLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        trigger,
        getValues,
        formState: { errors, isValid },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onChange", // 实时验证
        defaultValues: {
            contact: "",
            fullName: "",
            telephone: "",
            address: "",
            city: "",
        },
    });

    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    if (!paypalClientId) {
        console.error("Missing PayPal client ID");
    }

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

    const createOrder = async () => {
        const valid = await trigger(); // 表单验证
        if (!valid || !cart) {
            throw new Error("Invalid form or cart missing");
        }

        const formData = getValues();

        const response = await fetch("/api/orders/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cartId: cart.id,
                ...formData,
            }),
        });

        const result = await response.json();

        if (!result.orderID) {
            throw new Error("Failed to create PayPal order");
        }

        return result.orderID; // 👈 返回 orderID 给 JS SDK
    };


    const onApprove = async (data: OnApproveData) => {
        setPaypalLoading(true);
        try {
            const response = await fetch(`/api/orders/capture`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderID: data.orderID,
                }),
            });

            const result = await response.json();

            if (result.status === "COMPLETED") {
                window.location.href = "/order/success";
            } else {
                console.error("Payment not completed:", result);
            }
        } catch (error) {
            console.error("Failed to capture payment:", error);
        } finally {
            setPaypalLoading(false);
        }
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
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit(() => { })} // 必须加，不然验证无法触发
                    >
                        <div className="grid w-full items-center gap-4">
                            {[
                                { id: "contact", label: "Email Address" },
                                { id: "fullName", label: "Full Name" },
                                { id: "telephone", label: "Phone Number" },
                                { id: "address", label: "Address" },
                                { id: "city", label: "City" },
                            ].map(({ id, label }) => (
                                <div className="flex flex-col space-y-1.5" key={id}>
                                    <Label htmlFor={id}>{label}</Label>
                                    <Input {...register(id as keyof FormValues)} />
                                    {errors[id as keyof FormValues] && (
                                        <p className="text-red-500 text-sm">
                                            {errors[id as keyof FormValues]?.message as string}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* 右侧 - 订单摘要和支付 */}
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
                            </div>

                            <div className="mt-6">
                                {paypalClientId ? (
                                    <PayPalButtons
                                        createOrder={createOrder}
                                        onApprove={onApprove}
                                        onError={(err) => console.error("PayPal error", err)}
                                        style={{ layout: "vertical" }}
                                        disabled={paypalLoading || !isValid}
                                    />
                                ) : (
                                    <p className="text-red-500">PayPal client ID not configured</p>
                                )}
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
