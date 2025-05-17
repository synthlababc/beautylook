import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const products = await prisma.product.findMany({
        where: {
            status: status ? status as 'NEW' | 'HOT' : undefined
        },
        include: {
            category: true
        }
    })

    return NextResponse.json(products)
}
