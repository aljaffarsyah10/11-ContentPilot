"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { mainNavItems, secondaryNavItems } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userName = session?.user?.name || "Kreator Konten";
  const userEmail = session?.user?.email || "user@contentpilot.id";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside
      className={cn(
        "flex h-full flex-col justify-between border-r border-sidebar-border bg-gradient-to-b from-sidebar via-sidebar to-sidebar/95 px-3.5 py-4 select-none",
        className
      )}
    >
      <div className="space-y-6">
        {/* Brand / Logo with subtle gradient badge */}
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-2.5 px-2 py-1.5 group transition-opacity hover:opacity-90"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 text-white shadow-[0_2px_8px_rgba(79,70,229,0.35)]">
            <Sparkles className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-foreground text-base leading-none">
              ContentPilot
            </span>
            <span className="text-[10px] text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500 uppercase tracking-widest font-bold mt-1">
              Social Studio
            </span>
          </div>
        </Link>

        {/* Main Navigation */}
        <div className="space-y-1">
          <p className="px-2.5 text-[11px] font-bold text-muted-foreground/70 uppercase tracking-wider mb-2">
            Workspace
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
                    "relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-accent via-accent/80 to-transparent text-foreground font-semibold shadow-2xs border-l-2 border-indigo-500 rounded-l-none pl-2"
                      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-4 shrink-0 transition-colors",
                      isActive ? "text-indigo-600 dark:text-indigo-400" : "text-muted-foreground"
                    )}
                  />
                  <span className="truncate">{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <Separator className="bg-border/50" />

        {/* Secondary Navigation */}
        <div className="space-y-1">
          <p className="px-2.5 text-[11px] font-bold text-muted-foreground/70 uppercase tracking-wider mb-2">
            Pengaturan
          </p>
          <nav className="space-y-1">
            {secondaryNavItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-accent via-accent/80 to-transparent text-foreground font-semibold shadow-2xs border-l-2 border-indigo-500 rounded-l-none pl-2"
                      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-4 shrink-0 transition-colors",
                      isActive ? "text-indigo-600 dark:text-indigo-400" : "text-muted-foreground"
                    )}
                  />
                  <span className="truncate">{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* User Profile Mini Block with subtle gradient background */}
      <div className="pt-4 border-t border-border/60">
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-gradient-to-r from-card to-accent/40 border border-border/60 shadow-2xs">
          <div className="flex size-7.5 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-xs font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
            {userInitials}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="truncate text-xs font-semibold text-foreground leading-tight">
              {userName}
            </span>
            <span className="truncate text-[10px] text-muted-foreground leading-tight">
              {userEmail}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
