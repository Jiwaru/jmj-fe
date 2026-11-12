// Field kendaraan (golongan tarif tol, tipe) — dipisah dari incident-report.ts karena
// berpotensi dipakai lintas fitur (BA Kejadian, BA Kerusakan, dst juga butuh data
// kendaraan pihak kesatu, lihat backlog-aulia.md AULIA-K6).
// TODO(K8): belum terkonfirmasi ke database-schema.md — kemungkinan besar berhubungan ke
// involved_vehicles/culprit (grup tabel B). `vehicle_type` disebut namanya di baris 37
// database-schema.md tapi nilainya belum ada di sana; `vehicle_class` (golongan tarif tol)
// belum disebut sama sekali. Diambil dari dropdown prototype Figma, WAJIB dicek ulang ke ERD.
// Catatan: tidak ada "Golongan V" di daftar prototype — dikonfirmasi user, bukan salah ketik.

export type VehicleClass =
  | "class_1"
  | "class_2"
  | "class_3"
  | "class_4"
  | "class_6";

export type VehicleType =
  | "sedan"
  | "minibus_suv"
  | "pickup"
  | "truck_box"
  | "truck_tank"
  | "truck_trailer"
  | "bus";
