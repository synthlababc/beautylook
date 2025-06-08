"use client";

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

export default function OrderSuccessPage() {
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
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Order ID:</span>
                        <span className="font-medium">#ORD123456</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">June 7, 2025</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Amount:</span>
                        <span className="font-medium">$99.99</span>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-3 pt-6">
                    <Button asChild className="w-full">
                        <Link href="/">
                            <HomeIcon className="mr-2 h-4 w-4" /> Back to Home
                        </Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                        <Link href="/orders">
                            <Receipt className="mr-2 h-4 w-4" /> View Order Details
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}