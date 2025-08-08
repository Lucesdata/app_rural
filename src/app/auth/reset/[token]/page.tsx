"use client";

import { useParams, useRouter } from "next/navigation";
import { Theme, Container, Card, Heading, Flex, TextField, Button, Callout, Link } from "@radix-ui/themes";
import { LockClosedIcon, EnterIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function ResetPage() {
  const params = useParams<{ token: string }>();
  const token = params?.token;
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <Theme appearance="dark" accentColor="cyan" radius="large" panelBackground="translucent">
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100dvh",
          background:"linear-gradient(135deg, var(--cyan-3) 0%, var(--cyan-4) 100%)" }}>
          <Container size="2" px="4" style={{ width:"100%" }}>
            <Card variant="surface" size="3" style={{ width:"100%", maxWidth:"420px", marginInline:"auto" }}>
              <Heading as="h1" size="4" align="center" mb="4">Enlace inválido</Heading>
              <Flex direction="column" gap="3">
                <Callout.Root color="red"><Callout.Text>El enlace de restablecimiento no es válido.</Callout.Text></Callout.Root>
                <Link href="/auth/login" size="2">Volver al login</Link>
              </Flex>
            </Card>
          </Container>
        </div>
      </Theme>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    if (password.length < 6) return setMsg("La contraseña debe tener al menos 6 caracteres.");
    if (password !== confirm) return setMsg("Las contraseñas no coinciden.");
    setLoading(true);
    const res = await fetch("/api/auth/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    setLoading(false);
    if (res.ok) {
      setMsg("Contraseña actualizada. Redirigiendo al login…");
      setTimeout(() => router.push("/auth/login"), 1200);
    } else {
      const data = await res.json().catch(() => ({}));
      setMsg(data.message || "No se pudo actualizar la contraseña.");
    }
  };

  return (
    <Theme appearance="dark" accentColor="cyan" radius="large" panelBackground="translucent">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100dvh",
        background:"linear-gradient(135deg, var(--cyan-3) 0%, var(--cyan-4) 100%)" }}>
        <Container size="2" px="4" style={{ width:"100%" }}>
          <Card variant="surface" size="3" style={{ width:"100%", maxWidth:"420px", marginInline:"auto" }}>
            <Heading as="h1" size="4" align="center" mb="4">Nueva contraseña</Heading>
            <form onSubmit={submit}>
              <Flex direction="column" gap="4">
                <TextField.Root type="password" placeholder="Nueva contraseña" value={password} onChange={(e)=>setPassword(e.target.value)} required>
                  <TextField.Slot><LockClosedIcon height="16" width="16" /></TextField.Slot>
                </TextField.Root>
                <TextField.Root type="password" placeholder="Confirmar contraseña" value={confirm} onChange={(e)=>setConfirm(e.target.value)} required>
                  <TextField.Slot><LockClosedIcon height="16" width="16" /></TextField.Slot>
                </TextField.Root>
                {msg && <Callout.Root color="cyan"><Callout.Text>{msg}</Callout.Text></Callout.Root>}
                <Button type="submit" disabled={loading}><EnterIcon /> {loading ? "Actualizando…" : "Guardar"}</Button>
                <Link href="/auth/login" size="2" style={{ marginTop: 8 }}>Volver al login</Link>
              </Flex>
            </form>
          </Card>
        </Container>
      </div>
    </Theme>
  );
}
