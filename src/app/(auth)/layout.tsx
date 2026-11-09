import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      {/* Subtle radial backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="mb-6">
        <Link href="/" className="flex items-center gap-2.5 group transition-opacity hover:opacity-90">
          <div className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background shadow-xs">
            <Sparkles className="size-4" />
          </div>
          <span className="font-bold tracking-tight text-foreground text-lg">
            ContentPilot
          </span>
        </Link>
      </div>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
