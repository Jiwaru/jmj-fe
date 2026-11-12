"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AppButton } from "@/components/domain/AppButton";
import {
  Step1WaktuLokasi,
  Step2KronologiDokumentasi,
  Step3PihakTerlibat,
  Step4KalkulasiKerusakan,
  Step5BentukPenyelesaian,
  SummaryLaporan,
  SummaryFooter,
  LAPOR_INSIDEN_STEP1_INITIAL,
  LAPOR_INSIDEN_STEP2_INITIAL,
  createLaporInsidenStep3Initial,
  createLaporInsidenStep4Initial,
  createLaporInsidenStep5Initial,
  getStep4Total,
  formatRupiah,
  isSettlementLeniency,
  type LaporInsidenStep1State,
  type LaporInsidenStep2State,
  type LaporInsidenStep3State,
  type LaporInsidenStep4State,
  type LaporInsidenStep5State,
} from "@/features/lapor-insiden";
import { cn } from "@/lib/utils";

// Alur: step1 -> step2 -> step3 -> (ada_kerusakan_aset ? step4 -> step5 : langsung) -> summary.
// "Step X of 5" di header cuma untuk step1-5 (linear), summary bukan bagian dari hitungan itu
// dan tidak menampilkan header step count — lihat TODO(K8) di types.ts untuk field summary.
type PageView = "step1" | "step2" | "step3" | "step4" | "step5" | "summary";

const STEP_LABEL: Record<Exclude<PageView, "summary">, number> = {
  step1: 1,
  step2: 2,
  step3: 3,
  step4: 4,
  step5: 5,
};

const TOTAL_STEP = 5;

function isStep1Complete(state: LaporInsidenStep1State) {
  return Boolean(
    state.tanggal &&
      state.jam &&
      state.menit &&
      state.lajur &&
      state.km &&
      state.m &&
      state.cuaca
  );
}

function isStep2Complete(state: LaporInsidenStep2State) {
  return Boolean(
    state.penyebab &&
      state.tindakan.length > 0 &&
      state.catatan_uraian &&
      state.analisa_kerusakan &&
      state.kesimpulan &&
      state.foto_dokumentasi.length > 0
  );
}

function isStep3Complete(state: LaporInsidenStep3State) {
  return state.pihak_terlibat.every(
    (pihak) =>
      pihak.nama_lengkap &&
      pihak.nik_ktp &&
      pihak.nomor_sim &&
      pihak.no_telepon &&
      pihak.golongan_kendaraan &&
      pihak.tipe_kendaraan &&
      pihak.plat_nomor
  );
}

