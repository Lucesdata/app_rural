
"use client";
import { useEffect, useState } from "react";

type Reading = { id:string; kind:string; unit:string; value:number; timestamp:string; plantId:string; };


export default function ReadingsPage() {
  const initial = typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("plantId") ?? "";
  const [plantId, setPlantId] = useState<string>(initial);
  const [rows, setRows] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string|null>(null);

  async function load(pid: string = plantId) {
    setLoading(true); setErr(null);
    try {
      const url = "/api/readings" + (pid ? `?plantId=${encodeURIComponent(pid)}` : "");
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error((data as { error?: string }).error || "Error");
      setRows((data as { data?: Reading[] }).data || []);
    } catch(e) {
      setErr(e instanceof Error ? e.message : String(e));
    }
    finally { setLoading(false); }
  }

  useEffect(() => {
    (async () => {
      setLoading(true); setErr(null);
      try {
        const url = "/api/readings" + (initial ? `?plantId=${encodeURIComponent(initial)}` : "");
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) throw new Error((data as { error?: string }).error || "Error");
        setRows((data as { data?: Reading[] }).data || []);
      } catch(e) {
        setErr(e instanceof Error ? e.message : String(e));
      }
      finally { setLoading(false); }
    })();
  }, [initial]);

  return (
    <div className="grid" style={{maxWidth:1000}}>
      <h1>Lecturas</h1>
      <div className="card">
        <label>Plant ID</label>
        <input value={plantId} onChange={e=>setPlantId(e.target.value)} placeholder="Opcional"
               style={{padding:8,border:"1px solid #e5e7eb",borderRadius:8, width:"100%", margin:"6px 0 10px"}} />
        <button onClick={()=>load()} style={{padding:"8px 10px", border:"1px solid #d1d5db", borderRadius:8, background:"#fff"}}>
          {loading ? "Cargando..." : "Filtrar"}
        </button>
        {err && <p style={{color:"#b91c1c"}}>{err}</p>}
      </div>
      <div className="card">
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%", borderCollapse:"collapse"}}>
            <thead>
              <tr><th style={{textAlign:"left"}}>timestamp</th><th>kind</th><th>value</th><th>unit</th><th>plantId</th></tr>
            </thead>
            <tbody>
              {rows.map(r=>(
                <tr key={r.id}>
                  <td>{new Date(r.timestamp).toLocaleString()}</td>
                  <td style={{textAlign:"center"}}>{r.kind}</td>
                  <td style={{textAlign:"right"}}>{r.value.toFixed(3)}</td>
                  <td style={{textAlign:"center"}}>{r.unit}</td>
                  <td style={{fontFamily:"monospace"}}>{r.plantId}</td>
                </tr>
              ))}
              {(!loading && rows.length===0) && <tr><td colSpan={5}>Sin datos</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


