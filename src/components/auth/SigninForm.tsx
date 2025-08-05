"use client";

import { Flex, TextField, Button, Link } from "@radix-ui/themes";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  EnterIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

function SigninForm() {
  return (
    <form>
      <Flex direction="column" gap="4">
        {/* ─── Email ─────────────────────────────────────── */}
        <TextField.Root placeholder="Correo electrónico" type="email" required>
          <TextField.Slot>
            <EnvelopeClosedIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        {/* ─── Password + enlace “Olvidaste…” ────────────── */}
        <Flex align="center" justify="between">
          <label htmlFor="password">Contraseña</label>
          <Link href="/auth/forgot" size="2">
            ¿Olvidaste tu contraseña?
          </Link>
        </Flex>
        <TextField.Root
          id="password"
          placeholder="Contraseña"
          type="password"
          required
        >
          <TextField.Slot>
            <LockClosedIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        {/* ─── Botones ───────────────────────────────────── */}
        <Flex gap="3" mt="2">
  <Button
    type="submit"
    style={{ flexGrow: 1 }}        // ⬅️ ocupa todo el ancho disponible
  >
    <EnterIcon />
    Entrar
  </Button>

  {/* botón secundario para registro */}
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

