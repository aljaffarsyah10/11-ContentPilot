import React, { Suspense } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { AuthGuard } from "@/components/providers/auth-guard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <div className="relative flex min-h-screen bg-background">
        {/* Subtle ambient background glow */}
        <div className="fixed top-0 right-1/4 size-[500px] bg-indigo-500/[0.03] dark:bg-indigo-500/[0.05] rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="fixed bottom-0 left-1/3 size-[400px] bg-violet-500/[0.02] dark:bg-violet-500/[0.04] rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Desktop Sidebar (Fixed) */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
          <Suspense fallback={<div className="h-full w-64 border-r border-border bg-card" />}>
            <Sidebar />
          </Suspense>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col lg:pl-64">
          <Suspense fallback={<div className="h-14 w-full border-b border-border bg-background" />}>
            <Topbar />
          </Suspense>
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
