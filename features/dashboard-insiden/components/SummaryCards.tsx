import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CountCardProps {
  label: string;
  count: number;
}

function CountCard({ label, count }: CountCardProps) {
  return (
    <Card className="flex-1 bg-bg rounded-2xl border border-border-strong ring-0 shadow-none [--card-spacing:0]">
      <CardContent className="p-4 md:px-6 md:py-5 h-full flex flex-col justify-between items-start">
        <div className="self-stretch h-full flex flex-col justify-between items-start gap-2">
          <div className="self-stretch text-text text-[10px] md:text-md font-normal md:line-clamp-1">
            {label}
          </div>
          <div className="self-stretch flex justify-start items-end gap-2">
            <div className="text-text text-2xl md:text-display-md font-semibold">{count}</div>
            <div className="text-text-muted text-xs md:text-md font-normal pb-1">items</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface EstimasiCardProps {
  label: string;
  total: number;
  bulan: string;
}

function EstimasiCard({ label, total, bulan }: EstimasiCardProps) {
  return (
    <Card className="flex-1 bg-bg rounded-2xl border border-border-strong ring-0 shadow-none [--card-spacing:0] overflow-hidden">
      <CardContent className="p-4 md:px-6 md:py-5 h-full flex flex-col justify-between items-start">
        <div className="self-stretch h-full flex flex-col justify-between items-start gap-5 min-w-0 w-full">
          <div className="self-stretch flex flex-col justify-start items-start min-w-0 w-full">
            <div className="text-text text-[10px] md:text-md font-normal w-full md:line-clamp-1">{label}</div>
            <div className="text-text-muted text-[10px] md:text-xs font-medium w-full">{bulan}</div>
          </div>
          <div className="self-stretch text-text text-md md:text-display-xs font-semibold w-full">
            Rp {total.toLocaleString("id-ID")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface SummaryCardsProps {
  data: {
    antrean_ba_kejadian: number;
    antrean_ba_kerusakan: number;
    dokumen_tertunda: number;
    total_estimasi_ganti_rugi: number;
    total_estimasi_bulan: string;
  };
}

export function SummaryCards({ data }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 w-full">
      <CountCard
        label="Antrean BA Kejadian"
        count={data.antrean_ba_kejadian}
      />
      <CountCard
        label="Antrean BA Kerusakan"
        count={data.antrean_ba_kerusakan}
      />

      <CountCard
        label="Dokumen Tertunda (Masa Tenggang)"
        count={data.dokumen_tertunda}
      />
      <EstimasiCard
        label="Total Estimasi Ganti Rugi"
        total={data.total_estimasi_ganti_rugi}
        bulan={data.total_estimasi_bulan}
      />
    </div>
  );
}
