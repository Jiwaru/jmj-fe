// Sumber: .agents/rules/database-schema.md baris 28, 34 (grup tabel B, enum report_status & sync_status).
// Kolom lengkap incident_report (sta_km, sta_m, lane, incident_type, dst) belum terkonfirmasi
// di database-schema.md — ditandai TODO, lihat ERD & Skema Database - Toll Command.md kalau tersedia.

export type ReportStatus =
  | "new"
  | "pending_verification"
  | "verified"
  | "rejected"
  | "closed";

// sync_status dikendalikan client (offline-first) — badge "Draft"/"Antrean"/"Terkirim" di UI
// dipetakan dari field ini, BUKAN dari report_status. Lihat database-schema.md baris 79.
export type SyncStatus = "draft" | "queued" | "sent";

export type ValidationStatus = "submitted" | "validated" | "rejected";

// TODO(K8): nilai enum `lane` BELUM ada di database-schema.md (cuma disebut namanya di baris 37).
// Diambil dari dropdown prototype Figma (Step 1 form Lapor Insiden) — konfirmasi ulang ke ERD lengkap.
export type LaneOption = "lane_1" | "lane_2" | "lane_3" | "shoulder";

// TODO(K8): nilai enum `weather_condition` BELUM ada di database-schema.md maupun prototype Figma
// (dropdown di mockup masih placeholder kosong). Ini TEBAKAN sementara (kondisi cuaca lazim
// laporan lalu lintas Indonesia), BELUM diverifikasi ke ERD — WAJIB dicek ulang sebelum K8 selesai.
export type WeatherCondition = "cerah" | "berawan" | "hujan" | "kabut";
export type RouteOption = "A" | "B";

// TODO(K8): field Step 2 (Kronologi & Dokumentasi TKP) di bawah ini SEMUA belum terkonfirmasi
// ke database-schema.md. Diambil murni dari opsi dropdown/checklist prototype Figma —
// kemungkinan besar berhubungan ke damaged_items/incident_ba/damage_ba (grup tabel B),
// nama kolom & tabel asalnya WAJIB dicek ulang sebelum K8 selesai.
export type IncidentCause =
  | "microsleep"
  | "tire_burst"
  | "brake_failure"
  | "following_distance"
  | "weather_factor"
  | "avoiding_object"
  | "other";

export type ActionTaken =
  | "emergency_signage"
  | "traffic_control"
  | "victim_evacuation"
  | "tow_unit_coordination"
  | "police_medical_coordination"
  | "debris_cleanup";

export type DamageAssessment = "heavy_damage" | "light_damage" | "no_damage";

export type FollowUpRecommendation =
  | "issue_wo_replacement"
  | "issue_wo_partial_repair"
  | "no_follow_up";

// TODO(K8): field Step 5 (Bentuk Penyelesaian) belum terkonfirmasi ke database-schema.md —
// kemungkinan berhubungan ke incident_ba/damage_ba (grup tabel B). Diambil dari prototype Figma.
export type SettlementMethod = "full_payment" | "leniency_request" | "self_repair";

export interface IncidentReport {
  uuid: string;
  report_number?: string | null;
  user_id?: number;
  date_time?: string;
  km?: number | null;
  m?: number | null;
  lane?: LaneOption | null;
  route?: RouteOption | null;
  weather_condition?: WeatherCondition | null;
  causer?: string;
  incident_explanation?: string | null;
  action?: string | null;
  analyze?: string | null;
  conclusion?: string | null;
  is_asset_broken?: boolean;
  is_identified?: boolean;
  additional_cost?: number;
  total_estimation?: number;
  settlement_type?: SettlementMethod | null;
  relief_requested?: boolean;
  pledged_amount?: number | null;
  sync_status: SyncStatus;
  report_status: ReportStatus;

  // --- KOMPATIBILITAS TRACK AULIA (Sementara) ---
  // Field di bawah ini dipertahankan sementara agar tidak merusak (break) kodingan temenmu 
  // di track field-officer (Aulia) yang masih memakai struktur lama.
  // Nanti saat Aulia merevisi kodenya, field ini bisa dihapus.
  occurred_at?: string;
  sta_label?: string;
  lane_label?: string;
  title?: string;
}

// Extended interface for card display purposes (includes joined fields like petugas_pelapor and pihak_terlibat)
export interface IncidentCardItem extends IncidentReport {
  petugas_pelapor: string;
  pihak_terlibat: string;
  // Mock fields to support validation UI (usually these belong to incident_ba/damage_ba)
  validation_status?: ValidationStatus;
  validated_by?: string;
  validated_at?: string;
}
