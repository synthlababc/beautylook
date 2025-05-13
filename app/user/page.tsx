// src/app/user/page.tsx
import { auth } from '@/auth';

export default async function UserPage() {

  // 从session中获取登录信息
  const session = await auth();

  return (
    <div>
      {session?.user ? (
        <p>{JSON.stringify(session.user)}</p>
      ) : (
        <p>未登录</p>
      )}
    </div>
  )
}
