"use client";
export default function GlobalError({ error, reset }: { error: Error; reset: ()=>void }) {
  return (
    <html><body>
      <div className="grid" style={{maxWidth:720}}>
        <h1>Ocurrió un error</h1>
        <div className="card" style={{whiteSpace:"pre-wrap"}}>{error.message}</div>
        <button onClick={reset} style={{padding:"8px 10px", border:"1px solid #d1d5db", borderRadius:8, background:"#fff"}}>Reintentar</button>
      </div>
    </body></html>
  );
}