export default function LaporInsidenPage() {
  const router = useRouter();
  const [view, setView] = useState<PageView>("step1");
  const [step1, setStep1] = useState<LaporInsidenStep1State>(
    LAPOR_INSIDEN_STEP1_INITIAL
  );
  const [step2, setStep2] = useState<LaporInsidenStep2State>(
    LAPOR_INSIDEN_STEP2_INITIAL
  );
  const [step3, setStep3] = useState<LaporInsidenStep3State>(
    createLaporInsidenStep3Initial
  );
  const [step4, setStep4] = useState<LaporInsidenStep4State>(
    createLaporInsidenStep4Initial
  );
  const [step5, setStep5] = useState<LaporInsidenStep5State>(
    createLaporInsidenStep5Initial
  );
  const [agreed, setAgreed] = useState(false);

  const showStep4And5 = step3.ada_kerusakan_aset;

  const canProceed =
    view === "step1"
      ? isStep1Complete(step1)
      : view === "step2"
        ? isStep2Complete(step2)
        : view === "step3"
          ? isStep3Complete(step3)
          : view === "step5"
            ? Boolean(step5.metode)
            : true;

  function handleBack() {
    if (view === "step1") {
      router.push("/dashboard");
      return;
    }
    if (view === "step2") setView("step1");
    else if (view === "step3") setView("step2");
    else if (view === "step4") setView("step3");
    else if (view === "step5") setView("step4");
    else if (view === "summary") setView(showStep4And5 ? "step5" : "step3");
  }

  function handleNext() {
    if (view === "step1") setView("step2");
    else if (view === "step2") setView("step3");
    else if (view === "step3") setView(showStep4And5 ? "step4" : "summary");
    else if (view === "step4") setView("step5");
    else if (view === "step5") setView("summary");
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-bg-subtle">
      <header className="flex h-16 shrink-0 items-center border-b border-border-strong bg-bg px-5 py-3">
        <div className="flex flex-1 justify-start">
          <button type="button" onClick={handleBack} aria-label="Kembali">
            <ArrowLeft className="size-6 text-text" />
          </button>
        </div>
        <span className="shrink-0 text-base font-medium text-text">Incident Report</span>
        <div className="flex flex-1 justify-end">
          {view === "summary" ? (
            <span className="text-xs text-text">Summary</span>
          ) : (
            <span className="text-xs text-text">
              Step {STEP_LABEL[view]} of {TOTAL_STEP}
            </span>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        {view === "step1" && <Step1WaktuLokasi value={step1} onChange={setStep1} />}
        {view === "step2" && (
          <Step2KronologiDokumentasi value={step2} onChange={setStep2} />
        )}
        {view === "step3" && (
          <Step3PihakTerlibat value={step3} onChange={setStep3} />
        )}
        {view === "step4" && (
          <Step4KalkulasiKerusakan value={step4} onChange={setStep4} />
        )}
        {view === "step5" && (
          <Step5BentukPenyelesaian value={step5} onChange={setStep5} />
        )}
        {view === "summary" && (
          <SummaryLaporan
            step1={step1}
            step2={step2}
            step3={step3}
            step4={step4}
            step5={step5}
            onEdit={setView}
          />
        )}
      </div>

      <div className="flex shrink-0 flex-col gap-6 border-t border-border-strong bg-bg px-5 pt-4 pb-6">
        {view === "step4" && (
          <div className="flex flex-col gap-2">
            <span className="text-base text-text-muted">Total Ganti Rugi (Estimasi)</span>
            <span className="text-2xl font-semibold text-text">
              {formatRupiah(getStep4Total(step4))}
            </span>
          </div>
        )}
        {view === "summary" ? (
          <SummaryFooter
            step3={step3}
            step5={step5}
            agreed={agreed}
            onAgreedChange={setAgreed}
            onSubmit={() => {
              // TODO(K8): sambungkan ke endpoint submit incident_report begitu kontrak API ada.
              // List Riwayat Laporan di /dasbor masih MOCK_INCIDENT_REPORTS statis — laporan
              // ini belum otomatis muncul di sana (di luar scope AULIA-K1..K13, lihat
              // backlog-aulia.md baris 52-54).
              console.log("Submit laporan insiden", { step1, step2, step3, step4, step5 });
              router.push("/dashboard");
            }}
          />
        ) : view === "step5" ? (
          <div className="flex items-stretch gap-3">
            <AppButton
              type="button"
              variant="outline"
              onClick={handleBack}
              className="w-24 flex-none self-auto"
            >
              Kembali
            </AppButton>
            <AppButton
              type="button"
              variant="dark"
              disabled={!canProceed}
              onClick={handleNext}
              className={cn(
                "flex-1 whitespace-normal text-center",
                !canProceed && "opacity-20"
              )}
            >
              {isSettlementLeniency(step5) ? "Simpan & Beri Tenggat Waktu" : "Simpan dan lanjut"}
              <ArrowRight className="size-6 shrink-0" />
            </AppButton>
          </div>
        ) : (
          <AppButton
            type="button"
            variant="dark"
            disabled={!canProceed}
            onClick={handleNext}
            className={cn(!canProceed && "opacity-20")}
          >
            Selanjutnya
            <ArrowRight className="size-6" />
          </AppButton>
        )}
      </div>
    </div>
  );
}
