// app/api/products/[id]/route.ts

import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params // ✅ 先 await params，再获取 id
    const productId = parseInt(id, 10)

    if (isNaN(productId)) {
        return new Response(JSON.stringify({ error: 'Invalid product ID' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    try {
        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: {
                category: true,
            },
        })

        if (!product) {
            return new Response(JSON.stringify({ error: 'Product not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        return new Response(JSON.stringify(product), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        console.error('Database error:', error)
        return new Response(
            JSON.stringify({ error: 'Failed to fetch product', details: error }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        )
    }
}