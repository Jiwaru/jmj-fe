"use client";

import { Check } from "lucide-react";
import { AppSelect } from "@/components/domain/AppSelect";
import { AppCheckboxDialog } from "@/components/domain/AppCheckboxDialog";
import { AppTextarea } from "@/components/domain/AppTextarea";
import { AppPhotoUpload } from "@/components/domain/AppPhotoUpload";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  PENYEBAB_OPTIONS,
  TINDAKAN_OPTIONS,
  ANALISA_KERUSAKAN_OPTIONS,
  KESIMPULAN_OPTIONS,
  tindakanLabel,
} from "../options";
import type { LaporInsidenStep2State } from "../types";

interface Step2KronologiDokumentasiProps {
  value: LaporInsidenStep2State;
  onChange: (value: LaporInsidenStep2State) => void;
}

function Step2KronologiDokumentasi({
  value,
  onChange,
}: Step2KronologiDokumentasiProps) {
  function update<K extends keyof LaporInsidenStep2State>(
    key: K,
    fieldValue: LaporInsidenStep2State[K]
  ) {
    onChange({ ...value, [key]: fieldValue });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h1 className="text-base font-medium text-text">Kronologi & Dokumentasi TKP</h1>
        <p className="text-sm text-text-muted">
          Detail kejadian dan bukti visual di lapangan.
        </p>
      </div>

      <section className="flex flex-col gap-6 rounded-2xl border border-border-strong bg-bg p-6">
        <h2 className="text-lg font-medium text-text">Detail Kejadian</h2>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-text">Penyebab Kejadian</label>
          <AppSelect
            options={PENYEBAB_OPTIONS}
            placeholder="Pilih Penyebab Kejadian"
            value={value.penyebab}
            onValueChange={(penyebab) =>
              update("penyebab", penyebab as LaporInsidenStep2State["penyebab"])
            }
          />
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold text-text">Tindakan yang Diambil</span>

          {value.tindakan.length > 0 && (
            <div className="flex flex-col gap-3">
              {value.tindakan.map((tindakan) => (
                <div key={tindakan} className="flex items-start gap-2 pl-4">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-none border-2 border-green-600 bg-green-600">
                    <Check className="size-3.5 text-white" strokeWidth={3} />
                  </span>
                  <span className="flex-1 text-base text-text">
                    {tindakanLabel(tindakan)}
                  </span>
                </div>
              ))}
            </div>
          )}

          <AppCheckboxDialog
            options={TINDAKAN_OPTIONS}
            value={value.tindakan}
            onValueChange={(tindakan) =>
              update("tindakan", tindakan as LaporInsidenStep2State["tindakan"])
            }
            title="Tindakan yang Diambil"
            description="Petugas dapat memilih lebih dari satu tindakan standar operasional"
            triggerLabel="Tambah Tindakan"
          />
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold text-text">Analisa Kerusakan</span>
          <RadioGroup
            value={value.analisa_kerusakan ?? ""}
            onValueChange={(analisa_kerusakan) =>
              update(
                "analisa_kerusakan",
                analisa_kerusakan as LaporInsidenStep2State["analisa_kerusakan"]
              )
            }
            className="gap-3"
          >
            {ANALISA_KERUSAKAN_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex items-start gap-2 pl-4"
              >
                <RadioGroupItem
                  value={option.value}
                  className="mt-1 size-5 border-2 border-border-strong data-checked:border-brand data-checked:bg-brand"
                />
                <div className="flex flex-1 flex-col">
                  <span className="text-base font-medium text-text">
                    {option.label}
                  </span>
                  {option.description && (
                    <span className="text-sm text-text-muted">
                      {option.description}
                    </span>
                  )}
                </div>
              </label>
            ))}
          </RadioGroup>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-text">
            Kesimpulan &amp; Saran
          </label>
          <AppSelect
            options={KESIMPULAN_OPTIONS}
            placeholder="Pilih Tindakan Lanjut"
            value={value.kesimpulan}
            onValueChange={(kesimpulan) =>
              update("kesimpulan", kesimpulan as LaporInsidenStep2State["kesimpulan"])
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-text-muted">Catatan Uraian</label>
          <AppTextarea
            placeholder="Tulis kronologi kejadian di sini..."
            value={value.catatan_uraian}
            onChange={(e) => update("catatan_uraian", e.target.value)}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-border-strong bg-bg p-6">
        <div className="flex flex-col">
          <h2 className="text-lg font-medium text-text">Dokumentasi TKP</h2>
          <p className="text-sm text-text-muted">
            Unggah foto kondisi tempat kejadian perkara.
          </p>
        </div>

        <AppPhotoUpload
          value={value.foto_dokumentasi}
          onValueChange={(foto_dokumentasi) => update("foto_dokumentasi", foto_dokumentasi)}
          label="Ambil Foto TKP"
          helperText="atau pilih dari galeri"
          maxFiles={3}
        />
      </section>
    </div>
  );
}

export { Step2KronologiDokumentasi };
