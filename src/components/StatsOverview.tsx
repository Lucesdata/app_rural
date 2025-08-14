import React from "react";
import styles from "./StatsOverview.module.css";

// TODO: conectar a /api/stats o usar JSON local
const stats = [
  { label: "Plantas", value: 10 },
  { label: "Usuarios", value: 996 },
  { label: "Sensores", value: 42 },
  { label: "Sensores activos", value: 39 },
  { label: "Uptime (%)", value: 99.98 },
];

export default function StatsOverview() {
  return (
    <div className={styles.root}>
      {stats.map((kpi) => (
        <div className={styles.kpi} key={kpi.label}>
          <span className={styles.value}>{kpi.value}</span>
          <span className={styles.label}>{kpi.label}</span>
        </div>
      ))}
    </div>
  );
}
