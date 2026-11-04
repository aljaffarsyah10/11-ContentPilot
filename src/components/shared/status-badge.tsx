import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ContentStatus = "DRAFT" | "SCHEDULED" | "PUBLISHED";
export type IdeaStatus = "NEW" | "IN_PROGRESS" | "USED" | "ARCHIVED";

interface StatusBadgeProps {
  status: ContentStatus | IdeaStatus;
  type?: "content" | "idea";
  className?: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  // Content Status
  DRAFT: {
    label: "Draft",
    className: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
  },
  SCHEDULED: {
    label: "Scheduled",
    className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800",
  },
  PUBLISHED: {
    label: "Published",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
  },
  // Idea Status
  NEW: {
    label: "Baru",
    className: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800",
  },
  IN_PROGRESS: {
    label: "Sedang Dibuat",
    className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
  },
  USED: {
    label: "Sudah Dipakai",
    className: "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",
  },
  ARCHIVED: {
    label: "Arsip",
    className: "bg-zinc-50 text-zinc-400 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-500 dark:border-zinc-800",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  if (!config) return null;

  return (
    <Badge
      variant="outline"
      className={cn("font-medium", config.className, className)}
    >
      {config.label}
    </Badge>
  );
}

