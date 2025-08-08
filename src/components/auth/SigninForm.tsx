"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, TextField, Button, Link, Callout, Text } from "@radix-ui/themes";
import { EnvelopeClosedIcon, LockClosedIcon, EnterIcon, PlusCircledIcon } from "@radix-ui/react-icons";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});
type FormData = z.infer<typeof schema>;

export default function SigninForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async ({ email, password }: FormData) => {
    setError(null);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });
    if (res?.ok) router.push(res.url ?? "/dashboard");
    else setError(res?.error || "Correo o contraseña incorrectos");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Flex direction="column" gap="3">
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

        <Flex align="center" justify="between" mt="1">
          <label htmlFor="password">Contraseña</label>
          <Link href="/auth/forgot" size="2">¿Olvidaste tu contraseña?</Link>
        </Flex>

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <>
              <TextField.Root {...field} id="password" placeholder="Contraseña" type="password">
                <TextField.Slot><LockClosedIcon height="16" width="16" /></TextField.Slot>
              </TextField.Root>
              {errors.password && <Text color="red" size="1">{errors.password.message}</Text>}
            </>
          )}
        />

        {error && (
          <Callout.Root color="red" role="status">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}

        <Flex gap="3" mt="2">
          <Button type="submit" disabled={!isValid || isSubmitting} style={{ flexGrow: 1 }}>
            <EnterIcon /> {isSubmitting ? "Ingresando…" : "Entrar"}
          </Button>

          <Button asChild variant="soft" color="cyan">
            <Link href="/auth/register">
              <PlusCircledIcon /> Crear cuenta
            </Link>
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
