"use client";

import { useState } from "react";
import { ArrowLeft, ChevronRight, Plus, Search, Wrench, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AppInput } from "@/components/domain/AppInput";
import { AppQuantityStepper } from "@/components/domain/AppQuantityStepper";
import { formatRupiah } from "@/lib/utils/currency";
import { MOCK_ASSET_CATEGORIES, MOCK_ASSET_CATALOG_ITEMS } from "@/lib/mock/asset-catalog";
import { cn } from "@/lib/utils";
import type { AssetCatalogItem } from "@/lib/types/asset-catalog";
import type { DamagedAssetEntry } from "../types";

type DrillStep = "category" | "items" | "detail";

const STEP_ORDER: DrillStep[] = ["category", "items", "detail"];

interface TambahAsetRusakDialogProps {
  onAdd: (entry: DamagedAssetEntry) => void;
}

function TambahAsetRusakDialog({ onAdd }: TambahAsetRusakDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<DrillStep>("category");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<AssetCatalogItem | null>(null);
  const [qty, setQty] = useState(1);
  const [search, setSearch] = useState("");

  function reset() {
    setStep("category");
    setSelectedCategoryId(null);
    setSelectedItem(null);
    setQty(1);
    setSearch("");
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) reset();
    setOpen(nextOpen);
  }

  function handleSelectCategory(categoryId: string) {
    setSelectedCategoryId(categoryId);
    setStep("items");
  }

  function handleSelectItem(item: AssetCatalogItem) {
    setSelectedItem(item);
    setQty(1);
    setStep("detail");
  }

  function handleTambahkan() {
    if (!selectedItem) return;
    onAdd({
      id: crypto.randomUUID(),
      catalog_item_id: selectedItem.id,
      category_label: selectedItem.category_label,
      name: selectedItem.name,
      unit_price: selectedItem.unit_price,
      unit_label: selectedItem.unit_label,
      qty,
    });
    handleOpenChange(false);
  }

  const filteredCategories = MOCK_ASSET_CATEGORIES.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const categoryItems = MOCK_ASSET_CATALOG_ITEMS.filter(
    (item) => item.category_id === selectedCategoryId
  );

  const selectedCategory = MOCK_ASSET_CATEGORIES.find(
    (category) => category.id === selectedCategoryId
  );

  const stepIndex = STEP_ORDER.indexOf(step);

  function paneClassName(target: DrillStep) {
    const targetIndex = STEP_ORDER.indexOf(target);
    const offset = targetIndex - stepIndex;
    return cn(
      "absolute inset-0 flex flex-col transition-transform duration-200 ease-out",
      offset === 0 && "translate-x-0",
      offset < 0 && "-translate-x-full",
      offset > 0 && "translate-x-full"
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-brand bg-brand/10 px-4 py-6">
        <Plus className="size-8 text-brand" />
        <span className="text-base font-semibold text-brand">Tambah Aset Rusak</span>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="block h-128 w-96 max-w-[calc(100%-2rem)] overflow-hidden rounded-2xl p-0"
      >
        <div className="relative h-full w-full">
        <div className={paneClassName("category")}>
          <div className="flex h-full min-h-0 flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-text">Pilih Kategori Aset</h2>
              <button type="button" onClick={() => handleOpenChange(false)} aria-label="Tutup">
                <X className="size-5 text-text" />
              </button>
            </div>

            <div className="relative w-full">
              <AppInput
                placeholder="Cari kategori aset..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-full pr-11 text-base"
              />
              <Search className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
              {filteredCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleSelectCategory(category.id)}
                  className="flex items-center justify-between gap-3 border-b border-border pb-4 last:border-b-0"
                >
                  <div className="flex flex-1 items-center gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand/10">
                      <Wrench className="size-4 text-brand" />
                    </span>
                    <span className="flex-1 text-left text-base font-medium text-text">
                      {category.name}
                    </span>
                  </div>
                  <ChevronRight className="size-6 text-text-muted" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={paneClassName("items")}>
          <div className="flex h-full min-h-0 flex-col gap-4 py-6">
            <div className="relative flex shrink-0 items-center px-6">
              <button type="button" onClick={() => setStep("category")} aria-label="Kembali">
                <ArrowLeft className="size-6 text-text" />
              </button>
              <h2 className="pointer-events-none absolute inset-x-12 truncate text-center text-lg font-medium text-text">
                {selectedCategory?.name ?? "Komponen"}
              </h2>
            </div>

            <div className="h-46 w-full shrink-0 bg-text/10" />

            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4">
              {categoryItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectItem(item)}
                  className="flex items-center gap-5 border-b border-border-strong pb-4 last:border-b-0"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <span className="size-16 shrink-0 rounded-lg bg-text/20" />
                    <div className="flex min-w-0 flex-col items-start gap-0.5 text-left">
                      <span className="line-clamp-1 text-sm font-semibold text-text">
                        {item.name}
                      </span>
                      <span className="text-sm text-text-muted">
                        {formatRupiah(item.unit_price)} / {item.unit_label}
                      </span>
                    </div>
                  </div>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand/10">
                    <Plus className="size-4 text-brand" />
                  </span>
                </button>
              ))}
              {categoryItems.length === 0 && (
                <p className="text-sm text-text-muted">
                  Belum ada komponen untuk kategori ini.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className={paneClassName("detail")}>
          {selectedItem && (
            <div className="flex h-full min-h-0 flex-col gap-4 py-6">
              <div className="relative flex shrink-0 items-center px-6">
                <button type="button" onClick={() => setStep("items")} aria-label="Kembali">
                  <ArrowLeft className="size-6 text-text" />
                </button>
                <h2 className="pointer-events-none absolute inset-x-12 truncate text-center text-lg font-medium text-text">
                  {selectedCategory?.name}
                </h2>
              </div>

              <div className="h-60 w-full shrink-0 bg-text/10" />

              <div className="flex min-h-0 flex-1 flex-col gap-10 overflow-y-auto px-4">
                <div className="flex flex-col gap-4">
                  <span className="text-lg font-semibold text-text">{selectedItem.name}</span>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-brand">
                      {formatRupiah(selectedItem.unit_price)} / {selectedItem.unit_label}
                    </span>
                    <AppQuantityStepper value={qty} onValueChange={setQty} />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-muted">SUBTOTAL</span>
                    <span className="text-base font-medium text-text">
                      {formatRupiah(selectedItem.unit_price * qty)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleTambahkan}
                    className="flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white"
                  >
                    <Plus className="size-4" />
                    Tambahkan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { TambahAsetRusakDialog };
