import React from "react";
import styles from "./HeroMock.module.css";

export default function HeroMock() {
  // Card stack ilustrativa (no datos reales)
  return (
    <div className={styles.stack} aria-hidden="true">
      <div className={styles.card} />
      <div className={styles.card} />
      <div className={styles.card} />
    </div>
  );
}
