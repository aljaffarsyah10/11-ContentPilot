import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import {
  FileText,
  Calendar,
  Lightbulb,
  Clock,
  Plus,
  Sparkles,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        description="Pantau performa perencanaan konten dan jadwal tayang mendatang."
      >
        <Link
          href="/ai-generator"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <Sparkles className="size-4 mr-1.5" />
          AI Generator
        </Link>
        <Link
          href="/contents/new"
          className={buttonVariants({ size: "sm" })}
        >
          <Plus className="size-4 mr-1.5" />
          Buat Konten
        </Link>
      </PageHeader>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Konten"
          value="0"
          icon={FileText}
          description="Semua konten aktif"
        />
        <StatCard
          title="Jadwal Tayang"
          value="0"
          icon={Calendar}
          description="Siap dipublikasikan"
        />
        <StatCard
          title="Draft Konten"
          value="0"
          icon={Clock}
          description="Masih dalam penulisan"
        />
        <StatCard
          title="Ide Tersimpan"
          value="0"
          icon={Lightbulb}
          description="Inspirasi belum diproduksi"
        />
      </div>

      {/* Split Section: Upcoming Schedule & Quick Ideas */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Upcoming Schedule (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold">
                Jadwal Tayang Terdekat
              </CardTitle>
              <Link
                href="/calendar"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: "text-xs",
                })}
              >
                Lihat Kalender
              </Link>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={Calendar}
                title="Belum Ada Jadwal Konten"
                description="Jadwalkan konten pertama Anda untuk melihat timeline publikasi di sini."
                actionLabel="Jadwalkan Sekarang"
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Recent Ideas & Tips (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold">
                Papan Ide Cepat
              </CardTitle>
              <Link
                href="/ideas"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: "text-xs",
                })}
              >
                Semua Ide
              </Link>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={Lightbulb}
                title="Papan Ide Masih Kosong"
                description="Catat ide konten yang terlintas kapan saja agar tidak lupa."
                actionLabel="Catat Ide Baru"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
