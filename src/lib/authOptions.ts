import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    // TS ahora sabrá que strategy es el literal "jwt", no un string cualquiera
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as { id?: string; role?: "USER" | "OPERARIO" | "PRESIDENTE" | "ADMIN" | string };
        token.id = u.id;
        token.role =
          u.role === "USER" || u.role === "OPERARIO" || u.role === "PRESIDENTE" || u.role === "ADMIN"
            ? u.role
            : undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string | undefined;
        const role = token.role;
        session.user.role =
          role === "USER" || role === "OPERARIO" || role === "PRESIDENTE" || role === "ADMIN"
            ? role
            : undefined;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email:    { label: "Email",    type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        if (!creds?.email || !creds.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: creds.email },
        });
        if (!user) return null;
        const isValid = await compare(creds.password, user.password);
        return isValid ? user : null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
