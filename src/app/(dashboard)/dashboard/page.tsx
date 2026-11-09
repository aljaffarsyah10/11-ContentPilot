"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api/api-client";
import { ContentItem } from "@/types/content.types";
import { IdeaItem } from "@/types/idea.types";
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
  AlertCircle,
  RefreshCw,
  Loader2,
} from "lucide-react";

interface DashboardData {
  metrics: {
    totalContents: number;
    scheduledCount: number;
    draftCount: number;
    publishedCount: number;
    activeIdeasCount: number;
  };
  upcoming: ContentItem[];
  recentIdeas: IdeaItem[];
}

function DashboardView() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [convertingId, setConvertingId] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await api.dashboard.getData();
      setData(res);
      setError(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memuat ringkasan dashboard.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    api.dashboard
      .getData()
      .then((res) => {
        if (isMounted) {
          setData(res);
          setError(null);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : "Gagal memuat ringkasan dashboard.";
          setError(msg);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleConvertIdea = async (idea: IdeaItem) => {
    setConvertingId(idea.id);
    try {
      const createdContent = await api.ideas.convert(idea.id, {
        platform: "INSTAGRAM",
      });

      toast.success("Ide berhasil dikonversi ke konten draft!");
      if (createdContent?.id) {
        router.push(`/contents/${createdContent.id}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengonversi ide ke konten.";
      toast.error(msg);
    } finally {
      setConvertingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-28 rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
          <Skeleton className="h-28 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Skeleton className="h-80 rounded-xl" />
          <Skeleton className="h-80 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-destructive/20 bg-destructive/5 space-y-4">
        <AlertCircle className="size-10 text-destructive" />
        <div>
          <h3 className="text-base font-semibold text-foreground">Kendala Memuat Dashboard</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">{error}</p>
        </div>
        <Button onClick={fetchDashboardData} variant="outline" size="sm" className="gap-2">
          <RefreshCw className="size-4" />
          <span>Coba Lagi</span>
        </Button>
      </div>
    );
  }

  const { metrics, upcoming, recentIdeas } = data;

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-200">
      {/* Header */}
      <PageHeader
        title="Dashboard"
        description="Ringkasan perencanaan konten sosial media dan inspirasi ide aktif Anda."
      >
        <Link
          href="/contents/new"
          className={buttonVariants({
            size: "sm",
            className: "shadow-xs font-medium h-9 gap-1.5",
          })}
        >
          <Plus className="size-4" />
          <span>Buat Konten Baru</span>
        </Link>
        <Link
          href="/ai-generator"
          className={buttonVariants({
            variant: "outline",
            size: "sm",
            className: "shadow-2xs font-medium h-9 gap-1.5",
          })}
        >
          <Sparkles className="size-4 text-indigo-500" />
          <span>AI Generator</span>
        </Link>
      </PageHeader>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Konten"
          value={metrics.totalContents}
          icon={FileText}
          description="Seluruh konten terdaftar"
        />
        <StatCard
          title="Terjadwal"
          value={metrics.scheduledCount}
          icon={CalendarIcon}
          description="Siap tayang di kalender"
        />
        <StatCard
          title="Draft Konten"
          value={metrics.draftCount}
          icon={Clock}
          description="Perlu disempurnakan"
        />
        <StatCard
          title="Ide Tersimpan"
          value={metrics.activeIdeasCount}
          icon={Lightbulb}
          description="Inspirasi dalam backlog"
        />
      </div>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Section 1: Upcoming Scheduled Content */}
        <Card className="flex flex-col border-border/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.03)]">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-semibold">Konten Akan Tayang</CardTitle>
              <CardDescription className="text-xs">
                Jadwal posting terdekat yang telah direncanakan
              </CardDescription>
            </div>
            <Link
              href="/calendar"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "text-xs gap-1 h-8 text-muted-foreground hover:text-foreground",
              })}
            >
              <span>Lihat Kalender</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="flex-1 pt-2 pb-4">
            {upcoming.length === 0 ? (
              <EmptyState
                icon={CalendarIcon}
                title="Belum Ada Jadwal Konten"
                description="Rencanakan dan atur tanggal posting konten Anda melalui kalender."
                actionLabel="Jadwalkan Konten"
                onAction={() => router.push("/contents/new")}
              />
            ) : (
              <div className="divide-y divide-border/60">
                {upcoming.map((item) => {
                  const scheduledDate = item.scheduledAt
                    ? format(new Date(item.scheduledAt), "EEEE, d MMM yyyy • HH:mm", {
                        locale: idLocale,
                      })
                    : "Waktu belum ditentukan";

                  return (
                    <div
                      key={item.id}
                      className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-4 group transition-colors"
                    >
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <Link
                          href={`/contents/${item.id}`}
                          className="font-medium text-sm text-foreground hover:underline line-clamp-1 block"
                        >
                          {item.title}
                        </Link>
                        <div className="flex flex-wrap items-center gap-2">
                          <PlatformBadge platform={item.platform} size="sm" />
                          <StatusBadge status={item.status} size="sm" />
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="size-3" />
                            {scheduledDate}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/contents/${item.id}`}
                        className={buttonVariants({
                          variant: "outline",
                          size: "xs",
                          className: "h-7 text-xs font-normal opacity-90 group-hover:opacity-100",
                        })}
                      >
                        Detail
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 2: Recent Content Ideas */}
        <Card className="flex flex-col border-border/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.03)]">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-semibold">Ide Konten Terbaru</CardTitle>
              <CardDescription className="text-xs">
                Inspirasi yang siap dikonversi menjadi materi tayang
              </CardDescription>
            </div>
            <Link
              href="/ideas"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "text-xs gap-1 h-8 text-muted-foreground hover:text-foreground",
              })}
            >
              <span>Semua Ide</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="flex-1 pt-2 pb-4">
            {recentIdeas.length === 0 ? (
              <EmptyState
                icon={Lightbulb}
                title="Backlog Ide Masih Kosong"
                description="Catat ide spontan atau gunakan AI untuk memancing inspirasi baru."
                actionLabel="Tambah Ide"
                onAction={() => router.push("/ideas")}
              />
            ) : (
              <div className="divide-y divide-border/60">
                {recentIdeas.map((idea) => {
                  const createdDate = format(new Date(idea.createdAt), "d MMM yyyy", {
                    locale: idLocale,
                  });

                  return (
                    <div
                      key={idea.id}
                      className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-4 group"
                    >
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <p className="font-medium text-sm text-foreground line-clamp-1">
                          {idea.title}
                        </p>
                        {idea.description && (
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {idea.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 pt-0.5">
                          <StatusBadge status={idea.status} size="sm" />
                          <span className="text-[11px] text-muted-foreground">{createdDate}</span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="xs"
                        disabled={convertingId === idea.id || idea.status === "USED"}
                        onClick={() => handleConvertIdea(idea)}
                        className="h-7 text-xs font-normal gap-1 shrink-0"
                      >
                        {convertingId === idea.id ? (
                          <Loader2 className="size-3 animate-spin" />
                        ) : (
                          <Sparkles className="size-3 text-indigo-500" />
                        )}
                        <span>{idea.status === "USED" ? "Sudah Jadi Konten" : "Jadikan Konten"}</span>
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Launch Banner */}
      <div className="rounded-xl border border-border/80 bg-gradient-to-r from-card via-card to-accent/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-semibold text-foreground flex items-center justify-center sm:justify-start gap-2">
            <Sparkles className="size-4 text-indigo-500" />
            Butuh ide caption segar hari ini?
          </h4>
          <p className="text-xs text-muted-foreground max-w-xl">
            Gunakan AI Caption Studio untuk membuat copywriting promosi, edukasi, atau storytelling
            dalam hitungan detik.
          </p>
        </div>
        <Link
          href="/ai-generator"
          className={buttonVariants({
            size: "sm",
            className: "h-9 px-4 text-xs font-semibold shrink-0 shadow-xs",
          })}
        >
          Coba Generator AI
          <ArrowRight className="size-3.5 ml-1.5" />
        </Link>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
          </div>
        </div>
      }
    >
      <DashboardView />
    </Suspense>
  );
}
