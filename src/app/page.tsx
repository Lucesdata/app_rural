
import Link from "next/link";
import base from "@/styles/ui-base.module.css";
import styles from "./home.module.css";
import HomeUI from "./home/ui";

export const metadata = {
  title: "Monitoreo de Plantas de Agua Potable",
  description: "Plataforma para monitoreo y visualización de plantas de tratamiento rurales. Toma decisiones informadas y anticipa problemas.",
};

export default async function HomePage() {
  return (
    <>
      <header className={styles.hero} aria-labelledby="home-title">
        <div className={styles.overlay} aria-hidden />
        <div className={styles.heroContent}>
          <h1 id="home-title" className={styles.heroTitle}>
            Monitoreo de Plantas de Agua Potable
          </h1>
          <p className={styles.lead}>
            Plataforma para monitoreo y visualización de plantas de tratamiento rurales. Toma decisiones informadas y anticipa problemas.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/plants" className={base.button}>Ver plantas</Link>
            <Link href="/dashboard" className={base.button}>Dashboard</Link>
          </div>
        </div>
      </header>
      <main>
        <HomeUI />
      </main>
    </>
  );
}
