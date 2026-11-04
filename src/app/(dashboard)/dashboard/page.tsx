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

  const handleConvertIdea = async (ideaId: string, title: string) => {
    setConvertingId(ideaId);
    try {
      const createdContent = await api.ideas.convert(ideaId);
      toast.success(`Ide "${title}" berhasil dikonversi menjadi draf konten!`);
      // Refresh dashboard data
      fetchDashboardData();
      if (createdContent?.id) {
        router.push(`/contents/${createdContent.id}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengonversi ide.";
      toast.error(msg);
    } finally {
      setConvertingId(null);
    }
  };

  if (error && !data) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Dashboard"
          description="Pantau progres perencanaan konten dan jadwal tayang mendatang Anda."
        />
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-destructive/20 bg-destructive/5 space-y-3">
          <AlertCircle className="size-8 text-destructive" />
          <h3 className="font-semibold text-foreground text-base">Gagal Memuat Data Dashboard</h3>
          <p className="text-sm text-muted-foreground max-w-md">{error}</p>
          <Button onClick={fetchDashboardData} variant="outline" className="mt-2">
            <RefreshCw className="mr-2 size-4" />
            Coba Lagi
          </Button>
        </div>
      </div>
    );
  }

  const metrics = data?.metrics || {
    totalContents: 0,
    scheduledCount: 0,
    draftCount: 0,
    publishedCount: 0,
    activeIdeasCount: 0,
  };
  const upcomingContents = data?.upcoming || [];
  const recentIdeas = data?.recentIdeas || [];

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
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-4 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-32" />
            </Card>
          ))
        ) : (
          <>
            <StatCard
              title="Total Konten"
              value={metrics.totalContents}
              icon={FileText}
              description="Semua konten aktif"
            />
            <StatCard
              title="Jadwal Tayang"
              value={metrics.scheduledCount}
              icon={CalendarIcon}
              description="Konten siap tayang"
            />
            <StatCard
              title="Draft Konten"
              value={metrics.draftCount}
              icon={Clock}
              description="Masih dalam penulisan"
            />
            <StatCard
              title="Ide Tersimpan"
              value={metrics.activeIdeasCount}
              icon={Lightbulb}
              description="Inspirasi belum diproduksi"
            />
          </>
        )}
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
              {isLoading ? (
                <div className="space-y-4 py-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : upcomingContents.length === 0 ? (
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

        {/* Right: Quick Ideas (5 cols) */}
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
              {isLoading ? (
                <div className="space-y-3 py-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full rounded-lg" />
                  ))}
                </div>
              ) : recentIdeas.length === 0 ? (
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
                        className="h-7 text-xs text-primary hover:text-primary font-medium cursor-pointer"
                        disabled={convertingId === idea.id}
                        onClick={() => handleConvertIdea(idea.id, idea.title)}
                      >
                        {convertingId === idea.id ? (
                          <>
                            <Loader2 className="size-3 mr-1 animate-spin" />
                            Mengonversi...
                          </>
                        ) : (
                          <>
                            <Sparkles className="size-3 mr-1" />
                            Jadikan Konten
                          </>
                        )}
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
