import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

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
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                // Check if this is a Google-only account
                if (user && user.emailVerified && !user.password) {
                    throw new Error("This email was registered with Google. Please use Google login.");
                }

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
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    // pages: {
    //     signIn: "/login",
    //     error: "/error",
    // },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email as string },
                });

                // If normal user exists with password, block Google login
                if (existingUser && existingUser.password) {
                    throw new Error("This email is already registered with a password. Please use email/password login.");
                }

                // If user exists but not yet verified (e.g., created via another provider)
                if (existingUser && !existingUser.emailVerified) {
                    await prisma.user.update({
                        where: { id: existingUser.id },
                        data: {
                            emailVerified: new Date(),
                            accounts: {
                                create: {
                                    provider: account.provider,
                                    providerAccountId: account.providerAccountId,
                                    type: account.type,
                                },
                            },
                        },
                    });
                }

                return true;
            }

            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role ?? undefined;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
};
