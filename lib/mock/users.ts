// DUMMY — backend /api/v1/login BELUM ada di repo (lihat catatan di lib/types/user.ts).
// Dipakai sementara oleh features/auth/hooks/useLogin.ts untuk simulasi login
// per role sampai Sanctum sungguhan terpasang (backlog-shared.md K11).
// password di sini plain text HANYA karena dummy — TIDAK PERNAH begini di backend asli
// (backend pakai Hash::check(), lihat KONVENSI-BACKEND.md baris 301-312).

import type { User } from "@/lib/types/user";

export const MOCK_USERS: (User & { password: string })[] = [
  {
    id: 1,
    identity_code: "OP-001",
    password: "password",
    name: "Budi Santoso",
    position: "Field Officer",
    entity: "jmto",
    role: "field_officer",
  },
  {
    id: 2,
    identity_code: "OP-002",
    password: "password",
    name: "Siti Aminah",
    position: "Maintenance Officer",
    entity: "jmtm",
    role: "maintenance_officer",
  },
  {
    id: 3,
    identity_code: "SPV-001",
    password: "password",
    name: "Andi Wijaya",
    position: "MCS Supervisor",
    entity: "jmto",
    role: "mcs_supervisor",
  },
  {
    id: 4,
    identity_code: "ADM-001",
    password: "password",
    name: "Dewi Lestari",
    position: "Maintenance Unit",
    entity: "jmj",
    role: "maintenance_unit",
  },
];
