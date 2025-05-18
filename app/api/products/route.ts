// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { ProductStatus } from '@prisma/client';

const prisma = new PrismaClient();

// 定义请求参数类型
interface ProductsRequestParams {
    page?: number;
    limit?: number;
    category?: string;
    status?: ProductStatus;
    sortBy?: 'price' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
}

// 定义响应类型
interface ProductsResponse {
    data: {
        id: number;
        name: string;
        description: string;
        price: number;
        currency: string;
        status: ProductStatus;
        image: string;
        createdAt: string;
        category: {
            id: number;
            name: string;
        };
    }[];
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

        // 解析查询参数
        const params: ProductsRequestParams = {
            page: parseInt(searchParams.get('page') || '1', 10),
            limit: parseInt(searchParams.get('limit') || '10', 10),
            category: searchParams.get('category') || undefined,
            status: searchParams.get('status') as ProductStatus || undefined,
            sortBy: searchParams.get('sortBy') as 'price' | 'createdAt' || undefined,
            sortOrder: searchParams.get('sortOrder') as 'asc' | 'desc' || 'desc',
        };

        // 构建查询条件
        const where = {
            ...(params.category && { category: { name: params.category } }),
            ...(params.status && { status: params.status }),
        };

        // 构建排序条件
        const orderBy = params.sortBy
            ? { [params.sortBy]: params.sortOrder }
            : { createdAt: 'desc' };

        // 查询总数
        const total = await prisma.product.count({ where });

        // 查询产品数据
        const products = await prisma.product.findMany({
            skip: (params.page - 1) * params.limit,
            take: params.limit,
            where,
            orderBy,
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        // 计算总页数
        const totalPages = Math.ceil(total / params.limit);

        // 格式化响应数据
        const response: ProductsResponse = {
            data: products.map(product => ({
                ...product,
                price: Number(product.price),
                createdAt: product.createdAt.toISOString(),
            })),
            meta: {
                total,
                page: params.page,
                limit: params.limit,
                totalPages,
            },
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