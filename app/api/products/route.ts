// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { ProductStatus } from '@prisma/client';

const prisma = new PrismaClient();

// 定义响应类型
interface ProductsResponse {
    data: Array<{
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
    }>;
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

        // 直接解析出基本参数
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        const category = searchParams.get('category') || undefined;
        const status = searchParams.get('status') as ProductStatus | undefined;
        const sortBy = searchParams.get('sortBy') as 'price' | 'createdAt' | undefined;
        const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';

        // 构建查询条件
        const where = {
            ...(category && { category: { name: category } }),
            ...(status && { status: status }),
        };

        // 构建排序条件
        const orderBy = sortBy
            ? ({ [sortBy]: sortOrder } satisfies { [key in 'price' | 'createdAt']?: 'asc' | 'desc' })
            : ({ createdAt: 'desc' } satisfies { createdAt?: 'asc' | 'desc' });

        // 查询总数
        const total = await prisma.product.count({ where });

        // 查询产品数据（确保 include 正确）
        const products = await prisma.product.findMany({
            skip: (page - 1) * limit,
            take: limit,
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
        const totalPages = Math.ceil(total / limit);

        // 格式化响应数据
        const response: ProductsResponse = {
            data: products.map(product => ({
                id: product.id,
                name: product.name,
                description: product.description,
                price: Number(product.price),
                currency: product.currency,
                status: product.status,
                image: product.image,
                createdAt: product.createdAt.toISOString(),
                category: product.category!, // 确保非空
            })),
            meta: {
                total,
                page,
                limit,
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