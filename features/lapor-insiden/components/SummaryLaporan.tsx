"use client";

import {
  AlertTriangle,
  Calendar,
  CreditCard,
  FileText,
  Pencil,
  Send,
  User,
} from "lucide-react";
import { AppBadge } from "@/components/domain/AppBadge";
import { AppButton } from "@/components/domain/AppButton";
import { AppDotSeparator } from "@/components/domain/AppDotSeparator";
import { AppFileThumbnail } from "@/components/domain/AppFileThumbnail";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { formatRupiah } from "@/lib/utils/currency";
import { formatTanggal, formatTanggalJamWIB } from "@/lib/utils/date";
import {
  cuacaLabel,
  penyebabLabel,
  tindakanLabel,
  analisaKerusakanLabel,
  kesimpulanLabel,
  golonganLabel,
  tipeKendaraanLabel,
  settlementLabel,
  ANALISA_KERUSAKAN_OPTIONS,
} from "../options";
import { getStep4Total } from "./Step4KalkulasiKerusakan";
import type {
  LaporInsidenStep1State,
  LaporInsidenStep2State,
  LaporInsidenStep3State,
  LaporInsidenStep4State,
  LaporInsidenStep5State,
} from "../types";

const DAMAGE_BADGE_VARIANT: Record<string, "destructive" | "warning" | "success"> = {
  heavy_damage: "destructive",
  light_damage: "warning",
  no_damage: "success",
};

interface SummaryLaporanProps {
  step1: LaporInsidenStep1State;
  step2: LaporInsidenStep2State;
  step3: LaporInsidenStep3State;
  step4: LaporInsidenStep4State;
  step5: LaporInsidenStep5State;
  onEdit?: (view: "step1" | "step2" | "step3" | "step4" | "step5") => void;
  title?: string;
  description?: string;
  waktuLabel?: string;
  waktu?: Date;
}

function isSummaryPending(step3: LaporInsidenStep3State, step5: LaporInsidenStep5State) {
  const showStep4And5 = step3.ada_kerusakan_aset;
  const isLeniency = showStep4And5 && step5.metode === "leniency_request";
  return isLeniency && step5.dokumen_kesanggupan.length === 0;
}

function lajurLabel(lajur: LaporInsidenStep1State["lajur"]) {
  if (!lajur) return "-";
  return lajur === "shoulder" ? "Bahu Jalan" : `Lajur ${lajur.replace("lane_", "")}`;
}

function damageBadgeLabel(analisa: LaporInsidenStep2State["analisa_kerusakan"]) {
  const option = ANALISA_KERUSAKAN_OPTIONS.find((o) => o.value === analisa);
  if (!option) return analisaKerusakanLabel(analisa);
  return option.description ? `${option.label} (${option.description})` : option.label;
}

function tenggangDeadline() {
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 7);
  return formatTanggal(deadline);
}

function SectionHeader({ title, onEdit }: { title: string; onEdit?: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-medium text-text">{title}</h2>
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1 text-sm text-brand"
        >
          <Pencil className="size-4" />
          Edit
        </button>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-text-muted">{label}</span>
      <div className="text-sm font-medium text-text">{children}</div>
    </div>
  );
}

