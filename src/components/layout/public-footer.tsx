import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="w-full border-t border-border/70 bg-card/40 py-10 text-xs text-muted-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand info */}
        <div className="flex flex-col items-center md:items-start gap-1.5">
          <div className="flex items-center gap-2 font-semibold text-foreground text-sm">
            <div className="flex size-5 items-center justify-center rounded bg-foreground text-background">
              <Sparkles className="size-3" />
            </div>
            <span>ContentPilot</span>
          </div>
          <p className="text-muted-foreground text-center md:text-left">
            Platform perencanaan konten & AI caption generator untuk kreator modern.
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link href="/login" className="hover:text-foreground transition-colors">
            Masuk
          </Link>
          <Link href="/register" className="hover:text-foreground transition-colors">
            Registrasi
          </Link>
          <Link href="/dashboard" className="hover:text-foreground transition-colors">
            Demo Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
        <p>© 2026 ContentPilot. All rights reserved.</p>
        <p className="text-muted-foreground/80">Plan Smarter. Create Better. Publish Consistently.</p>
      </div>
    </footer>
  );
}
