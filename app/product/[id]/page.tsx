'use client'

import { useParams } from "next/navigation"
import ProductVariant_03 from "@/components/commerce-ui/product-variants-03"

export default function ProductDetail() {
    const params = useParams()
    const productId = params.id

    // 这里可以获取产品详情数据
    // 例如从API获取或从本地数据查找

    return (
        <div className="container mx-auto p-4">
            <h1>Product Detail Page</h1>
            <p>Product ID: {productId}</p>
            {/* 显示产品详情内容 */}
            <ProductVariant_03 />
        </div>
    )
}