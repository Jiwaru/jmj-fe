"use client";

import { useState, type ComponentProps, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AppInputProps extends Omit<ComponentProps<typeof Input>, "type"> {
  icon?: ReactNode;
  type?: "text" | "password" | "number" | "email";
}

function AppInput({ icon, type = "text", className, ...props }: AppInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword && showPassword ? "text" : type;

  return (
    <div className="relative w-full">
      {icon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
          {icon}
        </span>
      )}
      <Input
        type={resolvedType}
        className={cn(
          "h-auto rounded-lg border-border-strong px-4 py-3 text-md placeholder:text-text-muted focus-visible:border-brand focus-visible:ring-0 aria-invalid:border-destructive aria-invalid:ring-0",
          icon && "pl-11",
          isPassword && "pr-11",
          className
        )}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
          aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
        >
          {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
      )}
    </div>
  );
}

export { AppInput };
