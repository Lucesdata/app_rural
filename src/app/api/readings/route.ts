import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, requireSession } from "@/lib/session";

// GET: listar lecturas recientes (requiere sesión)
export async function GET(req: NextRequest) {
  try {
    await requireSession();
    const url = new URL(req.url);
    const plantId = url.searchParams.get("plantId") || undefined;
    const take = Math.min(Number(url.searchParams.get("take") || 50), 200);

    const readings = await prisma.reading.findMany({
      where: { plantId },
      orderBy: { timestamp: "desc" },
      take,
    });
    return NextResponse.json({ items: readings });
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string } | undefined;
    const status = error?.status ?? 500;
    const message = error?.message ?? "Error interno";
    return NextResponse.json({ message }, { status });
  }
}

// POST: crear lectura (OPERARIO o ADMIN)
export async function POST(req: NextRequest) {
  try {
    await requireRole(["OPERARIO", "ADMIN"]);
    const body = await req.json();
    const { plantId, kind, unit, value, timestamp } = body;
    if (!plantId || !kind || !unit || typeof value !== "number") {
      return NextResponse.json({ message: "Datos inválidos" }, { status: 400 });
    }
    const created = await prisma.reading.create({
      data: {
        plantId,
        kind,
        unit,
        value,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
      },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string } | undefined;
    const status = error?.status ?? 500;
    const message = error?.message ?? "Error interno";
    return NextResponse.json({ message }, { status });
  }
}


