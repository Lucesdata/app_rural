"use client";
import { useState } from "react";

type Plant = { id: string; name: string; code: string };

export default function DashboardClient({ plants }: { plants: Plant[] }) {
  const [plantId, setPlantId] = useState<string>(plants[0]?.id ?? "");

  return (
    <div className="grid" style={{ maxWidth: 960 }}>
      <h1>Dashboard</h1>

      <div className="card" style={{ display:"flex", gap:12, alignItems:"center" }}>
        <label htmlFor="plant">Planta</label>
        <select
          id="plant"
          name="plantId"
          value={plantId}
          onChange={(e) => setPlantId(e.target.value)}
          style={{ padding:8, border:"1px solid #e5e7eb", borderRadius:8 }}
        >
          {plants.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      <div className="grid">
        <div className="card">Aquí irán KPIs (Qin, Qout, Nivel, Presión, Cloro, Turbidez, OD) para la planta seleccionada: <b>{plantId}</b>.</div>
        <div className="card">Luego conectamos estos KPIs a <code>/api/readings</code> con filtros.</div>
      </div>
    </div>
  );
}
