// DUMMY — backend belum terhubung, lihat lib/types/asset-catalog.ts untuk catatan sumber.

import type { AssetCatalogItem, AssetCategoryOption } from "@/lib/types/asset-catalog";

export const MOCK_ASSET_CATEGORIES: AssetCategoryOption[] = [
  { id: "guardrail", name: "Guardrail" },
  { id: "pju", name: "PJU (Penerangan Jalan Umum)" },
  { id: "marka_jalan", name: "Marka Jalan" },
  { id: "rambu", name: "Rambu" },
  { id: "pagar_rumput", name: "Pagar Rumput" },
];

export const MOCK_ASSET_CATALOG_ITEMS: AssetCatalogItem[] = [
  {
    id: "guardrail-beam",
    category_id: "guardrail",
    category_label: "PJU",
    name: "Guardrail Beam (W-Beam)",
    unit_price: 1_200_000,
    unit_label: "bh",
  },
  {
    id: "guardrail-post",
    category_id: "guardrail",
    category_label: "Guardrail",
    name: "Guardrail Post (Tiang Penyangga)",
    unit_price: 8_500_000,
    unit_label: "bh",
  },
  {
    id: "guardrail-terminal",
    category_id: "guardrail",
    category_label: "Guardrail",
    name: "Guardrail Terminal / End Piece",
    unit_price: 8_500_000,
    unit_label: "bh",
  },
  {
    id: "pju-tiang-octagonal",
    category_id: "pju",
    category_label: "PJU",
    name: "Tiang Lampu PJU Octagonal 9m",
    unit_price: 8_500_000,
    unit_label: "bh",
  },
];
