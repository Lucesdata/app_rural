"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, TextField, Button, Link, Callout, Text } from "@radix-ui/themes";
import { PersonIcon, EnvelopeClosedIcon, LockClosedIcon, PlusCircledIcon, EnterIcon } from "@radix-ui/react-icons";

const schema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  confirm: z.string().min(6, "Mínimo 6 caracteres"),
}).refine((v) => v.password === v.confirm, {
  path: ["confirm"],
  message: "Las contraseñas no coinciden",
});
type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { name: "", email: "", password: "", confirm: "" },
  });

  const onSubmit = async ({ name, email, password }: FormData) => {
    setError(null);
    setOk(false);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      setOk(true);
      // opcional: redirigir directo al login
      setTimeout(() => router.push("/auth/login"), 1200);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.message || "Error al crear la cuenta");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Flex direction="column" gap="3">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <>
              <TextField.Root {...field} placeholder="Nombre completo">
                <TextField.Slot><PersonIcon height="16" width="16" /></TextField.Slot>
              </TextField.Root>
              {errors.name && <Text color="red" size="1">{errors.name.message}</Text>}
            </>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <>
              <TextField.Root {...field} placeholder="Correo electrónico" type="email">
                <TextField.Slot><EnvelopeClosedIcon height="16" width="16" /></TextField.Slot>
              </TextField.Root>
              {errors.email && <Text color="red" size="1">{errors.email.message}</Text>}
            </>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <>
              <TextField.Root {...field} placeholder="Contraseña" type="password">
                <TextField.Slot><LockClosedIcon height="16" width="16" /></TextField.Slot>
              </TextField.Root>
              {errors.password && <Text color="red" size="1">{errors.password.message}</Text>}
            </>
          )}
        />

        <Controller
          name="confirm"
          control={control}
          render={({ field }) => (
            <>
              <TextField.Root {...field} placeholder="Confirmar contraseña" type="password">
                <TextField.Slot><LockClosedIcon height="16" width="16" /></TextField.Slot>
              </TextField.Root>
              {errors.confirm && <Text color="red" size="1">{errors.confirm.message}</Text>}
            </>
          )}
        />

        {ok && <Callout.Root color="green"><Callout.Text>Cuenta creada. Redirigiendo…</Callout.Text></Callout.Root>}
        {error && <Callout.Root color="red"><Callout.Text>{error}</Callout.Text></Callout.Root>}

        <Flex gap="3" mt="2">
          <Button type="submit" disabled={!isValid || isSubmitting} style={{ flexGrow: 1 }}>
            <PlusCircledIcon /> {isSubmitting ? "Creando…" : "Crear cuenta"}
          </Button>

          <Button asChild variant="soft" color="cyan">
            <Link href="/auth/login"><EnterIcon /> Ya tengo cuenta</Link>
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
