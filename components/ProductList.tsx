'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import ProductCard_04 from "@/components/commerce-ui/product-card-04"
import { Button } from "@/components/ui/button"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"

type Product = {
    id: number
    name: string
    description: string
    price: number
    image: string
    status: 'NEW' | 'HOT' | 'NORMAL'
    category: {
        id: number
        name: string
    }
}

type Category = {
    id: number
    name: string
}

type ApiResponse = {
    data: Product[]
    meta: {
        total: number
        page: number
        limit: number
        totalPages: number
    }
}

const DEFAULT_IMAGE_URL = "https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/speaker-01.jpg"

export default function ProductListPage() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 9,
        total: 0,
        totalPages: 1
    })

    // 从 URL 获取当前筛选参数
    const currentPage = parseInt(searchParams.get('page') || '1', 9)
    const currentCategory = searchParams.get('category') || ''
    const currentStatus = searchParams.get('status') || ''

    // 获取产品数据
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                // 获取分类数据
                const categoriesRes = await fetch('/api/categories')
                if (!categoriesRes.ok) throw new Error('Failed to fetch categories')
                const categoriesData = await categoriesRes.json()
                setCategories(categoriesData)

                // 获取产品数据
                const params = new URLSearchParams()
                params.set('page', currentPage.toString())
                params.set('limit', '9')
                if (currentCategory) params.set('category', currentCategory)
                if (currentStatus) params.set('status', currentStatus)

                const productsRes = await fetch(`/api/products?${params.toString()}`)
                if (!productsRes.ok) throw new Error('Failed to fetch products')
                const { data, meta }: ApiResponse = await productsRes.json()
                setProducts(data)
                setPagination({
                    page: meta.page,
                    limit: meta.limit,
                    total: meta.total,
                    totalPages: meta.totalPages
                })
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [currentPage, currentCategory, currentStatus])

    // 更新筛选参数
    const updateSearchParams = (params: { category?: string; status?: string; page?: number }) => {
        const newParams = new URLSearchParams(searchParams)

        if (params.category !== undefined) {
            if (params.category) {
                newParams.set('category', params.category);
            } else {
                newParams.delete('category');
            }
        }

        if (params.status !== undefined) {
            if (params.status) {
                newParams.set('status', params.status);
            } else {
                newParams.delete('status');
            }
        }

        if (params.page !== undefined) {
            if (params.page > 1) {
                newParams.set('page', params.page.toString());
            } else {
                newParams.delete('page');
            }
        }

        router.push(`${pathname}?${newParams.toString()}`)
    }

    // 处理产品点击
    const handleProductClick = (productId: number) => {
        router.push(`/product/${productId}`)
    }

    // 重置筛选
    const resetFilters = () => {
        updateSearchParams({ category: '', status: '', page: 1 })
    }

    // 生成分页按钮
    const generatePaginationItems = () => {
        const items = []
        const maxVisiblePages = 5
        let startPage = 1
        let endPage = pagination.totalPages

        if (pagination.totalPages > maxVisiblePages) {
            const half = Math.floor(maxVisiblePages / 2)
            startPage = Math.max(1, pagination.page - half)
            endPage = startPage + maxVisiblePages - 1

            if (endPage > pagination.totalPages) {
                endPage = pagination.totalPages
                startPage = endPage - maxVisiblePages + 1
            }
        }

        // 添加第一页按钮（如果需要）
        if (startPage > 1) {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink
                        onClick={() => updateSearchParams({ page: 1 })}
                        isActive={1 === pagination.page}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            )
            if (startPage > 2) {
                items.push(<PaginationItem key="ellipsis-start">...</PaginationItem>)
            }
        }

        // 添加中间页码
        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        onClick={() => updateSearchParams({ page: i })}
                        isActive={i === pagination.page}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            )
        }

        // 添加最后一页按钮（如果需要）
        if (endPage < pagination.totalPages) {
            if (endPage < pagination.totalPages - 1) {
                items.push(<PaginationItem key="ellipsis-end">...</PaginationItem>)
            }
            items.push(
                <PaginationItem key={pagination.totalPages}>
                    <PaginationLink
                        onClick={() => updateSearchParams({ page: pagination.totalPages })}
                        isActive={pagination.totalPages === pagination.page}
                    >
                        {pagination.totalPages}
                    </PaginationLink>
                </PaginationItem>
            )
        }

        return items
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* 左侧筛选栏 */}
                <div className="w-full md:w-64 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Filters</h2>
                        <Button
                            size="sm"
                            onClick={resetFilters}
                            disabled={!currentCategory && !currentStatus}
                        >
                            Reset
                        </Button>
                    </div>

                    {/* 分类筛选 */}
                    <Accordion type="multiple" defaultValue={['categories']}>
                        <AccordionItem value="categories">
                            <AccordionTrigger className="text-sm">Categories</AccordionTrigger>
                            <AccordionContent className="space-y-2">
                                {categories.map((category) => (
                                    <div key={category.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`cat-${category.id}`}
                                            checked={currentCategory === category.name}
                                            onCheckedChange={(checked) =>
                                                updateSearchParams({ category: checked ? category.name : '', page: 1 })
                                            }
                                        />
                                        <label htmlFor={`cat-${category.id}`} className="text-sm">
                                            {category.name}
                                        </label>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    {/* 状态筛选 */}
                    <Accordion type="multiple" defaultValue={['status']}>
                        <AccordionItem value="status">
                            <AccordionTrigger className="text-sm">Status</AccordionTrigger>
                            <AccordionContent className="space-y-2">
                                {['NEW', 'HOT'].map((status) => (
                                    <div key={status} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`status-${status}`}
                                            checked={currentStatus === status}
                                            onCheckedChange={(checked) =>
                                                updateSearchParams({ status: checked ? status : '', page: 1 })
                                            }
                                        />
                                        <label htmlFor={`status-${status}`} className="text-sm">
                                            {status}
                                        </label>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                {/* 右侧产品列表 */}
                <div className="flex-1">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="space-y-4">
                                    <Skeleton className="h-48 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-center py-8 text-red-500">
                            Error: {error}
                            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                                Retry
                            </Button>
                        </div>
                    ) : (
                        <>
                            {/* 产品列表 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <div
                                        key={product.id}
                                        onClick={() => handleProductClick(product.id)}
                                        className="cursor-pointer"
                                    >
                                        <ProductCard_04
                                            productName={product.name}
                                            imageUrl={product.image || DEFAULT_IMAGE_URL}
                                            originalPrice={product.price}
                                            salePrice={product.price * 0.9}
                                            rating={4.5}
                                            reviewCount={100}
                                            tagText={product.status === 'NEW' ? 'NEW' : product.status === 'HOT' ? 'HOT' : ''}
                                            currencyPrefix="$"
                                        // onAddToCart={() => console.log("Add to cart:", product.id)}
                                        // onBuyNow={() => console.log("Buy now:", product.id)}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* 分页控制 */}
                            {products.length > 0 && (
                                <div className="mt-8 flex flex-col items-center gap-4">
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    onClick={() => updateSearchParams({ page: pagination.page - 1 })}
                                                />
                                            </PaginationItem>

                                            {generatePaginationItems()}

                                            <PaginationItem>
                                                <PaginationNext
                                                    onClick={() => updateSearchParams({ page: pagination.page + 1 })}
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>

                                    <div className="text-sm text-muted-foreground">
                                        Page {pagination.page} of {pagination.totalPages} • Total {pagination.total} products
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}