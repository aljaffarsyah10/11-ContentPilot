import React from "react";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-slate-50 via-indigo-50/30 to-slate-100/80 dark:from-[#060911] dark:via-[#0A1020] dark:to-[#05070D] transition-colors duration-300">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}

