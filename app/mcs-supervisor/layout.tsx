"use client";
import { SidebarShell } from "@/components/layout/SidebarShell";
import { LayoutDashboard, CheckSquare, FileText, Archive, Bell, Settings } from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Verifikasi Laporan", url: "/verifikasi-laporan", icon: CheckSquare },
  { title: "Pantauan Masa Tenggang", url: "/pantauan-masa-tenggang", icon: FileText },
  { title: "Arsip Dokumen", url: "/arsip-dokumen", icon: Archive },
];

export default function McsSupervisorLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarShell
      roleLabel="MCS SUPERVISOR"
      roleSubtitle="Highway Ops Control"
      menuItems={menuItems}
      topBarTitle="Command Center"
      headerActions={
        <>
          <button className="text-text hover:text-text-muted transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-text hover:text-text-muted transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-border hidden md:flex items-center justify-center overflow-hidden ml-2" />
        </>
      }
    >
      {children}
    </SidebarShell>
  );
}

