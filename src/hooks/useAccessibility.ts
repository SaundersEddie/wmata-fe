import { useEffect, useState } from "react";
import type { AccessibilityStatusResponse } from "../types/api";

export function useAccessibility() {
  const [data, setData] = useState<AccessibilityStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/status/accessibility")
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return (await r.json()) as AccessibilityStatusResponse;
      })
      .then(setData)
      .catch((e) => setError(e?.message ?? String(e)));
  }, []);

  return { data, error };
}
