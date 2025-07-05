import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import {
    NextRequest,
    NextResponse,
} from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
        return NextResponse.json(
            { error: "Missing fields" },
            { status: 400 }
        );
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        // 如果用户已存在，且没有密码 => 被 Google 注册过
        if (existingUser && !existingUser.password) {
            return NextResponse.json(
                {
                    error:
                        "This email was registered with Google. Please use Google login.",
                },
                { status: 400 }
            );
        }

        // 如果用户已存在，且有密码 => 已经通过密码注册过了
        if (existingUser && existingUser.password) {
            return NextResponse.json(
                {
                    error:
                        "This email is already registered with a password. Please use email/password login.",
                },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name: username,
                email,
                password: hashedPassword,
                role: "user",
                emailVerified: null,
            },
        });

        return NextResponse.json(
            { message: "Registration successful", user },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                const field = Array.isArray(error.meta?.target)
                    ? error.meta.target[0]
                    : "field";

                return NextResponse.json(
                    { error: `${field} 已被注册` },
                    { status: 400 }
                );
            }

            return NextResponse.json(
                { error: "Database error occurred" },
                { status: 500 }
            );
        }

        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: "Unknown registration error" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}