"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";      // ✅ 使用 next-auth 检查登录状态

export default function CartIcon() {
    const { status } = useSession(); // status: "loading" | "authenticated" | "unauthenticated"
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        // 仅当已经确定用户已登录时才拉取购物车
        if (status !== "authenticated") {
            setItemCount(0);            // 未登录或加载中，保持 0
            return;
        }

        const fetchCartCount = async () => {
            try {
                const res = await fetch("/api/cart", { credentials: "include" });
                if (!res.ok) throw new Error("Failed to fetch cart count");
                const data = await res.json();
                setItemCount(data?.items?.length || 0);
            } catch (error) {
                console.error(error);
                setItemCount(0);
            }
        };

        fetchCartCount();
    }, [status]);

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
    );
}
