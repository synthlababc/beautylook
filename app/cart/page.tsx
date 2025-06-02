'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

type CartItem = {
    id: number
    product: {
        id: number
        name: string
        price: number
        image: string
        size: string
        color: string
    }
    quantity: number
}

export default function CartPage() {
    const [cart, setCart] = useState<{ items: CartItem[] }>({ items: [] })
    const [loading, setLoading] = useState(true)
    const [updatingItems, setUpdatingItems] = useState<number[]>([])
    const router = useRouter()

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await fetch('/api/cart', {
                    credentials: 'include'
                })

                if (res.status === 401) {
                    router.push('/login')
                    return
                }

                if (!res.ok) {
                    throw new Error('Failed to fetch cart')
                }

                const data = await res.json()
                setCart(data || { items: [] })
            } catch (error) {
                console.error('Failed to fetch cart', error)
                setCart({ items: [] })
            } finally {
                setLoading(false)
            }
        }
        fetchCart()
    }, [])

    const updateQuantity = async (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return

        try {
            setUpdatingItems(prev => [...prev, itemId])

            const res = await fetch('/api/cart', {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId, quantity: newQuantity })
            })

            if (res.status === 401) {
                router.push('/login')
                return
            }

            // Optimistic update
            setCart(prev => ({
                items: prev.items.map(item =>
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                )
            }))
        } catch (error) {
            console.error('Failed to update quantity', error)
            // Revert optimistic update if error occurs
            const refreshRes = await fetch('/api/cart', { credentials: 'include' })
            const data = await refreshRes.json()
            setCart(data || { items: [] })
        } finally {
            setUpdatingItems(prev => prev.filter(id => id !== itemId))
        }
    }

    const removeItem = async (itemId: number) => {
        try {
            setUpdatingItems(prev => [...prev, itemId])
            const res = await fetch('/api/cart', {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId })
            })

            if (res.status === 401) {
                router.push('/login')
                return
            }

            // Optimistic update
            setCart(prev => ({
                items: prev.items.filter(item => item.id !== itemId)
            }))
        } catch (error) {
            console.error('Failed to remove item', error)
            // Revert optimistic update if error occurs
            const refreshRes = await fetch('/api/cart', { credentials: 'include' })
            const data = await refreshRes.json()
            setCart(data || { items: [] })
        } finally {
            setUpdatingItems(prev => prev.filter(id => id !== itemId))
        }
    }

    const calculateTotal = () => {
        return cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Product List */}
                <div className="w-full md:w-3/4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Shopping Cart</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {cart.items.length === 0 ? (
                                <div className="text-center py-8">
                                    <p>Your cart is empty</p>
                                    <Button
                                        className="mt-4"
                                        onClick={() => router.push('/product')}
                                    >
                                        Continue Shopping
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="p-4 text-left">PRODUCT</th>
                                                <th className="p-4 text-right">PRICE</th>
                                                <th className="p-4 text-right">QUANTITY</th>
                                                <th className="p-4 text-right">TOTAL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.items.map((item) => (
                                                <tr key={item.id} className="border-b hover:bg-gray-50">
                                                    <td className="p-4">
                                                        <div className="flex items-center">
                                                            <img
                                                                src={item.product.image}
                                                                alt={item.product.name}
                                                                className="w-20 h-20 object-cover rounded mr-4"
                                                            />
                                                            <div>
                                                                <h3 className="font-medium">{item.product.name}</h3>
                                                                <p className="text-sm text-gray-500">{item.product.color} / {item.product.size}</p>
                                                                <button
                                                                    onClick={() => removeItem(item.id)}
                                                                    disabled={updatingItems.includes(item.id)}
                                                                    className="text-red-500 hover:underline text-sm mt-1 disabled:opacity-50"
                                                                >
                                                                    {updatingItems.includes(item.id) ? 'Removing...' : 'Remove'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-right">${Number(item.product.price).toFixed(2)}</td>
                                                    <td className="p-4 text-right">
                                                        <div className="flex justify-end">
                                                            <div className="flex items-center border rounded-md overflow-hidden">
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                    disabled={item.quantity <= 1 || updatingItems.includes(item.id)}
                                                                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="px-3 py-1 bg-white min-w-[40px] text-center">
                                                                    {updatingItems.includes(item.id) ? '...' : item.quantity}
                                                                </span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                    disabled={updatingItems.includes(item.id)}
                                                                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-right">${Number(item.product.price * item.quantity).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
                {/* Order Summary */}
                <div className="w-full md:w-1/4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Sub total</span>
                                    <span>${calculateTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Tax</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>${calculateTotal().toFixed(2)}</span>
                                </div>
                                <Button
                                    onClick={() => router.push('/checkout')}
                                    className="w-full mt-4"
                                    disabled={cart.items.length === 0}
                                >
                                    PROCEED TO CHECKOUT
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}