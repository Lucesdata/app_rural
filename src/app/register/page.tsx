"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Theme, Container, Card, Heading, Flex, TextField, Button, Callout, Text, Link } from "@radix-ui/themes";
import { PersonIcon, EnvelopeClosedIcon, LockClosedIcon, EnterIcon } from "@radix-ui/react-icons";

type Role = "USER" | "OPERARIO" | "PRESIDENTE";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("USER");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setOk(false);
    setLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role, code: role === "PRESIDENTE" ? code : undefined }),
    });
    setLoading(false);
    if (res.ok) {
      setOk(true);
      setMsg("Cuenta creada. Redirigiendo al login…");
      setTimeout(() => router.push("/auth/login"), 1200);
    } else {
      const data = await res.json().catch(() => ({}));
      setMsg(data.message || "Error al registrar");
    }
  };

  return (
    <Theme appearance="dark" accentColor="cyan" radius="large" panelBackground="translucent">
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100dvh",
        background:"linear-gradient(135deg, var(--cyan-3) 0%, var(--cyan-4) 100%)" }}>
        <Container size="2" px="4" style={{ width:"100%" }}>
          <Card variant="surface" size="3" style={{ width:"100%", maxWidth:"480px", marginInline:"auto" }}>
            <Heading as="h1" size="4" align="center" mb="4">Crear cuenta</Heading>
            <form onSubmit={onSubmit} noValidate>
              <Flex direction="column" gap="3">
                <TextField.Root placeholder="Nombre (opcional)" value={name} onChange={(e)=>setName(e.target.value)}>
                  <TextField.Slot><PersonIcon height="16" width="16" /></TextField.Slot>
                </TextField.Root>

                <TextField.Root type="email" placeholder="Correo electrónico" value={email} onChange={(e)=>setEmail(e.target.value)} required>
                  <TextField.Slot><EnvelopeClosedIcon height="16" width="16" /></TextField.Slot>
                </TextField.Root>

                <TextField.Root type="password" placeholder="Contraseña" value={password} onChange={(e)=>setPassword(e.target.value)} required>
                  <TextField.Slot><LockClosedIcon height="16" width="16" /></TextField.Slot>
                </TextField.Root>

                <label>
                  <Text as="span" size="2">Rol</Text>
                  <select
                    style={{ display:"block", marginTop: 6, width:"100%", padding: "10px", background:"transparent", border:"1px solid var(--gray-a6)", borderRadius: 8 }}
                    value={role}
                    onChange={(e) => setRole(e.target.value as Role)}
                  >
                    <option value="USER">Usuario</option>
                    <option value="OPERARIO">Operario</option>
                    <option value="PRESIDENTE">Presidente</option>
                  </select>
                </label>

                {role === "PRESIDENTE" && (
                  <TextField.Root placeholder="Código de PRESIDENTE" value={code} onChange={(e)=>setCode(e.target.value)}>
                    <TextField.Slot><EnterIcon height="16" width="16" /></TextField.Slot>
                  </TextField.Root>
                )}

                {msg && (
                  <Callout.Root color={ok ? "green" : "red"}><Callout.Text>{msg}</Callout.Text></Callout.Root>
                )}

                <Button type="submit" disabled={loading}><EnterIcon /> {loading ? "Creando…" : "Crear cuenta"}</Button>
                <Link href="/auth/login" size="2" style={{ marginTop: 8 }}>Ya tengo cuenta</Link>
              </Flex>
            </form>
          </Card>
        </Container>
      </div>
    </Theme>
  );
}


