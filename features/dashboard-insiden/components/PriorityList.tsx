import React from "react";
import { IncidentCardItem } from "@/lib/types/incident-report";
import Link from "next/link";
import { AppIncidentCard } from "@/components/domain/AppIncidentCard";

interface PriorityListProps {
  items: IncidentCardItem[];
}

export function PriorityList({ items }: PriorityListProps) {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-text text-xl font-semibold">Prioritas Hari Ini</h3>
        <Link href="/verifikasi-laporan" className="text-brand text-base font-normal underline-offset-4 hover:underline">
          Lihat Semua →
        </Link>
      </div>

      {/* Grid: 1 col mobile, 2 col desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
        {items.map((item) => (
          <AppIncidentCard key={item.uuid} item={item} />
        ))}
      </div>
    </div>
  );
}
