import React from "react";
import { IncidentCardItem } from "@/lib/types/incident-report";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { AppBadge } from "@/components/domain/AppBadge";
import { AppButton } from "@/components/domain/AppButton";
import { CalendarIcon, MapPinIcon, ShieldCheckIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AppIncidentCardProps {
  item: IncidentCardItem;
}

export function AppIncidentCard({ item }: AppIncidentCardProps) {
  return (
    <Card className="bg-bg border border-border-strong ring-0 rounded-2xl shadow-none [--card-spacing:0] h-full flex flex-col">
      <CardContent className="p-5 flex flex-col flex-1">
        {/* Header: ID Laporan + Badge */}
        <div className="flex justify-between items-start pb-5">
          <div className="flex flex-col gap-0">
            <p className="text-text-muted text-base font-normal">ID LAPORAN</p>
            <p className="text-brand text-lg font-semibold">{item.report_number}</p>
          </div>
          <AppBadge variant="brand" solid className="capitalize rounded-full px-3 py-1 text-sm font-medium">
            {item.report_status === "new" ? "New" : item.report_status}
          </AppBadge>
        </div>

        {/* Separator */}
        <div className="border-t border-border-strong" />

        {/* Info: mobile stacked, desktop 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 py-5">
          {/* Date & Time */}
          <div className="flex items-start gap-3">
            <CalendarIcon className="w-5 h-5 text-brand shrink-0" />
            <div className="flex flex-col gap-1">
              <p className="text-text-muted text-sm font-normal">TANGGAL & WAKTU</p>
              <div className="text-text text-sm font-medium">
                {format(new Date(item.date_time ?? new Date()), "dd/MM/yyyy")}
                <span className="mx-2">•</span>
                {format(new Date(item.date_time ?? new Date()), "HH:mm")} WIB
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3">
            <MapPinIcon className="w-5 h-5 text-brand shrink-0" />
            <div className="flex flex-col gap-1">
              <p className="text-text-muted text-sm font-normal">LOKASI</p>
              <p className="text-text text-sm font-medium">
                {item.km}+{item.m} {item.route}
              </p>
            </div>
          </div>

          {/* Petugas Pelapor */}
          <div className="flex items-start gap-3">
            <ShieldCheckIcon className="w-5 h-5 text-brand shrink-0" />
            <div className="flex flex-col gap-1">
              <p className="text-text-muted text-sm font-normal">PETUGAS PELAPOR</p>
              <p className="text-text text-sm font-medium">{item.petugas_pelapor}</p>
            </div>
          </div>

          {/* Pihak Terlibat */}
          <div className="flex items-start gap-3">
            <UsersIcon className="w-5 h-5 text-brand shrink-0" />
            <div className="flex flex-col gap-1">
              <p className="text-text-muted text-sm font-normal">PIHAK TERLIBAT</p>
              <p className="text-text text-sm font-medium">{item.pihak_terlibat}</p>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-border-strong mt-auto" />

        {/* Footer */}
        <div className="flex justify-between items-center pt-5">
          <div className="flex flex-col gap-1">
            <p className="text-text-muted text-sm font-normal">TOTAL GANTI RUGI</p>
            <p className="text-brand text-base font-semibold">
              Rp {(item.total_estimation ?? 0).toLocaleString("id-ID")}
            </p>
          </div>
          <AppButton 
            variant="primary" 
            size="default" 
            className="rounded-xl px-6 font-semibold"
            render={<Link href={`/verifikasi-laporan/${item.uuid}`} />}
          >
            Review
          </AppButton>
        </div>
      </CardContent>
    </Card>
  );
}
