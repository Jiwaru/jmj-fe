"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Menu } from "lucide-react";
import React from "react";
import { Separator } from "@/components/ui/separator";

interface WebLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  headerActions?: React.ReactNode;
  roleName?: string;
  topBarTitle?: React.ReactNode;
  hideSidebarTrigger?: boolean;
}

export function WebLayout({
  children,
  sidebar,
  headerActions,
  roleName,
  topBarTitle = "Command Center",
  hideSidebarTrigger = false,
}: WebLayoutProps) {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "240px",
        "--sidebar-width-icon": "4rem",
      } as React.CSSProperties}
    >
      {sidebar}
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-[64px] shrink-0 items-center justify-between gap-2 px-6 border-b border-border shadow-sm bg-bg transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[64px]">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 hidden md:flex" />
            <Separator orientation="vertical" className="mx-2 h-6 hidden md:block" />
            {/* Desktop */}
            <div className="hidden md:block">
              {typeof topBarTitle === 'string' ? (
                <h1 className="text-xl font-bold text-text">{topBarTitle}</h1>
              ) : (
                topBarTitle
              )}
            </div>
            {/* Mobile */}
            <div className="flex md:hidden items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-border" />
              {typeof topBarTitle === 'string' ? (
                <h1 className="font-semibold text-text">{topBarTitle}</h1>
              ) : (
                topBarTitle
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {headerActions ? (
              <div className="flex items-center gap-4">{headerActions}</div>
            ) : (
              <div className="flex items-center gap-4">
                <button className="text-text hover:text-text-muted transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                {/* Default Avatar for desktop (hidden on mobile since it's already on the left) */}
                <div className="w-8 h-8 rounded-full bg-border hidden md:block" />
              </div>
            )}
            {!hideSidebarTrigger && (
              <SidebarTrigger className="md:hidden">
                <Menu className="w-6 h-6" />
              </SidebarTrigger>
            )}
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-6 p-6 bg-bg-subtle">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
