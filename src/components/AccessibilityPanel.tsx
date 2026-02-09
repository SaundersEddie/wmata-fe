import type { AccessibilityStatusResponse } from "../types/api";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
      <span style={{ color: "#444" }}>{label}</span>
      <b>{value}</b>
    </div>
  );
}

export default function AccessibilityPanel({
  data,
}: {
  data: AccessibilityStatusResponse;
}) {
  const a = data.data;

  const top = a.items.slice(0, 8); // keep it small for now

  return (
    <section
      style={{
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: 14,
        marginBottom: 16,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0 }}>Accessibility</h2>
        <span style={{ fontSize: 12, color: "#666" }}>
          Updated: {new Date(data.meta.lastUpdated).toLocaleTimeString()}
          {data.meta.stale ? " (stale)" : ""}
        </span>
      </div>

      <div style={{ marginTop: 10, display: "grid", gap: 6 }}>
        <Row label="Elevators down" value={String(a.elevatorsDown)} />
        <Row label="Escalators down" value={String(a.escalatorsDown)} />
        <Row label="Planned" value={String(a.plannedDown)} />
        <Row label="Unplanned" value={String(a.unplannedDown)} />
        <Row label="Total" value={String(a.totalDown)} />
      </div>

      <h3 style={{ marginTop: 14, marginBottom: 8 }}>Top outages</h3>

      <div style={{ display: "grid", gap: 8 }}>
        {top.map((item) => (
          <div
            key={`${item.unitName ?? "unit"}-${item.stationCode ?? "st"}`}
            style={{
              padding: 10,
              borderRadius: 8,
              border: "1px solid #eee",
              background: item.bucket === "unplanned" ? "#fff7ed" : "#f8fafc",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <b>
                {item.unitType} {item.unitName ? `· ${item.unitName}` : ""}
              </b>
              <span style={{ fontSize: 12, color: "#666" }}>
                {item.bucket}
              </span>
            </div>

            <div style={{ fontSize: 13, color: "#333", marginTop: 6 }}>
              {item.summary}
            </div>

            {item.estimatedReturnToService && (
              <div style={{ fontSize: 12, color: "#666", marginTop: 6 }}>
                ETA:{" "}
                {new Date(item.estimatedReturnToService).toLocaleString()}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
