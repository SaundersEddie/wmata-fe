import { useMemo, useState } from "react";
import type { MetroIncident, MetroLine } from "../types/api";

interface Props {
  line: MetroLine;
}

function badgeColor(status: MetroLine["status"]) {
  return status === "Major" ? "#dc2626" : status === "Minor" ? "#d97706" : "#16a34a";
}

// function IncidentRow({ inc }: { inc: MetroIncident }) {
//   const sevColor = inc.severity === "Major" ? "#dc2626" : "#d97706";

//   return (
//     <div style={{ padding: "8px 10px", border: "1px solid #eee", borderRadius: 8 }}>
//       <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
//         <b style={{ fontSize: 13 }}>{inc.type}</b>
//         <span
//           style={{
//             fontSize: 12,
//             padding: "2px 8px",
//             borderRadius: 999,
//             background: sevColor,
//             color: "white",
//             fontWeight: 700,
//           }}
//         >
//           {inc.severity}
//         </span>
//       </div>

//       {/* <div style={{ marginTop: 6, fontSize: 13, color: "#333" }}>{inc.summary}</div> */}

//     <div style={{ marginTop: 6, fontSize: 13, color: "#333" }}>{inc.summary}</div>
//         {inc.description && inc.description !== inc.summary && (
//     <div style={{ marginTop: 6, fontSize: 12, color: "#666" }}>
//         {inc.description}
//     </div>
//     )}

//       {inc.links?.length > 0 && (
//         <div style={{ marginTop: 6, fontSize: 12 }}>
//           {inc.links.slice(0, 2).map((href) => (
//             <a
//               key={href}
//               href={href}
//               target="_blank"
//               rel="noreferrer"
//               style={{ marginRight: 10 }}
//             >
//               link
//             </a>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

function IncidentRow({ inc }: { inc: MetroIncident }) {
  const [open, setOpen] = useState(false);
  const sevColor = inc.severity === "Major" ? "#dc2626" : "#d97706";

  const hasMore =
    inc.description &&
    inc.description.trim().length > 0 &&
    inc.description.trim() !== inc.summary.trim();

  return (
    <div style={{ padding: "8px 10px", border: "1px solid #eee", borderRadius: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
        <b style={{ fontSize: 13 }}>{inc.type}</b>
        <span
          style={{
            fontSize: 12,
            padding: "2px 8px",
            borderRadius: 999,
            background: sevColor,
            color: "white",
            fontWeight: 700,
          }}
        >
          {inc.severity}
        </span>
      </div>

      <div style={{ marginTop: 6, fontSize: 13, color: "#333" }}>{inc.summary}</div>

      {open && hasMore && (
        <div style={{ marginTop: 6, fontSize: 12, color: "#555", whiteSpace: "pre-wrap" }}>
          {inc.description}
        </div>
      )}

      <div style={{ marginTop: 8, display: "flex", gap: 12, alignItems: "center" }}>
        {hasMore && (
          <button
            onClick={() => setOpen((v) => !v)}
            style={{
              border: "1px solid #ddd",
              background: open ? "#111827" : "white",
              color: open ? "white" : "#111827",
              padding: "4px 8px",
              borderRadius: 8,
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            {open ? "Less" : "More"}
          </button>
        )}

        {inc.links?.length > 0 && (
          <div style={{ fontSize: 12 }}>
            {inc.links.slice(0, 2).map((href) => (
              <a key={href} href={href} target="_blank" rel="noreferrer" style={{ marginRight: 10 }}>
                link
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
function ToggleButton({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active?: boolean;
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

export default function MetroLineCard({ line }: Props) {
// null = no user override yet (use default behavior)
    const [showAllServiceOverride, setShowAllServiceOverride] = useState<boolean | null>(null);
    const [showAllAlerts, setShowAllAlerts] = useState(false);

// Default: auto-open service when Major, unless user has overridden it
    const showAllService = showAllServiceOverride ?? (line.status === "Major");


  const service = useMemo(
    () => (showAllService ? line.serviceIncidents : line.serviceIncidents.slice(0, 3)),
    [line.serviceIncidents, showAllService]
  );

  const alerts = useMemo(
    () => (showAllAlerts ? line.infoAlerts : line.infoAlerts.slice(0, 2)),
    [line.infoAlerts, showAllAlerts]
  );

  return (
    <div
      style={{
        border: `3px solid ${line.color}`,
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <h2 style={{ margin: 0 }}>{line.name} Line</h2>
        <span
          style={{
            background: badgeColor(line.status),
            color: "white",
            padding: "4px 10px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            height: 24,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {line.status}
        </span>
      </div>

      <p style={{ marginTop: 8, fontSize: 14, color: "#444" }}>
        Service issues: <b>{line.serviceIncidents.length}</b> · Alerts:{" "}
        <b>{line.infoAlerts.length}</b>
      </p>

      {/* Service Incidents */}
      {line.serviceIncidents.length > 0 && (
        <div style={{ marginTop: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            <h3 style={{ margin: 0, fontSize: 14 }}>Service</h3>
            <ToggleButton
              active={showAllService}
            //   onClick={() => setShowAllService((v) => !v)}
            onClick={() => setShowAllServiceOverride((prev) => !(prev ?? (line.status === "Major")))}
            >
              {showAllService
                ? "Show less"
                : `Show all (${line.serviceIncidents.length})`}
            </ToggleButton>
          </div>

          <div style={{ marginTop: 8, display: "grid", gap: 8 }}>
            {service.map((inc) => (
              <IncidentRow key={inc.id ?? inc.summary} inc={inc} />
            ))}
          </div>
        </div>
      )}

      {/* Info Alerts */}
      {line.infoAlerts.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            <h3 style={{ margin: 0, fontSize: 14 }}>Alerts</h3>
            <ToggleButton
              active={showAllAlerts}
              onClick={() => setShowAllAlerts((v) => !v)}
            >
              {showAllAlerts ? "Show less" : `Show all (${line.infoAlerts.length})`}
            </ToggleButton>
          </div>

          <div style={{ marginTop: 8, display: "grid", gap: 8 }}>
            {alerts.map((inc) => (
              <IncidentRow key={inc.id ?? inc.summary} inc={inc} />
            ))}
          </div>
        </div>
      )}
    <div style={{ fontSize: 12, color: "#666" }}>
        debug: status={line.status} defaultOpen={line.status === "Major"} showAllService={String(showAllService)}
    </div>

    </div>
  );
}
