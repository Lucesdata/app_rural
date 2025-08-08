"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Flex, TextField, Button, Link, Callout } from "@radix-ui/themes";
import { EnvelopeClosedIcon, LockClosedIcon, EnterIcon, PlusCircledIcon } from "@radix-ui/react-icons";

type FormData = { email: string; password: string };

export default function SigninForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, formState: { isSubmitting } } =
    useForm<FormData>({ defaultValues: { email: "", password: "" } });

  const onSubmit = async ({ email, password }: FormData) => {
    setError(null);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,          // para manejar el error sin cambiar de página
      callbackUrl: "/dashboard" // a dónde ir si sale bien
    });

    if (res?.ok) {
      router.push(res.url ?? "/dashboard");
    } else {
      setError(res?.error || "Correo o contraseña incorrectos");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="4">
        {/* Email */}
        <Controller
          name="email"
          control={control}
          rules={{ required: "Ingresa tu email" }}
          render={({ field }) => (
            <TextField.Root {...field} placeholder="Correo electrónico" type="email">
              <TextField.Slot>
                <EnvelopeClosedIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          )}
        />

        {/* Password + enlace */}
        <Flex align="center" justify="between">
          <label htmlFor="password">Contraseña</label>
          <Link href="/auth/forgot" size="2">¿Olvidaste tu contraseña?</Link>
        </Flex>

        <Controller
          name="password"
          control={control}
          rules={{ required: "Ingresa tu contraseña" }}
          render={({ field }) => (
            <TextField.Root {...field} id="password" placeholder="Contraseña" type="password">
              <TextField.Slot>
                <LockClosedIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          )}
        />

        {error && (
          <Callout.Root color="red" role="status">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}

        {/* Botones */}
        <Flex gap="3" mt="2">
          <Button type="submit" disabled={isSubmitting} style={{ flexGrow: 1 }}>
            <EnterIcon />
            {isSubmitting ? "Ingresando…" : "Entrar"}
          </Button>

          <Button asChild variant="soft" color="cyan">
            <Link href="/auth/register">
              <PlusCircledIcon />
              Crear cuenta
            </Link>
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
