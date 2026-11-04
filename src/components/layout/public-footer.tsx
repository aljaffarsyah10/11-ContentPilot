import React from "react";
import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container max-w-7xl px-4 py-8 sm:px-6 mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© 2026 ContentPilot. All rights reserved. Platform Perencanaan Konten Media Sosial.</p>
        <div className="flex gap-4">
          <Link href="/login" className="hover:text-foreground transition-colors">
            Masuk
          </Link>
          <Link href="/register" className="hover:text-foreground transition-colors">
            Daftar
          </Link>
          <Link href="/dashboard" className="hover:text-foreground transition-colors">
            Demo Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}

