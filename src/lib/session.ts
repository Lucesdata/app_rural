import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
 
import { authOptions } from "./authOptions";

export type AppSession = Session | null;

export async function requireSession() {
  const session = await getServerSession(authOptions);
  if (!session) throw Object.assign(new Error("No autenticado"), { status: 401 });
  return session;
}

export type Role = "USER" | "OPERARIO" | "PRESIDENTE" | "ADMIN";

export function hasRole(session: AppSession, roles: Role[] | Role): boolean {
  const user = session?.user as { role?: Role } | undefined;
  if (!user) return false;
  const required = Array.isArray(roles) ? roles : [roles];
  const userRole: Role | undefined = user.role;
  return !!userRole && required.includes(userRole);
}

export async function requireRole(roles: Role[] | Role) {
  const session = await requireSession();
  if (!hasRole(session, roles)) throw Object.assign(new Error("No autorizado"), { status: 403 });
  return session;
}

export async function getSessionFromRequest() {
  return getServerSession(authOptions);
}


