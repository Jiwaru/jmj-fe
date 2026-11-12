"use client";

import { useState } from "react";
import { CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface AppDatePickerProps {
  value?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_LABELS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAY_LABELS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatSlash(date?: Date) {
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()}`;
}

function formatHeader(date: Date) {
  return `${WEEKDAY_LABELS_SHORT[date.getDay()]}, ${MONTH_LABELS_LONG[date.getMonth()].slice(0, 3)} ${date.getDate()}`;
}

function isSameDay(a?: Date, b?: Date) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function buildMonthGrid(viewYear: number, viewMonth: number) {
  const firstDay = new Date(viewYear, viewMonth, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(viewYear, viewMonth, day));
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function AppDatePicker({
  value,
  onValueChange,
  placeholder = "dd/mm/yyyy",
  className,
}: AppDatePickerProps) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Date | undefined>(value);
  const [viewDate, setViewDate] = useState(value ?? today);

  const weeks = buildMonthGrid(viewDate.getFullYear(), viewDate.getMonth());

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setDraft(value);
      setViewDate(value ?? today);
    }
    setOpen(nextOpen);
  }

  function goToMonth(offset: number) {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-lg border border-border-strong bg-bg px-4 py-3 text-md",
          value ? "text-text" : "text-text-muted",
          className
        )}
      >
        {value ? formatSlash(value) : placeholder}
        <CalendarIcon className="size-5 text-text-muted" />
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="w-80 max-w-[calc(100%-2rem)] overflow-hidden rounded-3xl bg-bg p-0"
      >
        <div className="flex items-end justify-between gap-2 border-b border-border-strong py-3 pr-3 pl-6">
          <div className="flex flex-1 flex-col gap-2">
            <span className="text-sm font-medium text-text-muted">Select date</span>
            <span className="text-3xl text-text">
              {draft ? formatHeader(draft) : "Pilih tanggal"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleOpenChange(false)}
            aria-label="Tutup"
            className="flex size-12 items-center justify-center rounded-full text-text-muted hover:bg-bg-subtle"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex items-center justify-between px-4 py-1">
          <span className="px-2 py-2.5 text-sm font-medium text-text-muted">
            {MONTH_LABELS_LONG[viewDate.getMonth()]} {viewDate.getFullYear()}
          </span>
          <div className="flex">
            <button
              type="button"
              onClick={() => goToMonth(-1)}
              aria-label="Bulan sebelumnya"
              className="flex size-12 items-center justify-center rounded-full text-text-muted hover:bg-bg-subtle"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => goToMonth(1)}
              aria-label="Bulan berikutnya"
              className="flex size-12 items-center justify-center rounded-full text-text-muted hover:bg-bg-subtle"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center px-3">
          <div className="flex h-12 w-full justify-center">
            {WEEKDAY_LABELS.map((label, i) => (
              <div
                key={i}
                className="flex flex-1 items-center justify-center text-base text-text"
              >
                {label}
              </div>
            ))}
          </div>

          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex h-12 w-full justify-center">
              {week.map((date, dayIndex) => {
                if (!date) {
                  return <div key={dayIndex} className="flex-1" />;
                }
                const selected = isSameDay(date, draft);
                const isToday = isSameDay(date, today);

                return (
                  <div key={dayIndex} className="flex flex-1 items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setDraft(date)}
                      className={cn(
                        "flex size-10 items-center justify-center rounded-full text-base text-text",
                        selected && "bg-brand text-white",
                        !selected && isToday && "border border-brand text-brand"
                      )}
                    >
                      {date.getDate()}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between px-3 pt-1 pb-2">
          <button
            type="button"
            onClick={() => setDraft(undefined)}
            className="rounded-full px-4 py-2.5 text-sm font-medium text-brand"
          >
            Clear
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="rounded-full px-4 py-2.5 text-sm font-medium text-brand"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onValueChange?.(draft);
                handleOpenChange(false);
              }}
              className="rounded-full px-4 py-2.5 text-sm font-medium text-brand"
            >
              OK
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { AppDatePicker };
