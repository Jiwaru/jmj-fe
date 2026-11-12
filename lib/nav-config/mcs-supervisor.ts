import { LayoutDashboard, CheckSquare, FileText, Archive } from "lucide-react";
import type { SidebarConfig } from "./types";

export const mcsSupervisorConfig: SidebarConfig = {
  roleLabel: "MCS SUPERVISOR",
  roleSubtitle: "Highway Ops Control",
  navItems: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard
    },
    {
      title: "Verifikasi Laporan",
      url: "/verifikasi",
      icon: CheckSquare
    },
    {
      title: "Pantauan Masa Tenggang",
      url: "/pantauan",
      icon: FileText
    },
    {
      title: "Arsip Dokumen",
      url: "/arsip",
      icon: Archive
    },
  ],
};
