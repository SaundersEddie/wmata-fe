import { useEffect, useState } from "react";
import type { MetroStatusResponse } from "./types/api";

export default function App() {
  const [data, setData] = useState<MetroStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/status/metro")
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return (await r.json()) as MetroStatusResponse;
      })
      .then(setData)
      .catch((e) => setError(e?.message ?? String(e)));
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>WMATA Status FE</h1>

      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}
      {!error && !data && <p>Loading…</p>}

      {data && (
        <>
          <p>
            Updated: <b>{data.meta.lastUpdated}</b>{" "}
            {data.meta.stale ? "(stale)" : ""}
          </p>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(data.data.lines.slice(0, 1), null, 2)}
          </pre>
        </>
      )}
    </main>
  );
}
