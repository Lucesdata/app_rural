export const runtime = "nodejs";

import { getPlants } from "@/lib/homeData";
import PlantHomeCard from "@/components/PlantHomeCard";
import styles from "./home.module.css";

export default async function Home() {
  const plants = await getPlants();

  const grupos = plants.reduce<Record<string, typeof plants>>((acc, p) => {
    const key = p.fuente || "Sin fuente";
    (acc[key] ||= []).push(p);
    return acc;
  }, {});

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>Plataforma de Monitoreo de PTAPs</h1>
          <p className={styles.heroDesc}>
            Vista representativa del proyecto mientras llegan datos reales.
          </p>
        </div>
      </section>

      <section className={styles.nature}>
        <h2>Naturaleza del proyecto</h2>
        <p>
          Monitoreo y visualización de caudal, presión y nivel; soporte a la operación
          y base para alertas y reportes. La UI ya está lista para integrar datos reales.
        </p>
      </section>

      <section className={styles.plantsSection}>
        <h2>Plantas agrupadas por tipo de fuente</h2>
        {Object.entries(grupos).map(([fuente, lista]) => (
          <div key={fuente} className={styles.group}>
            <h3 className={styles.groupTitle}>{fuente}</h3>
            <div className={styles.grid} role="list">
              {lista.map((plant) => (
                <PlantHomeCard key={plant.id} plant={plant} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
