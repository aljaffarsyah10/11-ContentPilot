import React from "react";
import { cn } from "@/lib/utils";

export type ContentStatus = "DRAFT" | "SCHEDULED" | "PUBLISHED";
export type IdeaStatus = "NEW" | "IN_PROGRESS" | "USED" | "ARCHIVED";

interface StatusBadgeProps {
  status: ContentStatus | IdeaStatus;
  type?: "content" | "idea";
  className?: string;
  size?: "default" | "sm";
}

const statusConfig: Record<string, { label: string; dotColor: string; className: string }> = {
  // Content Status
  DRAFT: {
    label: "Draft",
    dotColor: "bg-slate-400 dark:bg-slate-500",
    className: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20",
  },
  SCHEDULED: {
    label: "Scheduled",
    dotColor: "bg-indigo-500",
    className: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20",
  },
  PUBLISHED: {
    label: "Published",
    dotColor: "bg-emerald-500",
    className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
  },
  // Idea Status
  NEW: {
    label: "Baru",
    dotColor: "bg-blue-500",
    className: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
  },
  IN_PROGRESS: {
    label: "Sedang Dibuat",
    dotColor: "bg-amber-500",
    className: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
  },
  USED: {
    label: "Sudah Dipakai",
    dotColor: "bg-teal-500",
    className: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20",
  },
  ARCHIVED: {
    label: "Arsip",
    dotColor: "bg-zinc-400",
    className: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
  },
};

export function StatusBadge({ status, className, size = "default" }: StatusBadgeProps) {
  const config = statusConfig[status];
  if (!config) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border font-medium select-none transition-colors",
        size === "sm" ? "px-1.5 py-0.5 text-[11px]" : "px-2 py-0.5 text-xs",
        config.className,
        className
      )}
    >
      <span className={cn("rounded-full", size === "sm" ? "size-1" : "size-1.5", config.dotColor)} />
      <span>{config.label}</span>
    </span>
  );
}
