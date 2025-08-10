import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

type Role = "USER" | "OPERARIO" | "PRESIDENTE";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role, code } = body as {
      name?: string;
      email?: string;
      password?: string;
      role?: Role;
      code?: string;
    };

    if (!email || !password || !role) {
      return NextResponse.json({ message: "Faltan campos obligatorios" }, { status: 400 });
    }

    if (!["USER", "OPERARIO", "PRESIDENTE"].includes(role)) {
      return NextResponse.json({ message: "Rol inválido" }, { status: 400 });
    }

    if (role === "PRESIDENTE") {
      const secret = process.env.REGISTER_PRESIDENTE_CODE;
      if (!secret || code !== secret) {
        return NextResponse.json({ message: "Código de PRESIDENTE incorrecto" }, { status: 403 });
      }
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ message: "El email ya está registrado" }, { status: 409 });
    }

    const passwordHash = await hash(password, 10);
    const user = await prisma.user.create({
      data: { name: name ?? null, email, password: passwordHash, role },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    return NextResponse.json({ ok: true, user }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}


