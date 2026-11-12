import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export interface SidebarConfig {
  roleLabel: string;
  roleSubtitle: string;
  navItems: NavItem[];
}
