import { PrismaClient } from "@prisma/client";

// Para evitar múltiples instancias en desarrollo (Hot Reload)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error"], // cambia a ["query","error","warn"] si quieres más detalle
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
