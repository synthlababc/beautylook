import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name: username,
                email,
                password: hashedPassword,
                role: "user",
                emailVerified: null, // 可选：如果是邮箱验证系统，则这里为 null
            },
        });

        return NextResponse.json(
            { message: "Registration successful", user },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Registration error:", error);

        // 让客户端直接看到原始错误信息（便于调试）
        return NextResponse.json(
            { error: error.message, code: error.code, meta: error.meta },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}