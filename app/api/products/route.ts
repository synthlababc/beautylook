import { NextResponse } from 'next/server';
import { PrismaClient, Prisma, ProductStatus } from '@prisma/client';

const prisma = new PrismaClient();

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

        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        const category = searchParams.get('category') || undefined;
        const status = searchParams.get('status') as ProductStatus | undefined;
        const sortBy = (searchParams.get('sortBy') as 'price' | 'createdAt') || 'createdAt';
        const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';

        const where: Prisma.ProductWhereInput = {
            ...(category && { category: { name: category } }),
            ...(status && { status }),
        };

        // 关键改动：orderBy 用数组写法
        const orderBy: Prisma.ProductOrderByWithRelationInput[] = [
            { [sortBy]: sortOrder },
            { id: sortOrder },
        ];

        const total = await prisma.product.count({ where });

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

        const totalPages = Math.ceil(total / limit);

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
                category: product.category!,
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
