import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react";

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Kalender Konten"
        description="Visualisasi jadwal publikasi materi konten bulanan dan mingguan."
      >
        <Link
          href="/contents/new"
          className={buttonVariants({ size: "sm" })}
        >
          <Plus className="size-4 mr-1.5" />
          Jadwalkan Konten
        </Link>
      </PageHeader>

      {/* Calendar Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card p-4 rounded-xl border border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="size-8">
              <ChevronLeft className="size-4" />
            </Button>
            <Button variant="outline" size="icon" className="size-8">
              <ChevronRight className="size-4" />
            </Button>
          </div>
          <span className="font-semibold text-lg text-foreground">November 2026</span>
          <Button variant="ghost" size="sm" className="text-xs">
            Hari Ini
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            Bulan
          </Button>
          <Button variant="ghost" size="sm" className="text-xs">
            Minggu
          </Button>
        </div>
      </div>

      {/* Calendar Grid Shell Placeholder */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-7 gap-px rounded-lg bg-border overflow-hidden border border-border text-center text-xs font-semibold text-muted-foreground">
            {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day) => (
              <div key={day} className="bg-muted/50 py-2.5">
                {day}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center justify-center text-center p-8">
            <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
              <Calendar className="size-6" />
            </div>
            <p className="text-sm font-medium text-foreground">Grid Kalender Interaktif Siap</p>
            <p className="text-xs text-muted-foreground max-w-sm mt-1">
              Data event dan manipulasi drag/click tanggal akan diimplementasikan pada Phase 5.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
