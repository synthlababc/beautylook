// app/products/[id]/page.tsx
'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon, ShoppingCartIcon } from "lucide-react";

const currencyLocale: Record<string, string> = {
    CNY: "zh-CN",
    USD: "en-US",
    EUR: "de-DE",
    JPY: "ja-JP",
};

function formatCurrency(amount: string, currency: string) {
    const value = parseFloat(amount);
    const locale = currencyLocale[currency] ?? "en-US";
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
    }).format(value);
}

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
    NEW: "default",
    HOT: "destructive",
    NORMAL: "secondary",
};

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    currency: string;
    status: string;
    image: string;
    detail?: string;
    category: {
        id: number;
        name: string;
    };
}

export default function ProductDetailPage() {
    const params = useParams();
    const id = params?.id;
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (!id) return;
        fetch(`/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data))
            .catch(console.error);
    }, [id]);

    if (!product) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return (
        <div className="container mx-auto max-w-5xl py-8 px-4">
            <Link
                href="/product"
                className="mb-4 inline-flex items-center text-sm hover:underline"
            >
                <ArrowLeftIcon className="mr-1 h-4 w-4" /> Back to products
            </Link>

            <Card className="grid grid-cols-1 md:grid-cols-2 gap-6 shadow-xl">
                <CardHeader className="p-0 relative overflow-hidden rounded-2xl min-h-[300px]">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                        priority
                    />
                </CardHeader>

                <CardContent className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-2">
                        <Badge variant={statusVariant[product.status] || "secondary"}>{product.status}</Badge>
                        <Separator orientation="vertical" className="h-4" />
                        <span className="text-sm text-muted-foreground">
                            {product.category?.name}
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight leading-tight">
                        {product.name}
                    </h1>

                    <p className="text-base text-muted-foreground">{product.description}</p>

                    <p className="text-2xl font-semibold">
                        {formatCurrency(product.price, product.currency)}
                    </p>

                    <Button size="lg" className="w-full md:w-auto">
                        <ShoppingCartIcon className="mr-2 h-5 w-5" /> Add to cart
                    </Button>
                </CardContent>
            </Card>

            {product.detail && (
                <section className="mt-10 text-center">
                    <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
                    <article
                        className="prose lg:prose-lg mx-auto text-left"
                        dangerouslySetInnerHTML={{ __html: product.detail }}
                    />
                </section>
            )}
        </div>
    );
}
