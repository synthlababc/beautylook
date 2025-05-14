// 'use client'
// import { useSession } from 'next-auth/react'

// export default function UserPage() {
//   const { data: session } = useSession()

//   if (session) {
//     return (
//       <div>
//         <h2>欢迎, {session.user?.name}!</h2>
//         <p>邮箱: {session.user?.email}</p>
//         <pre>{JSON.stringify(session, null, 2)}</pre>
//       </div>
//     )
//   }

//   return <div>请先登录</div>
// }

// pages/user.tsx
import { useSession } from "next-auth/react";

export default function UserPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>You are not logged in</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Info</h1>
      <p><strong>Name:</strong> {session.user?.name}</p>
      <p><strong>Email:</strong> {session.user?.email}</p>
      <img src={session.user?.image || ''} alt="Profile" className="w-20 h-20 rounded-full mt-2" />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
