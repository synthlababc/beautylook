import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
        return Response.json({ message: "Missing fields" }, { status: 400 });
    }

    try {
        // 检查邮箱或用户名是否已存在
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { name: username }],
            },
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return Response.json(
                    { message: "Email already registered" },
                    { status: 400 }
                );
            } else {
                return Response.json(
                    { message: "Username already taken" },
                    { status: 400 }
                );
            }
        }

        // 加密密码
        const hashedPassword = await bcrypt.hash(password, 10);

        // 创建新用户
        await prisma.user.create({
            data: {
                name: username,
                email,
                password: hashedPassword,
                role: "user",
            },
        });

        return Response.json(
            { message: "Registration successful" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return Response.json(
            { message: "Registration failed. Please try again." },
            { status: 500 }
        );
    }
}
