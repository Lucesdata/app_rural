"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function PlantControlsPage() {
  const { data } = useSession();
  const role = data?.user?.role;
  const router = useRouter();
  const params = useParams<{ plantId: string }>();
  const plantId = params?.plantId;
  const [valves, setValves] = useState<{ id: string; tag: string; isOpen: boolean }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data) return;
    if (!data.user) { router.replace("/auth/login"); return; }
    if (role !== "ADMIN" && role !== "PRESIDENTE") { router.replace("/"); return; }
    if (!plantId) return;
    const fetchValves = async () => {
      setLoading(true);
      const res = await fetch(`/api/plants/${plantId}/valves`).catch(() => null);
      if (res && res.ok) {
        const v = await res.json();
        setValves(v.items || []);
      }
      setLoading(false);
    };
    fetchValves();
  }, [data, plantId, role, router]);

  const toggle = async (valveId: string, next: boolean) => {
    const action = next ? "OPEN" : "CLOSE";
    const res = await fetch(`/api/valves/${valveId}/control`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    if (res.ok) {
      setValves((prev) => prev.map(v => v.id === valveId ? { ...v, isOpen: next } : v));
    }
  };

  if (!plantId) return <main style={{ padding: 16 }}><p>Planta inválida.</p></main>;
  if (loading) return <main style={{ padding: 16 }}><p>Cargando…</p></main>;

  return (
    <main style={{ padding: 16 }}>
      <h1>Controles de planta</h1>
      <ul>
        {valves.map(v => (
          <li key={v.id}>
            {v.tag} – Estado: {v.isOpen ? "Abierta" : "Cerrada"}
            <button style={{ marginLeft: 8 }} onClick={() => toggle(v.id, !v.isOpen)}>
              {v.isOpen ? "Cerrar" : "Abrir"}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}


