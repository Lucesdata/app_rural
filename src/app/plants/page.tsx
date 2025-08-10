import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PlantsGrid from "./ui";

export default async function PlantsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  const plants = await prisma.plant.findMany({ select: { id: true, name: true, code: true }, orderBy: { name: "asc" } });
  return <PlantsGrid plants={plants} />;
}


