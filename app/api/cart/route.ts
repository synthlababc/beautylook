import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const cart = await prisma.cart.findFirst({
            where: {
                user: {
                    email: session.user.email
                }
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        })

        return NextResponse.json(cart || { items: [] })
    } catch (error) {
        console.log("cart error:", error)
        return NextResponse.json(
            { error: 'Failed to fetch cart' },
            { status: 500 }
        )
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { productId, quantity } = await req.json()

        // First find existing cart
        let cart = await prisma.cart.findFirst({
            where: {
                userId: session.user.id
            }
        })

        // Create new cart if none exists
        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    user: {
                        connect: {
                            id: session.user.id
                        }
                    }
                }
            })
        }

        // Add or update cart item
        await prisma.cartItem.upsert({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId
                }
            },
            create: {
                cartId: cart.id,
                productId,
                quantity
            },
            update: {
                quantity: {
                    increment: quantity
                }
            }
        })

        // Return updated cart
        const updatedCart = await prisma.cart.findUnique({
            where: { id: cart.id },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        })

        return NextResponse.json(updatedCart)
    } catch (error) {
        console.log("cart error:", error)
        return NextResponse.json(
            { error: 'Failed to add item to cart' },
            { status: 500 }
        )
    }
}

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { itemId, quantity } = await req.json()

        await prisma.cartItem.update({
            where: { id: itemId },
            data: { quantity }
        })

        const cart = await prisma.cart.findFirst({
            where: {
                user: {
                    email: session.user.email
                }
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        })

        return NextResponse.json(cart)
    } catch (error) {
        console.log("cart error:", error)
        return NextResponse.json(
            { error: 'Failed to update cart item' },
            { status: 500 }
        )
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { itemId } = await req.json()

        await prisma.cartItem.delete({
            where: { id: itemId }
        })

        const cart = await prisma.cart.findFirst({
            where: {
                user: {
                    email: session.user.email
                }
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        })

        return NextResponse.json(cart || { items: [] })
    } catch (error) {
        console.log("cart error:", error)
        return NextResponse.json(
            { error: 'Failed to remove item from cart' },
            { status: 500 }
        )
    }
}
