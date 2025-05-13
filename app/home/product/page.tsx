'use client'
import ProductCard_02 from "@/components/commerce-ui/product-card-02"
import ProductCard_04 from "@/components/commerce-ui/product-card-04"

export default function Product() {
    const DEFAULT_IMAGE_URL = "https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/speaker-01.jpg";

    const products = [
        {
            id: 1,
            description: "Experience next-level audio with the AeroTune X9, the world's most advanced wireless headset designed for audiophiles, gamers, and music lovers alike. With QuantumBass™ technology, every beat, bass drop, and whisper is delivered in studio-quality precision.",
            discount: "20% OFF",
            hasShipping: true,
            imageUrl: DEFAULT_IMAGE_URL,
            inStock: true,
            onAddToCart: () => { },
            onBuyNow: () => { },
            prefix: "$",
            price: 39.59,
            rating: 4.45,
            reviewCount: 362,
            shippingText: "Free Shipping",
            stockCount: 256,
            title: "AeroTune X9",
        }
    ];

    const products04 = [
        {
            id: 1,
            description: "Experience next-level audio with the AeroTune X9, the world's most advanced wireless headset designed for audiophiles, gamers, and music lovers alike. With QuantumBass™ technology, every beat, bass drop, and whisper is delivered in studio-quality precision.",
            discount: "20% OFF",
            hasShipping: true,
            imageUrl: DEFAULT_IMAGE_URL,
            inStock: true,
            onAddToCart: () => { },
            onBuyNow: () => { },
            prefix: "$",
            price: 39.59,
            rating: 4.45,
            reviewCount: 362,
            shippingText: "Free Shipping",
            stockCount: 256,
            title: "AeroTune X9",
        },
        {
            id: 2,
            description: "Experience next-level audio with the AeroTune X9, the world's most advanced wireless headset designed for audiophiles, gamers, and music lovers alike. With QuantumBass™ technology, every beat, bass drop, and whisper is delivered in studio-quality precision.",
            discount: "20% OFF",
            hasShipping: true,
            imageUrl: DEFAULT_IMAGE_URL,
            inStock: true,
            onAddToCart: () => { },
            onBuyNow: () => { },
            prefix: "$",
            price: 39.59,
            rating: 4.45,
            reviewCount: 362,
            shippingText: "Free Shipping",
            stockCount: 256,
            title: "AeroTune X9",
        },
        {
            id: 3,
            description: "Experience next-level audio with the AeroTune X9, the world's most advanced wireless headset designed for audiophiles, gamers, and music lovers alike. With QuantumBass™ technology, every beat, bass drop, and whisper is delivered in studio-quality precision.",
            discount: "20% OFF",
            hasShipping: true,
            imageUrl: DEFAULT_IMAGE_URL,
            inStock: true,
            onAddToCart: () => { },
            onBuyNow: () => { },
            prefix: "$",
            price: 39.59,
            rating: 4.45,
            reviewCount: 362,
            shippingText: "Free Shipping",
            stockCount: 256,
            title: "AeroTune X9",
        },
        {
            id: 4,
            description: "Experience next-level audio with the AeroTune X9, the world's most advanced wireless headset designed for audiophiles, gamers, and music lovers alike. With QuantumBass™ technology, every beat, bass drop, and whisper is delivered in studio-quality precision.",
            discount: "20% OFF",
            hasShipping: true,
            imageUrl: DEFAULT_IMAGE_URL,
            inStock: true,
            onAddToCart: () => { },
            onBuyNow: () => { },
            prefix: "$",
            price: 39.59,
            rating: 4.45,
            reviewCount: 362,
            shippingText: "Free Shipping",
            stockCount: 256,
            title: "AeroTune X9",
        },
        {
            id: 5,
            description: "Experience next-level audio with the AeroTune X9, the world's most advanced wireless headset designed for audiophiles, gamers, and music lovers alike. With QuantumBass™ technology, every beat, bass drop, and whisper is delivered in studio-quality precision.",
            discount: "20% OFF",
            hasShipping: true,
            imageUrl: DEFAULT_IMAGE_URL,
            inStock: true,
            onAddToCart: () => { },
            onBuyNow: () => { },
            prefix: "$",
            price: 39.59,
            rating: 4.45,
            reviewCount: 362,
            shippingText: "Free Shipping",
            stockCount: 256,
            title: "AeroTune X9",
        }
    ];

    return (
        <div>
            <div className="flex flex-col items-center space-y-6 my-8">
                <h1 className="text-2xl font-bold text-center">popular</h1>

                <div className="flex flex-col gap-8">
                    {products.map((product, index) => (
                        <ProductCard_02 key={index} {...product} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center space-y-6 my-8">
                <h1 className="text-2xl font-bold text-center">Products</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {products04.map((product, index) => (
                        <ProductCard_04 key={index} {...product} />
                    ))}
                </div>
            </div>
        </div>

    );
}