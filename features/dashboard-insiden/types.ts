import { IncidentReport } from "@/lib/types/incident-report";

// Extended interface for dashboard display purposes (includes joined fields like petugas_pelapor and pihak_terlibat)
export interface DashboardPriorityItem extends IncidentReport {
  petugas_pelapor: string;
  pihak_terlibat: string;
}
