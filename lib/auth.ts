import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.password) {
                    throw new Error("No user found with this email");
                }

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordCorrect) {
                    throw new Error("Incorrect password");
                }

                return user;
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/signin" // 添加错误页面重定向
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account }) {
            // 如果是Google登录，检查是否已有相同邮箱的账户
            if (account?.provider === "google") {
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email as string },
                });

                // 如果已有账户但未关联Google账户
                if (existingUser && !existingUser.emailVerified) {
                    // 更新现有账户，添加Google账户信息
                    await prisma.user.update({
                        where: { id: existingUser.id },
                        data: {
                            emailVerified: new Date(),
                            accounts: {
                                create: {
                                    provider: account.provider,
                                    providerAccountId: account.providerAccountId,
                                    type: account.type,
                                }
                            }
                        }
                    });
                    return true;
                }

                // 允许新用户通过Google登录
                return true;
            }
            return true;
        },
        async jwt({ token, user }) {
            // 初次登录时添加用户信息到token
            if (user) {
                token.id = user.id;
                token.role = user.role ?? undefined;
            }
            return token;
        },
        async session({ session, token }) {
            // 添加额外信息到session
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        }
    }
}