"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { AppInput } from "@/components/domain/AppInput";
import { AppSelect } from "@/components/domain/AppSelect";
import { cn } from "@/lib/utils";
import { GOLONGAN_OPTIONS, TIPE_OPTIONS } from "../options";
import type { PihakTerlibat } from "../types";

interface PihakCardProps {
  index: number;
  value: PihakTerlibat;
  onChange: (value: PihakTerlibat) => void;
  onRemove?: () => void;
}

function PihakCard({ index, value, onChange, onRemove }: PihakCardProps) {
  const [collapsed, setCollapsed] = useState(false);
  const canRemove = Boolean(onRemove);

  function update<K extends keyof PihakTerlibat>(key: K, fieldValue: PihakTerlibat[K]) {
    onChange({ ...value, [key]: fieldValue });
  }

  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-border-strong bg-bg p-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => canRemove && setCollapsed((prev) => !prev)}
          className="flex items-center gap-1 text-lg font-medium text-text"
        >
          Pihak {index + 1}
          {canRemove &&
            (collapsed ? (
              <ChevronDown className="size-5" />
            ) : (
              <ChevronUp className="size-5" />
            ))}
        </button>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1 text-sm font-medium text-destructive"
          >
            <Trash2 className="size-4" />
            Hapus
          </button>
        )}
      </div>

      {!collapsed && (
        <>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text">Nama Lengkap</label>
              <AppInput
                placeholder="Masukkan nama lengkap"
                value={value.nama_lengkap}
                onChange={(e) => update("nama_lengkap", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text">NIK KTP</label>
              <AppInput
                placeholder="16-Digit NIK"
                inputMode="numeric"
                maxLength={16}
                value={value.nik_ktp}
                onChange={(e) => update("nik_ktp", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text">Nomor SIM</label>
              <AppInput
                placeholder="16-Digit NIK"
                inputMode="numeric"
                value={value.nomor_sim}
                onChange={(e) => update("nomor_sim", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text">No. Telepon / HP</label>
              <AppInput
                placeholder="08xx-xxxx-xxxx"
                inputMode="tel"
                value={value.no_telepon}
                onChange={(e) => update("no_telepon", e.target.value)}
              />
            </div>
          </div>

          <div className="h-px bg-border-strong" />

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text">Golongan Kendaraan</label>
              <AppSelect
                options={GOLONGAN_OPTIONS}
                placeholder="Pilih Golongan"
                value={value.golongan_kendaraan}
                onValueChange={(golongan_kendaraan) =>
                  update(
                    "golongan_kendaraan",
                    golongan_kendaraan as PihakTerlibat["golongan_kendaraan"]
                  )
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text">Tipe Kendaraan</label>
              <AppSelect
                options={TIPE_OPTIONS}
                placeholder="Pilih Tipe"
                value={value.tipe_kendaraan}
                onValueChange={(tipe_kendaraan) =>
                  update("tipe_kendaraan", tipe_kendaraan as PihakTerlibat["tipe_kendaraan"])
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text">Plat Nomor</label>
              <AppInput
                placeholder="B 1234 XYZ"
                value={value.plat_nomor}
                onChange={(e) => update("plat_nomor", e.target.value)}
                className={cn(
                  "py-5 text-center text-lg font-semibold",
                  value.plat_nomor
                    ? "border-brand bg-brand/10 text-brand"
                    : "border-border-strong text-text-muted"
                )}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export { PihakCard };
