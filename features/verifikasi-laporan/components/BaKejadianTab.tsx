"use client";
import React, { useState } from "react";
import { IncidentCardItem } from "@/lib/types/incident-report";
import { Calendar, MapPin, Printer, Eye, FileText, User, Check, X } from 'lucide-react';
import { SahkanBaKejadianDialog } from "./SahkanBaKejadianDialog";
import { TolakBaKejadianDialog } from "./TolakBaKejadianDialog";

interface BaKejadianTabProps {
  item: Partial<IncidentCardItem>;
}

export function BaKejadianTab({ item }: BaKejadianTabProps) {
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
                <div className="justify-center text-neutral-500 text-base font-normal leading-7">Menunggu Pengesahan</div>
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="px-2 py-1 bg-accent-red/10 rounded-lg flex justify-center items-center">
                  <div className="justify-center text-accent-red text-xs font-semibold leading-5">BAR</div>
                </div>
                <div className="justify-center text-neutral-500 text-base font-normal leading-7">Menunggu Pengesahan</div>
              </div>
            </div>
          </div>

          {/* Waktu & Lokasi */}
          <div className="self-stretch p-5 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-300 flex flex-col justify-start items-start gap-4">
            <div className="justify-start text-neutral-800 text-lg font-medium leading-7">Waktu & Lokasi</div>
            <div className="self-stretch flex flex-col md:flex-row justify-start items-start gap-6 md:gap-6">
              <div className="md:w-60 flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-neutral-500 text-base font-normal leading-6">Waktu Kejadian</div>
                <div className="flex justify-center items-center gap-2">
                  <div className="justify-start text-neutral-800 text-lg font-medium leading-7">24/08/2026</div>
                  <div className="w-1 h-1 bg-neutral-800 rounded-full" />
                  <div className="justify-start text-neutral-800 text-lg font-medium leading-7">09:30 WIB</div>
                </div>
              </div>
              <div className="md:w-40 flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-neutral-500 text-base font-normal leading-6">Lokasi</div>
                <div className="justify-start text-neutral-800 text-lg font-medium leading-7">STA {item.km}+{item.m} {item.route}</div>
              </div>
              <div className="flex-1 flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-neutral-500 text-base font-normal leading-6">Cuaca</div>
                <div className="justify-start text-neutral-800 text-lg font-medium capitalize leading-7">{item.weather_condition || "-"}</div>
              </div>
            </div>
          </div>

          {/* Kronologi dan Penanganan */}
          <div className="self-stretch p-5 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-300 flex flex-col justify-start items-start gap-4">
            <div className="justify-start text-neutral-800 text-lg font-medium leading-7">Kronologi dan Penanganan</div>
            <div className="self-stretch flex flex-col justify-start items-start gap-5">
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-neutral-500 text-base font-normal leading-6">Penyebab</div>
                <div className="justify-start text-neutral-800 text-lg font-medium leading-7">{item.causer || "-"}</div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-neutral-500 text-base font-normal leading-6">Tindakan Diambil</div>
                <div className="flex flex-wrap justify-start items-start gap-2">
                  <div className="px-3 py-1.5 bg-accent-green rounded-sm flex justify-center items-center gap-2">
                    <div className="justify-start text-white text-sm font-normal leading-5">Pemasangan Rambu Darurat</div>
                  </div>
                  <div className="px-3 py-1.5 bg-accent-green rounded-sm flex justify-center items-center gap-2">
                    <div className="justify-start text-white text-sm font-normal leading-5">Pengaturan Arus Lalu Lintas</div>
                  </div>
                  <div className="px-3 py-1.5 bg-accent-green rounded-sm flex justify-center items-center gap-2">
                    <div className="justify-start text-white text-sm font-normal leading-5">Koordinasi Unit Derek</div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-neutral-500 text-base font-normal leading-6">Analisa Kerusakan</div>
                <div className="px-3 py-1.5 bg-accent-red rounded-sm inline-flex justify-start items-center gap-2">
                  <div className="justify-start text-white text-sm font-normal leading-5">Rusak Berat (Deformasi total)</div>
                </div>
              </div>
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-neutral-500 text-base font-normal leading-6">Catatan Uraian</div>
                <div className="self-stretch p-4 bg-neutral-500/5 rounded-lg inline-flex justify-center items-center gap-2">
                  <div className="flex-1 justify-start text-neutral-500 text-sm font-medium leading-5">Truk logistik melaju kecepatan tinggi, oleng menabrak pembatas jalan dan PJU.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pihak Terlibat */}
          <div className="self-stretch p-5 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-300 flex flex-col justify-start items-start gap-4">
            <div className="justify-start text-neutral-800 text-lg font-medium leading-7">Pihak Terlibat</div>
            <div className="self-stretch flex flex-col md:flex-row justify-start items-stretch gap-4">
              <div className="flex-1 px-4 pt-4 pb-6 bg-gray-50 rounded-lg flex flex-col justify-start items-start gap-4">
                <div className="justify-start text-neutral-800 text-lg font-medium leading-7">Pihak 1</div>
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                  <div className="self-stretch flex justify-start items-center gap-3">
                    <div className="w-20 justify-start text-neutral-500 text-base font-normal leading-6">Nama</div>
                    <div className="flex-1 justify-start text-neutral-800 text-base font-medium leading-6">Rian Hidayat</div>
                  </div>
                  <div className="self-stretch flex justify-start items-center gap-3">
                    <div className="w-20 justify-start text-neutral-500 text-base font-normal leading-6">NIK</div>
                    <div className="flex-1 justify-start text-neutral-800 text-base font-medium leading-6">3271902805920001</div>
                  </div>
                  <div className="self-stretch flex justify-start items-center gap-3">
                    <div className="w-20 justify-start text-neutral-500 text-base font-normal leading-6">SIM</div>
                    <div className="flex-1 justify-start text-neutral-800 text-base font-medium leading-6">3271902805920001</div>
                  </div>
                  <div className="self-stretch flex justify-start items-start gap-3">
                    <div className="w-20 justify-start text-neutral-500 text-base font-normal leading-6">Kendaraan</div>
                    <div className="flex-1 flex flex-col justify-start items-start gap-2">
                      <div className="self-stretch flex justify-start items-center gap-2">
                        <div className="justify-start text-neutral-800 text-base font-medium leading-6">GOL III</div>
                        <div className="w-1 h-1 bg-neutral-500 rounded-full" />
                        <div className="flex-1 justify-start text-neutral-800 text-base font-medium leading-6">Truk Box</div>
                      </div>
                      <div className="px-6 py-2 bg-neutral-500/10 outline outline-1 outline-offset-[-1px] outline-gray-300 flex justify-center items-center gap-2">
                        <div className="justify-start text-neutral-800 text-sm font-semibold leading-5">B 9123 AB</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 px-4 pt-4 pb-6 bg-gray-50 rounded-lg flex flex-col justify-start items-start gap-4">
                <div className="justify-start text-neutral-800 text-lg font-medium leading-7">Pihak 2</div>
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                  <div className="self-stretch flex justify-start items-center gap-3">
                    <div className="w-20 justify-start text-neutral-500 text-base font-normal leading-6">Nama</div>
                    <div className="flex-1 justify-start text-neutral-800 text-base font-medium leading-6">Budi Santoso</div>
                  </div>
                  <div className="self-stretch flex justify-start items-center gap-3">
                    <div className="w-20 justify-start text-neutral-500 text-base font-normal leading-6">NIK</div>
                    <div className="flex-1 justify-start text-neutral-800 text-base font-medium leading-6">3271902805920002</div>
                  </div>
                  <div className="self-stretch flex justify-start items-center gap-3">
                    <div className="w-20 justify-start text-neutral-500 text-base font-normal leading-6">SIM</div>
                    <div className="flex-1 justify-start text-neutral-800 text-base font-medium leading-6">3271902805920002</div>
                  </div>
                  <div className="self-stretch flex justify-start items-start gap-3">
                    <div className="w-20 justify-start text-neutral-500 text-base font-normal leading-6">Kendaraan</div>
                    <div className="flex-1 flex flex-col justify-start items-start gap-2">
                      <div className="self-stretch flex justify-start items-center gap-2">
                        <div className="justify-start text-neutral-800 text-base font-medium leading-6">GOL I</div>
                        <div className="w-1 h-1 bg-neutral-500 rounded-full" />
                        <div className="flex-1 justify-start text-neutral-800 text-base font-medium leading-6">Minibus</div>
                      </div>
                      <div className="px-6 py-2 bg-neutral-500/10 outline outline-1 outline-offset-[-1px] outline-gray-300 flex justify-center items-center gap-2">
                        <div className="justify-start text-neutral-800 text-sm font-semibold leading-5">B 1234 CD</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="w-full lg:w-[350px] flex flex-col gap-4">

          {/* Petugas Pelapor */}
          <div className="self-stretch p-5 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-300 flex flex-col justify-start items-start gap-4">
            <div className="justify-start text-neutral-800 text-lg font-medium leading-7">Petugas Pelapor</div>
            <div className="self-stretch flex flex-col justify-start items-start gap-4">
              <div className="self-stretch p-4 bg-gray-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-100 flex justify-start items-center gap-4">
                <div className="w-6 h-6 flex items-center justify-center">
                  <User className="w-5 h-5 text-neutral-500" />
                </div>
                <div className="flex-1 flex flex-col justify-start items-start">
                  <div className="justify-start text-neutral-800 text-lg font-medium leading-7">Budi Santoso</div>
                  <div className="justify-start text-neutral-500 text-sm font-normal leading-5">Petugas 1</div>
                </div>
              </div>
              <div className="self-stretch p-4 bg-gray-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-100 flex justify-start items-center gap-4">
                <div className="w-6 h-6 flex items-center justify-center">
                  <User className="w-5 h-5 text-neutral-500" />
                </div>
                <div className="flex-1 flex flex-col justify-start items-start">
                  <div className="justify-start text-neutral-800 text-lg font-medium leading-7">Agus Tri</div>
                  <div className="justify-start text-neutral-500 text-sm font-normal leading-5">Petugas 2</div>
                </div>
              </div>
            </div>
          </div>

          {/* Otorisasi BA */}
          <div id="otorisasi-ba" className="scroll-mt-40 self-stretch p-5 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-300 flex flex-col justify-start items-start gap-4">
            <div className="justify-start text-neutral-800 text-lg font-medium leading-7">Otorisasi BA</div>
            <div className="self-stretch flex flex-col justify-start items-start gap-4">
              <div className="self-stretch px-2 py-16 bg-gray-50 rounded-xl outline outline-1 outline-offset-[-1px] outline-gray-300 flex flex-col justify-center items-center gap-4">
                <div className="w-14 h-14 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                  <FileText className="w-8 h-8 text-neutral-400" />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="justify-start text-neutral-800 text-lg font-medium leading-7">BA_Kejadian.pdf</div>
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
                    <div className="justify-center text-white text-base font-semibold leading-6">Sahkan BA Kejadian</div>
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

      <SahkanBaKejadianDialog open={showSahkan} onClose={() => setShowSahkan(false)} />
      <TolakBaKejadianDialog open={showTolak} onClose={() => setShowTolak(false)} />
    </>);
}
