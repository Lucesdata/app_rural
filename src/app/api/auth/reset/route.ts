import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();
  if (!token || !password) {
    return NextResponse.json({ message: "Datos incompletos" }, { status: 400 });
  }

  const rec = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!rec || rec.expiresAt < new Date()) {
    return NextResponse.json({ message: "Token inválido o expirado" }, { status: 400 });
  }

  const hashed = await hash(password, 12);

  await prisma.$transaction([
    prisma.user.update({ where: { id: rec.userId }, data: { password: hashed } }),
    prisma.passwordResetToken.delete({ where: { id: rec.id } }),
  ]);

  return new NextResponse(null, { status: 204 });
}
