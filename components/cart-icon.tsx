'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function CartIcon() {
    const [itemCount, setItemCount] = useState(0)

    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const res = await fetch('/api/cart', {
                    credentials: 'include'
                })

                if (res.status === 401) {
                    return
                }

                if (!res.ok) {
                    throw new Error('Failed to fetch cart count')
                }

                const data = await res.json()
                setItemCount(data?.items?.length || 0)
            } catch (error) {
                console.error('Failed to fetch cart count', error)
                setItemCount(0)
            }
        }
        fetchCartCount()
    }, [])

    return (
        <Button asChild variant="ghost" size="icon" className="relative">
            <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {itemCount}
                    </span>
                )}
            </Link>
        </Button>
    )
}
