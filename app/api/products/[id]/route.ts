// app/api/products/[id]/route.ts

import { NextRequest } from 'next/server'
import products from '@/data/products.json'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const productId = parseInt(id, 10)

    if (isNaN(productId)) {
        return new Response(JSON.stringify({ error: 'Invalid product ID' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    const product = products.find(p => p.id === productId)

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
}
