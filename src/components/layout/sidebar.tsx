"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
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
        "flex h-full flex-col justify-between border-r border-sidebar-border bg-sidebar px-3.5 py-4 select-none",
        className
      )}
    >
      <div className="space-y-6">
        {/* Brand / Logo */}
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-2.5 px-2 py-1 group transition-opacity hover:opacity-90"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background shadow-xs">
            <Sparkles className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-foreground text-base leading-none">
              ContentPilot
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mt-1">
              Social Studio
            </span>
          </div>
        </Link>

        {/* Main Navigation */}
        <div className="space-y-1">
          <p className="px-2.5 text-[11px] font-semibold text-muted-foreground/80 uppercase tracking-wider mb-2">
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
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-accent text-foreground font-semibold shadow-2xs"
                      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-4 shrink-0 transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  />
                  <span className="truncate">{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <Separator className="bg-border/60" />

        {/* Secondary Navigation */}
        <div className="space-y-1">
          <p className="px-2.5 text-[11px] font-semibold text-muted-foreground/80 uppercase tracking-wider mb-2">
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
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-accent text-foreground font-semibold shadow-2xs"
                      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-4 shrink-0 transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  />
                  <span className="truncate">{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* User Profile Mini Block */}
      <div className="pt-4 border-t border-border/60">
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg bg-card/60 border border-border/50">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-foreground/10 text-xs font-semibold text-foreground">
            {userInitials}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="truncate text-xs font-medium text-foreground leading-tight">
              {userName}
            </span>
            <span className="truncate text-[11px] text-muted-foreground leading-tight">
              {userEmail}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
