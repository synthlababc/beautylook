"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import ImageViewer from "@/components/commerce-ui/image-viewer-basic";

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

export default function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (!id) return;
        fetch(`/api/products/${id}`)
            .then((res) => res.json())
            .then(setProduct)
            .catch(console.error);
    }, [id]);

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
                    <ImageViewer imageUrl={product.image} className="w-full h-auto object-contain" />
                )}
            </div>

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
                    {/* <div dangerouslySetInnerHTML={{ __html: product.detail }} /> */}
                    <div dangerouslySetInnerHTML={{ __html: a }} />
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


const a = `
<!-- How It Works Section -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
    <!-- 左边图片 -->
    <div class="flex justify-center">
        <img src="/micro/2.png" alt="Image 2" class="max-w-full h-auto max-h-96 rounded-lg shadow-md object-contain" />
    </div>

    <!-- 右边内容 -->
    <div class="space-y-4 flex flex-col justify-center">
        <h1 class="text-3xl font-bold text-center">The Magic Behind Microinfusion</h1>
        <h2 class="text-xl text-center">How it Works?</h2>

        <p>The Glov Micro-Infusion System achieves its exceptional effectiveness through stimulation and infusion.</p>

        <p>First, it delicately "stamps" the skin with 24K gold 0.25mm clinical-grade needles, inducing controlled trauma.
            This prompts increased collagen production, naturally improving elasticity and diminishing fine lines and wrinkles.</p>

        <div class="flex justify-center mt-4">
            <img src="/micro/skin.png" alt="Skin Treatment" class="max-w-full h-auto rounded-lg shadow-md" />
        </div>

        <p>The needles, finer than human hair, guarantee a virtually pain-free procedure.</p>

        <p>Next, invisible micro-channels "infuse" your selected clinically-formulated serums into the skin's surface,
            amplifying absorption by up to 300%, resulting in visible improvements.</p>
    </div>
</div>

<div class="flex justify-center mt-4">
    <img src="/micro/3.png" alt="Image 3" class="max-w-full h-auto rounded-lg shadow-md" />
</div>

<div class="flex justify-center mt-4">
    <img src="/micro/4.png" alt="Image 3" class="max-w-full h-auto rounded-lg shadow-md" />
</div>

<!-- How to Use Section -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
    <!-- 左边图片 -->
    <div class="flex justify-center">
        <img src="/micro/gif_5.gif" alt="Microinfusion Device" class="w-120 h-120 rounded-lg shadow-md object-cover" />
    </div>

    <!-- 右边内容 -->
    <div class="space-y-6 flex flex-col justify-center">
        <h1 class="text-3xl font-bold text-center">How to use</h1>
        <p class="text-xl text-center">5 Minutes Total, Every 2-4 Weeks</p>

        <!-- 步骤列表 -->
        <div class="space-y-6">
            <!-- Step 1 -->
            <div class="flex items-start space-x-4">
                <div class="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center">
                    <span class="font-bold text-lg">1</span>
                </div>
                <div>
                    <p class="font-bold">STEP 1</p>
                    <p>Twist open the chamber of the device and fill with one ampule of serum. Twist to close it tight. Optional: You can mix two serums and fill it until it’s 3/4 full.</p>
                </div>
            </div>

            <!-- Step 2 -->
            <div class="flex items-start space-x-4">
                <div class="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center">
                    <span class="font-bold text-lg">2</span>
                </div>
                <div>
                    <p class="font-bold">STEP 2</p>
                    <p>Once the serum has had enough time to make its way into the needles, you can take off the lid and start microinfusing!</p>
                </div>
            </div>

            <!-- Step 3 -->
            <div class="flex items-start space-x-4">
                <div class="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center">
                    <span class="font-bold text-lg">3</span>
                </div>
                <div>
                    <p class="font-bold">STEP 3</p>
                    <p>Start at the centre of the face and work your way outward to cover the full face. Stamp with a 50% overlap. Repeat 2-3 passes for better results. Leave the serum on overnight so your skin can drink up all those skin-enhancing ingredients.</p>
                </div>
            </div>
        </div>
    </div>
</div>
`