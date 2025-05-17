'use client'
import { useState, useEffect } from 'react'
import ProductCard_02 from "@/components/commerce-ui/product-card-02"
import ProductCard_04 from "@/components/commerce-ui/product-card-04"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    status: 'HOT' | 'NEW' | 'REGULAR';
    rating?: number;
    reviewCount?: number;
};

export default function Product() {
    const [hotProducts, setHotProducts] = useState<Product[]>([])
    const [newProducts, setNewProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products')
                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }
                const data: Product[] = await response.json()

                // Filter products by status
                setHotProducts(data.filter(p => p.status === 'HOT'))
                setNewProducts(data.filter(p => p.status === 'NEW'))
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
                <div className="flex justify-center"> {/* 新增 flex 容器 */}
                    <div className="grid grid-cols-1 gap-6 max-w-4xl"> {/* 限制最大宽度 */}
                        {hotProducts.map((product) => (
                            <ProductCard_02
                                key={product.id}
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
            {/* New Products Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-center mb-6">New Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {newProducts.map((product) => (
                        <ProductCard_04
                            key={product.id}
                            productName={product.name}
                            imageUrl={product.image}
                            originalPrice={product.price} // 假设原价
                            salePrice={product.price * 0.9} // 假设折扣价（90% 原价）
                            rating={product.rating || 4.5}
                            reviewCount={product.reviewCount || 100}
                            tagText="NEW" // 可选：显示标签
                            currencyPrefix="$" // 货币符号
                            maxRating={5} // 最大评分（默认5星）
                            onAddToCart={() => console.log("Add to cart:", product.id)} // 加入购物车回调
                            onBuyNow={() => console.log("Buy now:", product.id)} // 立即购买回调
                        />
                    ))}
                </div>
            </div>

            <div className="flex justify-center mt-8">
                <Link href="/product">
                    <Button variant="default" size="lg">View All Products</Button>
                </Link>
            </div>
        </div>
    )
}