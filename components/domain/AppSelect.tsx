"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface AppSelectOption {
  value: string;
  label: string;
}

interface AppSelectProps {
  options: AppSelectOption[];
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string | null) => void;
  className?: string;
}

const PLACEHOLDER_VALUE = "__placeholder__";

function AppSelect({
  options,
  placeholder,
  value,
  onValueChange,
  className,
}: AppSelectProps) {
  return (
    <Select
      value={value ?? PLACEHOLDER_VALUE}
      onValueChange={(next) =>
        onValueChange?.(next === PLACEHOLDER_VALUE ? null : next)
      }
    >
      <SelectTrigger
        className={cn(
          "h-auto min-h-0 w-full min-w-0 justify-between rounded-lg border border-border-strong bg-bg px-4 py-3 text-md data-[size=default]:h-auto focus-visible:border-brand focus-visible:ring-0 [&_svg]:text-text-muted [&_svg]:transition-transform [&_svg]:data-popup-open:rotate-180",
          value ? "text-text" : "text-text-muted",
          className
        )}
      >
        <SelectValue placeholder={placeholder}>
          {(selected: string | null) =>
            options.find((option) => option.value === selected)?.label ??
            placeholder
          }
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        alignItemWithTrigger={false}
        sideOffset={4}
        className="min-w-(--anchor-width) py-2"
      >
        <SelectItem
          value={PLACEHOLDER_VALUE}
          className="rounded-none px-6 py-3 text-sm text-text-muted"
        >
          {placeholder}
        </SelectItem>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="rounded-none px-6 py-3 text-sm text-text-muted"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { AppSelect };
