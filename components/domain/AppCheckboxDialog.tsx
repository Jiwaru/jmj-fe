"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { AppButton } from "@/components/domain/AppButton";
import { cn } from "@/lib/utils";

interface AppCheckboxDialogOption {
  value: string;
  label: string;
}

interface AppCheckboxDialogProps {
  options: AppCheckboxDialogOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  title: string;
  description?: string;
  triggerLabel: string;
  className?: string;
}

function AppCheckboxDialog({
  options,
  value,
  onValueChange,
  title,
  description,
  triggerLabel,
  className,
}: AppCheckboxDialogProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<string[]>(value);

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) setDraft(value);
    setOpen(nextOpen);
  }

  function toggle(optionValue: string) {
    setDraft((prev) =>
      prev.includes(optionValue)
        ? prev.filter((v) => v !== optionValue)
        : [...prev, optionValue]
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        className={cn(
          "flex w-full items-center gap-3 rounded-lg border border-brand bg-brand/10 px-4 py-3 text-md text-brand",
          className
        )}
      >
        <Plus className="size-5" />
        {triggerLabel}
      </DialogTrigger>

      <DialogContent
        showCloseButton
        className="w-80 max-w-[calc(100%-2rem)] gap-4 overflow-hidden rounded-lg p-0 py-4"
      >
        <div className="flex items-start justify-between px-4">
          <div className="flex flex-1 flex-col">
            <h2 className="text-base font-semibold text-text">{title}</h2>
            {description && (
              <p className="text-xs text-text-muted">{description}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          {options.map((option) => {
            const checked = draft.includes(option.value);
            return (
              <label
                key={option.value}
                className={cn(
                  "flex items-start gap-2 px-6 py-3",
                  checked && "bg-brand/10"
                )}
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => toggle(option.value)}
                  className="size-5 rounded-none border-2 border-border-strong data-checked:border-brand data-checked:bg-brand"
                />
                <span
                  className={cn(
                    "flex-1 text-md",
                    checked ? "text-brand" : "text-text-muted"
                  )}
                >
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-2 px-4">
          <AppButton
            type="button"
            variant="outline"
            size="lg"
            className="w-auto border-border-strong px-4 py-2 text-text-muted hover:bg-transparent"
            onClick={() => handleOpenChange(false)}
          >
            Batal
          </AppButton>
          <AppButton
            type="button"
            variant="primary"
            size="lg"
            className="w-auto px-4 py-2"
            onClick={() => {
              onValueChange(draft);
              handleOpenChange(false);
            }}
          >
            Terapkan
          </AppButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { AppCheckboxDialog };
