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
