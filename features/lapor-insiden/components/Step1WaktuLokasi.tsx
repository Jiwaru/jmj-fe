"use client";

import { AppSelect } from "@/components/domain/AppSelect";
import { AppDatePicker } from "@/components/domain/AppDatePicker";
import { AppInput } from "@/components/domain/AppInput";
import { cn } from "@/lib/utils";
import { LAJUR_OPTIONS, CUACA_OPTIONS } from "../options";
import type { LaporInsidenStep1State } from "../types";

interface Step1WaktuLokasiProps {
  value: LaporInsidenStep1State;
  onChange: (value: LaporInsidenStep1State) => void;
}

function Step1WaktuLokasi({ value, onChange }: Step1WaktuLokasiProps) {
  function update<K extends keyof LaporInsidenStep1State>(
    key: K,
    fieldValue: LaporInsidenStep1State[K]
  ) {
    onChange({ ...value, [key]: fieldValue });
  }

  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-4 rounded-2xl border border-border-strong bg-bg p-6">
        <h2 className="text-lg font-medium text-text">Waktu Kejadian</h2>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-text">Tanggal</label>
          <AppDatePicker
            value={value.tanggal}
            onValueChange={(tanggal) => update("tanggal", tanggal)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-text">Waktu</label>
          <div className="flex items-center gap-2">
            <div className="min-w-0 flex-1">
              <AppInput
                type="text"
                inputMode="numeric"
                maxLength={2}
                placeholder="00"
                value={value.jam}
                onChange={(e) => update("jam", e.target.value)}
                className="text-center"
              />
            </div>
            <span className="text-xl font-semibold text-text">:</span>
            <div className="min-w-0 flex-1">
              <AppInput
                type="text"
                inputMode="numeric"
                maxLength={2}
                placeholder="00"
                value={value.menit}
                onChange={(e) => update("menit", e.target.value)}
                className="text-center"
              />
            </div>
            <span className="shrink-0 rounded-lg border border-border-strong bg-text/10 px-4 py-3 text-md text-text">
              WIB
            </span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-border-strong bg-bg p-6">
        <h2 className="text-lg font-medium text-text">Lokasi Kejadian</h2>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-text">Arah Ruas</label>
          <div className="flex rounded-lg bg-bg-subtle p-1">
            {(["A", "B"] as const).map((arah) => (
              <button
                key={arah}
                type="button"
                onClick={() => update("arah_ruas", arah)}
                className={cn(
                  "flex-1 rounded-sm py-2 text-sm",
                  value.arah_ruas === arah
                    ? "bg-brand text-white"
                    : "text-text-muted"
                )}
              >
                Jalur {arah}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-text">Lajur</label>
          <AppSelect
            options={LAJUR_OPTIONS}
            placeholder="Pilih Lajur"
            value={value.lajur}
            onValueChange={(lajur) =>
              update("lajur", lajur as LaporInsidenStep1State["lajur"])
            }
          />
        </div>

        <div className="flex items-end justify-center gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm text-text">KM</label>
            <AppInput
              type="text"
              inputMode="numeric"
              placeholder="000"
              value={value.km}
              onChange={(e) => update("km", e.target.value)}
              className="text-center"
            />
          </div>
          <span className="pb-3 text-text-muted">+</span>
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm text-text">M</label>
            <AppInput
              type="text"
              inputMode="numeric"
              placeholder="000"
              value={value.m}
              onChange={(e) => update("m", e.target.value)}
              className="text-center"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-border-strong bg-bg p-6">
        <h2 className="text-lg font-medium text-text">Kondisi Cuaca</h2>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-text">Cuaca</label>
          <AppSelect
            options={CUACA_OPTIONS}
            placeholder="Kondisi cuaca"
            value={value.cuaca}
            onValueChange={(cuaca) =>
              update("cuaca", cuaca as LaporInsidenStep1State["cuaca"])
            }
          />
        </div>
      </section>
    </div>
  );
}

export { Step1WaktuLokasi };
