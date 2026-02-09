import { useMemo, useState } from "react";
import type { AccessibilityStatusResponse } from "../types/api";

type FilterMode = "all" | "unplanned" | "planned";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
      <span style={{ color: "#444" }}>{label}</span>
      <b>{value}</b>
    </div>
  );
}

function Button({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "1px solid #ddd",
        background: active ? "#111827" : "white",
        color: active ? "white" : "#111827",
        padding: "6px 10px",
        borderRadius: 8,
        fontSize: 12,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

export default function AccessibilityPanel({
  data,
}: {
  data: AccessibilityStatusResponse;
}) {
  const a = data.data;

  const [filter, setFilter] = useState<FilterMode>("all");
  const [showAll, setShowAll] = useState(false);

  const filteredItems = useMemo(() => {
    if (filter === "all") return a.items;
    return a.items.filter((i) => i.bucket === filter);
  }, [a.items, filter]);

  const visibleItems = showAll ? filteredItems : filteredItems.slice(0, 10);

  const counts = {
    all: a.totalDown,
    planned: a.plannedDown,
    unplanned: a.unplannedDown,
  };

  return (
    <section
      style={{
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: 14,
        marginBottom: 16,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
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

      {/* Controls */}
      <div
        style={{
          marginTop: 14,
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Button active={filter === "all"} onClick={() => setFilter("all")}>
            All ({counts.all})
          </Button>
          <Button
            active={filter === "unplanned"}
            onClick={() => setFilter("unplanned")}
          >
            Unplanned ({counts.unplanned})
          </Button>
          <Button
            active={filter === "planned"}
            onClick={() => setFilter("planned")}
          >
            Planned ({counts.planned})
          </Button>
        </div>

        <Button
          active={showAll}
          onClick={() => setShowAll((v) => !v)}
        >
          {showAll ? "Show top 10" : `Show all (${filteredItems.length})`}
        </Button>
      </div>

      <h3 style={{ marginTop: 14, marginBottom: 8 }}>
        Outages ({filter === "all" ? "all" : filter}) — showing{" "}
        {visibleItems.length} of {filteredItems.length}
      </h3>

      <div style={{ display: "grid", gap: 8 }}>
        {visibleItems.map((item) => (
          <div
            key={`${item.unitName ?? "unit"}-${item.stationCode ?? "st"}-${item.dateOutOfService ?? ""}`}
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
                {item.unitType}
                {item.unitName ? ` · ${item.unitName}` : ""}
              </b>
              <span style={{ fontSize: 12, color: "#666" }}>{item.bucket}</span>
            </div>

            <div style={{ fontSize: 13, color: "#333", marginTop: 6 }}>
              {item.summary}
            </div>

            {item.estimatedReturnToService && (
              <div style={{ fontSize: 12, color: "#666", marginTop: 6 }}>
                ETA: {new Date(item.estimatedReturnToService).toLocaleString()}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
