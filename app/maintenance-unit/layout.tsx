"use client";
import { SidebarShell } from "@/components/layout/SidebarShell";
import { LayoutDashboard, ClipboardList, Wrench, FileText } from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Work Order Review", url: "/work-order-review", icon: ClipboardList },
  { title: "Pemeliharaan", url: "/pemeliharaan", icon: Wrench },
  { title: "Laporan", url: "/laporan", icon: FileText },
];

export default function MaintenanceUnitLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarShell
      roleLabel="MAINTENANCE UNIT"
      roleSubtitle="JMJ / JMTM"
      menuItems={menuItems}
    >
      {children}
    </SidebarShell>
  );
}

