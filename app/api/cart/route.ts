import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
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
                },
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
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // 验证用户是否存在
        const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        })
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const { productId, quantity } = await req.json()

        // 查找用户的购物车
        let cart = await prisma.cart.findFirst({
            where: {
                userId: session.user.id
            }
        })

        // 如果没有购物车，就创建一个新的
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

        // 查找当前 cart 中是否已有该商品
        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId
            }
        })

        if (existingItem) {
            // 存在 item，增加数量
            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: {
                    quantity: {
                        increment: quantity
                    }
                }
            })
        } else {
            // 创建新的 cartItem
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity
                }
            })
        }

        // 返回更新后的购物车
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
        console.error("cart error:", error)
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

        // 直接删除购物车项
        await prisma.cartItem.delete({
            where: { id: itemId }
        });

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