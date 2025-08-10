import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/session";

// Modo simulador: no se toca hardware; solo cambia estado en DB y registra acción

export async function POST(_req: Request) {
  try {
    const session = await requireRole(["OPERARIO", "ADMIN"]);
    const { pathname } = new URL(_req.url);
    const match = pathname.match(/\/api\/valves\/([^/]+)\/control/);
    const valveId = match?.[1];
    const { action, reason } = await _req.json(); // action: "OPEN" | "CLOSE"

    if (!valveId || (action !== "OPEN" && action !== "CLOSE")) {
      return NextResponse.json({ message: "Parámetros inválidos" }, { status: 400 });
    }

    const valve = await prisma.valve.findUnique({ where: { id: valveId } });
    if (!valve) return NextResponse.json({ message: "Válvula no encontrada" }, { status: 404 });

    const isOpen = action === "OPEN";
    await prisma.valve.update({ where: { id: valveId }, data: { isOpen } });

    const userId = (session.user as { id?: string } | undefined)?.id;
    if (!userId) {
      return NextResponse.json({ message: "Sesión inválida" }, { status: 401 });
    }

    await prisma.controlAction.create({
      data: {
        valveId,
        plantId: valve.plantId,
        userId,
        action,
        reason,
        result: "OK",
      },
    });

    return NextResponse.json({ ok: true, valveId, isOpen });
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string } | undefined;
    const status = error?.status ?? 500;
    const message = error?.message ?? "Error interno";
    return NextResponse.json({ message }, { status });
  }
}


