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
  Zap,
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
      {/* Header with subtle gradient title */}
      <PageHeader
        title="Dashboard"
        description="Ringkasan perencanaan konten sosial media dan inspirasi ide aktif Anda."
      >
        <Link
          href="/contents/new"
          className={buttonVariants({
            size: "sm",
            className: "shadow-xs font-semibold h-9 gap-1.5",
          })}
        >
          <Plus className="size-4" />
          <span>Buat Konten Baru</span>
        </Link>
        <Link
          href="/ai-generator"
          className={buttonVariants({
            variant: "gradient",
            size: "sm",
            className: "font-semibold h-9 gap-1.5",
          })}
        >
          <Sparkles className="size-4" />
          <span>AI Caption Studio</span>
        </Link>
      </PageHeader>

      {/* KPI Stats Grid with Sophisticated Gradients */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Konten"
          value={metrics.totalContents}
          icon={FileText}
          description="Seluruh materi terdaftar"
          gradient="indigo"
        />
        <StatCard
          title="Terjadwal"
          value={metrics.scheduledCount}
          icon={CalendarIcon}
          description="Siap tayang di kalender"
          gradient="blue"
        />
        <StatCard
          title="Draft Konten"
          value={metrics.draftCount}
          icon={Clock}
          description="Perlu disempurnakan"
          gradient="amber"
        />
        <StatCard
          title="Ide Backlog"
          value={metrics.activeIdeasCount}
          icon={Lightbulb}
          description="Inspirasi siap diolah"
          gradient="purple"
        />
      </div>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Section 1: Upcoming Scheduled Content */}
        <Card className="flex flex-col border-border/80 shadow-[0_1px_3px_0_rgba(15,23,42,0.03)] bg-gradient-to-b from-card via-card to-card/95">
          <CardHeader className="flex flex-row items-center justify-between pb-3.5 border-b border-border/40">
            <div>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <CalendarIcon className="size-4 text-indigo-500" />
                <span>Konten Akan Tayang</span>
              </CardTitle>
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
          <CardContent className="flex-1 pt-3 pb-4">
            {upcoming.length === 0 ? (
              <EmptyState
                icon={CalendarIcon}
                title="Belum Ada Jadwal Konten"
                description="Rencanakan dan atur tanggal posting konten Anda melalui kalender interaktif."
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
                      className="py-3.5 first:pt-1 last:pb-1 flex items-start justify-between gap-4 group transition-colors hover:bg-muted/30 px-2 rounded-lg -mx-2"
                    >
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <Link
                          href={`/contents/${item.id}`}
                          className="font-medium text-sm text-foreground hover:text-indigo-600 dark:hover:text-indigo-400 line-clamp-1 block transition-colors"
                        >
                          {item.title}
                        </Link>
                        <div className="flex flex-wrap items-center gap-2">
                          <PlatformBadge platform={item.platform} size="sm" />
                          <StatusBadge status={item.status} size="sm" />
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
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
        <Card className="flex flex-col border-border/80 shadow-[0_1px_3px_0_rgba(15,23,42,0.03)] bg-gradient-to-b from-card via-card to-card/95">
          <CardHeader className="flex flex-row items-center justify-between pb-3.5 border-b border-border/40">
            <div>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Lightbulb className="size-4 text-amber-500" />
                <span>Ide Konten Terbaru</span>
              </CardTitle>
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
          <CardContent className="flex-1 pt-3 pb-4">
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
                      className="py-3.5 first:pt-1 last:pb-1 flex items-start justify-between gap-4 group transition-colors hover:bg-muted/30 px-2 rounded-lg -mx-2"
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

      {/* Premium Glow Gradient Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900/60 p-6 sm:p-8 shadow-[0_8px_30px_rgb(79,70,229,0.08)] backdrop-blur-sm">
        {/* Background gradient decorative orb */}
        <div className="absolute -right-12 -top-12 size-48 bg-gradient-to-bl from-indigo-500/30 to-purple-500/0 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 size-48 bg-gradient-to-tr from-violet-500/20 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-400">
              <Zap className="size-3" />
              <span>AI Copywriting Accelerator</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
              Butuh ide caption segar & rekomendasi tagar hari ini?
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Gunakan AI Caption Studio untuk membuat copywriting promosi, edukasi, atau storytelling
              dalam hitungan detik berdasarkan audiens target Anda.
            </p>
          </div>

          <Link
            href="/ai-generator"
            className={buttonVariants({
              variant: "gradient",
              size: "sm",
              className: "h-10 px-5 text-xs font-semibold shrink-0 shadow-md gap-2",
            })}
          >
            <span>Buka AI Caption Studio</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
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
