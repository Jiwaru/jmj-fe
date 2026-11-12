"use client";

import { Minus, Plus } from "lucide-react";

interface AppQuantityStepperProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
}

function AppQuantityStepper({ value, onValueChange, min = 1 }: AppQuantityStepperProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onValueChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Kurangi jumlah"
        className="flex size-8 items-center justify-center rounded-full bg-text/10 text-text disabled:opacity-40"
      >
        <Minus className="size-4" />
      </button>
      <span className="w-4 text-center text-base font-medium text-text">{value}</span>
      <button
        type="button"
        onClick={() => onValueChange(value + 1)}
        aria-label="Tambah jumlah"
        className="flex size-8 items-center justify-center rounded-full bg-text/10 text-text"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}

export { AppQuantityStepper };
