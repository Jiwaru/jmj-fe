"use client";

import { Trash2 } from "lucide-react";
import { AppBadge } from "@/components/domain/AppBadge";
import { AppQuantityStepper } from "@/components/domain/AppQuantityStepper";
import { formatRupiah } from "@/lib/utils/currency";
import type { DamagedAssetEntry } from "../types";

interface DamagedAssetCardProps {
  value: DamagedAssetEntry;
  onQtyChange: (qty: number) => void;
  onRemove: () => void;
}

function DamagedAssetCard({ value, onQtyChange, onRemove }: DamagedAssetCardProps) {
  const subtotal = value.unit_price * value.qty;

  return (
    <div className="flex flex-col gap-8 rounded-2xl border border-border-strong bg-bg p-4">
      <div className="flex items-start gap-6">
        <div className="flex flex-1 flex-col gap-2">
          <AppBadge variant="brand" outline className="px-3 py-1">
            {value.category_label}
          </AppBadge>
          <div className="flex flex-col">
            <span className="line-clamp-1 text-lg font-medium text-text">{value.name}</span>
            <span className="text-base text-text-muted">
              {formatRupiah(value.unit_price)} / {value.unit_label}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Hapus ${value.name}`}
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive"
        >
          <Trash2 className="size-5" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-text-muted">SUBTOTAL</span>
          <span className="text-base font-medium text-text">{formatRupiah(subtotal)}</span>
        </div>
        <AppQuantityStepper value={value.qty} onValueChange={onQtyChange} />
      </div>
    </div>
  );
}

export { DamagedAssetCard };
