"use client";

import Image from "next/image";
import { Card, Flex, Text, Badge } from "@radix-ui/themes";


type Plant = {
  ptap: string;
  nombre: string;
  vereda: string;
  corregimiento: string;
  fuente: "Bocatoma" | "Pozo profundo" | string;
  alias: string;
};

export default function PlantHomeCard({ plant }: { plant: Plant }) {
  const icon = plant.fuente.toLowerCase().includes("pozo")
    ? "/images/well.svg"
    : "/images/intake-bocatoma.svg";

  return (
    <Card size="3" variant="surface">
      <Flex gap="3" align="center">
        <Image src={icon} alt={plant.fuente} width={48} height={48} />
        <div>
          <Text weight="bold">{plant.ptap}</Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '2px 0 4px' }}>
            <Badge variant="soft">{plant.nombre}</Badge>
            <span style={{ color: '#94a3b8' }}>•</span>
            <Text color="gray" size="2">
              Vereda {plant.vereda}, {plant.corregimiento}
            </Text>
          </div>
          <Text style={{ color: '#0ea5e9' }} size="2">{plant.fuente}</Text>
        </div>
      </Flex>
    </Card>
  );
}
