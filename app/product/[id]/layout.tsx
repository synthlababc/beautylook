import { Metadata } from "next";

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

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const product = await fetch(`https://www.beautylook.top/api/products/${resolvedParams.id}`).then(res => res.json());

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
            product.category.name,
            "beauty device",
            "skincare",
            "micro-infusion"
        ]
    };
}

export default function ProductLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>{children}</>
    );
}
