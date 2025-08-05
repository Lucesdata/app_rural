"use client";

import { Theme, Container, Card, Heading } from "@radix-ui/themes";
import SigninForm from "@/components/auth/SigninForm";

function LoginPage() {
  return (
    <Theme
      appearance="dark"              // ← activa el modo oscuro
      accentColor="cyan"
      radius="large"
      panelBackground="translucent"  // ← ahora sí se aplica
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
            variant="surface"         // usa el panel translúcido
            size="3"
            style={{ width: "100%", maxWidth: "420px", marginInline: "auto" }}
          >
            <Heading as="h1" size="4" align="center" mb="4">
              Sign&nbsp;in
            </Heading>
            <SigninForm />
          </Card>
        </Container>
      </div>
    </Theme>
  );
}

export default LoginPage;
