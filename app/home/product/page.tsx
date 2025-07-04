'use client'
import { useState, useEffect } from 'react'
import ProductCard_02 from "@/components/commerce-ui/product-card-02"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { Separator } from "@/components/ui/separator"

type Product = {
    id: number;  // 改为 number 以匹配 API
    name: string;
    description: string;
    price: number;
    image: string;
    status: 'NEW' | 'HOT' | 'NORMAL';  // 与 API 一致
    rating?: number;
    reviewCount?: number;
    category?: {
        id: number;
        name: string;
    };
};

type ApiResponse = {
    data: Product[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
};

export default function ProductPage() {
    const [hotProducts, setHotProducts] = useState<Product[]>([])
    const [newProducts, setNewProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // 获取热门产品
                const hotResponse = await fetch('/api/products?status=HOT&limit=1')
                if (!hotResponse.ok) throw new Error('Failed to fetch hot products')
                const hotData: ApiResponse = await hotResponse.json()

                // 获取新产品
                const newResponse = await fetch('/api/products?status=NEW&limit=1')
                if (!newResponse.ok) throw new Error('Failed to fetch new products')
                const newData: ApiResponse = await newResponse.json()

                setHotProducts(hotData.data)
                setNewProducts(newData.data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred')
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (loading) return <div className="text-center py-8">Loading products...</div>
    if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hot Products Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-center mb-6">Popular Products</h2>
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 gap-6 max-w-4xl">
                        {hotProducts.map((product) => (
                            <ProductCard_02
                                key={product.id}
                                id={product.id}
                                title={product.name}
                                description={product.description}
                                price={product.price}
                                imageUrl={product.image}
                                rating={product.rating || 4.5}
                                reviewCount={product.reviewCount || 100}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* <Separator /> */}

            {/* New Products Section */}
            {newProducts.length > 0 && (
                <div className="mb-12 mt-10">
                    <h2 className="text-2xl font-bold text-center mb-6">New Products</h2>
                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 gap-6 max-w-4xl">
                            {newProducts.map((product) => (
                                <ProductCard_02
                                    key={product.id}
                                    id={product.id}
                                    title={product.name}
                                    description={product.description}
                                    price={product.price}
                                    imageUrl={product.image}
                                    rating={product.rating || 4.5}
                                    reviewCount={product.reviewCount || 100}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* <div className="flex justify-center mt-8">
                <Link href="/product">
                    <Button variant="default" size="lg">View All Products</Button>
                </Link>
            </div> */}
        </div>
    )
}