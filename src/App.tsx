import { useEffect, useState } from "react";
import type { MetroStatusResponse } from "./types/api";
import MetroLineCard from "./components/MetroLineCard";
import AccessibilityPanel from "./components/AccessibilityPanel";
import { useAccessibility } from "./hooks/useAccessibility";

export default function App() {
  const [metro, setMetro] = useState<MetroStatusResponse | null>(null);
  const [metroError, setMetroError] = useState<string | null>(null);

  const { data: access, error: accessError } = useAccessibility();

  useEffect(() => {
    fetch("/api/status/metro")
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return (await r.json()) as MetroStatusResponse;
      })
      .then(setMetro)
      .catch((e) => setMetroError(e?.message ?? String(e)));
  }, []);

  return (
    <main style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h1>WMATA Status</h1>

      {accessError && <p style={{ color: "crimson" }}>Accessibility: {accessError}</p>}
      {access && <AccessibilityPanel data={access} />}

      {metroError && <p style={{ color: "crimson" }}>Metro: {metroError}</p>}
      {!metroError && !metro && <p>Loading Metro…</p>}

      {metro &&
        metro.data.lines.map((line) => (
          <MetroLineCard key={line.code} line={line} />
        ))}
    </main>
  );
}
