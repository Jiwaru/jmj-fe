import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AppBadgeVariant = "brand" | "destructive" | "warning" | "success" | "neutral";

interface AppBadgeProps {
  variant?: AppBadgeVariant;
  solid?: boolean;
  outline?: boolean;
  className?: string;
  children: ReactNode;
}

const TINT_STYLE: Record<AppBadgeVariant, string> = {
  brand: "bg-brand/10 text-brand",
  destructive: "bg-destructive/10 text-destructive",
  warning: "bg-warning/10 text-text",
  success: "bg-success/10 text-success",
  neutral: "bg-text/10 text-text-muted",
};

const OUTLINE_STYLE: Record<AppBadgeVariant, string> = {
  brand: "border-brand",
  destructive: "border-destructive",
  warning: "border-warning",
  success: "border-success",
  neutral: "border-border-strong",
};

const SOLID_STYLE: Record<AppBadgeVariant, string> = {
  brand: "bg-brand text-white",
  destructive: "bg-destructive text-white",
  warning: "bg-warning text-text",
  success: "bg-success text-white",
  neutral: "bg-text text-white",
};

function AppBadge({
  variant = "neutral",
  solid = false,
  outline = false,
  className,
  children,
}: AppBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium",
        solid ? SOLID_STYLE[variant] : TINT_STYLE[variant],
        outline && !solid && "border",
        outline && !solid && OUTLINE_STYLE[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export { AppBadge };
