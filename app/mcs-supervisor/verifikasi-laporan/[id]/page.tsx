import { VerifikasiLaporanDetailFeature } from "@/features/verifikasi-laporan";

export default async function VerifikasiLaporanDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <VerifikasiLaporanDetailFeature id={id} />;
}
