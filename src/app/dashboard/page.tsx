// src/app/dashboard/page.tsx

import { getServerSession } from "next-auth/next";               // ruta actualizada
import { authOptions } from "@/lib/authOptions";                // traemos la configuración desde lib
import { redirect } from "next/navigation";
import {
  Theme,
  Container,
  Card,
  Heading,
  Text,
} from "@radix-ui/themes";
import SignOutButton from "@/components/SignOutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  return (
    <Theme
      appearance="dark"
      accentColor="cyan"
      radius="large"
      panelBackground="translucent"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100dvh",
          background:
            "linear-gradient(135deg, var(--cyan-3) 0%, var(--cyan-4) 100%)",
        }}
      >
        <Container size="2" px="4" style={{ width: "100%" }}>
          <Card
            variant="surface"
            size="3"
            style={{ width: "100%", maxWidth: "540px", marginInline: "auto" }}
          >
            <Heading as="h1" size="5" align="center" mb="4">
              Panel principal
            </Heading>

            <Text as="p" align="center" size="3" mb="4">
              ¡Hola{" "}
              <strong>{session.user?.name ?? session.user?.email}</strong>!
            </Text>

            <SignOutButton />
          </Card>
        </Container>
      </div>
    </Theme>
  );
}

