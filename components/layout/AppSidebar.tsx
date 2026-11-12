"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { X } from "lucide-react";
import type { SidebarConfig } from "@/lib/nav-config/types";

interface AppSidebarProps extends SidebarConfig {
  showRoleInfo?: boolean;
  customSidebarHeader?: (collapsed: boolean) => React.ReactNode;
}

export function AppSidebar({
  roleLabel,
  roleSubtitle,
  navItems,
  showRoleInfo = true,
  customSidebarHeader,
}: AppSidebarProps) {
  const pathname = usePathname();
  const { state, setOpenMobile, isMobile } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar side={isMobile ? "right" : "left"} collapsible="icon" className="border-r-0">
      {/* ===== HEADER ===== */}
      {/* Desktop Header */}
      <SidebarHeader className={`hidden md:flex items-center ${collapsed ? "py-4" : "py-6"}`}>
        {customSidebarHeader ? (
          customSidebarHeader(collapsed)
        ) : (
          <>
            {/* Logo TC Default */}
            <div
              className={`bg-brand flex items-center justify-center shrink-0 transition-all duration-200 ${collapsed ? "size-8 rounded-lg" : "size-20 rounded-2xl"
                }`}
            >
              <span
                className={`text-bg font-semibold transition-all duration-200 ${collapsed ? "text-xs" : "text-3xl"
                  }`}
              >
                TC
              </span>
            </div>

            {/* Role Info Default */}
            {showRoleInfo && !collapsed && (
              <div className="mt-2 flex flex-col items-center text-center">
                <span className="text-xl font-semibold text-bg whitespace-nowrap">
                  {roleLabel}
                </span>
                <span className="text-xs font-normal text-text-on-dark whitespace-nowrap">
                  {roleSubtitle}
                </span>
              </div>
            )}
          </>
        )}
      </SidebarHeader>

      {/* Mobile Header */}
      <SidebarHeader className="flex md:hidden flex-row items-center justify-between p-4 border-b border-sidebar-border">
        <span className="text-bg text-xl font-semibold">Menu</span>
        <button onClick={() => setOpenMobile(false)} className="text-bg">
          <X className="size-6" />
        </button>
      </SidebarHeader>

      {/* ===== CONTENT ===== */}
      <SidebarContent>
        <SidebarGroup className={collapsed ? "items-center" : "px-4"}>
          <SidebarGroupContent className={collapsed ? "flex flex-col items-center w-full" : ""}>
            <SidebarMenu className="gap-2">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={collapsed ? "flex justify-center w-full" : ""}
                  >
                    <SidebarMenuButton
                      render={<Link href={item.url} onClick={() => isMobile && setOpenMobile(false)} />}
                      isActive={isActive}
                      tooltip={item.title}
                      className={`transition-colors ${collapsed
                        ? "size-9 justify-center"
                        : "h-11 justify-start px-4"
                        } ${isActive
                          ? "!bg-brand !text-bg hover:!bg-brand hover:!text-bg"
                          : "text-text-on-dark hover:bg-sidebar-accent"
                        }`}
                    >
                      <item.icon className="size-5 shrink-0" />
                      {!collapsed && (
                        <span className="text-sm font-normal">{item.title}</span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}