import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function ReadingsPage({ searchParams }: { searchParams?: Promise<{ plantId?: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  const plants = await prisma.plant.findMany({ orderBy: { name: "asc" } });
  const sp = (await searchParams) ?? {};
  const plantId = sp.plantId ?? plants[0]?.id;

  const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/readings?plantId=${plantId ?? ""}`, { cache: "no-store" });
  const data = await res.json();

  return (
    <main style={{ padding: 16 }}>
      <h1>Readings</h1>
      <form>
        <label>
          Plant:
          <select name="plantId" defaultValue={plantId ?? ""} onChange={(e) => location.assign(`/readings?plantId=${e.currentTarget.value}`)}>
            {plants.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </label>
      </form>
      <pre style={{ marginTop: 16 }}>{JSON.stringify(data.items ?? [], null, 2)}</pre>
    </main>
  );
}


