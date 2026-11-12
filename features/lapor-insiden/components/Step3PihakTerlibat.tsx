"use client";

import { Info, Plus } from "lucide-react";
import { AppButton } from "@/components/domain/AppButton";
import { AppToggleSwitch } from "@/components/domain/AppToggleSwitch";
import { PihakCard } from "./PihakCard";
import { createPihakTerlibat, type LaporInsidenStep3State } from "../types";

interface Step3PihakTerlibatProps {
  value: LaporInsidenStep3State;
  onChange: (value: LaporInsidenStep3State) => void;
}

function Step3PihakTerlibat({ value, onChange }: Step3PihakTerlibatProps) {
  function updatePihak(id: string, pihak: LaporInsidenStep3State["pihak_terlibat"][number]) {
    onChange({
      ...value,
      pihak_terlibat: value.pihak_terlibat.map((p) => (p.id === id ? pihak : p)),
    });
  }

  function addPihak() {
    onChange({
      ...value,
      pihak_terlibat: [...value.pihak_terlibat, createPihakTerlibat()],
    });
  }

  function removePihak(id: string) {
    onChange({
      ...value,
      pihak_terlibat: value.pihak_terlibat.filter((p) => p.id !== id),
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h1 className="text-base font-medium text-text">Pihak Terlibat</h1>
        <p className="text-sm text-text-muted">
          Lengkapi data kendaraan dan pelaku yang terlibat.
        </p>
      </div>

      <div className="flex items-start gap-2 rounded-2xl border border-brand bg-brand/10 p-4">
        <Info className="size-6 shrink-0 text-brand" />
        <p className="flex-1 text-sm text-text">
          Data ini diperlukan untuk keperluan klaim asuransi / ganti rugi kerusakan.
        </p>
      </div>

      {value.pihak_terlibat.map((pihak, index) => (
        <PihakCard
          key={pihak.id}
          index={index}
          value={pihak}
          onChange={(next) => updatePihak(pihak.id, next)}
          onRemove={index > 0 ? () => removePihak(pihak.id) : undefined}
        />
      ))}

      <AppButton type="button" variant="dashed" onClick={addPihak}>
        <Plus className="size-6" />
        Tambah Pihak Terlibat
      </AppButton>

      <div className="h-px bg-border-strong" />

      <section className="flex flex-col gap-4 rounded-2xl border border-border-strong bg-bg p-6">
        <div className="flex flex-col gap-2">
          <Info className="size-8 text-brand" />
          <div className="flex flex-col">
            <h2 className="text-lg font-medium text-text">Apakah ada kerusakan aset?</h2>
            <p className="text-sm text-text">
              Memilih &apos;Tidak&apos; akan melewati tahap kalkulasi estimasi perbaikan
              material.
            </p>
          </div>
        </div>

        <AppToggleSwitch
          checked={value.ada_kerusakan_aset}
          onCheckedChange={(ada_kerusakan_aset) =>
            onChange({ ...value, ada_kerusakan_aset })
          }
          label={value.ada_kerusakan_aset ? "Iya" : "Tidak"}
        />
      </section>
    </div>
  );
}

export { Step3PihakTerlibat };
