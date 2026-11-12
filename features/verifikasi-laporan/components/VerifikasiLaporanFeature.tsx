import { AppIncidentCard } from "@/components/domain/AppIncidentCard";
import { AppPageHeader } from "@/components/domain/AppPageHeader";
import { MOCK_PRIORITY_INCIDENTS } from "@/lib/mock/incident-report";

export function VerifikasiLaporanFeature() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Page Header */}
      <AppPageHeader 
        title="Verifikasi Laporan" 
        description="Kelola dan verifikasi antrean laporan insiden lapangan." 
      />

      {/* Grid: 1 col mobile, 2 col desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
        {MOCK_PRIORITY_INCIDENTS.map((item) => (
          <AppIncidentCard key={item.uuid} item={item} />
        ))}
      </div>
    </div>
  );
}
