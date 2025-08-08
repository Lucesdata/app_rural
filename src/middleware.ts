import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = [
  "/dashboard",     // panel principal
  "/admin",         // ejemplo de ruta futura
  "/parcelas"       // ejemplo de CRUD protegido
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ¿La petición coincide con una ruta protegida?
  const necesitaAuth = protectedRoutes.some((rt) =>
    pathname.startsWith(rt),
  );

  if (!necesitaAuth) {
    // Ruta pública → continuar
    return NextResponse.next();
  }

  // Busca el token JWT de NextAuth
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  });

  if (token) {
    // Usuario autenticado → continuar
    return NextResponse.next();
  }

  // Sin sesión → redirige a /auth/login con callbackUrl
  const loginUrl = new URL("/auth/login", req.url);
  loginUrl.searchParams.set("callbackUrl", req.url);
  return NextResponse.redirect(loginUrl);
}

/**
 * Matcher:
 * - Aplica a TODO excepto /api, _next/static, _next/image, favicon.ico
 * - Así no intercepta assets ni API routes.
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
