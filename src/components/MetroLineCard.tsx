import type { MetroLine } from "../types/api";

interface Props {
  line: MetroLine;
}

export default function MetroLineCard({ line }: Props) {
  const badgeColor =
    line.status === "Major"
      ? "#dc2626"
      : line.status === "Minor"
      ? "#d97706"
      : "#16a34a";

  return (
    <div
      style={{
        border: `3px solid ${line.color}`,
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0 }}>{line.name} Line</h2>
        <span
          style={{
            background: badgeColor,
            color: "white",
            padding: "4px 8px",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {line.status}
        </span>
      </div>

      <p style={{ marginTop: 8, fontSize: 14, color: "#444" }}>
        Service issues: {line.serviceIncidents.length} · Alerts:{" "}
        {line.infoAlerts.length}
      </p>
    </div>
  );
}
