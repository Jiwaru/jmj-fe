"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SummaryLaporan, MOCK_INCIDENT_REPORT_DETAILS } from "@/features/lapor-insiden";

export default function RiwayatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const detail = MOCK_INCIDENT_REPORT_DETAILS[id];

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-bg-subtle">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-border-strong bg-bg px-5 py-3">
        <button type="button" onClick={() => router.push("/dashboard")} aria-label="Kembali">
          <ArrowLeft className="size-6 text-text" />
        </button>
        <span className="text-base font-medium text-text">Detail Report</span>
        <span className="w-6" />
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        {detail ? (
          <SummaryLaporan
            step1={detail.step1}
            step2={detail.step2}
            step3={detail.step3}
            step4={detail.step4}
            step5={detail.step5}
            title="Detail Laporan"
            description="Laporan ini sudah terkirim dan tercatat di sistem."
            waktuLabel="Waktu Pengiriman:"
            waktu={new Date(detail.submitted_at)}
          />
        ) : (
          <p className="text-sm text-text-muted">Laporan tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
}
