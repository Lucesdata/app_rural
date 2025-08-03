"use client";

import { Button } from "@radix-ui/themes";
import { BookmarkIcon } from "@radix-ui/react-icons";

export default function LoginPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Login</h1>

      <Button>
        <BookmarkIcon />
        Bookmark
      </Button>
    </main>
  );
}
 