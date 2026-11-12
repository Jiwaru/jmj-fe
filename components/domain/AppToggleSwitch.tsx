import type { ComponentProps } from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface AppToggleSwitchProps extends Omit<ComponentProps<typeof Switch>, "checked" | "onCheckedChange"> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}

function AppToggleSwitch({
  checked,
  onCheckedChange,
  label,
  className,
  ...props
}: AppToggleSwitchProps) {
  return (
    <label className="flex w-full items-center justify-end gap-3">
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={cn(
          "h-10! w-16! data-checked:bg-brand data-unchecked:bg-text/10 [&_[data-slot=switch-thumb]]:size-7! [&_[data-slot=switch-thumb]]:translate-x-0.5 [&_[data-slot=switch-thumb]]:data-checked:translate-x-[26px] [&_[data-slot=switch-thumb]]:bg-text/40 [&_[data-slot=switch-thumb]]:data-checked:bg-white",
          className
        )}
        {...props}
      />
      <span className="flex-1 text-base font-medium text-text">{label}</span>
    </label>
  );
}

export { AppToggleSwitch };
