"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavItems, secondaryNavItems } from "@/config/navigation";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full flex-col justify-between border-r border-border bg-card p-4",
        className
      )}
    >
      <div className="space-y-6">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="size-5" />
          </div>
          <div>
            <span className="font-bold tracking-tight text-foreground text-lg">
              ContentPilot
            </span>
            <span className="block text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
              Social SaaS
            </span>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="space-y-1">
          <p className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Menu Utama
          </p>
          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className={cn("size-4", isActive ? "text-primary" : "text-muted-foreground")} />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer / Secondary Navigation */}
      <div className="space-y-3 pt-4">
        <Separator />
        <div className="space-y-1">
          {secondaryNavItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>

        {/* User Card Mini Placeholder */}
        <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/40 p-2.5">
          <div className="size-8 rounded-full bg-primary/20 text-primary font-semibold flex items-center justify-center text-xs">
            CP
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-medium text-foreground truncate">Demo Creator</p>
            <p className="text-[11px] text-muted-foreground truncate">creator@contentpilot.id</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

