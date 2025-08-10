"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";

type Plant = { id: string; name: string; code: string };

export default function PlantsGrid({ plants }: { plants: Plant[] }) {
  const router = useRouter();
  const [selectedPlantMeta, setSelectedPlantMeta] = useState<Record<string, unknown> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const viewMeta = async (code: string) => {
    setLoading(true);
    setIsModalOpen(true);
    setSelectedPlantMeta(null);
    const res = await fetch(`/api/plant-info/${encodeURIComponent(code)}`);
    if (res.ok) {
      const data = await res.json();
      setSelectedPlantMeta(data);
    } else {
      setSelectedPlantMeta({ error: "No se encontró la planta" });
    }
    setLoading(false);
  };

  return (
    <main style={{ padding: 16 }}>
      <h1>Plants</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {plants.map((p) => (
          <article key={p.id} style={{ border: "1px solid var(--gray-a6)", borderRadius: 8, padding: 12 }}>
            <h3 style={{ margin: 0 }}>{p.name}</h3>
            <p style={{ color: "var(--gray-11)", marginTop: 4 }}>Code: {p.code}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button onClick={() => viewMeta(p.code)}>Ver ficha</button>
              <button onClick={() => router.push(`/controls/${p.id}`)}>Controles</button>
              <button onClick={() => router.push(`/readings?plantId=${p.id}`)}>Lecturas</button>
            </div>
          </article>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {loading && <p>Cargando ficha…</p>}
        {!loading && selectedPlantMeta && (
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{JSON.stringify(selectedPlantMeta, null, 2)}</pre>
        )}
      </Modal>
    </main>
  );
}


