"use client";
import { useState } from "react";
export default function HomeClient() {
  const [plantId, setPlantId] = useState("");
  return (
    <div className="grid" style={{ maxWidth: 900 }}>
      <h1>Home</h1>
      <div className="card">
        <p>Bienvenido a <b>app_rural</b>.</p>
        <label htmlFor="plantId">Planta (opcional)</label>
        <select id="plantId" name="plantId" value={plantId} onChange={(e)=>setPlantId(e.target.value)}
          style={{padding:8,border:"1px solid #e5e7eb",borderRadius:8}}>
          <option value="">Selecciona...</option>
          
        </select>
      </div>
    </div>
  );
}
