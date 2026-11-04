"use client";

import React, { useTransition, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import { PlatformBadge } from "@/components/shared/platform-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { useMockStore } from "@/features/shared/mock-store";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { toast } from "sonner";
import {
  FileText,
  Calendar as CalendarIcon,
  Lightbulb,
  Clock,
  Plus,
  Sparkles,
  ArrowRight,
} from "lucide-react";

function DashboardView() {
  const router = useRouter();
  const { contents, ideas, convertIdeaToContent } = useMockStore();
  const [, startTransition] = useTransition();

  // Statistics calculation
  const totalContents = contents.length;
  const scheduledCount = contents.filter((c) => c.status === "SCHEDULED").length;
  const draftCount = contents.filter((c) => c.status === "DRAFT").length;
  const activeIdeasCount = ideas.filter((i) => i.status === "NEW" || i.status === "IN_PROGRESS").length;

  // Upcoming scheduled contents (sorted by scheduledAt ASC)
  const upcomingContents = contents
    .filter((c) => c.status === "SCHEDULED" && c.scheduledAt)
    .sort((a, b) => new Date(a.scheduledAt!).getTime() - new Date(b.scheduledAt!).getTime())
    .slice(0, 5);

  // Recent ideas
  const recentIdeas = ideas
    .filter((i) => i.status !== "USED" && i.status !== "ARCHIVED")
    .slice(0, 3);

  const handleConvertIdea = (ideaId: string, title: string) => {
    startTransition(() => {
      const created = convertIdeaToContent(ideaId);
      if (created) {
        toast.success(`Ide "${title}" berhasil dikonversi menjadi draf konten!`);
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        description="Selamat datang kembali! Pantau progres perencanaan konten dan jadwal tayang mendatang Anda."
      >
        <Link
          href="/ai-generator"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <Sparkles className="size-4 mr-1.5 text-purple-600" />
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

      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Konten"
          value={totalContents}
          icon={FileText}
          description="Semua konten aktif"
          trend="+12% bulan ini"
        />
        <StatCard
          title="Jadwal Tayang"
          value={scheduledCount}
          icon={CalendarIcon}
          description="Konten siap tayang"
          trend="Terjadwal"
        />
        <StatCard
          title="Draft Konten"
          value={draftCount}
          icon={Clock}
          description="Masih dalam penulisan"
        />
        <StatCard
          title="Ide Tersimpan"
          value={activeIdeasCount}
          icon={Lightbulb}
          description="Inspirasi belum diproduksi"
        />
      </div>

      {/* Main Split: Upcoming Content & Ideas */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Upcoming Schedule (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="h-full flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base font-semibold">
                  Jadwal Tayang Terdekat
                </CardTitle>
                <CardDescription>
                  Konten yang akan segera dipublikasikan ke media sosial
                </CardDescription>
              </div>
              <Link
                href="/calendar"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: "text-xs",
                })}
              >
                Buka Kalender
                <ArrowRight className="size-3.5 ml-1" />
              </Link>
            </CardHeader>
            <CardContent className="flex-1">
              {upcomingContents.length === 0 ? (
                <EmptyState
                  icon={CalendarIcon}
                  title="Belum Ada Jadwal Konten"
                  description="Jadwalkan konten pertama Anda untuk melihat timeline publikasi di sini."
                  actionLabel="Jadwalkan Sekarang"
                  onAction={() => router.push("/contents/new")}
                />
              ) : (
                <div className="divide-y divide-border">
                  {upcomingContents.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-3 first:pt-0 last:pb-0 gap-3"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <PlatformBadge platform={item.platform} />
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="size-3" />
                            {item.scheduledAt
                              ? format(new Date(item.scheduledAt), "d MMM yyyy, HH:mm", {
                                  locale: idLocale,
                                })
                              : "-"}
                          </span>
                        </div>
                        <Link
                          href={`/contents/${item.id}`}
                          className="font-medium text-sm text-foreground hover:text-primary transition-colors truncate block"
                        >
                          {item.title}
                        </Link>
                      </div>
                      <Link
                        href={`/contents/${item.id}`}
                        className={buttonVariants({ variant: "outline", size: "sm", className: "text-xs shrink-0" })}
                      >
                        Detail
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: Quick Ideas & Platform Distribution (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="h-full flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base font-semibold">
                  Inspirasi Ide Terbaru
                </CardTitle>
                <CardDescription>
                  Ubah ide menjadi draft konten dalam satu klik
                </CardDescription>
              </div>
              <Link
                href="/ideas"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: "text-xs",
                })}
              >
                Papan Ide
                <ArrowRight className="size-3.5 ml-1" />
              </Link>
            </CardHeader>
            <CardContent className="flex-1 space-y-3">
              {recentIdeas.length === 0 ? (
                <EmptyState
                  icon={Lightbulb}
                  title="Papan Ide Kosong"
                  description="Catat ide konten yang terlintas kapan saja agar tidak lupa."
                  actionLabel="Catat Ide Baru"
                  onAction={() => router.push("/ideas")}
                />
              ) : (
                recentIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    className="p-3 rounded-lg border border-border/80 bg-muted/30 space-y-2 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-foreground line-clamp-1">
                        {idea.title}
                      </p>
                      <StatusBadge status={idea.status} />
                    </div>
                    {idea.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {idea.description}
                      </p>
                    )}
                    <div className="pt-1 flex justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs text-primary hover:text-primary font-medium"
                        onClick={() => handleConvertIdea(idea.id, idea.title)}
                      >
                        <Sparkles className="size-3 mr-1" />
                        Jadikan Konten
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm text-muted-foreground">
          Memuat dashboard...
        </div>
      }
    >
      <DashboardView />
    </Suspense>
  );
}
