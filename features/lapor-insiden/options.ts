// Satu sumber label untuk semua opsi dropdown/checklist/radio di form Lapor Insiden.
// Dipakai oleh komponen tiap step DAN SummaryLaporan supaya labelnya selalu konsisten.
// TODO(K8): semua opsi di bawah belum terverifikasi ke ERD, lihat catatan di
// lib/types/incident-report.ts

export const LAJUR_OPTIONS = [
  { value: "lane_1", label: "Lajur 1" },
  { value: "lane_2", label: "Lajur 2" },
  { value: "lane_3", label: "Lajur 3" },
  { value: "shoulder", label: "Bahu Jalan" },
];

export const CUACA_OPTIONS = [
  { value: "cerah", label: "Cerah" },
  { value: "berawan", label: "Berawan" },
  { value: "hujan", label: "Hujan" },
  { value: "kabut", label: "Kabut" },
];

export const PENYEBAB_OPTIONS = [
  { value: "microsleep", label: "Mengantuk" },
  { value: "tire_burst", label: "Pecah Ban" },
  { value: "brake_failure", label: "Gagal Fungsi Kendaraan" },
  { value: "following_distance", label: "Kurang Antisipasi / Jaga Jarak" },
  { value: "weather_factor", label: "Faktor Cuaca" },
  { value: "avoiding_object", label: "Menghindari Objek / Hewan" },
  { value: "other", label: "Lainnya" },
];

export const TINDAKAN_OPTIONS = [
  { value: "emergency_signage", label: "Pemasangan Rambu Darurat (Cone/Barrier)" },
  { value: "traffic_control", label: "Pengaturan Arus Lalu Lintas (Trafik)" },
  { value: "victim_evacuation", label: "Evakuasi Pengemudi / Korban" },
  { value: "tow_unit_coordination", label: "Koordinasi Unit Derek" },
  { value: "police_medical_coordination", label: "Koordinasi Kepolisian / Medis" },
  { value: "debris_cleanup", label: "Pembersihan Lajur dari Puing" },
];

export const ANALISA_KERUSAKAN_OPTIONS = [
  {
    value: "heavy_damage",
    label: "Rusak Berat",
    description: "Deformasi total, wajib ganti baru",
  },
  {
    value: "light_damage",
    label: "Rusak Ringan",
    description: "Bisa diperbaiki / rekondisi",
  },
  {
    value: "no_damage",
    label: "Tidak Ada Kerusakan Aset",
    description: undefined,
  },
];

export const KESIMPULAN_OPTIONS = [
  { value: "issue_wo_replacement", label: "Terbitkan Work Order Penggantian Aset" },
  { value: "issue_wo_partial_repair", label: "Terbitkan Work Order Perbaikan Parsial" },
  { value: "no_follow_up", label: "Selesai (Tidak perlu tindak lanjut pemeliharaan)" },
];

export const GOLONGAN_OPTIONS = [
  { value: "class_1", label: "Golongan I" },
  { value: "class_2", label: "Golongan II" },
  { value: "class_3", label: "Golongan III" },
  { value: "class_4", label: "Golongan IV" },
  { value: "class_6", label: "Golongan VI" },
];

export const TIPE_OPTIONS = [
  { value: "sedan", label: "Sedan" },
  { value: "minibus_suv", label: "Minibus/SUV" },
  { value: "pickup", label: "Pick-up" },
  { value: "truck_box", label: "Truk Box" },
  { value: "truck_tank", label: "Truk Tangki" },
  { value: "truck_trailer", label: "Truk Trailer" },
  { value: "bus", label: "Bus" },
];

export const SETTLEMENT_OPTIONS = [
  {
    value: "full_payment",
    label: "Sanggup Bayar Penuh",
    description: "Pembayaran melalui Tunai atau Transfer Bank",
    badge: undefined as string | undefined,
  },
  {
    value: "leniency_request",
    label: "Pengajuan Keringanan",
    description: "Wajib menyertakan Surat Keterangan Tidak Mampu / Lurah (Maks. 7 hari kerja)",
    badge: "MASA TENGGANG 7 HARI" as string | undefined,
  },
  {
    value: "self_repair",
    label: "Perbaikan Sendiri",
    description: "Pengguna jalan menunjuk rekanan bengkel terverifikasi",
    badge: undefined as string | undefined,
  },
];

function findLabel(options: { value: string; label: string }[], value: string | undefined) {
  if (!value) return "-";
  return options.find((option) => option.value === value)?.label ?? value;
}

export function lajurLabel(value: string | undefined) {
  return findLabel(LAJUR_OPTIONS, value);
}

export function cuacaLabel(value: string | undefined) {
  return findLabel(CUACA_OPTIONS, value);
}

export function penyebabLabel(value: string | undefined) {
  return findLabel(PENYEBAB_OPTIONS, value);
}

export function tindakanLabel(value: string) {
  return findLabel(TINDAKAN_OPTIONS, value);
}

export function analisaKerusakanLabel(value: string | undefined) {
  return findLabel(ANALISA_KERUSAKAN_OPTIONS, value);
}

export function kesimpulanLabel(value: string | undefined) {
  return findLabel(KESIMPULAN_OPTIONS, value);
}

export function golonganLabel(value: string | undefined) {
  return findLabel(GOLONGAN_OPTIONS, value);
}

export function tipeKendaraanLabel(value: string | undefined) {
  return findLabel(TIPE_OPTIONS, value);
}

export function settlementLabel(value: string | undefined) {
  return findLabel(SETTLEMENT_OPTIONS, value);
}
