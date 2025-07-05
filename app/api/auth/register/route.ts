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
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name: username,
                email,
                password: hashedPassword,
                role: "user",
                emailVerified: null, // 如果你有邮箱验证系统，可设为 null
            },
        });

        return NextResponse.json(
            { message: "Registration successful", user },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);

        // 处理 Prisma 唯一性约束错误（如邮箱重复）
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                const target = Array.isArray(error.meta?.target)
                    ? error.meta.target[0]
                    : "field";

                return NextResponse.json(
                    {
                        error: `${target} 已被注册`,
                        code: error.code,
                        meta: error.meta,
                    },
                    { status: 400 }
                );
            }

            return NextResponse.json(
                {
                    error: "Database error occurred",
                    code: error.code,
                    meta: error.meta,
                },
                { status: 500 }
            );
        }

        // 普通 Error 类型
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        // 未知错误
        return NextResponse.json(
            { error: "Unknown registration error" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}