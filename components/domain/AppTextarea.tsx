import type { ComponentProps } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function AppTextarea({ className, ...props }: ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      className={cn(
        "min-h-24 rounded-lg border-none bg-text/5 px-4 py-4 text-sm text-text placeholder:text-text-muted focus-visible:ring-0",
        className
      )}
      {...props}
    />
  );
}

export { AppTextarea };
