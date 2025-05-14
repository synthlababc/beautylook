import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from 'next-auth/providers/github';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      httpOptions: {
        timeout: 5000000 //时时间增加到 10 秒
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // 启用调试模式，以便查看详细的错误信息
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        // 扩展 session.user 类型以包含 id 属性
        if (token.sub) {
            session.user = {
              ...session.user,
              id: token.sub,
            };
          }
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        console.log('OAuth账户信息:', {
          provider: account.provider,
          type: account.type,
          access_token: account.access_token?.slice(0, 10),
          id: user.id
        });
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    },
    async signIn({ account }) {
      console.log('OAuth请求目标URL:', account?.authorization_url);
      return true;
    }
  },
});
export { handler as GET, handler as POST };
