"use client";

import { AppInput } from "@/components/domain/AppInput";
import { AppTextarea } from "@/components/domain/AppTextarea";
import { formatRupiah } from "@/lib/utils/currency";
import { DamagedAssetCard } from "./DamagedAssetCard";
import { TambahAsetRusakDialog } from "./TambahAsetRusakDialog";
import type { LaporInsidenStep4State } from "../types";

interface Step4KalkulasiKerusakanProps {
  value: LaporInsidenStep4State;
  onChange: (value: LaporInsidenStep4State) => void;
}

function Step4KalkulasiKerusakan({ value, onChange }: Step4KalkulasiKerusakanProps) {
  function updateQty(id: string, qty: number) {
    onChange({
      ...value,
      aset_rusak: value.aset_rusak.map((entry) =>
        entry.id === id ? { ...entry, qty } : entry
      ),
    });
  }

  function removeEntry(id: string) {
    onChange({
      ...value,
      aset_rusak: value.aset_rusak.filter((entry) => entry.id !== id),
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-base font-medium text-text">Kalkulasi Kerusakan Aset</h1>
        <p className="text-sm text-text-muted">
          Review dan sesuaikan jumlah aset yang perlu diganti.
        </p>
      </div>

      <TambahAsetRusakDialog
        onAdd={(entry) =>
          onChange({ ...value, aset_rusak: [...value.aset_rusak, entry] })
        }
      />

      {value.aset_rusak.length > 0 ? (
        <div className="flex flex-col gap-2">
          {value.aset_rusak.map((entry) => (
            <DamagedAssetCard
              key={entry.id}
              value={entry}
              onQtyChange={(qty) => updateQty(entry.id, qty)}
              onRemove={() => removeEntry(entry.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-border-strong">
          <span className="text-sm font-medium text-text-muted">Daftar Aset Rusak</span>
        </div>
      )}

      <div className="flex flex-col gap-4 rounded-2xl border border-border-strong bg-bg p-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-text">Biaya Tambahan (Opsional)</label>
          <AppInput
            icon={<span className="text-base font-medium text-text">Rp</span>}
            inputMode="numeric"
            placeholder="0"
            value={value.biaya_tambahan}
            onChange={(e) => onChange({ ...value, biaya_tambahan: e.target.value })}
            className="pl-11 text-base"
          />
          <p className="text-xs text-text-muted">
            Misal: Biaya mobilisasi alat berat atau tenaga khusus.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-text">Catatan Kalkulasi</label>
          <AppTextarea
            placeholder="Tambahkan keterangan spesifik terkait kerusakan atau perbaikan..."
            value={value.catatan_kalkulasi}
            onChange={(e) => onChange({ ...value, catatan_kalkulasi: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

function getStep4Total(value: LaporInsidenStep4State) {
  const itemsTotal = value.aset_rusak.reduce(
    (sum, entry) => sum + entry.unit_price * entry.qty,
    0
  );
  const biayaTambahan = Number(value.biaya_tambahan) || 0;
  return itemsTotal + biayaTambahan;
}

export { Step4KalkulasiKerusakan, getStep4Total, formatRupiah };
