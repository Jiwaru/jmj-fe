"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Plus } from "lucide-react";
import { AppBadge } from "@/components/domain/AppBadge";
import { AppButton } from "@/components/domain/AppButton";
import { AppDotSeparator } from "@/components/domain/AppDotSeparator";
import { cn } from "@/lib/utils";
import { formatJamWIB } from "@/lib/utils/date";
import { MOCK_INCIDENT_REPORTS } from "@/lib/mock/incident-reports";
import type { SyncStatus } from "@/lib/types/incident-report";

type ReportFilter = "semua" | "antrean" | "terkirim";

const FILTERS: { value: ReportFilter; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: "antrean", label: "Antrean" },
  { value: "terkirim", label: "Terkirim" },
];

function matchesFilter(syncStatus: SyncStatus, filter: ReportFilter) {
  if (filter === "semua") return true;
  if (filter === "terkirim") return syncStatus === "sent";
  return syncStatus === "draft" || syncStatus === "queued";
}

export default function DasborPage() {
  const [filter, setFilter] = useState<ReportFilter>("semua");

  const filteredReports = MOCK_INCIDENT_REPORTS.filter((report) =>
    matchesFilter(report.sync_status, filter)
  );

  return (
    <div className="-m-6 min-h-full bg-bg-subtle pb-28">
      <div className="flex flex-col gap-5 px-5 py-6">
        <section className="flex flex-col gap-2 rounded-lg border border-border-strong bg-bg p-4">
          <div>
            <p className="text-xs text-text-muted">Status Petugas</p>
            <p className="text-xl font-medium text-text">Shift 1 - JMTO</p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-xs text-text-muted">Tanggal Hari ini</p>
            <div className="flex items-center gap-1">
              <Calendar className="size-4 text-brand" />
              <span className="text-sm font-medium text-text">Senin, 24 Agustus 2026</span>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-medium text-black">Riwayat Laporan</h2>

          <div className="flex items-start gap-3">
            {FILTERS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={cn(
                  "rounded-3xl px-4 py-2 text-sm font-medium",
                  filter === value
                    ? "bg-text text-white"
                    : "bg-text/10 font-normal text-text-muted"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {filteredReports.map((report) => (
              <article
                key={report.uuid}
                className="flex flex-col gap-4 rounded-lg border border-border-strong bg-bg p-4"
              >
                <div className="flex items-start gap-6">
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-sm text-text">
                      {report.occurred_at ? formatJamWIB(new Date(report.occurred_at)) : "-"}
                    </p>
                    <h3 className="line-clamp-1 text-xl font-semibold text-black">
                      {report.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm text-text">
                      <span>{report.sta_label}</span>
                      <AppDotSeparator />
                      <span>{report.lane_label}</span>
                    </div>
                  </div>

                  {report.sync_status === "sent" ? (
                    <AppBadge variant="brand" outline>
                      Terkirim
                    </AppBadge>
                  ) : (
                    <AppBadge variant="neutral" outline>
                      {report.sync_status === "queued" ? "Antrean" : "Draft"}
                    </AppBadge>
                  )}
                </div>

                {report.sync_status === "sent" ? (
                  <Link
                    href={`/riwayat/${report.uuid}`}
                    className="rounded-[32px] bg-brand/10 py-3 text-center text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white active:bg-brand-active active:text-white"
                  >
                    Lihat Detail
                  </Link>
                ) : (
                  // TODO: onClick resume draft ke Summary belum diimplementasi — butuh
                  // data draft per laporan + /lapor-insiden bisa load state awal dari draft
                  // tertentu, bukan cuma mulai kosong dari step1. Kartu kerja terpisah.
                  <AppButton type="button" variant="primary" className="rounded-full py-3">
                    Lanjutkan Draft
                  </AppButton>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-6 flex justify-end px-5">
        <Link
          href="/lapor-insiden"
          className="flex items-center gap-2 rounded-[48px] bg-text px-4 py-4 text-white transition-colors active:bg-text-active"
        >
          <Plus className="size-6" />
          <span className="text-base font-semibold">Buat Laporan Insiden Baru</span>
        </Link>
      </div>
    </div>
  );
}
