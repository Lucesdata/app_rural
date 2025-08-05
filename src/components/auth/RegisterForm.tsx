"use client";

import { Flex, TextField, Button, Link } from "@radix-ui/themes";
import {
  PersonIcon,
  EnvelopeClosedIcon,
  LockClosedIcon,
  PlusCircledIcon,
  EnterIcon,
} from "@radix-ui/react-icons";

function RegisterForm() {
  return (
    <form>
      <Flex direction="column" gap="4">
        {/* Nombre */}
        <TextField.Root placeholder="Nombre completo" required>
          <TextField.Slot>
            <PersonIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        {/* Email */}
        <TextField.Root placeholder="Correo electrónico" type="email" required>
          <TextField.Slot>
            <EnvelopeClosedIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        {/* Contraseña */}
        <TextField.Root placeholder="Contraseña" type="password" required>
          <TextField.Slot>
            <LockClosedIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        {/* Botones */}
        <Flex gap="3" mt="2">
          <Button
            type="submit"
            style={{ flexGrow: 1 }}     /* ocupa todo el ancho */
          >
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
