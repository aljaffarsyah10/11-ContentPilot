import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: string;
  className?: string;
  gradient?: "indigo" | "blue" | "emerald" | "amber" | "purple";
}

const gradientVariants = {
  indigo:
    "from-indigo-500/10 via-indigo-500/5 to-transparent border-indigo-500/20 text-indigo-600 dark:text-indigo-400 bg-indigo-500/10",
  blue:
    "from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/20 text-blue-600 dark:text-blue-400 bg-blue-500/10",
  emerald:
    "from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
  amber:
    "from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20 text-amber-600 dark:text-amber-400 bg-amber-500/10",
  purple:
    "from-purple-500/10 via-purple-500/5 to-transparent border-purple-500/20 text-purple-600 dark:text-purple-400 bg-purple-500/10",
};

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
  gradient = "indigo",
}: StatCardProps) {
  const gClass = gradientVariants[gradient] || gradientVariants.indigo;

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-border/80 bg-gradient-to-br from-card via-card to-card/90 hover:shadow-[0_6px_20px_-4px_rgba(15,23,42,0.08)] dark:hover:shadow-[0_6px_24px_-4px_rgba(0,0,0,0.5)] transition-all duration-300 group",
        className
      )}
    >
      {/* Top subtle decorative gradient line */}
      <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r opacity-80", gClass)} />

      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <div
            className={cn(
              "flex size-8 items-center justify-center rounded-lg border transition-transform duration-200 group-hover:scale-105 shadow-2xs",
              gClass
            )}
          >
            <Icon className="size-4" />
          </div>
        </div>

        <div className="mt-3.5 flex items-baseline justify-between">
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-heading">
            {value}
          </div>
          {trend && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 shadow-2xs">
              {trend}
            </span>
          )}
        </div>

        {description && (
          <p className="mt-1.5 text-xs text-muted-foreground truncate">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
