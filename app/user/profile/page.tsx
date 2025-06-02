"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function ProfilePage() {
    const { data: session } = useSession();
    const [name, setName] = useState(session?.user?.name || "");
    const [avatarUrl, setAvatarUrl] = useState(session?.user?.image || "");

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarUrl(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex min-h-screen bg-background">
            {/* 主内容区域 - 紧贴侧边栏 */}
            <main className="flex-1 px-4 py-4 ml-0"> {/* 移除了md:ml-64，只保留ml-0 */}
                <div className="w-full space-y-4"> {/* 减小垂直间距 */}
                    <h1 className="text-xl font-bold">User Profile</h1> {/* 减小标题大小 */}

                    {/* 紧凑的头像区域 */}
                    <div className="flex items-center gap-3"> {/* 改为行内布局，减小间距 */}
                        <Avatar className="h-16 w-16"> {/* 减小头像尺寸 */}
                            <AvatarImage src={avatarUrl} />
                            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <label
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
                        </label>
                    </div>

                    {/* 紧凑的表单区域 */}
                    <div className="space-y-3"> {/* 减小表单项间距 */}
                        <div>
                            <label className="block text-sm mb-1">Email</label> {/* 简化label样式 */}
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
                                onChange={(e) => setName(e.target.value)}
                                className="w-full max-w-xl"
                            />
                        </div>
                    </div>

                    {/* 紧凑的按钮 */}
                    <Button className="w-full max-w-xs">Save Changes</Button> {/* 限制按钮宽度 */}
                </div>
            </main>
        </div>
    );
}