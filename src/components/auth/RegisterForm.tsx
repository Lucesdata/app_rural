"use client";

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Flex, TextField, Button, Link, Callout } from "@radix-ui/themes";
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

export default function RegisterForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterInputs>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: RegisterInputs) => {
    setErrorMsg("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setErrorMsg(
        res.status === 409
          ? "Ese correo ya está registrado"
          : "Error al crear la cuenta"
      );
      return;
    }

    // Iniciamos sesión directamente
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Flex direction="column" gap="4">
        {/* Nombre */}
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
        {errors.name && <p className="error">{errors.name.message}</p>}

        {/* Email */}
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
        {errors.email && <p className="error">{errors.email.message}</p>}

        {/* Contraseña */}
        <Controller
          name="password"
          control={control}
          rules={{
            required: "La contraseña es obligatoria",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
          }}
          render={({ field }) => (
            <TextField.Root
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
          <p className="error">{errors.password.message}</p>
        )}

        {errorMsg && (
          <Callout.Root color="red">
            <Callout.Text>{errorMsg}</Callout.Text>
          </Callout.Root>
        )}

        {/* Botones */}
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
