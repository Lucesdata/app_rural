"use client";

import { Theme, Container, Card, Heading } from "@radix-ui/themes";
import RegisterForm from "@/components/auth/RegisterForm"; // crea este componente

function RegisterPage() {
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
            style={{ width: "100%", maxWidth: "420px", marginInline: "auto" }}
          >
            <Heading as="h1" size="4" align="center" mb="4">
              Sign&nbsp;up
            </Heading>
            <RegisterForm />
          </Card>
        </Container>
      </div>
    </Theme>
  );
}

export default RegisterPage;
