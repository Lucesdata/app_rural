import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Log temporal para comprobar que llega el cuerpo
    console.log("Body recibido en /api/auth/register:", { name, email, password });

    if (!email || !password)
      return NextResponse.json({ message: "Faltan datos" }, { status: 400 });

    const existe = await prisma.user.findUnique({ where: { email } });
    if (existe)
      return NextResponse.json({ message: "Ya existe" }, { status: 409 });

    await prisma.user.create({
      data: { name, email, password: await hash(password, 12) },
    });

    return new NextResponse(null, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Error servidor" }, { status: 500 });
  }
}
