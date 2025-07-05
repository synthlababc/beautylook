"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ErrorPage() {
    const searchParams = useSearchParams()
    const router = useRouter()

    // 使用状态保存解码后的错误信息
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    // 获取并解码 error 参数
    useEffect(() => {
        const error = searchParams.get("error")
        if (error) {
            try {
                const decodedError = decodeURIComponent(error)
                setErrorMessage(decodedError)
            } catch (e) {
                setErrorMessage("An unknown error occurred.")
            }
        }
    }, [searchParams])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-2xl font-bold">Authentication Error</h1>

            {/* 显示动态错误信息 */}
            {errorMessage ? (
                <p className="text-red-500 max-w-md text-center">
                    {errorMessage}
                </p>
            ) : (
                <p className="text-gray-500">
                    An error occurred during authentication. Please try again later.
                </p>
            )}

            <div className="flex gap-2">
                <Button onClick={() => router.push("/login")}>
                    Back to login
                </Button>
                <Button variant="outline" onClick={() => router.push("/")}>
                    Back to Home
                </Button>
            </div>
        </div>
    )
}