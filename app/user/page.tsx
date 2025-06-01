'use client'
import { useSession } from "next-auth/react";
import Image from 'next/image';

export default function UserPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>You are not logged in</div>;

  const defaultImageSrc = '/images/default-avatar.png'; // 请根据实际情况调整

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Info</h1>
      <p><strong>Name:</strong> {session.user?.name}</p>
      <p><strong>Email:</strong> {session.user?.email}</p>
      <img src={session.user?.image || ''} alt="Profile" className="w-20 h-20 rounded-full mt-2" />
      <Image
        src={session.user?.image || defaultImageSrc}
        alt="Profile"
        width={80} // 设置合适的宽度
        height={80} // 设置合适的高度，对于圆形头像，确保宽高一致以避免变形
        className="rounded-full mt-2"
      />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
