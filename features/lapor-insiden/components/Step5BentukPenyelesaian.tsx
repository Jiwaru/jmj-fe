"use client";

import { Info } from "lucide-react";
import { AppBadge } from "@/components/domain/AppBadge";
import { AppPhotoUpload } from "@/components/domain/AppPhotoUpload";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { SETTLEMENT_OPTIONS } from "../options";
import type { LaporInsidenStep5State } from "../types";

interface Step5BentukPenyelesaianProps {
  value: LaporInsidenStep5State;
  onChange: (value: LaporInsidenStep5State) => void;
}

function Step5BentukPenyelesaian({ value, onChange }: Step5BentukPenyelesaianProps) {
  const showDokumen = value.metode === "leniency_request";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-base font-medium text-text">Bentuk Penyelesaian</h1>
        <p className="text-sm text-text-muted">
          Pilih metode penyelesaian ganti rugi yang disepakati dengan pengguna jalan.
        </p>
      </div>

      <RadioGroup
        value={value.metode ?? ""}
        onValueChange={(metode) =>
          onChange({ ...value, metode: metode as LaporInsidenStep5State["metode"] })
        }
        className="gap-3"
      >
        {SETTLEMENT_OPTIONS.map((option) => {
          const checked = value.metode === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "flex items-start gap-2 rounded-lg border bg-bg p-4",
                checked ? "border-2 border-brand" : "border-border-strong"
              )}
            >
              <RadioGroupItem
                value={option.value}
                className="mt-0.5 size-6 border-2 border-border-strong data-checked:border-brand data-checked:bg-brand"
              />
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-lg font-medium text-text">{option.label}</span>
                {option.badge && (
                  <AppBadge variant="brand" className="px-2 py-1">
                    {option.badge}
                  </AppBadge>
                )}
                <span className="text-sm text-text-muted">{option.description}</span>
              </div>
            </label>
          );
        })}
      </RadioGroup>

      {showDokumen && (
        <>
          <div className="h-px bg-border-strong" />

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 rounded-2xl border border-border-strong bg-bg p-6">
              <div className="flex flex-col">
                <h2 className="text-lg font-medium text-text">Dokumen Kesanggupan</h2>
                <p className="text-sm text-text-muted">
                  Pastikan tanda tangan dan materai terlihat jelas.
                </p>
              </div>

              <AppPhotoUpload
                value={value.dokumen_kesanggupan}
                onValueChange={(dokumen_kesanggupan) =>
                  onChange({ ...value, dokumen_kesanggupan })
                }
                label="Scan Surat Pernyataan Kesanggupan"
                maxFiles={1}
              />
            </div>

            <div className="flex flex-col gap-2 rounded-2xl border border-border-strong bg-text/5 p-4">
              <Info className="size-6 text-brand" />
              <p className="text-sm text-text">
                Opsional: Jika dokumen belum ada, laporan akan disimpan sebagai &apos;Pending
                Document&apos; dengan masa tenggang 7 hari.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function isSettlementLeniency(state: LaporInsidenStep5State) {
  return state.metode === "leniency_request";
}

export { Step5BentukPenyelesaian, isSettlementLeniency };
