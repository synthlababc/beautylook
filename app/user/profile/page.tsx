// app/profile/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login");
    }

    return (
        <main className="flex-1 px-4 py-4 ml-0">
            <div className="w-full space-y-4">
                <h1 className="text-xl font-bold">User Profile</h1>

                <div className="flex items-center gap-3">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={session.user?.image || ""} />
                        <AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                </div>

                <div className="space-y-3">
                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            value={session.user?.email || ""}
                            disabled
                            className="w-full max-w-xl border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Name</label>
                        <input
                            value={session.user?.name || ""}
                            disabled
                            className="w-full max-w-xl border p-2 rounded"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}