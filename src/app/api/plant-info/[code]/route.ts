import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function norm(s: string) { return (s ?? "").toString().trim().toLowerCase(); }

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const file = path.join(process.cwd(), "public", "data", "plants_meta.json");
    const json = JSON.parse(fs.readFileSync(file, "utf8"));
    // Extraer el parámetro code de la URL
    const url = new URL(req.url);
    const code = url.pathname.split("/").pop() ?? "";
    const q = norm(code);

    const item = json.find((p: Record<string, unknown>) => {
      if (typeof p !== 'object' || p === null) return false;
      const code = typeof p['code'] === 'string' ? p['code'] : '';
      const alias = typeof p['alias'] === 'string' ? p['alias'] : '';
      const ptap = typeof p['ptap'] === 'string' ? p['ptap'] : '';
      return norm(code) === q || norm(alias) === q || norm(ptap) === q;
    });

    if (!item) {
      return NextResponse.json({ error: "Plant not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
