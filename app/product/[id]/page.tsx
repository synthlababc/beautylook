"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus } from "lucide-react";
import ImageViewer from "@/components/commerce-ui/image-viewer-basic";
import Script from "next/script";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";

interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    description: string;
    detail: string;
    currency: string;
    category: {
        name: string;
    };
}

interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    description: string;
    detail: string;
    currency: string;
    category: {
        name: string;
    };
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const resolvedParams = React.use(params);

    useEffect(() => {
        if (!resolvedParams.id) return;
        fetch(`/api/products/${resolvedParams.id}`)
            .then((res) => res.json())
            .then(setProduct)
            .catch(console.error);
    }, [resolvedParams.id]);

    const jsonLd = product ? {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.image,
        "description": product.description,
        "brand": {
            "@type": "Brand",
            "name": "BeautyLook"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://www.beautylook.top/product/${resolvedParams.id}`,
            "priceCurrency": product.currency || "USD",
            "price": product.price,
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition"
        }
    } : null;

    const increase = () => setQuantity((q) => q + 1);
    const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    const handleAddToCart = async () => {
        if (!product || loading) return;
        setLoading(true);
        try {
            const res = await fetch("/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId: product.id,
                    quantity,
                }),
            });

            if (!res.ok) {
                if (res.status === 401) {
                    router.push('/login')
                    return
                }
                throw new Error("Failed to add item to cart");
            }

            // alert(`Added to cart: ${product.name} (×${quantity})`);
            setCartOpen(true); // 打开购物车对话框
        } catch (error) {
            console.error(error);
            alert("Failed to add item to cart");
        } finally {
            setLoading(false);
        }
    };

    if (!product) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-10 grid gap-10 md:grid-cols-2">
            {/* 左侧图片 */}
            {/* <div className="flex justify-center items-start">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="rounded-2xl shadow object-contain max-h-[500px] w-auto"
                />
            </div> */}

            {/* 左侧图片 */}
            <div className="relative aspect-square overflow-hidden rounded-xl flex items-center justify-center ml-auto" style={{ maxHeight: '500px', maxWidth: '500px' }}>
                {product.image && (
                    <ImageViewer
                        imageUrl={product.image}
                        className="w-full h-auto object-contain"
                        imageTitle={`${product.name} - BeautyLook Professional Skincare Device`}
                    />
                )}
            </div>

            <Script
                id="product-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* 右侧信息 */}
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    {/* <p className="mt-2 text-2xl font-semibold">
                        $ {parseFloat(product.price).toFixed(2)}
                    </p> */}
                    <div className="flex items-center space-x-2 m-3">
                        <div className="text-3xl font-semibold text-primary">${product.price}</div>
                        <div className="text-3xl font-semibold text-gray-500 line-through">${Math.round(parseFloat(product.price) / 0.8)}</div>
                        <div className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm">Save 20%</div>
                    </div>
                    {/* <p className="text-xl text-muted-foreground">
                        {product.description}
                    </p> */}
                    <p className="text-muted-foreground text-base whitespace-pre-line leading-relaxed">
                        {product.description}
                    </p>
                </div>

                <ul className="list-disc pl-5 space-y-1">
                    <li>
                        <span className="font-medium">category:</span> {product.category.name}
                    </li>
                </ul>

                <Separator />

                <div className="space-y-4">
                    {/* 数量选择器 */}
                    <div>
                        <p className="mb-1 font-medium">Quantity</p>
                        <div className="flex items-center border rounded-lg w-max overflow-hidden">
                            <Button
                                onClick={decrease}
                                className="rounded-none border-r"
                                variant="ghost"
                            >
                                <Minus className="w-4 h-4" />
                            </Button>
                            <div className="px-4 min-w-[40px] text-center select-none">
                                {quantity}
                            </div>
                            <Button
                                onClick={increase}
                                className="rounded-none border-l"
                                variant="ghost"
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* 加入购物车按钮 */}
                    <Button
                        size="lg"
                        className="w-full"
                        onClick={handleAddToCart}
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add to Cart"}
                    </Button>
                </div>
            </div>

            {/* 产品详情 markdown */}
            <div className="md:col-span-2">
                <Separator className="my-10" />
                <div className="prose md:prose-lg max-w-4xl mx-auto"> {/* 确保这部分居中 */}
                    <div dangerouslySetInnerHTML={{ __html: product.detail }} />
                </div>
            </div>

            {/* 购物车弹窗 */}
            <Dialog open={cartOpen} onOpenChange={setCartOpen}>
                <DialogContent className="fixed top-5 right-5 bg-white p-4 rounded-lg shadow-md">
                    <DialogTitle className="sr-only">Cart Notification</DialogTitle>
                    <DialogDescription className="sr-only">
                        Notification about items added to your shopping cart
                    </DialogDescription>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium">JUST ADDED TO YOUR CART</h2>
                        <button onClick={() => setCartOpen(false)} className="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex items-center mb-4">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={50}
                            height={50}
                            className="mr-4"
                        />
                        <div>
                            <p className="text-base font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">QTY: {quantity}</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => {
                            setCartOpen(false); // 关闭弹窗
                            router.push("/cart"); // 跳转到购物车页面
                        }}
                        className="w-full mb-2"
                    >
                        VIEW CART ({quantity})
                    </Button>
                    <Button onClick={() => setCartOpen(false)} variant="outline" className="w-full">
                        Continue Shopping
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}
