// DUMMY sementara — bukan representasi asset_catalog/catalog_prices asli.
// Kategori "Guardrail", "PJU", dst di sini adalah label tampilan dari prototype Figma,
// BUKAN sama dengan enum resmi `asset_category` (road_body, road_equipment,
// complementary_structure, support_facility, connecting_road) di database-schema.md baris 27.
// TODO(K8): konfirmasi relasi kategori tampilan ini ke asset_category resmi, dan pastikan
// field harga di sini nanti diganti sumber catalog_prices asli (harga berversi, backend yang
// menghitung ulang subtotal — lihat database-schema.md baris 45).

export interface AssetCategoryOption {
  id: string;
  name: string;
}

export interface AssetCatalogItem {
  id: string;
  category_id: string;
  category_label: string; // badge singkat, misal "PJU"
  name: string;
  unit_price: number;
  unit_label: string; // misal "bh"
  image_url?: string;
}
