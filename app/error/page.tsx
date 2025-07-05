"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ErrorPage() {
    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-2xl font-bold">Authentication Error</h1>
            <p className="text-gray-500">
                An error occurred during authentication. Please try again later.
            </p>
            <div className="flex gap-2">
                <Button onClick={() => router.push("/signin")}>
                    Back to Sign In
                </Button>
                <Button variant="outline" onClick={() => router.push("/")}>
                    Back to Home
                </Button>
            </div>
        </div>
    )
}
