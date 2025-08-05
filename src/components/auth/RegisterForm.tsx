"use client";

import { useForm, Controller } from "react-hook-form";
import { Flex, TextField, Button, Link } from "@radix-ui/themes";
import {
  PersonIcon,
  EnvelopeClosedIcon,
  LockClosedIcon,
  PlusCircledIcon,
  EnterIcon,
} from "@radix-ui/react-icons";

type RegisterInputs = {
  name: string;
  email: string;
  password: string;
};

function RegisterForm() {
  /* ─── hook principal ─────────────────────────────── */
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterInputs>({
    defaultValues: { name: "", email: "", password: "" },
  });

  /* ─── al enviar mostramos alerta con los datos ───── */
  const onSubmit = (data: RegisterInputs) => {
    alert(JSON.stringify(data, null, 2));   //  ← log temporal
    // luego reemplazar por fetch("/api/...") o signUp()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Flex direction="column" gap="4">
        {/* ─── Nombre ─────────────────────────────────── */}
        <Controller
          name="name"
          control={control}
          rules={{ required: "El nombre es obligatorio" }}
          render={({ field }) => (
            <TextField.Root placeholder="Nombre completo" {...field}>
              <TextField.Slot>
                <PersonIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          )}
        />
        {errors.name && (
          <p style={{ color: "var(--red-8)", fontSize: "0.75rem" }}>
            {errors.name.message}
          </p>
        )}

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
            <TextField.Root placeholder="Correo electrónico" type="email" {...field}>
              <TextField.Slot>
                <EnvelopeClosedIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          )}
        />
        {errors.email && (
          <p style={{ color: "var(--red-8)", fontSize: "0.75rem" }}>
            {errors.email.message}
          </p>
        )}

        {/* ─── Contraseña ─────────────────────────────── */}
        <Controller
          name="password"
          control={control}
          rules={{
            required: "La contraseña es obligatoria",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
          }}
          render={({ field }) => (
            <TextField.Root placeholder="Contraseña" type="password" {...field}>
              <TextField.Slot>
                <LockClosedIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          )}
        />
        {errors.password && (
          <p style={{ color: "var(--red-8)", fontSize: "0.75rem" }}>
            {errors.password.message}
          </p>
        )}

        {/* ─── Botones ───────────────────────────────── */}
        <Flex gap="3" mt="2">
          <Button type="submit" style={{ flexGrow: 1 }}>
            <PlusCircledIcon />
            Crear cuenta
          </Button>

          <Button asChild variant="soft" color="cyan">
            <Link href="/auth/login">
              <EnterIcon />
              Ya tengo cuenta
            </Link>
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}

export default RegisterForm;

