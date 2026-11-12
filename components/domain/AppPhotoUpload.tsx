"use client";

import { useRef } from "react";
import { Camera, X } from "lucide-react";
import { AppFileThumbnail } from "@/components/domain/AppFileThumbnail";
import { cn } from "@/lib/utils";

interface AppPhotoUploadProps {
  value: File[];
  onValueChange: (files: File[]) => void;
  label: string;
  helperText?: string;
  className?: string;
  maxFiles?: number;
}

function formatUploadedAt(uploadedAt: number) {
  const seconds = Math.max(0, Math.floor((Date.now() - uploadedAt) / 1000));
  if (seconds < 60) return "Baru saja diunggah";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `Diunggah ${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  return `Diunggah ${hours} jam lalu`;
}

function PhotoList({
  value,
  uploadedAtRef,
  onRemove,
}: {
  value: File[];
  uploadedAtRef: React.RefObject<WeakMap<File, number>>;
  onRemove: (file: File) => void;
}) {
  if (value.length === 0) return null;

  return (
    <ul className="flex flex-col">
      {value.map((file, index) => (
        <li
          key={`${file.name}-${index}`}
          className="flex items-center justify-between gap-3 border-b border-border-strong py-3 last:border-b-0"
        >
          <div className="flex min-w-0 items-center gap-3">
            <AppFileThumbnail file={file} />
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium text-text">{file.name}</span>
              <span className="text-xs text-text-muted">
                {formatUploadedAt(uploadedAtRef.current.get(file) ?? Date.now())}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onRemove(file)}
            aria-label={`Hapus ${file.name}`}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-text/10 text-text-muted"
          >
            <X className="size-3.5" />
          </button>
        </li>
      ))}
    </ul>
  );
}

function AppPhotoUpload({
  value,
  onValueChange,
  label,
  helperText,
  className,
  maxFiles,
}: AppPhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadedAtRef = useRef(new WeakMap<File, number>());

  const remainingSlots = maxFiles ? Math.max(0, maxFiles - value.length) : undefined;
  const isFull = remainingSlots === 0;

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    let newFiles = Array.from(files);
    if (remainingSlots !== undefined) {
      newFiles = newFiles.slice(0, remainingSlots);
    }
    if (newFiles.length === 0) return;
    newFiles.forEach((file) => uploadedAtRef.current.set(file, Date.now()));
    onValueChange([...value, ...newFiles]);
  }

  function removeFile(target: File) {
    onValueChange(value.filter((file) => file !== target));
  }

  if (isFull) {
    return (
      <div className="flex flex-col gap-4">
        <PhotoList
          value={value}
          uploadedAtRef={uploadedAtRef}
          onRemove={removeFile}
        />
        <p className="text-xs text-text-muted">
          Batas maksimal {maxFiles} file tercapai. Hapus salah satu untuk menambah yang baru.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple={remainingSlots === undefined || remainingSlots > 1}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border-strong py-6",
          className
        )}
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-brand/10">
          <Camera className="size-7 text-brand" />
        </span>
        <span className="flex flex-col items-center">
          <span className="text-sm font-medium text-text">{label}</span>
          {helperText && (
            <span className="text-xs text-text-muted">{helperText}</span>
          )}
        </span>
      </button>

      <PhotoList value={value} uploadedAtRef={uploadedAtRef} onRemove={removeFile} />
    </div>
  );
}

export { AppPhotoUpload };
