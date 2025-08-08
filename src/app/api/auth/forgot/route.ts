import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ message: "Falta email" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });

  // Siempre respondemos 200 para no revelar si existe o no
  if (!user) return NextResponse.json({ ok: true });

  // Elimina tokens previos
  await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1h

  await prisma.passwordResetToken.create({
    data: { token, userId: user.id, expiresAt },
  });

  const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const resetUrl = `${base}/auth/reset/${token}`;

  // En producción enviarías email; en dev lo devolvemos y lo logueamos:
  console.log("Password reset URL:", resetUrl);
  return NextResponse.json({
    ok: true,
    resetUrl: process.env.NODE_ENV === "development" ? resetUrl : undefined,
  });
}
