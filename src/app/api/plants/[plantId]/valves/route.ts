import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export async function GET(req: Request) {
  try {
    await requireSession();
    const { pathname } = new URL(req.url);
    const match = pathname.match(/\/api\/plants\/([^/]+)\/valves/);
    const plantId = match?.[1];
    if (!plantId) return NextResponse.json({ message: "plantId requerido" }, { status: 400 });
    const valves = await prisma.valve.findMany({ where: { plantId }, orderBy: { tag: "asc" } });
    return NextResponse.json({ items: valves });
  } catch {
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}


