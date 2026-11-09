"use client";

import React, { useState, useEffect, useCallback, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlatformBadge } from "@/components/shared/platform-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/lib/api/api-client";
import { ContentItem } from "@/types/content.types";
import {
  format,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  parseISO,
} from "date-fns";
import { id as idLocale } from "date-fns/locale";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Edit,
  ArrowRight,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

function CalendarView() {
  const router = useRouter();
  const [events, setEvents] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [viewMode, setViewMode] = useState<"month" | "week">("month");

  // Selected event modal
  const [selectedEvent, setSelectedEvent] = useState<ContentItem | null>(null);

  // Selected date modal for quick create
  const [selectedDateForCreate, setSelectedDateForCreate] = useState<Date | null>(null);

  // Navigation handlers
  const handlePrev = () => {
    if (viewMode === "month") {
      setCurrentDate((prev) => subMonths(prev, 1));
    } else {
      setCurrentDate((prev) => subWeeks(prev, 1));
    }
  };

  const handleNext = () => {
    if (viewMode === "month") {
      setCurrentDate((prev) => addMonths(prev, 1));
    } else {
      setCurrentDate((prev) => addWeeks(prev, 1));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Generate calendar grid days
  const daysInGrid = useMemo(() => {
    if (viewMode === "month") {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(monthStart);
      const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
      const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
      return eachDayOfInterval({ start: startDate, end: endDate });
    } else {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
      return eachDayOfInterval({ start: weekStart, end: weekEnd });
    }
  }, [currentDate, viewMode]);

  const fetchEvents = useCallback(async () => {
    if (daysInGrid.length === 0) return;
    setIsLoading(true);

    const start = daysInGrid[0]?.toISOString();
    const end = daysInGrid[daysInGrid.length - 1]?.toISOString();

    if (!start || !end) return;

    try {
      const data = await api.calendar.getEvents({ startDate: start, endDate: end });
      setEvents(data || []);
      setError(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memuat jadwal kalender.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [daysInGrid]);

  useEffect(() => {
    let isMounted = true;
    if (daysInGrid.length === 0) return;

    const start = daysInGrid[0]?.toISOString();
    const end = daysInGrid[daysInGrid.length - 1]?.toISOString();

    if (!start || !end) return;

    api.calendar
      .getEvents({ startDate: start, endDate: end })
      .then((data) => {
        if (isMounted) {
          setEvents(data || []);
          setError(null);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : "Gagal memuat jadwal kalender.";
          setError(msg);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [daysInGrid]);

  // Map events to date
  const eventsByDate = useMemo(() => {
    const map = new Map<string, ContentItem[]>();

    events.forEach((item) => {
      if (item.scheduledAt) {
        try {
          const dateKey = format(parseISO(item.scheduledAt), "yyyy-MM-dd");
          const existing = map.get(dateKey) || [];
          map.set(dateKey, [...existing, item]);
        } catch {
          // ignore parsing error
        }
      }
    });

    return map;
  }, [events]);

  const handleCellClick = (day: Date) => {
    setSelectedDateForCreate(day);
  };

  const handleProceedToCreate = () => {
    if (selectedDateForCreate) {
      const dateStr = format(selectedDateForCreate, "yyyy-MM-dd");
      router.push(`/contents/new?date=${dateStr}`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <PageHeader
        title="Kalender Konten"
        description="Visualisasikan dan atur jadwal publikasi konten di seluruh saluran media sosial Anda."
      >
        <Link
          href="/contents/new"
          className={buttonVariants({ size: "sm", className: "shadow-xs h-9 gap-1.5" })}
        >
          <Plus className="size-4" />
          <span>Jadwalkan Konten</span>
        </Link>
      </PageHeader>

      {/* Calendar Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-card p-3 sm:p-3.5 rounded-xl border border-border/80 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8 cursor-pointer"
              onClick={handlePrev}
              aria-label="Periode Sebelumnya"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8 cursor-pointer"
              onClick={handleNext}
              aria-label="Periode Berikutnya"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
          <span className="font-semibold text-base sm:text-lg text-foreground capitalize tracking-tight">
            {format(currentDate, "MMMM yyyy", { locale: idLocale })}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-semibold cursor-pointer h-7 px-2.5 text-foreground hover:bg-accent"
            onClick={handleToday}
          >
            Hari Ini
          </Button>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border/60">
          <Button
            variant={viewMode === "month" ? "default" : "ghost"}
            size="sm"
            className="text-xs h-7 px-3 cursor-pointer shadow-2xs font-medium"
            onClick={() => setViewMode("month")}
          >
            Bulan
          </Button>
          <Button
            variant={viewMode === "week" ? "default" : "ghost"}
            size="sm"
            className="text-xs h-7 px-3 cursor-pointer shadow-2xs font-medium"
            onClick={() => setViewMode("week")}
          >
            Minggu
          </Button>
        </div>
      </div>

      {error ? (
        <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl border border-destructive/20 bg-destructive/5 space-y-3">
          <AlertCircle className="size-6 text-destructive" />
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button onClick={fetchEvents} variant="outline" size="sm">
            <RefreshCw className="mr-2 size-3.5" />
            Coba Lagi
          </Button>
        </div>
      ) : (
        /* Calendar Grid Container */
        <Card className="overflow-hidden border-border/80 bg-card shadow-2xs">
          <CardContent className="p-0">
            {/* Day Names Header */}
            <div className="grid grid-cols-7 border-b border-border/70 bg-muted/30 text-center text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider py-2.5">
              <div>Senin</div>
              <div>Selasa</div>
              <div>Rabu</div>
              <div>Kamis</div>
              <div>Jumat</div>
              <div className="text-foreground">Sabtu</div>
              <div className="text-rose-600 dark:text-rose-400">Minggu</div>
            </div>

            {/* Days Grid Cells */}
            <div
              className={`grid grid-cols-7 divide-x divide-y divide-border/60 ${
                viewMode === "month" ? "min-h-[640px]" : "min-h-[380px]"
              }`}
            >
              {daysInGrid.map((day) => {
                const dateKey = format(day, "yyyy-MM-dd");
                const dayEvents = eventsByDate.get(dateKey) || [];
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isTodayCell = isToday(day);

                return (
                  <div
                    key={day.toISOString()}
                    onClick={() => handleCellClick(day)}
                    className={`group relative flex flex-col p-2 transition-colors cursor-pointer min-h-[100px] ${
                      !isCurrentMonth ? "bg-muted/15 text-muted-foreground/40" : "bg-card hover:bg-muted/25"
                    }`}
                  >
                    {/* Date Number Badge */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`inline-flex size-6 items-center justify-center rounded-md text-xs font-semibold ${
                          isTodayCell
                            ? "bg-foreground text-background font-bold shadow-xs"
                            : isCurrentMonth
                            ? "text-foreground"
                            : "text-muted-foreground/50"
                        }`}
                      >
                        {format(day, "d")}
                      </span>

                      {/* Hover Plus Button */}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-foreground/70 text-[10px] font-medium flex items-center gap-0.5">
                        <Plus className="size-3" />
                      </span>
                    </div>

                    {/* Event Chips List */}
                    <div className="flex flex-col gap-1 overflow-hidden flex-1">
                      {isLoading ? (
                        <div className="space-y-1">
                          <Skeleton className="h-3.5 w-full rounded" />
                        </div>
                      ) : (
                        dayEvents.slice(0, 3).map((event) => (
                          <div
                            key={event.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEvent(event);
                            }}
                            className="group/chip flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[11px] font-medium bg-accent text-foreground border border-border/80 hover:bg-accent/80 transition-colors truncate shadow-2xs"
                          >
                            <span className="size-1.5 rounded-full bg-indigo-500 shrink-0" />
                            <span className="truncate">{event.title}</span>
                          </div>
                        ))
                      )}
                      {dayEvents.length > 3 && (
                        <span className="text-[10px] text-muted-foreground font-medium pl-1">
                          +{dayEvents.length - 3} lainnya
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Event Detail Modal */}
      <Dialog open={Boolean(selectedEvent)} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-md border-border/80">
          <DialogHeader className="space-y-2">
            <div className="flex items-center gap-2">
              {selectedEvent && <PlatformBadge platform={selectedEvent.platform} size="sm" />}
              {selectedEvent && <StatusBadge status={selectedEvent.status} size="sm" />}
            </div>
            <DialogTitle className="text-base sm:text-lg font-semibold leading-snug">{selectedEvent?.title}</DialogTitle>
            <DialogDescription className="text-xs flex items-center gap-1.5 pt-0.5">
              <Clock className="size-3.5 text-muted-foreground" />
              <span>
                {selectedEvent?.scheduledAt
                  ? format(new Date(selectedEvent.scheduledAt), "EEEE, d MMMM yyyy 'pukul' HH:mm", {
                      locale: idLocale,
                    })
                  : "Jadwal belum ditentukan"}
              </span>
            </DialogDescription>
          </DialogHeader>

          {selectedEvent?.caption && (
            <div className="space-y-1.5 py-2">
              <label className="text-xs font-semibold text-foreground">Caption Konten</label>
              <div className="max-h-40 overflow-y-auto rounded-lg border border-border/80 bg-muted/30 p-3 text-xs text-foreground/90 whitespace-pre-wrap leading-relaxed">
                {selectedEvent.caption}
              </div>
            </div>
          )}

          {selectedEvent?.hashtags && selectedEvent.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {selectedEvent.hashtags.map((h, i) => (
                <span
                  key={i}
                  className="rounded-md bg-accent px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border/60"
                >
                  #{h.replace(/^#/, "")}
                </span>
              ))}
            </div>
          )}

          <DialogFooter className="flex flex-row justify-between sm:justify-between items-center gap-2 pt-3 border-t border-border/50">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedEvent(null)}
              className="text-xs h-8"
            >
              Tutup
            </Button>
            {selectedEvent && (
              <Link
                href={`/contents/${selectedEvent.id}`}
                className={buttonVariants({ size: "sm", className: "text-xs h-8 gap-1.5 shadow-xs" })}
              >
                <Edit className="size-3.5" />
                <span>Buka Detail & Edit</span>
              </Link>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quick Create Prompt on Empty Date Cell Click */}
      <Dialog
        open={Boolean(selectedDateForCreate)}
        onOpenChange={(open) => !open && setSelectedDateForCreate(null)}
      >
        <DialogContent className="sm:max-w-sm border-border/80">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">Jadwalkan Konten</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Apakah Anda ingin merencanakan konten baru untuk tanggal{" "}
              <span className="font-semibold text-foreground">
                {selectedDateForCreate
                  ? format(selectedDateForCreate, "EEEE, d MMMM yyyy", { locale: idLocale })
                  : ""}
              </span>
              ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDateForCreate(null)}
              className="text-xs h-8"
            >
              Batal
            </Button>
            <Button
              size="sm"
              onClick={handleProceedToCreate}
              className="text-xs h-8 gap-1.5 shadow-xs"
            >
              <span>Lanjut ke Formulir</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function CalendarPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-[500px] w-full rounded-xl" />
        </div>
      }
    >
      <CalendarView />
    </Suspense>
  );
}
