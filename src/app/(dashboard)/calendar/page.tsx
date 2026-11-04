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

  // Calendar days grid computation
  const daysInGrid = useMemo(() => {
    if (viewMode === "month") {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(monthStart);
      const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Senin
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
    try {
      const start = daysInGrid[0].toISOString();
      const end = daysInGrid[daysInGrid.length - 1].toISOString();
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
    <div className="space-y-6">
      <PageHeader
        title="Kalender Konten"
        description="Visualisasikan dan atur jadwal publikasi konten di seluruh saluran media sosial Anda."
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card p-4 rounded-xl border border-border shadow-xs">
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
          <span className="font-semibold text-lg text-foreground capitalize">
            {format(currentDate, "MMMM yyyy", { locale: idLocale })}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-primary font-medium cursor-pointer"
            onClick={handleToday}
          >
            Hari Ini
          </Button>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
          <Button
            variant={viewMode === "month" ? "default" : "ghost"}
            size="sm"
            className="text-xs h-7 px-3 cursor-pointer"
            onClick={() => setViewMode("month")}
          >
            Bulan
          </Button>
          <Button
            variant={viewMode === "week" ? "default" : "ghost"}
            size="sm"
            className="text-xs h-7 px-3 cursor-pointer"
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
        <Card className="overflow-hidden border-border bg-card shadow-xs">
          <CardContent className="p-0">
            {/* Day Names Header */}
            <div className="grid grid-cols-7 border-b border-border bg-muted/40 text-center text-xs font-semibold text-muted-foreground py-2.5">
              <div>Senin</div>
              <div>Selasa</div>
              <div>Rabu</div>
              <div>Kamis</div>
              <div>Jumat</div>
              <div className="text-primary font-bold">Sabtu</div>
              <div className="text-destructive font-bold">Minggu</div>
            </div>

            {/* Days Grid Cells */}
            <div
              className={`grid grid-cols-7 divide-x divide-y divide-border ${
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
                      !isCurrentMonth ? "bg-muted/15 text-muted-foreground/40" : "bg-card hover:bg-muted/30"
                    }`}
                  >
                    {/* Date Number Badge */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`inline-flex size-6 items-center justify-center rounded-full text-xs font-medium ${
                          isTodayCell
                            ? "bg-primary text-primary-foreground font-bold shadow-xs"
                            : isCurrentMonth
                            ? "text-foreground"
                            : "text-muted-foreground/50"
                        }`}
                      >
                        {format(day, "d")}
                      </span>

                      {/* Hover Plus Button */}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary text-[10px] font-medium flex items-center gap-0.5">
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
                            className="group/chip flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors truncate"
                          >
                            <span className="size-1.5 rounded-full bg-primary shrink-0" />
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              {selectedEvent && <PlatformBadge platform={selectedEvent.platform} />}
              {selectedEvent && <StatusBadge status={selectedEvent.status} />}
            </div>
            <DialogTitle className="text-lg leading-snug">{selectedEvent?.title}</DialogTitle>
            <DialogDescription className="text-xs flex items-center gap-1.5 pt-1">
              <Clock className="size-3 text-muted-foreground" />
              {selectedEvent?.scheduledAt
                ? format(new Date(selectedEvent.scheduledAt), "EEEE, d MMMM yyyy 'pukul' HH:mm", {
                    locale: idLocale,
                  })
                : "Belum terjadwal"}
            </DialogDescription>
          </DialogHeader>

          {selectedEvent?.caption && (
            <div className="rounded-lg bg-muted/40 p-3 text-xs text-foreground/90 whitespace-pre-line border border-border">
              {selectedEvent.caption}
            </div>
          )}

          {selectedEvent?.hashtags && selectedEvent.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {selectedEvent.hashtags.map((h: string) => (
                <span
                  key={h}
                  className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                >
                  #{h}
                </span>
              ))}
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setSelectedEvent(null)}>
              Tutup
            </Button>
            {selectedEvent && (
              <Link
                href={`/contents/${selectedEvent.id}`}
                className={buttonVariants({ size: "sm" })}
              >
                <Edit className="size-3.5 mr-1.5" />
                Edit Konten
              </Link>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quick Schedule Date Click Dialog */}
      <Dialog
        open={Boolean(selectedDateForCreate)}
        onOpenChange={(open) => !open && setSelectedDateForCreate(null)}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Jadwalkan Konten</DialogTitle>
            <DialogDescription>
              Buat materi konten baru yang ditayangkan pada tanggal:
            </DialogDescription>
          </DialogHeader>
          <div className="py-2 text-center">
            <p className="text-base font-semibold text-primary">
              {selectedDateForCreate
                ? format(selectedDateForCreate, "EEEE, d MMMM yyyy", { locale: idLocale })
                : ""}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedDateForCreate(null)}>
              Batal
            </Button>
            <Button onClick={handleProceedToCreate} className="cursor-pointer">
              Lanjut ke Editor
              <ArrowRight className="size-4 ml-1.5" />
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
        <div className="p-8 text-center text-sm text-muted-foreground">
          Memuat kalender konten...
        </div>
      }
    >
      <CalendarView />
    </Suspense>
  );
}
