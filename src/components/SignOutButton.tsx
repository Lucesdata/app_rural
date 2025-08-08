"use client";

import { Button } from "@radix-ui/themes";
import { ExitIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/auth/login" })}
      style={{ display: "block", margin: "0 auto" }}
    >
      <ExitIcon /> Cerrar sesión
    </Button>
  );
}