function SummaryLaporan({
  step1,
  step2,
  step3,
  step4,
  step5,
  onEdit,
  title = "Ringkasan Laporan",
  description = "Tinjau kembali seluruh detail laporan sebelum mengirimkan data akhir ke sistem.",
  waktuLabel = "Waktu Pembuatan:",
  waktu,
}: SummaryLaporanProps) {
  const showStep4And5 = step3.ada_kerusakan_aset;
  const isLeniency = showStep4And5 && step5.metode === "leniency_request";
  const hasDokumen = step5.dokumen_kesanggupan.length > 0;
  const isPending = isLeniency && !hasDokumen;
  const step4Total = getStep4Total(step4);

  function edit(view: "step1" | "step2" | "step3" | "step4" | "step5") {
    return onEdit ? () => onEdit(view) : undefined;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h1 className="text-base font-medium text-text">{title}</h1>
        <p className="text-sm text-text-muted">{description}</p>
      </div>

      <div className="flex items-start justify-between">
        {isPending ? (
          <AppBadge variant="destructive" className="rounded-sm px-4 py-2 text-sm font-semibold">
            PENDING DOCUMENT
          </AppBadge>
        ) : (
          <span />
        )}
        <div className="flex flex-col items-end">
          <span className="w-28 text-xs text-text-muted">{waktuLabel}</span>
          <span className="text-xs font-medium text-text">
            {formatTanggalJamWIB(waktu ?? new Date())}
          </span>
        </div>
      </div>

      <section className="flex flex-col gap-6 rounded-2xl border border-border-strong bg-bg p-6">
        <SectionHeader title="Informasi Kejadian" onEdit={edit("step1")} />
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-text-muted">Waktu Kejadian</span>
            <div className="flex items-center gap-2 text-sm font-medium text-text">
              <span>{step1.tanggal ? formatTanggal(step1.tanggal) : "-"}</span>
              <AppDotSeparator />
              <span>
                {step1.jam.padStart(2, "0")}:{step1.menit.padStart(2, "0")} WIB
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-text-muted">Lokasi</span>
            <div className="flex items-center gap-2 text-sm font-medium text-text">
              <span>
                KM {step1.km || "-"}+{step1.m || "-"}
              </span>
              <AppDotSeparator />
              <span>Jalur {step1.arah_ruas}</span>
              <AppDotSeparator />
              <span>{lajurLabel(step1.lajur)}</span>
            </div>
          </div>
          <Field label="Kondisi Cuaca">{cuacaLabel(step1.cuaca)}</Field>
        </div>
      </section>

      <section className="flex flex-col gap-6 rounded-2xl border border-border-strong bg-bg p-6">
        <SectionHeader title="Kronologi Kejadian" onEdit={edit("step2")} />

        <div className="flex flex-col gap-4">
          <Field label="Penyebab Insiden">{penyebabLabel(step2.penyebab)}</Field>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-text-muted">Tindakan Diambil</span>
            <div className="text-sm font-medium text-text">
              {step2.tindakan.map((tindakan) => (
                <div key={tindakan}>{tindakanLabel(tindakan)}</div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-text-muted">Analisa Kerusakan</span>
            <AppBadge
              variant={DAMAGE_BADGE_VARIANT[step2.analisa_kerusakan ?? ""] ?? "neutral"}
              solid
              className="rounded-sm px-3 py-1.5 text-sm"
            >
              {damageBadgeLabel(step2.analisa_kerusakan)}
            </AppBadge>
          </div>

          <Field label="Rekomendasi">{kesimpulanLabel(step2.kesimpulan)}</Field>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-text-muted">Catatan Uraian</span>
            <p className="rounded-lg bg-text/5 p-4 text-sm text-text-muted">
              {step2.catatan_uraian || "-"}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-text-muted">Dokumentasi Lapangan</span>
            {step2.foto_dokumentasi.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {step2.foto_dokumentasi.map((file, index) => (
                  <AppFileThumbnail key={index} file={file} className="aspect-square w-full" />
                ))}
              </div>
            ) : (
              <span className="text-sm text-text-muted">Belum ada dokumentasi.</span>
            )}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 rounded-2xl border border-border-strong bg-bg p-6">
        <SectionHeader title="Pihak Terlibat" onEdit={edit("step3")} />

        {step3.pihak_terlibat.map((pihak, index) => (
          <div key={pihak.id} className="flex flex-col gap-4">
            {index > 0 && <div className="h-px bg-border" />}
            <span className="text-base font-medium text-text">Pihak {index + 1}</span>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm font-medium text-text">
                <User className="size-5 text-brand" />
                {pihak.nama_lengkap || "-"}
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="size-5 shrink-0 text-brand" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-text">NIK</span>
                  <span className="text-sm font-medium text-text-muted">
                    {pihak.nik_ktp || "-"}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="size-5 shrink-0 text-brand" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-text">SIM</span>
                  <span className="text-sm font-medium text-text-muted">
                    {pihak.nomor_sim || "-"}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="size-5 shrink-0 text-brand" />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-text">
                    <span>GOLONGAN {golonganLabel(pihak.golongan_kendaraan).replace("Golongan ", "")}</span>
                    <AppDotSeparator className="bg-text-muted" />
                    <span>{tipeKendaraanLabel(pihak.tipe_kendaraan)}</span>
                  </div>
                  <span className="w-fit border border-border-strong bg-text/10 px-6 py-2 text-sm font-semibold text-text">
                    {pihak.plat_nomor || "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {showStep4And5 && (
        <>
          <section className="flex flex-col gap-6 rounded-2xl border border-border-strong bg-bg p-6">
            <SectionHeader title="Rincian Ganti Rugi Aset" onEdit={edit("step4")} />

            <div className="flex items-center gap-2 text-sm font-medium text-destructive">
              <AlertTriangle className="size-5" />
              Ada Kerusakan Aset Tol
            </div>

            <div className="flex flex-col gap-3">
              {step4.aset_rusak.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-start justify-between border-b border-border pb-3"
                >
                  <span className="text-sm text-text-muted">
                    {entry.name} ({entry.qty} {entry.unit_label})
                  </span>
                  <span className="text-sm font-medium text-text">
                    {formatRupiah(entry.unit_price * entry.qty)}
                  </span>
                </div>
              ))}
              <div className="flex items-end justify-between">
                <span className="text-sm text-text-muted">Total Estimasi</span>
                <span className="text-lg font-semibold text-brand">
                  {formatRupiah(step4Total)}
                </span>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6 rounded-2xl border border-border-strong bg-bg p-6">
            <SectionHeader title="Resolusi & Penyelesaian" onEdit={edit("step5")} />

            <div className="flex flex-col gap-4">
              <Field label="Metode Penyelesaian">{settlementLabel(step5.metode)}</Field>

              {isLeniency && (
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-text-muted">Status Dokumen</span>
                  <div className="flex flex-col gap-1">
                    {hasDokumen ? (
                      <AppBadge variant="success" className="px-4 py-2">
                        Terlampir
                      </AppBadge>
                    ) : (
                      <>
                        <AppBadge variant="destructive" className="px-4 py-2">
                          Belum Dilampirkan (Pending Document)
                        </AppBadge>
                        <span className="text-xs text-destructive">
                          Batas Waktu Susulan: {tenggangDeadline()} (Masa Tenggang 7 Hari)
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

interface SummaryFooterProps {
  step3: LaporInsidenStep3State;
  step5: LaporInsidenStep5State;
  agreed: boolean;
  onAgreedChange: (agreed: boolean) => void;
  onSubmit: () => void;
}

function SummaryFooter({ step3, step5, agreed, onAgreedChange, onSubmit }: SummaryFooterProps) {
  const isPending = isSummaryPending(step3, step5);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {isPending && (
          <div className="flex items-center gap-2 rounded-lg border border-brand bg-brand/10 p-4">
            <AlertTriangle className="size-6 shrink-0 text-brand" />
            <p className="flex-1 text-xs text-text">
              Laporan akan disimpan dalam masa tenggang 7 hari kerja untuk menunggu kelengkapan
              dokumen.
            </p>
          </div>
        )}

        <label className="flex items-start gap-3">
          <Checkbox
            checked={agreed}
            onCheckedChange={(checked) => onAgreedChange(checked === true)}
            className="mt-0.5 size-5 shrink-0 rounded-none border-2 border-border-strong data-checked:border-brand data-checked:bg-brand"
          />
          <span className="text-sm text-text">
            Saya menyatakan bahwa data kronologi dan rincian aset sesuai dengan fakta di
            lapangan.
          </span>
        </label>
      </div>

      <AppButton
        type="button"
        variant="dark"
        disabled={!agreed}
        onClick={onSubmit}
        className={cn(!agreed && "opacity-20")}
      >
        Kirim Laporan Insiden
        <Send className="size-5" />
      </AppButton>
    </div>
  );
}

export { SummaryLaporan, SummaryFooter };
