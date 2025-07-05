import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
        // 缺少字段，直接抛出错误，让上层捕获
        throw new Error("Missing fields");
    }

    try {
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
        // 不再自己判断邮箱/用户名是否重复，直接抛出原始错误
        console.error("Registration error:", error);

        // 重新抛出错误，让调用者或中间件统一处理
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}