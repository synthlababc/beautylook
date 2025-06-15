import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const productId = resolvedParams.id;

    // 获取产品数据
    const productRes = await fetch(`https://www.beautylook.top/api/products/${productId}`);
    const product = await productRes.json();

    return {
        title: `${product.name} | BeautyLook`,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: [product.image],
        },
        keywords: [
            product.name,
            product.category?.name ?? "Uncategorized", // 可选链 + 默认值
            "beauty device",
            "skincare",
            "micro-infusion"
        ]
    };
}

export default function ProductLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}