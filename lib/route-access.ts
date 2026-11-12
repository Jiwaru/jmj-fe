import type { UserRole } from "@/lib/types/user";

// Default saat ini: setiap role hanya akses fitur miliknya sendiri (paling ketat).
// Pertanyaan terbuka soal hierarki akses (role "petinggi" akses fitur di bawahnya)
// belum terjawab - lihat docs/prd-full.md Bagian 10 (#16). Perubahan kebijakan
// nanti cukup ubah isi tabel ini, tidak perlu reorganisasi struktur folder
// (lihat coding-standards.md bagian "Routing & kontrol akses per role").

export const ROUTE_ROLES: Record<string, UserRole[]> = {
  "/lapor-insiden": ["field_officer"],
  "/riwayat": ["field_officer"],
  "/work-order": ["maintenance_officer"],
  "/dashboard": ["field_officer", "mcs_supervisor", "maintenance_unit", "maintenance_officer"],
  "/verifikasi-laporan": ["mcs_supervisor"],
  "/arsip-dokumen": ["mcs_supervisor"],
  "/pantauan-masa-tenggang": ["mcs_supervisor"],
  "/work-order-review": ["maintenance_unit"],
  "/laporan": ["maintenance_unit"],
  "/pemeliharaan": ["maintenance_unit"], // adding if it's there
};

// Path publik yang user lihat di address bar -> folder fisik per role
export const ROLE_CONTENT_MAP: Record<string, Partial<Record<UserRole, string>>> = {
  "/dashboard": {
    "field_officer": "/field-officer/dashboard",
    "mcs_supervisor": "/mcs-supervisor/dashboard",
    "maintenance_unit": "/maintenance-unit/dashboard",
    "maintenance_officer": "/maintenance-officer/dashboard",
  },
  // tambahkan path lain di sini nanti dengan pola yang sama
};

// Fungsi generik reusable
// matchedRoute: key di ROUTE_ROLES yang cocok (mis. "/riwayat")
// pathname: path lengkap dari request (mis. "/riwayat/mock-incident-1")
export function resolveContentPath(
  matchedRoute: string,
  pathname: string,
  role: UserRole
): string {
  const restOfPath = pathname.slice(matchedRoute.length);

  // 1. Cek apakah ada mapping khusus (exact match pada matchedRoute)
  const contentMap = ROLE_CONTENT_MAP[matchedRoute];
  if (contentMap && contentMap[role]) {
    return `${contentMap[role]}${restOfPath}`;
  }

  // 2. Jika tidak ada mapping khusus, gunakan konvensi default: /nama-role/pathname
  // Contoh: role "field_officer" & pathname "/lapor-insiden" -> "/field-officer/lapor-insiden"
  const roleFolder = role.replace("_", "-");
  return `/${roleFolder}${matchedRoute}${restOfPath}`;
}
