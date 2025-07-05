import { Button } from "@/components/ui/button";
import Link from "next/link";

// 页面必须是 async 的，因为要 await searchParams
export default async function ErrorPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const error = (await searchParams).error;

    let errorMessage: string | null = null;

    if (error) {
        try {
            errorMessage = decodeURIComponent(Array.isArray(error) ? error[0] : error);
        } catch (e) {
            console.error("Failed to decode error:", e);
            errorMessage = "An unknown error occurred.";
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-2xl font-bold">Authentication Error</h1>

            {/* 显示动态错误信息 */}
            {errorMessage ? (
                <p className="text-red-500 max-w-md text-center">{errorMessage}</p>
            ) : (
                <p className="text-gray-500">
                    An error occurred during authentication. Please try again later.
                </p>
            )}

            <div className="flex gap-2">
                <Button asChild>
                    <Link href="/login">Back to login</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        </div>
    );
}