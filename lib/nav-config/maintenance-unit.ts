import { ClipboardList, Wrench, FileText } from "lucide-react";
import type { SidebarConfig } from "./types";

export const maintenanceUnitConfig: SidebarConfig = {
  roleLabel: "MAINTENANCE UNIT",
  roleSubtitle: "JMJ / JMTM",
  navItems: [
    { title: "Work Order Review", url: "/work-order-review", icon: ClipboardList },
    { title: "Pemeliharaan", url: "/pemeliharaan", icon: Wrench },
    { title: "Laporan", url: "/laporan", icon: FileText },
  ],
};
