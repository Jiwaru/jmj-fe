"use client";
import React, { useState } from "react";
import { IncidentCardItem } from "@/lib/types/incident-report";
import { FileText, Check, X, Eye, Printer, Download, Image as ImageIcon } from "lucide-react";
import { SahkanBaKerusakanDialog } from "./SahkanBaKerusakanDialog";
import { TolakBaKerusakanDialog } from "./TolakBaKerusakanDialog";

interface BaKerusakanTabProps {
  item: Partial<IncidentCardItem>;
}

export function BaKerusakanTab({ item }: BaKerusakanTabProps) {
  const isApproved = item.validation_status === "validated";
  const [showSahkan, setShowSahkan] = useState(false);
  const [showTolak, setShowTolak] = useState(false);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4">
      {/* Kolom Kiri */}
      <div className="flex flex-col gap-4 flex-1">
        
        {/* Nomor Berita Acara */}
        <div className="self-stretch p-5 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-300 inline-flex flex-col justify-start items-start gap-4">
          <div className="justify-start text-neutral-800 text-sm font-normal leading-5">NOMOR BERITA ACARA</div>
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="self-stretch inline-flex justify-start items-center gap-2">
              <div className="px-2 py-1 bg-brand/10 rounded-lg flex justify-center items-center">
                <div className="justify-center text-brand text-xs font-semibold leading-5">BAK</div>
              </div>
              <div className="justify-center text-neutral-500 text-base font-normal leading-7">BAK-2310-00142</div>
            </div>
            <div className="self-stretch inline-flex justify-start items-center gap-2">
              <div className="px-2 py-1 bg-accent-red/10 rounded-lg flex justify-center items-center">
                <div className="justify-center text-accent-red text-xs font-semibold leading-5">BAR</div>
              </div>
              <div className="justify-center text-neutral-500 text-base font-normal leading-7">Menunggu Pengesahan</div>
            </div>
          </div>
        </div>

        {/* Rincian Kerusakan Aset */}
        <div className="self-stretch p-5 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-300 inline-flex flex-col justify-start items-start gap-4 w-full">
          <div className="justify-start text-neutral-800 text-lg font-medium leading-7">Rincian Kerusakan Aset</div>
          <div className="self-stretch flex flex-col justify-start items-start gap-3 w-full">
            <div className="self-stretch pb-3 border-b border-gray-100 inline-flex justify-between items-start">
              <div className="justify-start text-neutral-500 text-sm font-normal leading-5">Guardrail Beam (2 bh)</div>
              <div className="justify-start text-neutral-800 text-sm font-medium leading-5">Rp 2.400.000</div>
            </div>
            <div className="self-stretch pb-3 border-b border-gray-100 inline-flex justify-between items-start">
              <div className="justify-start text-neutral-500 text-sm font-normal leading-5">Tiang Lampu PJU (1 bh)</div>
              <div className="justify-start text-neutral-800 text-sm font-medium leading-5">Rp 8.500.000</div>
            </div>
            <div className="self-stretch inline-flex justify-between items-end">
              <div className="justify-start text-neutral-500 text-sm font-normal leading-5">Total Estimasi</div>
              <div className="justify-start text-brand text-lg font-semibold leading-7">Rp 10.900.000</div>
            </div>
          </div>
        </div>

        {/* Bukti Lapangan */}
        <div className="self-stretch p-5 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-300 flex flex-col justify-start items-start gap-4">
          <div className="justify-start text-neutral-800 text-lg font-medium leading-7">Bukti Lapangan</div>
          <div className="self-stretch grid grid-cols-3 gap-2 md:gap-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-50 rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-neutral-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Kolom Kanan */}
      <div className="w-full lg:w-[350px] flex flex-col gap-4">
        
        {/* Otorisasi BA */}
        <div id="otorisasi-ba" className="scroll-mt-60 self-stretch p-5 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-300 flex flex-col justify-start items-start gap-4">
          <div className="justify-start text-neutral-800 text-lg font-medium leading-7">Otorisasi BA</div>
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="justify-start text-neutral-500 text-base font-normal leading-6">Bentuk Penyelesaian</div>
              <div className="p-3 bg-brand/5 rounded-lg outline outline-1 outline-offset-[-1px] outline-brand inline-flex justify-center items-center gap-2">
                <div className="justify-start text-brand text-base font-medium leading-6">Pengajuan Keringanan</div>
              </div>
            </div>

            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="justify-start text-neutral-500 text-base font-normal leading-6">Dokumen Pendukung</div>
              <div className="self-stretch px-3 py-2 rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-300 flex justify-between items-center bg-white">
                <div className="flex justify-start items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-neutral-400" />
                  </div>
                  <div className="inline-flex flex-col justify-start items-start">
                    <div className="justify-start text-neutral-800 text-sm font-medium leading-5">SuratPermohonan.pdf</div>
                    <div className="justify-start text-neutral-500 text-xs font-normal leading-4">1.2 MB</div>
                  </div>
                </div>
                <button className="w-8 h-8 rounded hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer">
                  <Download className="w-4 h-4 text-neutral-500" />
                </button>
              </div>
              <div className="self-stretch px-3 py-2 rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-300 flex justify-between items-center bg-white">
                <div className="flex justify-start items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-neutral-400" />
                  </div>
                  <div className="inline-flex flex-col justify-start items-start">
                    <div className="justify-start text-neutral-800 text-sm font-medium leading-5">BA_Kerusakan.pdf</div>
                    <div className="justify-start text-neutral-500 text-xs font-normal leading-4">1.2 MB</div>
                  </div>
                </div>
                <button className="w-8 h-8 rounded hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer">
                  <Download className="w-4 h-4 text-neutral-500" />
                </button>
              </div>
            </div>

            <div className="self-stretch flex flex-col justify-start items-start gap-4 w-full">
              <div className="self-stretch px-2 py-16 bg-gray-50 rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-300 flex flex-col justify-center items-center gap-4">
                <div className="w-14 h-14 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                  <FileText className="w-8 h-8 text-neutral-400" />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="justify-start text-neutral-800 text-lg font-medium leading-7">BA_Kerusakan.pdf</div>
                  <div className="flex justify-center items-center gap-2">
                    <div className="justify-start text-neutral-500 text-sm font-normal leading-5">
                      {isApproved ? "OFFICIAL/SIGNED" : "DRAFT"}
                    </div>
                    <div className="w-1 h-1 bg-neutral-800 rounded-full" />
                    <div className="justify-start text-neutral-500 text-sm font-normal leading-5">1.2 MB</div>
                  </div>
                </div>
              </div>

              <div className="self-stretch flex justify-start items-start gap-2">
                <button className="flex-1 px-4 py-2 bg-gray-50 rounded-sm outline outline-1 outline-offset-[-1px] outline-gray-300 flex justify-center items-center gap-2 hover:bg-gray-100 transition-colors cursor-pointer">
                  <Eye className="w-4 h-4 text-neutral-500" />
                  <div className="justify-start text-neutral-500 text-base font-medium leading-6">Preview</div>
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-50 rounded-sm outline outline-1 outline-offset-[-1px] outline-gray-300 flex justify-center items-center gap-2 hover:bg-gray-100 transition-colors cursor-pointer">
                  <Printer className="w-4 h-4 text-neutral-500" />
                  <div className="justify-start text-neutral-500 text-base font-medium leading-6">Print</div>
                </button>
              </div>
              
              {isApproved ? (
                <div className="self-stretch p-3 bg-accent-green/10 rounded-lg outline outline-1 outline-offset-[-1px] outline-accent-green inline-flex justify-start items-center gap-4 w-full">
                  <div className="w-10 h-10 flex items-center justify-center bg-accent-green/20 rounded-full text-accent-green">
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="flex-1 flex flex-col justify-start items-start">
                    <div className="justify-start text-accent-green text-base font-semibold leading-6">
                      Disahkan oleh {item.validated_by || "Budi Santoso"}
                    </div>
                    <div className="justify-start text-neutral-500 text-sm font-normal leading-5">
                      {item.validated_at || "26/08/2026, 14:05 WIB"}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="self-stretch flex flex-col justify-start items-start gap-3 w-full">
                  <button
                    onClick={() => setShowSahkan(true)}
                    className="w-full py-3 bg-brand rounded-full flex justify-center items-center gap-2 hover:bg-brand/90 transition-colors cursor-pointer"
                  >
                    <Check className="w-5 h-5 text-white" />
                    <div className="justify-center text-white text-base font-semibold leading-6">Sahkan BA Kerusakan</div>
                  </button>
                  <button
                    onClick={() => setShowTolak(true)}
                    className="w-full py-3 rounded-full outline outline-2 outline-offset-[-2px] outline-accent-red flex justify-center items-center gap-2 hover:bg-accent-red/10 transition-colors text-accent-red cursor-pointer"
                  >
                    <X className="w-5 h-5 text-accent-red" />
                    <div className="justify-center text-accent-red text-base font-semibold leading-6">Tolak & Beri Catatan</div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>

    <SahkanBaKerusakanDialog
      open={showSahkan}
      onClose={() => setShowSahkan(false)}
      total_estimasi={item.total_estimation}
    />
    <TolakBaKerusakanDialog open={showTolak} onClose={() => setShowTolak(false)} />
  </>);
}
