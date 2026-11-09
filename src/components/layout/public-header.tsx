import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { buttonVariants } from "@/components/ui/button";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group transition-opacity hover:opacity-90">
          <div className="flex size-7 items-center justify-center rounded-lg bg-foreground text-background shadow-xs">
            <Sparkles className="size-4" />
          </div>
          <span className="font-bold tracking-tight text-foreground text-base">
            ContentPilot
          </span>
        </Link>

        {/* Navigation & Auth CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "text-xs sm:text-sm font-medium",
            })}
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className={buttonVariants({
              size: "sm",
              className: "text-xs sm:text-sm font-medium shadow-xs",
            })}
          >
            Daftar Gratis
          </Link>
        </div>
      </div>
    </header>
  );
}
