import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function ControlsIndexPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!session) redirect("/auth/login");
  if (role !== "ADMIN" && role !== "PRESIDENTE") redirect("/");

  const plants = await prisma.plant.findMany({ orderBy: { name: "asc" } });
  return (
    <main style={{ padding: 16 }}>
      <h1>Controls</h1>
      <ul>
        {plants.map((p) => (
          <li key={p.id}>
            {p.name} – <a href={`/controls/${p.id}`}>Abrir controles</a>
          </li>
        ))}
      </ul>
    </main>
  );
}


