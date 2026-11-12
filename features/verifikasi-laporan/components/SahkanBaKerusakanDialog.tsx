"use client";

import React from "react";
import { X, ShieldCheck } from "lucide-react";

interface SahkanBaKerusakanDialogProps {
  open: boolean;
  onClose: () => void;
  total_estimasi?: number;
}

export function SahkanBaKerusakanDialog({
  open,
  onClose,
  total_estimasi = 10900000,
}: SahkanBaKerusakanDialogProps) {
  if (!open) return null;

  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(total_estimasi);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-[568px] max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-[0px_4px_8px_3px_rgba(0,0,0,0.15)] outline outline-1 outline-offset-[-0.5px] outline-gray-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <span className="text-neutral-800 text-base font-semibold leading-6">
            Konfirmasi Pengesahan
          </span>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="h-px bg-gray-100" />

        {/* Body */}
        <div className="p-5 flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-accent-green rounded-full flex items-center justify-center">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <div className="flex flex-col items-center gap-2 px-8 text-center">
            <p className="text-neutral-800 text-lg font-semibold leading-7">
              Pengesahan BA Kerusakan
            </p>
            <p className="text-neutral-500 text-base font-normal leading-6">
              Apakah Anda yakin ingin mengesahkan Berita Acara Kerusakan ini?
              Nilai ganti rugi sebesar{" "}
              <span className="text-accent-green font-semibold">{formatted}</span>{" "}
              akan ditetapkan.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-lg outline outline-1 outline-offset-[-0.5px] outline-gray-300 flex justify-center items-center hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <span className="text-neutral-500 text-base font-semibold leading-7">Batal</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-brand rounded-lg flex justify-center items-center hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span className="text-white text-base font-semibold leading-7">Ya, Sahkan BAR</span>
          </button>
        </div>
      </div>
    </div>
  );
}
