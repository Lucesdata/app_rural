import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Usuarios base
  const password = await hash("secret123", 10);
  const [admin, operario, usuario] = await Promise.all([
    prisma.user.upsert({
      where: { email: "admin@example.com" },
      update: {},
      create: { name: "Admin", email: "admin@example.com", password, role: Role.ADMIN },
    }),
    prisma.user.upsert({
      where: { email: "operario@example.com" },
      update: {},
      create: { name: "Operario", email: "operario@example.com", password, role: Role.OPERARIO },
    }),
    prisma.user.upsert({
      where: { email: "user@example.com" },
      update: {},
      create: { name: "Usuario", email: "user@example.com", password, role: Role.USER },
    }),
  ]);

  // Planta y elementos relacionados
  const plant = await prisma.plant.upsert({
    where: { code: "PLT-001" },
    update: {},
    create: {
      code: "PLT-001",
      name: "Planta Principal",
      locationLat: -2.1234,
      locationLng: -79.1234,
      users: { connect: [{ id: admin.id }, { id: operario.id }] },
    },
  });

  // Válvulas
  const [vIn, vOut] = await Promise.all([
    prisma.valve.upsert({
      where: { id: "seed-valve-in" },
      update: {},
      create: { id: "seed-valve-in", plantId: plant.id, tag: "V1001", type: "ENTRADA", isOpen: true },
    }),
    prisma.valve.upsert({
      where: { id: "seed-valve-out" },
      update: {},
      create: { id: "seed-valve-out", plantId: plant.id, tag: "V1002", type: "SALIDA", isOpen: false },
    }),
  ]);

  // Lecturas de ejemplo
  const now = Date.now();
  const hours = (n: number) => new Date(now - n * 60 * 60 * 1000);
  await prisma.reading.createMany({
    data: [
      { plantId: plant.id, kind: "FLOW", unit: "L/s", value: 12.3, timestamp: hours(6) },
      { plantId: plant.id, kind: "LEVEL", unit: "m", value: 1.8, timestamp: hours(5) },
      { plantId: plant.id, kind: "PRESSURE", unit: "psi", value: 28.4, timestamp: hours(4) },
      { plantId: plant.id, kind: "TURBIDITY", unit: "NTU", value: 1.2, timestamp: hours(3) },
    ],
  });

  console.log("Seed completado:", { admin: admin.email, operario: operario.email, usuario: usuario.email, plant: plant.code, valves: [vIn.tag, vOut.tag] });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


