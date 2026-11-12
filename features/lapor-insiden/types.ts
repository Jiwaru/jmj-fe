import type {
  ActionTaken,
  DamageAssessment,
  FollowUpRecommendation,
  IncidentCause,
  LaneOption,
  SettlementMethod,
  WeatherCondition,
} from "@/lib/types/incident-report";
import type { VehicleClass, VehicleType } from "@/lib/types/vehicle";

// State form Step 1 (Waktu Kejadian, Lokasi Kejadian, Kondisi Cuaca) — belum 1:1 ke kolom
// backend, field UI-only (jam/menit terpisah, arah_ruas) ditandai lewat komentar di bawah.
export interface LaporInsidenStep1State {
  tanggal?: Date;
  jam: string; // UI-only, digabung ke occurred_at saat submit — TODO(K8)
  menit: string; // UI-only, digabung ke occurred_at saat submit — TODO(K8)
  arah_ruas: "A" | "B"; // TODO(K8): konfirmasi nama kolom asli (kemungkinan bagian dari `lane`/route)
  lajur?: LaneOption;
  km: string;
  m: string;
  cuaca?: WeatherCondition;
}

export const LAPOR_INSIDEN_STEP1_INITIAL: LaporInsidenStep1State = {
  tanggal: undefined,
  jam: "",
  menit: "",
  arah_ruas: "A",
  lajur: undefined,
  km: "",
  m: "",
  cuaca: undefined,
};

// State form Step 2 (Kronologi & Dokumentasi TKP) — lihat TODO(K8) di lib/types/incident-report.ts
// untuk field yang belum terkonfirmasi ke ERD.
export interface LaporInsidenStep2State {
  penyebab?: IncidentCause;
  tindakan: ActionTaken[];
  catatan_uraian: string;
  analisa_kerusakan?: DamageAssessment;
  kesimpulan?: FollowUpRecommendation;
  foto_dokumentasi: File[];
}

export const LAPOR_INSIDEN_STEP2_INITIAL: LaporInsidenStep2State = {
  penyebab: undefined,
  tindakan: [],
  catatan_uraian: "",
  analisa_kerusakan: undefined,
  kesimpulan: undefined,
  foto_dokumentasi: [],
};

// State form Step 3 (Pihak Terlibat) — lihat TODO(K8) di lib/types/incident-report.ts untuk
// field yang belum terkonfirmasi ke ERD (kemungkinan involved_vehicles/culprit).
export interface PihakTerlibat {
  id: string; // UI-only, key React untuk array dinamis — TODO(K8): ganti ke uuid v4 saat WatermelonDB tersambung
  nama_lengkap: string;
  nik_ktp: string;
  nomor_sim: string;
  no_telepon: string;
  golongan_kendaraan?: VehicleClass;
  tipe_kendaraan?: VehicleType;
  plat_nomor: string;
}

export interface LaporInsidenStep3State {
  pihak_terlibat: PihakTerlibat[];
  ada_kerusakan_aset: boolean;
}

export function createPihakTerlibat(): PihakTerlibat {
  return {
    id: crypto.randomUUID(),
    nama_lengkap: "",
    nik_ktp: "",
    nomor_sim: "",
    no_telepon: "",
    golongan_kendaraan: undefined,
    tipe_kendaraan: undefined,
    plat_nomor: "",
  };
}

export function createLaporInsidenStep3Initial(): LaporInsidenStep3State {
  return {
    pihak_terlibat: [createPihakTerlibat()],
    ada_kerusakan_aset: false,
  };
}

// State form Step 4 (Kalkulasi Kerusakan Aset) — HANYA muncul kalau step3.ada_kerusakan_aset
// true, di-skip langsung ke summary kalau false. Total di UI murni preview client-side —
// database-schema.md baris 45: "damaged_items.subtotal tidak dihitung ulang di frontend.
// Dihitung backend saat insert, disimpan permanen (harga berversi)."
export interface DamagedAssetEntry {
  id: string; // UI-only, key React — TODO(K8): ganti ke uuid v4 saat WatermelonDB tersambung
  catalog_item_id: string;
  category_label: string;
  name: string;
  unit_price: number;
  unit_label: string;
  qty: number;
}

export interface LaporInsidenStep4State {
  aset_rusak: DamagedAssetEntry[];
  biaya_tambahan: string; // UI-only string supaya field currency gampang di-edit, parse ke number saat submit
  catatan_kalkulasi: string;
}

export function createLaporInsidenStep4Initial(): LaporInsidenStep4State {
  return {
    aset_rusak: [],
    biaya_tambahan: "",
    catatan_kalkulasi: "",
  };
}

// State form Step 5 (Bentuk Penyelesaian) — dokumen_kesanggupan hanya relevan/ditampilkan
// kalau metode === "leniency_request" (Pengajuan Keringanan). Untuk "full_payment" dan
// "self_repair" tampilannya identik, tidak ada field tambahan.
export interface LaporInsidenStep5State {
  metode?: SettlementMethod;
  dokumen_kesanggupan: File[];
}

export function createLaporInsidenStep5Initial(): LaporInsidenStep5State {
  return {
    metode: undefined,
    dokumen_kesanggupan: [],
  };
}
