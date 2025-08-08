"use client";

import { Theme, Container, Card, Heading, Flex, TextField, Button, Callout, Link } from "@radix-ui/themes";
import { EnvelopeClosedIcon, EnterIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [resetUrl, setResetUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    const res = await fetch("/api/auth/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setLoading(false);
    setMsg("Si el correo existe, te enviamos un enlace de recuperación.");
    setResetUrl(data.resetUrl);
  };

  return (
    <Theme appearance="dark" accentColor="cyan" radius="large" panelBackground="translucent">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100dvh",
        background:"linear-gradient(135deg, var(--cyan-3) 0%, var(--cyan-4) 100%)" }}>
        <Container size="2" px="4" style={{ width:"100%" }}>
          <Card variant="surface" size="3" style={{ width:"100%", maxWidth:"420px", marginInline:"auto" }}>
            <Heading as="h1" size="4" align="center" mb="4">Recuperar contraseña</Heading>
            <form onSubmit={submit}>
              <Flex direction="column" gap="4">
                <TextField.Root type="email" placeholder="Tu correo" value={email} onChange={(e)=>setEmail(e.target.value)} required>
                  <TextField.Slot><EnvelopeClosedIcon height="16" width="16" /></TextField.Slot>
                </TextField.Root>
                {msg && <Callout.Root><Callout.Text>{msg}</Callout.Text></Callout.Root>}
                {resetUrl && (
                  <Callout.Root color="green">
                    <Callout.Text>DEV: enlace de reseteo</Callout.Text>
                    <Link href={resetUrl}>{resetUrl}</Link>
                  </Callout.Root>
                )}
                <Button type="submit" disabled={loading}><EnterIcon /> {loading ? "Enviando…" : "Enviar enlace"}</Button>
                <Link href="/auth/login" size="2" style={{ marginTop: 8 }}>Volver al login</Link>
              </Flex>
            </form>
          </Card>
        </Container>
      </div>
    </Theme>
  );
}
