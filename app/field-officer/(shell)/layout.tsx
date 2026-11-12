"use client";
import { SidebarShell } from "@/components/layout/SidebarShell";
import { LayoutDashboard, AlertTriangle, Clock } from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Lapor Insiden", url: "/lapor-insiden", icon: AlertTriangle },
  { title: "Riwayat", url: "/riwayat", icon: Clock },
];

export default function FieldOfficerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarShell
      roleLabel="FIELD OFFICER"
      roleSubtitle="Layanan Jalan Tol"
      menuItems={menuItems}
      topBarTitle="Highway Field Ops"
      hideSidebarTrigger
      headerActions={
        <div className="w-8 h-8 rounded-full bg-border hidden md:block" />
      }
    >
      {children}
    </SidebarShell>
  );
}

