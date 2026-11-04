import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="size-5" />
          </div>
          <span className="font-bold tracking-tight text-foreground text-lg">
            ContentPilot
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Masuk
          </Link>
          <Link href="/register" className={buttonVariants({ size: "sm" })}>
            Daftar Gratis
          </Link>
        </div>
      </div>
    </header>
  );
}
