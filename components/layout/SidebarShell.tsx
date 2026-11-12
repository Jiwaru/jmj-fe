"use client";

import React from "react";
import { WebLayout } from "@/components/layout/WebLayout";
import { AppSidebar } from "@/components/layout/AppSidebar";

import type { LucideIcon } from "lucide-react";

type MenuItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

interface SidebarShellProps {
  children: React.ReactNode;
  roleLabel: string;
  roleSubtitle: string;
  menuItems: MenuItem[];
  topBarTitle?: React.ReactNode;
  customSidebarHeader?: (collapsed: boolean) => React.ReactNode;
  headerActions?: React.ReactNode;
  hideSidebarTrigger?: boolean;
}

export function SidebarShell({
  children,
  roleLabel,
  roleSubtitle,
  menuItems,
  topBarTitle,
  customSidebarHeader,
  headerActions,
  hideSidebarTrigger,
}: SidebarShellProps) {
  return (
    <WebLayout
      sidebar={
        <AppSidebar
          roleLabel={roleLabel}
          roleSubtitle={roleSubtitle}
          navItems={menuItems}
          customSidebarHeader={customSidebarHeader}
        />
      }
      roleName={roleLabel}
      topBarTitle={topBarTitle}
      headerActions={headerActions}
      hideSidebarTrigger={hideSidebarTrigger}
    >
      {children}
    </WebLayout>
  );
}
