"use client";

import { useForm, Controller } from "react-hook-form";
import { Flex, TextField, Button, Link } from "@radix-ui/themes";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  EnterIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

type SigninInputs = {
  email: string;
  password: string;
};

function SigninForm() {
  /* ─── React-Hook-Form ───────────────────────────── */
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SigninInputs>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: SigninInputs) => {
    console.log("Datos enviados:", data);
    // TODO: signIn("credentials", data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Flex direction="column" gap="4">
        {/* ─── Email ─────────────────────────────────── */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: "El correo es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Correo no válido",
            },
          }}
          render={({ field }) => (
            <TextField.Root
              placeholder="Correo electrónico"
              type="email"
              {...field}
            >
              <TextField.Slot>
                <EnvelopeClosedIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          )}
        />
        {errors.email && (
          <p style={{ color: "var(--red-10)", fontSize: "0.75rem" }}>
            {errors.email.message}
          </p>
        )}

        {/* ─── Password + enlace “Olvidaste…” ───────── */}
        <Flex align="center" justify="between">
          <label htmlFor="password">Contraseña</label>
          <Link href="/auth/forgot" size="2">
            ¿Olvidaste tu contraseña?
          </Link>
        </Flex>

        <Controller
          name="password"
          control={control}
          rules={{ required: "La contraseña es obligatoria" }}
          render={({ field }) => (
            <TextField.Root
              id="password"
              placeholder="Contraseña"
              type="password"
              {...field}
            >
              <TextField.Slot>
                <LockClosedIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          )}
        />
        {errors.password && (
          <p style={{ color: "var(--red-10)", fontSize: "0.75rem" }}>
            {errors.password.message}
          </p>
        )}

        {/* ─── Botones ──────────────────────────────── */}
        <Flex gap="3" mt="2">
          <Button type="submit" style={{ flexGrow: 1 }}>
            <EnterIcon />
            Entrar
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

export default SigninForm;

