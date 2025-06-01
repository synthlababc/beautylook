// app/api/auth/forgot-password/route.ts
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { randomBytes } from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
    const { email } = await req.json();

    // 查找用户
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return new Response(
            JSON.stringify({ message: "If this email exists, a reset link was sent." }),
            { status: 200 }
        );
    }

    // 生成 Token 和过期时间
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1小时后过期

    // 存入数据库
    await prisma.resetPassword.create({
        data: {
            userId: user.id,
            token,
            expiresAt: expires,
        },
    });

    // 构造重置链接
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Reset Your Password</h2>
            <p>Please click the button below to reset your password:</p>
            <a href="${resetLink}" 
            style="display: inline-block; padding: 12px 24px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 4px;">
            Reset Password
            </a>
            <p style="margin-top: 20px; font-size: 0.9em; color: #888;">
            This link will expire in 1 hour.
            </p>
        </div>
    `;

    // 发送邮件（使用 Resend）
    await resend.emails.send({
        from: process.env.EMAIL_FROM!, // 从环境变量中读取
        to: email,
        subject: "Reset Your Password",
        html: htmlContent,
    });

    return new Response(
        JSON.stringify({ message: "Reset link has been sent to your email." }),
        { status: 200 }
    );
}