"use client";
import { SidebarShell } from "@/components/layout/SidebarShell";
import { LayoutDashboard, Wrench } from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Work Order", url: "/work-order", icon: Wrench },
];

export default function MaintenanceOfficerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarShell
      roleLabel="MAINTENANCE OFFICER"
      roleSubtitle="Petugas Lapangan"
      menuItems={menuItems}
    >
      {children}
    </SidebarShell>
  );
}

