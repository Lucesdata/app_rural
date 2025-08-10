import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardClient from "./ui";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) return <p>Necesitas iniciar sesión.</p>;

  const plants = await prisma.plant.findMany({
    select: { id: true, name: true, code: true },
    orderBy: { name: "asc" },
  });

  return <DashboardClient plants={plants} />;
}
