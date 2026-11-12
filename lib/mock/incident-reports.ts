// DUMMY — backend belum terhubung (lihat lib/types/incident-report.ts untuk sumber enum).
// Dipakai sementara oleh app/field-officer/(shell)/dashboard sampai API incident_report tersedia.
// uuid di sini BUKAN UUID v4 sungguhan, sekadar placeholder unik untuk key React.

import type { IncidentReport } from "@/lib/types/incident-report";

export const MOCK_INCIDENT_REPORTS: IncidentReport[] = [
  {
    uuid: "mock-incident-1",
    report_status: "verified",
    sync_status: "sent",
    occurred_at: "2026-08-24T09:30:00+07:00",
    sta_label: "STA 42+500",
    lane_label: "Jalur A",
    title: "Tabrakan Beruntun & Guardrail Rusak Parah",
  },
  {
    uuid: "mock-incident-2",
    report_status: "new",
    sync_status: "draft",
    occurred_at: "2026-08-24T11:15:00+07:00",
    sta_label: "STA 12+400",
    lane_label: "Jalur B",
    title: "Kendaraan Mogok",
  },
];
