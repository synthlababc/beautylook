// app/api/products/route.ts
import { NextResponse } from 'next/server';
import products from '@/data/products.json';

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    currency: string;
    status: 'ACTIVE' | 'INACTIVE';
    image: string;
    createdAt: string;
    category: {
        id: number;
        name: string;
    };
}

interface ProductsResponse {
    data: Product[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        const category = searchParams.get('category');
        const status = searchParams.get('status') as 'ACTIVE' | 'INACTIVE' | undefined;
        const sortBy = searchParams.get('sortBy') as 'price' | 'createdAt' | undefined;
        const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' || 'desc';

        // 筛选数据
        let filteredProducts = [...products];
        if (category) {
            filteredProducts = filteredProducts.filter(
                p => p.category.name.toLowerCase() === category.toLowerCase()
            );
        }
        if (status) {
            filteredProducts = filteredProducts.filter(p => p.status === status);
        }

        // 排序数据
        if (sortBy) {
            filteredProducts.sort((a, b) => {
                const aValue = a[sortBy];
                const bValue = b[sortBy];

                if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
        }

        const total = filteredProducts.length;
        const totalPages = Math.ceil(total / limit);

        // 分页数据
        const paginatedProducts = filteredProducts.slice(
            (page - 1) * limit,
            page * limit
        );

        const response: ProductsResponse = {
            data: paginatedProducts.map(p => ({
                ...p,
                price: p.price.toString(),
                status: p.status as 'ACTIVE' | 'INACTIVE',
                createdAt: new Date(p.createdAt).toISOString()
            })),
            meta: {
                total,
                page,
                limit,
                totalPages
            }
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
