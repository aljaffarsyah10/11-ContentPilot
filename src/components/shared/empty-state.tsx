import React from "react";
import { Button } from "@/components/ui/button";
import { type LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-card/40 p-10 text-center animate-in fade-in-50">
      <div className="flex size-12 items-center justify-center rounded-xl bg-accent text-foreground/70 mb-4 border border-border/60 shadow-2xs">
        <Icon className="size-5" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1.5 tracking-tight">{title}</h3>
      <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mb-5 leading-relaxed">{description}</p>
      {actionLabel && (
        <Button onClick={onAction} size="sm" className="h-8 shadow-xs">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
