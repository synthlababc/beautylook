"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"; // ✅ 正确导入 zod
import {
    PayPalScriptProvider,
    PayPalButtons,
} from "@paypal/react-paypal-js";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { InfoCircledIcon } from "@radix-ui/react-icons";

// 引入国家数据
import { countries } from "@/lib/countries";

// 表单验证 Schema - 更新为使用 phone 替代 telephone
const formSchema = z.object({
    contact: z.string().email("Please enter a valid email address"),
    firstName: z.string().optional(), // First name 可选
    lastName: z.string().min(1, "Last name is required"),
    country: z.string().min(1, "Country is required"),
    address: z.string().min(1, "Street address is required"),
    apartment: z.string().optional(),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().optional(),
    phone: z.string().min(1, "Phone number is required"), // ✅ 使用 phone 替换 telephone
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
}

export default function CheckoutPage() {
    const [cart, setCart] = useState<CartResponse | null>(null);
    const [loadingCart, setLoadingCart] = useState<boolean>(true);
    const [paypalLoading, setPaypalLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        trigger,
        getValues,
        setValue,
        formState: { errors, isValid },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            contact: "",
            firstName: "",
            lastName: "",
            country: "TW", // 默认为台湾
            address: "",
            apartment: "",
            city: "",
            postalCode: "",
            phone: "", // ✅ 替换 telephone 为 phone
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
                setLoadingCart(false);
            }
        };
        fetchCart();
    }, []);

    const createOrder = async () => {
        const valid = await trigger(); // 手动触发表单验证
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

        return result.orderID;
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
        <div className="flex gap-6 p-6 max-w-6xl mx-auto">
            {/* 左侧 - 送货信息表单 */}
            <Card className="w-full lg:w-1/2">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Delivery</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="grid w-full items-center gap-4">
                            {/* Country/Region */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="country">Country/Region</Label>
                                <Select
                                    onValueChange={(value) => {
                                        setValue("country", value, { shouldValidate: true });
                                    }}
                                    defaultValue={getValues("country")}
                                    disabled={paypalLoading || loadingCart}
                                >
                                    <SelectTrigger id="country" className="w-full">
                                        <SelectValue placeholder="Select a country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries.map((c) => (
                                            <SelectItem key={c.code} value={c.code}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.country && (
                                    <p className="text-red-500 text-sm">{errors.country.message}</p>
                                )}
                            </div>

                            {/* Email Address */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="contact">Email Address</Label>
                                <Input
                                    {...register("contact")}
                                    id="contact"
                                    placeholder="your.email@example.com"
                                    disabled={paypalLoading || loadingCart}
                                />
                                {errors.contact && (
                                    <p className="text-red-500 text-sm">{errors.contact.message}</p>
                                )}
                            </div>

                            {/* First name & Last name */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="firstName">First name (optional)</Label>
                                    <Input
                                        {...register("firstName")}
                                        id="firstName"
                                        placeholder="Walker"
                                        disabled={paypalLoading || loadingCart}
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                                    )}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input
                                        {...register("lastName")}
                                        id="lastName"
                                        disabled={paypalLoading || loadingCart}
                                    />
                                    {errors.lastName && (
                                        <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    {...register("address")}
                                    id="address"
                                    disabled={paypalLoading || loadingCart}
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-sm">{errors.address.message}</p>
                                )}
                            </div>

                            {/* Apartment, suite, etc. (optional) */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                                <Input
                                    {...register("apartment")}
                                    id="apartment"
                                    disabled={paypalLoading || loadingCart}
                                />
                                {errors.apartment && (
                                    <p className="text-red-500 text-sm">{errors.apartment.message}</p>
                                )}
                            </div>

                            {/* City & Postal code */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        {...register("city")}
                                        id="city"
                                        disabled={paypalLoading || loadingCart}
                                    />
                                    {errors.city && (
                                        <p className="text-red-500 text-sm">{errors.city.message}</p>
                                    )}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="postalCode">Postal code (optional)</Label>
                                    <Input
                                        {...register("postalCode")}
                                        id="postalCode"
                                        disabled={paypalLoading || loadingCart}
                                    />
                                    {errors.postalCode && (
                                        <p className="text-red-500 text-sm">{errors.postalCode.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="phone" className="flex items-center">
                                    Phone
                                    <InfoCircledIcon className="ml-1 h-4 w-4 text-gray-400" />
                                </Label>
                                <Input
                                    {...register("phone")}
                                    id="phone"
                                    disabled={paypalLoading || loadingCart}
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm">{errors.phone.message}</p>
                                )}
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* 右侧 - 订单摘要和支付 */}
            <Card className="w-full lg:w-1/2">
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    {loadingCart ? (
                        <p>Loading cart...</p>
                    ) : (
                        <>
                            {cart?.items.length === 0 ? (
                                <p>Your cart is empty.</p>
                            ) : (
                                <div className="space-y-4">
                                    {cart?.items.map((item) => (
                                        <div key={item.id} className="flex items-start gap-4 border-b pb-4">
                                            <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0"></div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{item.product.name}</h3>
                                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
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
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2">
                                    <span>Total</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mt-8">

                                <PayPalButtons
                                    style={{ layout: "vertical" }}
                                    disabled={!isValid || paypalLoading || loadingCart}
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                    forceReRender={[!isValid]}
                                />

                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}