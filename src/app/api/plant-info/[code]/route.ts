import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function norm(s: string) { return (s ?? "").toString().trim().toLowerCase(); }

export async function GET(_: Request, { params }: { params: { code: string } }) {
  try {
    const file = path.join(process.cwd(), "public", "data", "plants_meta.json");
    const json = JSON.parse(fs.readFileSync(file, "utf8"));
    const q = norm(params.code);

    const item = json.find((p: any) =>
      norm(p.code) === q || norm(p.alias) === q || norm(p.ptap) === q
    );

    if (!item) {
      return NextResponse.json({ error: "Plant not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Error" }, { status: 500 });
  }
}
