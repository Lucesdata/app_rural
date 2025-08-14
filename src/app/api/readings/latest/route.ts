import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Mapea alias -> kind real por si cambias nombres en el futuro
const KIND_MAP = {
  flow_in: "FLOW_IN",
  flow_out: "FLOW_OUT",
  level: "TANK_LEVEL",
  pressure: "PRESSURE",
  cl_residual: "CL_RESIDUAL",
  turbidity: "TURBIDITY",
  do: "DO",
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const plantId = searchParams.get("plantId");
    const kindsParam = searchParams.get("kinds");
    if (!plantId) {
      return NextResponse.json({ error: "plantId requerido" }, { status: 400 });
    }
    const kinds = (kindsParam ?? "flow_in,flow_out,level,pressure,cl_residual,turbidity,do")
      .split(",")
      .map(k => k.trim())
      .filter(Boolean);

    // Para cada kind pedimos el último registro

    type KpiRow = {
      id: string;
      kind: string;
      value: number;
      unit: string;
      timestamp: string;
    };
    type KpiResult = {
      alias: string;
      kind: string;
      row: KpiRow | null;
    };

    const results: KpiResult[] = await Promise.all(
      kinds.map(async (alias) => {
        const kind = KIND_MAP[alias as keyof typeof KIND_MAP] ?? alias.toUpperCase();
        const row = await prisma.reading.findFirst({
          where: { plantId, kind },
          orderBy: { timestamp: "desc" },
        });
        return {
          alias,
          kind,
          row: row
            ? {
                id: row.id,
                kind: row.kind,
                value: row.value,
                unit: row.unit,
                timestamp: typeof row.timestamp === "string" ? row.timestamp : row.timestamp.toISOString(),
              }
            : null,
        };
      })
    );

    const data = results.reduce<Record<string, KpiRow | null>>((acc, r) => {
      acc[r.alias] = r.row;
      return acc;
    }, {});

    return NextResponse.json({ ok: true, data });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message || "Error" }, { status: 500 });
  }
}
