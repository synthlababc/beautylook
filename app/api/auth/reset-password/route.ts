// app/api/auth/reset-password/route.ts
import { hash } from "bcrypt";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();

  const resetRecord = await prisma.resetPassword.findFirst({
    where: {
      token,
      expiresAt: { gt: new Date() }, // token 未过期
    },
    include: { user: true },
  });

  if (!resetRecord) {
    return new Response(JSON.stringify({ message: "Invalid or expired token" }), {
      status: 400,
    });
  }

  const hashedPassword = await hash(password, 10);

  await prisma.user.update({
    where: { id: resetRecord.userId },
    data: { password: hashedPassword },
  });

  await prisma.resetPassword.delete({
    where: { id: resetRecord.id },
  });

  return new Response(JSON.stringify({ message: "Password updated successfully" }), {
    status: 200,
  });
}