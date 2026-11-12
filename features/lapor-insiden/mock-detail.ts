// DUMMY — backend belum terhubung. Dipakai sementara oleh halaman
// app/(field-officer)/riwayat/[id] untuk menampilkan detail laporan "Terkirim".
// Key harus sinkron dengan `uuid` di lib/mock/incident-reports.ts.
//
// Sengaja privat ke features/lapor-insiden/ (BUKAN lib/mock/) karena bentuknya
// meniru state form multi-step UI (LaporInsidenStep1State dkk), bukan shape
// entitas backend — lib/mock/ khusus untuk data yang bentuknya mengikuti
// lib/types/ (lihat coding-standards.md bagian "Data dummy sebelum API terhubung").

import type {
  LaporInsidenStep1State,
  LaporInsidenStep2State,
  LaporInsidenStep3State,
  LaporInsidenStep4State,
  LaporInsidenStep5State,
} from "./types";

export interface IncidentReportDetail {
  step1: LaporInsidenStep1State;
  step2: LaporInsidenStep2State;
  step3: LaporInsidenStep3State;
  step4: LaporInsidenStep4State;
  step5: LaporInsidenStep5State;
  submitted_at: string;
}

export const MOCK_INCIDENT_REPORT_DETAILS: Record<string, IncidentReportDetail> = {
  "mock-incident-1": {
    step1: {
      tanggal: new Date(2026, 7, 24),
      jam: "09",
      menit: "30",
      arah_ruas: "A",
      lajur: "lane_1",
      km: "42",
      m: "500",
      cuaca: "cerah",
    },
    step2: {
      penyebab: "microsleep",
      tindakan: ["emergency_signage", "traffic_control", "tow_unit_coordination"],
      catatan_uraian:
        "Truk logistik melaju kecepatan tinggi, oleng menabrak pembatas jalan dan PJU.",
      analisa_kerusakan: "heavy_damage",
      kesimpulan: "issue_wo_replacement",
      foto_dokumentasi: [],
    },
    step3: {
      pihak_terlibat: [
        {
          id: "mock-pihak-1",
          nama_lengkap: "Rian Hidayat",
          nik_ktp: "3271902805920001",
          nomor_sim: "3271120805920003",
          no_telepon: "081234567890",
          golongan_kendaraan: "class_3",
          tipe_kendaraan: "truck_box",
          plat_nomor: "B 9123 AB",
        },
      ],
      ada_kerusakan_aset: true,
    },
    step4: {
      aset_rusak: [
        {
          id: "mock-aset-1",
          catalog_item_id: "guardrail-beam",
          category_label: "Guardrail",
          name: "Guardrail Beam (W-Beam)",
          unit_price: 1_200_000,
          unit_label: "bh",
          qty: 2,
        },
        {
          id: "mock-aset-2",
          catalog_item_id: "pju-tiang-octagonal",
          category_label: "PJU",
          name: "Tiang Lampu PJU Octagonal 9m",
          unit_price: 8_500_000,
          unit_label: "bh",
          qty: 1,
        },
      ],
      biaya_tambahan: "",
      catatan_kalkulasi: "",
    },
    step5: {
      metode: "full_payment",
      dokumen_kesanggupan: [],
    },
    submitted_at: "2026-08-24T09:30:00+07:00",
  },
};
