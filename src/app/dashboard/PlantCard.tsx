"use client";

import { Card, Flex, Text, Button, Badge } from "@radix-ui/themes";
import Link from "next/link";

type Plant = { id: string; name: string; code: string };

export default function PlantCard({ plant }: { plant: Plant }) {
  const initials = plant.name
    .split(" ")
    .map(p => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card size="3">
      <Flex direction="column" gap="3">
        <Flex align="center" justify="between">
          <Text weight="bold" size="4">{plant.name}</Text>
          <Badge variant="soft">{plant.code}</Badge>
        </Flex>

        <Flex align="center" gap="2">
          <div
            aria-hidden
            style={{
              width: 40, height: 40, borderRadius: 12,
              display: "grid", placeItems: "center",
              background: "linear-gradient(180deg,#87CEEB,#00BFFF)",
              color: "white", fontWeight: 700
            }}
            title={plant.name}
          >
            {initials}
          </div>
          <Text color="gray">Planta rural de Cali</Text>
        </Flex>

        <Flex gap="2" wrap="wrap">
          <Button asChild variant="soft">
            <Link href={`/plants`}>Ficha</Link>
          </Button>
          <Button asChild variant="soft">
            <Link href={`/readings?plantId=${plant.id}`}>Lecturas</Link>
          </Button>
          <Button asChild variant="soft">
            <Link href={`/controls/${plant.id}`}>Controles</Link>
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
