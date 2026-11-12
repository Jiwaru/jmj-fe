"use client";

import React, { useState } from "react";
import { X, XCircle } from "lucide-react";

interface TolakBaKerusakanDialogProps {
  open: boolean;
  onClose: () => void;
}

export function TolakBaKerusakanDialog({ open, onClose }: TolakBaKerusakanDialogProps) {
  const [alasan, setAlasan] = useState("");

  if (!open) return null;

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
            Konfirmasi Penolakan
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
          <div className="w-20 h-20 bg-accent-red rounded-full flex items-center justify-center">
            <XCircle className="w-10 h-10 text-white" />
          </div>
          <div className="flex flex-col items-center gap-2 px-8 text-center">
            <p className="text-neutral-800 text-lg font-semibold leading-7">
              Tolak BA Kerusakan
            </p>
            <p className="text-neutral-500 text-base font-normal leading-6">
              Laporan akan dikembalikan ke petugas lapangan untuk revisi
              kalkulasi volume/jenis aset yang rusak. Silakan berikan alasan penolakan.
            </p>
          </div>
          <div className="self-stretch flex flex-col gap-1">
            <label className="text-neutral-500 text-base font-normal leading-6">
              Alasan Penolakan (Wajib diisi)
            </label>
            <textarea
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
              placeholder="Alasan"
              rows={3}
              className="w-full p-4 bg-neutral-500/5 rounded-lg text-sm text-neutral-700 placeholder:text-neutral-400 outline-none resize-none border border-transparent focus:border-gray-300 transition-colors"
            />
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
            className="flex-1 px-6 py-3 bg-accent-red rounded-lg flex justify-center items-center hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span className="text-white text-base font-semibold leading-7">Tolak &amp; Kembalikan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
