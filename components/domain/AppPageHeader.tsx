import React from "react";
import { cn } from "@/lib/utils";

interface AppPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

export function AppPageHeader({ title, description, className, ...props }: AppPageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <h1 className="text-text text-2xl font-bold">{title}</h1>
      {description && (
        <p className="text-text-muted text-base">{description}</p>
      )}
    </div>
  );
}
