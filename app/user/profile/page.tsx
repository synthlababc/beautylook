"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [name, setName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const router = useRouter();

    // ⚠️ 用户未登录跳转
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login"); // 或你自己的登录路径
        }
    }, [status, router]);

    useEffect(() => {
        if (session) {
            setName(session.user?.name || "");
            setAvatarUrl(session.user?.image || "");
        }
    }, [session]);

    // const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             setAvatarUrl(e.target?.result as string);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    if (status === "loading") {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="flex min-h-screen bg-background">
            <main className="flex-1 px-4 py-4 ml-0">
                <div className="w-full space-y-4">
                    <h1 className="text-xl font-bold">User Profile</h1>

                    <div className="flex items-center gap-3">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={avatarUrl} />
                            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {/* <label
                            htmlFor="avatar-upload"
                            className="cursor-pointer text-blue-500 hover:text-blue-600 underline text-sm"
                        >
                            Upload Avatar
                            <Input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleUpload}
                                className="hidden"
                            />
                        </label> */}
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm mb-1">Email</label>
                            <Input
                                value={session?.user?.email || ""}
                                disabled
                                className="w-full max-w-xl"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Name</label>
                            <Input
                                value={name}
                                disabled
                                onChange={(e) => setName(e.target.value)}
                                className="w-full max-w-xl"
                            />
                        </div>
                    </div>

                    {/* <Button className="w-full max-w-xs">Save Changes</Button> */}
                </div>
            </main>
        </div>
    );
}
