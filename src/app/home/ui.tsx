"use client";
import { useEffect, useState } from "react";
import styles from "../home.module.css";

// Simulación de fetch de KPIs y plantas (reemplazar por hooks/data reales si existen)
const fakeKpis = [
  { label: "Plantas", value: 10 },
  { label: "Usuarios", value: 996 },
  { label: "Sensores", value: 42 },
  { label: "Uptime", value: "99.9%" },
];
const fakePlants = [
  { id: 1, name: "PTAP El Bosque", location: "Vereda El Bosque" },
  { id: 2, name: "PTAP La Esperanza", location: "Vereda La Esperanza" },
  { id: 3, name: "PTAP San Juan", location: "Vereda San Juan" },
  { id: 4, name: "PTAP El Lago", location: "Vereda El Lago" },
];

export default function HomeUI() {
  // Aquí iría la lógica real de fetch de datos si existiera
  const [kpis, setKpis] = useState(fakeKpis);
  const [plants, setPlants] = useState(fakePlants);

  return (
    <>
      {/* Sección KPIs */}
      <section className={styles.kpiSection} aria-label="KPIs">
        <div className="container section" style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-xl)", justifyContent: "center" }}>
          {kpis.map((kpi) => (
            <div key={kpi.label} className="card" style={{ minWidth: 160, textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700 }}>{kpi.value}</div>
              <div style={{ color: "var(--color-primary-700)", fontWeight: 500 }}>{kpi.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección Plantas Destacadas */}
      <section className={styles.plantSection} aria-label="Plantas destacadas">
        <div className="container section">
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "var(--space-lg)" }}>Plantas destacadas</h2>
          <div className={styles.plantGrid}>
            {plants.map((plant) => (
              <div key={plant.id} className="card" style={{ minHeight: 120 }}>
                <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>{plant.name}</div>
                <div style={{ color: "var(--color-primary-700)", marginTop: 4 }}>{plant.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
