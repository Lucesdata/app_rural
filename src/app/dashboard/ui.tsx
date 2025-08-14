"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Card, Flex, Grid, Heading, Text, Button } from "@radix-ui/themes";
import styles from "./dashboard.module.css";
import PlantCard from "./PlantCard";

type Plant = { id: string; name: string; code: string };
type Meta = {
  ptap: string; nombre: string; vereda: string; corregimiento: string;
  fuente: string; tipoAgua: string; tipoPlanta: string;
  usuarios: number; poblacion: number; caudalDiseno: number; caudalConcesion: number;
  lat: number; lng: number;
};

type Kpi = { value?: number; unit?: string; timestamp?: string } | null | undefined;
function KpiCard({ title, v }: { title: string; v: Kpi }) {
  const value = v?.value?.toFixed ? v.value.toFixed(2) : v?.value ?? "—";
  const unit = v?.unit ?? "";
  const ts = v?.timestamp ? new Date(v.timestamp).toLocaleString() : "";
  return (
    <Card size="3">
      <Flex direction="column" gap="2">
        <Text weight="bold">{title}</Text>
        <Heading size="6">{value} <Text size="2" weight="regular">{unit}</Text></Heading>
        <Text size="2" color="gray">{ts}</Text>
      </Flex>
    </Card>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <Flex direction="column" gap="1">
        <Text color="gray" size="2">{title}</Text>
        <Text>{value}</Text>
      </Flex>
    </Card>
  );
}

export default function DashboardClient({ plants }: { plants: Plant[] }) {
  const [plantId, setPlantId] = useState<string>(plants[0]?.id ?? "");
  const current = useMemo(()=> plants.find(p=>p.id===plantId) ?? plants[0], [plants, plantId]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [kpis, setKpis] = useState<Record<string, Kpi>>({});
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!current) return;
    setLoading(true);
    try {
      // 1) Ficha técnica (por code/alias)
      const metaRes = await fetch(`/api/plant-info/${encodeURIComponent(current.code)}`);
      setMeta(metaRes.ok ? await metaRes.json() : null);

      // 2) KPIs (últimos)
      const kinds = "flow_in,flow_out,level,pressure,cl_residual,turbidity,do";
      const kpiRes = await fetch(`/api/readings/latest?plantId=${current.id}&kinds=${kinds}`);
      const kpiJson = await kpiRes.json();
      setKpis(kpiRes.ok ? kpiJson.data : {});
    } finally {
      setLoading(false);
    }
  }, [current]);

  useEffect(()=>{ load(); /* primera carga */ }, [load]);
  useEffect(()=>{ load(); /* cada vez que cambie la planta */ }, [plantId, load]);

  return (
    <div className={styles.wrap}>
      <Card size="4" className={styles.headerCard}>
        <Flex align="center" justify="between" wrap="wrap" gap="3">
          <Heading size="6">Dashboard</Heading>
          <div className={styles.selector}>
            <label htmlFor="plant">Planta</label>
            <select id="plant" value={plantId} onChange={(e)=>setPlantId(e.target.value)}>
              {plants.map((p: Plant) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <Button onClick={load} variant="soft" disabled={loading}>
            {loading ? "Actualizando…" : "Actualizar"}
          </Button>
        </Flex>
      </Card>

      {/* Tarjetas de plantas */}
      <section className={styles.cards}>
        <Heading size="4" mb="2">Plantas</Heading>
        <div className={styles.cardsInner}>
          {plants.map((p: Plant) => (
            <div key={p.id} onClick={() => setPlantId(p.id)} style={{ cursor: "pointer" }}>
              <PlantCard plant={p} />
            </div>
          ))}
        </div>
      </section>

      <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="3">
        <KpiCard title="Caudal entrada" v={kpis?.flow_in} />
        <KpiCard title="Caudal salida" v={kpis?.flow_out} />
        <KpiCard title="Nivel tanque" v={kpis?.level} />
        <KpiCard title="Presión" v={kpis?.pressure} />
        <KpiCard title="Cloro residual" v={kpis?.cl_residual} />
        <KpiCard title="Turbidez" v={kpis?.turbidity} />
        <KpiCard title="Oxígeno disuelto" v={kpis?.do} />
      </Grid>

      <Card size="4" className={styles.metaCard}>
        <Heading size="4" mb="2">Ficha técnica</Heading>
        {!meta && <Text>Cargando o sin datos…</Text>}
        {meta && (
          <Grid columns={{ initial: "1", md: "2" }} gap="3">
            <Info title="PTAP" value={`${meta.ptap} — ${meta.nombre}`} />
            <Info title="Ubicación" value={`Vereda ${meta.vereda}, ${meta.corregimiento}`} />
            <Info title="Fuente / Tipo de agua" value={`${meta.fuente} / ${meta.tipoAgua}`} />
            <Info title="Tipo de planta" value={meta.tipoPlanta} />
            <Info title="Caudales (L/s)" value={`Diseño ${meta.caudalDiseno} / Concesión ${meta.caudalConcesion}`} />
            <Info title="Usuarios / Población" value={`${meta.usuarios} / ${meta.poblacion}`} />
            <Info title="Coordenadas" value={`${meta.lat}, ${meta.lng}`} />
          </Grid>
        )}
      </Card>
    </div>
  );
}
