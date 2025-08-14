import React from "react";
import styles from "./home.module.css";

// TODO: importar componentes cuando estén listos
// import HeroMock from "@/components/HeroMock";
// import PlantHomeCard from "@/components/PlantHomeCard";
// import StatsOverview from "@/components/StatsOverview";

import HeroMock from "@/components/HeroMock";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.root}>

      {/* Hero dos columnas */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <h1 className={styles.heroTitle}>
              Monitorea PTAPs rurales.<br />Visualiza. Decide.
            </h1>
            <p className={styles.heroDesc}>
              Plataforma para monitoreo y visualización de plantas de tratamiento rurales.<br />
              Toma decisiones informadas y anticipa problemas.
            </p>
            <div className={styles.heroActions}>
              <Link href="/plants" className={styles.primaryBtn}>Ver plantas</Link>
              <a href="#objetivos" className={styles.secondaryBtn}>Objetivos</a>
            </div>
          </div>
          <div className={styles.heroRight}>
            <HeroMock />
          </div>
        </div>
      </section>


      {/* Fila de partners/chips */}
      <section className={styles.partners} aria-label="Tipos y stats">
        <ul className={styles.chipList} role="list">
          <li className={styles.chip} aria-label="Bocatoma">
            <span className={styles.chipIcon}>💧</span> Bocatoma
          </li>
          <li className={styles.chip} aria-label="Pozo profundo">
            <span className={styles.chipIcon}>🛢️</span> Pozo profundo
          </li>
          <li className={styles.chip} aria-label="10 PTAPs">
            <span className={styles.chipIcon}>🏭</span> 10 PTAPs
          </li>
          <li className={styles.chip} aria-label="996 usuarios">
            <span className={styles.chipIcon}>👥</span> 996 usuarios
          </li>
        </ul>
      </section>

      {/* Bloque de beneficios (3 tarjetas) */}
      <section className={styles.benefits} aria-label="Beneficios">
        <div className={styles.benefitCard}>
          <span className={styles.benefitIcon}>⏱️</span>
          <h3 className={styles.benefitTitle}>Monitoreo en tiempo real <span className={styles.soon}>(pronto)</span></h3>
          <p className={styles.benefitDesc}>Visualiza datos de sensores y estado de plantas en un solo lugar.</p>
        </div>
        <div className={styles.benefitCard}>
          <span className={styles.benefitIcon}>⚡</span>
          <h3 className={styles.benefitTitle}>Alertas tempranas</h3>
          <p className={styles.benefitDesc}>Recibe notificaciones ante eventos críticos o valores fuera de rango.</p>
        </div>
        <div className={styles.benefitCard}>
          <span className={styles.benefitIcon}>📊</span>
          <h3 className={styles.benefitTitle}>Reportes y trazabilidad</h3>
          <p className={styles.benefitDesc}>Genera reportes y consulta el historial de lecturas y eventos.</p>
        </div>
      </section>

      {/* Barra de KPIs */}
      <section className={styles.kpis} aria-label="KPIs">
        {/* TODO: conectar a /api/stats o usar JSON local */}
        <div className={styles.kpiBar}>
          <div className={styles.kpi}><span className={styles.kpiValue}>10</span><span className={styles.kpiLabel}>Plantas</span></div>
          <div className={styles.kpi}><span className={styles.kpiValue}>996</span><span className={styles.kpiLabel}>Usuarios</span></div>
          <div className={styles.kpi}><span className={styles.kpiValue}>42</span><span className={styles.kpiLabel}>Sensores</span></div>
          <div className={styles.kpi}><span className={styles.kpiValue}>39</span><span className={styles.kpiLabel}>Sensores activos</span></div>
          <div className={styles.kpi}><span className={styles.kpiValue}>99.98%</span><span className={styles.kpiLabel}>Uptime</span></div>
        </div>
      </section>

      {/* ¿Por qué usar app-rural? */}
      <section className={styles.why} aria-label="¿Por qué usar app-rural?">
        <div className={styles.whyCard}>
          <h3 className={styles.whyTitle}>Gestión centralizada</h3>
          <p className={styles.whyDesc}>Administra múltiples plantas y usuarios desde un solo panel, con acceso seguro y trazabilidad.</p>
          <div className={styles.whyGraph} aria-hidden="true">📈</div>
        </div>
        <div className={styles.whyCard}>
          <h3 className={styles.whyTitle}>Decisiones informadas</h3>
          <p className={styles.whyDesc}>Visualiza tendencias y recibe alertas para anticipar problemas y optimizar recursos.</p>
          <div className={styles.whyGraph} aria-hidden="true">📊</div>
        </div>
        <div className={styles.whyCard}>
          <h3 className={styles.whyTitle}>Soporte y escalabilidad</h3>
          <p className={styles.whyDesc}>Plataforma lista para crecer y adaptarse a nuevas necesidades y tecnologías.</p>
          <div className={styles.whyGraph} aria-hidden="true">📉</div>
        </div>
      </section>

      {/* Banda oscura con pasos */}
      <section className={styles.stepsBand} aria-label="Cómo funciona">
        <div className={styles.stepsWrap}>
          <div className={styles.stepCard}>
            <span className={styles.stepNum}>1</span>
            <h4 className={styles.stepTitle}>Instala sensores</h4>
            <p className={styles.stepDesc}>Coloca sensores en puntos clave de la planta para captar datos relevantes.</p>
          </div>
          <div className={styles.stepCard}>
            <span className={styles.stepNum}>2</span>
            <h4 className={styles.stepTitle}>Transmisión segura</h4>
            <p className={styles.stepDesc}>Los datos se envían de forma segura a la plataforma en la nube.</p>
          </div>
          <div className={styles.stepCard}>
            <span className={styles.stepNum}>3</span>
            <h4 className={styles.stepTitle}>Visualiza y actúa</h4>
            <p className={styles.stepDesc}>Consulta lecturas, recibe alertas y toma decisiones informadas.</p>
          </div>
        </div>
      </section>

      {/* Cards de módulos */}
      <section className={styles.modules} aria-label="Módulos">
        <div className={styles.moduleCard}>
          <span className={styles.moduleIcon}>👷‍♂️</span>
          <h3 className={styles.moduleTitle}>Operario</h3>
          <p className={styles.moduleDesc}>Registro de lecturas, control de válvulas y visualización de alertas.</p>
          <a href="/auth/login" className={styles.primaryBtn}>Entrar</a>
        </div>
        <div className={styles.moduleCard}>
          <span className={styles.moduleIcon}>📑</span>
          <h3 className={styles.moduleTitle}>Administración/Reportes</h3>
          <p className={styles.moduleDesc}>Gestión de usuarios, reportes y trazabilidad de eventos.</p>
          <a href="#" className={styles.secondaryBtn}>Ver demo</a>
        </div>
      </section>

      {/* CTA final banda oscura */}
      <section className={styles.ctaBand} aria-label="CTA final">
        <h2 className={styles.ctaTitle}>¿Listo para nivelar tus plantas?</h2>
        <div className={styles.ctaActions}>
          <a href="/auth/login" className={styles.primaryBtn}>Comenzar</a>
          <a href="/plants" className={styles.secondaryBtn}>Explorar</a>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className={styles.footer} role="contentinfo">
        <div className={styles.footerInner}>
          <span className={styles.logoMark}>🌱</span> app-rural &middot; <a href="mailto:info@app-rural.com">info@app-rural.com</a>
          <span className={styles.footerLinks}>
            <a href="#acerca">Acerca</a> · <a href="#contacto">Contacto</a>
          </span>
          <span className={styles.footerSocial}>
            <a href="https://twitter.com/" aria-label="Twitter" target="_blank" rel="noopener">🐦</a>
            <a href="https://facebook.com/" aria-label="Facebook" target="_blank" rel="noopener">📘</a>
            <a href="https://wa.me/" aria-label="WhatsApp" target="_blank" rel="noopener">💬</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
