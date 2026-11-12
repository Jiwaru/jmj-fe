"use client";

import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface AppFileThumbnailProps {
  file: File;
  className?: string;
  previewable?: boolean;
}

function useObjectUrl(file: File, enabled: boolean) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file, enabled]);

  return url;
}

function AppFileThumbnail({ file, className, previewable = true }: AppFileThumbnailProps) {
  const isImage = file.type.startsWith("image/");
  const previewUrl = useObjectUrl(file, isImage);

  if (!isImage || !previewUrl) {
    return (
      <span
        className={cn(
          "flex aspect-square w-12 shrink-0 items-center justify-center rounded-lg bg-text/10",
          className
        )}
      >
        <FileText className="size-5 text-text-muted" />
      </span>
    );
  }

  const thumbnail = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={previewUrl}
      alt={file.name}
      className="block size-full rounded-lg object-cover"
    />
  );

  if (!previewable) {
    return (
      <div className={cn("aspect-square w-12 shrink-0", className)}>{thumbnail}</div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger className={cn("block aspect-square w-12 shrink-0", className)}>
        {thumbnail}
      </DialogTrigger>
      <DialogContent
        showCloseButton
        className="w-full max-w-md gap-4 rounded-2xl p-4 sm:max-w-lg"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewUrl}
          alt={file.name}
          className="max-h-[70vh] w-full rounded-lg object-contain"
        />
        <p className="truncate text-center text-sm text-text-muted">{file.name}</p>
      </DialogContent>
    </Dialog>
  );
}

export { AppFileThumbnail };
