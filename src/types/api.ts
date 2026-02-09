// src/types/api.ts

export type Severity = "Normal" | "Minor" | "Major";

export interface MetroIncident {
  id: string | null;
  type: string;
  severity: "Minor" | "Major";
  summary: string;
  description: string;
  links: string[];
  updated: string | null;
}

export interface MetroLine {
  code: string;
  name: string;
  color: string;
  status: Severity;
  serviceIncidents: MetroIncident[];
  infoAlerts: MetroIncident[];
}

export interface MetroStatusResponse {
  meta: {
    lastUpdated: string;
    stale: boolean;
  };
  data: {
    lines: MetroLine[];
  };
}

export interface AccessibilityItem {
  unitType: "ELEVATOR" | "ESCALATOR" | "UNKNOWN";
  bucket: "planned" | "unplanned";
  stationCode: string | null;
  stationName: string | null;
  unitName: string | null;
  location: string | null;
  symptom: string | null;
  summary: string;
  description: string;
  links: string[];
  dateOutOfService: string | null;
  dateUpdated: string | null;
  estimatedReturnToService: string | null;
}

export interface AccessibilityStatusResponse {
  meta: {
    lastUpdated: string;
    stale: boolean;
  };
  data: {
    elevatorsDown: number;
    escalatorsDown: number;
    plannedDown: number;
    unplannedDown: number;
    totalDown: number;
    items: AccessibilityItem[];
  };
}
