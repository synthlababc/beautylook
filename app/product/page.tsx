// app/products/page.tsx
"use client";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import ProductList from "@/components/ProductList";

export default function ProductsPage() {
    return (
        <Suspense fallback={<ProductListSkeleton />}>
            <ProductList />
        </Suspense>
    );
}

// 可选：加载骨架屏
function ProductListSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-60" />
            ))}
        </div>
    );
}