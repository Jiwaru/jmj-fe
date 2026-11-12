import { cn } from "@/lib/utils";

interface AppDotSeparatorProps {
  className?: string;
}

function AppDotSeparator({ className }: AppDotSeparatorProps) {
  return <span className={cn("size-1 shrink-0 rounded-full bg-text", className)} />;
}

export { AppDotSeparator };
