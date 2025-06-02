"use client";

import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { User, ShoppingCart, ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [, setIsMobile] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const isActive = (href: string) => {
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    return (
        <SessionProvider>
            <div className="flex min-h-screen bg-background">
                {/* 侧边栏容器 - 更紧凑的宽度 */}
                <div className="relative">
                    {/* 侧边栏 */}
                    <div
                        className={`h-full transition-all duration-300 ease-in-out bg-background border-r
                            ${sidebarCollapsed ? 'w-14' : 'w-52'}
                        `}
                    >
                        <div className="h-full flex flex-col overflow-y-auto">
                            <h2 className={`p-3 font-semibold ${sidebarCollapsed ? "text-center" : ""}`}>
                                {sidebarCollapsed ? "UC" : "User Center"}
                            </h2>

                            <nav className="flex-1 px-1 py-2 space-y-1">
                                <Link
                                    href="/user/profile"
                                    className={`flex items-center rounded p-2 text-sm font-medium transition-colors ${isActive("/user/profile")
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                        : "hover:bg-accent hover:text-accent-foreground"
                                        } ${sidebarCollapsed ? "justify-center" : ""}`}
                                >
                                    <User className="h-4 w-4" />
                                    {!sidebarCollapsed && <span className="ml-2">Profile</span>}
                                </Link>

                                <Link
                                    href="/user/orders"
                                    className={`flex items-center rounded p-2 text-sm font-medium transition-colors ${isActive("/user/orders")
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                        : "hover:bg-accent hover:text-accent-foreground"
                                        } ${sidebarCollapsed ? "justify-center" : ""}`}
                                >
                                    <ShoppingCart className="h-4 w-4" />
                                    {!sidebarCollapsed && <span className="ml-2">Orders</span>}
                                </Link>
                            </nav>
                        </div>
                    </div>

                    {/* 折叠按钮 */}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="absolute top-3 -right-3 z-50 flex items-center justify-center w-5 h-5 rounded-full border bg-background shadow-sm hover:bg-accent"
                    >
                        {sidebarCollapsed ? (
                            <ChevronRight className="h-3 w-3" />
                        ) : (
                            <ChevronLeft className="h-3 w-3" />
                        )}
                    </button>
                </div>

                {/* 主内容区域 - 更靠近侧边栏 */}
                <main
                    className={`flex-1 transition-all duration-300 ease-in-out min-h-screen 
                        ${sidebarCollapsed ? "ml-10" : "ml-20"}
                    `}
                >
                    {children}
                </main>
            </div>
        </SessionProvider>
    );
}