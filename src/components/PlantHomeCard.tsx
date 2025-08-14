"use client";
import Image from "next/image";
import styles from "./plant-card.module.css";
import { Plant } from "@/types/plants";

export default function PlantHomeCard({ plant }: { plant: Plant }) {
  const icon =
    plant.fuente === "Pozo profundo"
      ? "/images/icon-pozo.svg"
      : plant.fuente === "Bocatoma"
      ? "/images/icon-bocatoma.svg"
      : "/images/icon-default.svg";

  const imgSrc = plant.imagen || "/images/plant-placeholder.jpg";

  return (
    <article className={styles.card} role="listitem">
      <div className={styles.thumb}>
        <Image
          src={imgSrc}
          alt={plant.nombre}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
      </div>
      <div className={styles.body}>
        <header className={styles.header}>
          <h3 className={styles.title}>{plant.nombre}</h3>
          <Image src={icon} alt={String(plant.fuente)} width={20} height={20} />
        </header>
        <p className={styles.meta}>
          {plant.vereda} · {plant.corregimiento}
        </p>
        <p className={styles.badge}>{plant.fuente}</p>
      </div>
    </article>
  );
}
