// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      image?: string
      role: string // 自定义字段
    }
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // 推荐使用 JWT 策略
    maxAge: 30 * 24 * 60 * 60, // 30天有效期
    updateAge: 24 * 60 * 60 // 24小时后更新session
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // 登录成功时的回调
      console.log("登录成功:", user.email)
      return true // 返回true允许登录
    },
    async redirect({ url, baseUrl }) {
      // 登录后重定向
      console.log("url:", url)
      return `${baseUrl}/faq`
    }
  }
})

export { handler as GET, handler as POST }