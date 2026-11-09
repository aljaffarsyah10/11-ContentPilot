"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/shared/empty-state";
import { PlatformBadge } from "@/components/shared/platform-badge";
import { StatusBadge, ContentStatus } from "@/components/shared/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { api } from "@/lib/api/api-client";
import { ContentItem } from "@/types/content.types";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { toast } from "sonner";
import {
  FileText,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Loader2,
  Copy,
  Download,
} from "lucide-react";

const platforms: Array<{ label: string; value: string }> = [
  { label: "Semua Platform", value: "ALL" },
  { label: "Instagram", value: "INSTAGRAM" },
  { label: "TikTok", value: "TIKTOK" },
  { label: "LinkedIn", value: "LINKEDIN" },
  { label: "Facebook", value: "FACEBOOK" },
  { label: "X", value: "X" },
  { label: "YouTube", value: "YOUTUBE" },
];

export default function ContentsPage() {
  const router = useRouter();
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Deletion modal state
  const [contentToDelete, setContentToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);

  const fetchContents = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.contents.list({
        platform: selectedPlatform,
        status: selectedStatus,
        search: searchQuery,
      });
      setContents(data || []);
      setError(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memuat daftar konten.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [selectedPlatform, selectedStatus, searchQuery]);

  useEffect(() => {
    let isMounted = true;
    const timer = setTimeout(() => {
      api.contents
        .list({
          platform: selectedPlatform,
          status: selectedStatus,
          search: searchQuery,
        })
        .then((data) => {
          if (isMounted) {
            setContents(data || []);
            setError(null);
            setIsLoading(false);
          }
        })
        .catch((err: unknown) => {
          if (isMounted) {
            const msg = err instanceof Error ? err.message : "Gagal memuat daftar konten.";
            setError(msg);
            setIsLoading(false);
          }
        });
    }, 250);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [selectedPlatform, selectedStatus, searchQuery]);

  const handleDuplicate = async (id: string) => {
    setDuplicatingId(id);
    try {
      const duplicated = await api.contents.duplicate(id);
      toast.success(`Konten "${duplicated.title}" berhasil digandakan sebagai draf!`);
      fetchContents();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menggandakan konten.";
      toast.error(msg);
    } finally {
      setDuplicatingId(null);
    }
  };

  const handleExportCsv = async () => {
    setIsExporting(true);
    try {
      await api.contents.downloadExportCsv();
      toast.success("File CSV berhasil diekspor dan diunduh.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengekspor file CSV.";
      toast.error(msg);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDelete = async () => {
    if (!contentToDelete) return;

    setIsDeleting(true);
    try {
      await api.contents.delete(contentToDelete);
      toast.success("Konten berhasil dihapus.");
      setContentToDelete(null);
      fetchContents();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus konten.";
      toast.error(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: ContentStatus) => {
    try {
      await api.contents.update(id, { status: newStatus });
      toast.success(`Status berhasil diperbarui ke ${newStatus}`);
      fetchContents();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memperbarui status.";
      toast.error(msg);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <PageHeader
        title="Manajemen Konten"
        description="Kelola seluruh draft, jadwal tayang, dan materi konten media sosial Anda."
      >
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportCsv}
          disabled={isExporting}
          className="shadow-2xs h-9 gap-1.5"
        >
          {isExporting ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Download className="size-3.5" />
          )}
          <span>Export CSV</span>
        </Button>
        <Link
          href="/contents/new"
          className={buttonVariants({ size: "sm", className: "shadow-xs h-9 gap-1.5" })}
        >
          <Plus className="size-4" />
          <span>Buat Konten</span>
        </Link>
      </PageHeader>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-2.5 sm:flex-row sm:items-center">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
            <Input
              placeholder="Cari judul atau caption..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>

          {/* Platform Filter */}
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="h-9 rounded-lg border border-input/90 bg-card/60 px-3 py-1 text-xs text-foreground font-medium shadow-2xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 cursor-pointer"
          >
            {platforms.map((p) => (
              <option key={p.value} value={p.value} className="bg-popover text-popover-foreground">
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Tabs */}
        <Tabs
          value={selectedStatus}
          onValueChange={setSelectedStatus}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-4 sm:w-auto h-9 p-1 bg-muted/60 border border-border/60">
            <TabsTrigger value="all" className="text-xs px-3">Semua</TabsTrigger>
            <TabsTrigger value="DRAFT" className="text-xs px-3">Draft</TabsTrigger>
            <TabsTrigger value="SCHEDULED" className="text-xs px-3">Scheduled</TabsTrigger>
            <TabsTrigger value="PUBLISHED" className="text-xs px-3">Published</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {error ? (
        <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl border border-destructive/20 bg-destructive/5 space-y-3">
          <AlertCircle className="size-6 text-destructive" />
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button onClick={fetchContents} variant="outline" size="sm">
            <RefreshCw className="mr-2 size-3.5" />
            Coba Lagi
          </Button>
        </div>
      ) : isLoading ? (
        <div className="rounded-xl border border-border/80 bg-card p-4 space-y-3 shadow-2xs">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </div>
      ) : contents.length === 0 ? (
        <div className="rounded-xl border border-border/80 bg-card p-6 shadow-2xs">
          <EmptyState
            icon={FileText}
            title="Tidak Ada Konten Ditemukan"
            description={
              searchQuery || selectedPlatform !== "ALL" || selectedStatus !== "all"
                ? "Tidak ada materi konten yang cocok dengan kriteria pencarian atau filter Anda."
                : "Anda belum memiliki materi konten. Mulai buat draft pertama atau rencanakan jadwal publikasi Anda."
            }
            actionLabel={
              searchQuery || selectedPlatform !== "ALL" || selectedStatus !== "all"
                ? "Reset Filter"
                : "Buat Konten Baru"
            }
            onAction={() => {
              if (searchQuery || selectedPlatform !== "ALL" || selectedStatus !== "all") {
                setSearchQuery("");
                setSelectedPlatform("ALL");
                setSelectedStatus("all");
              } else {
                router.push("/contents/new");
              }
            }}
          />
        </div>
      ) : (
        <div className="rounded-xl border border-border/80 bg-card overflow-hidden shadow-2xs">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px]">Platform</TableHead>
                <TableHead>Judul Konten</TableHead>
                <TableHead className="w-[130px]">Status</TableHead>
                <TableHead className="w-[180px]">Jadwal Tayang</TableHead>
                <TableHead className="w-[70px] text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contents.map((content) => (
                <TableRow key={content.id} className="hover:bg-muted/30">
                  <TableCell>
                    <PlatformBadge platform={content.platform} size="sm" />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      <Link
                        href={`/contents/${content.id}`}
                        className="font-medium text-sm text-foreground hover:underline transition-colors block"
                      >
                        {content.title}
                      </Link>
                      {content.caption && (
                        <p className="text-xs text-muted-foreground line-clamp-1 max-w-lg">
                          {content.caption}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={content.status} size="sm" />
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {content.scheduledAt ? (
                      <div className="flex items-center gap-1.5 text-foreground">
                        <Calendar className="size-3.5 text-indigo-500" />
                        <span>
                          {format(new Date(content.scheduledAt), "d MMM yyyy, HH:mm", {
                            locale: idLocale,
                          })}
                        </span>
                      </div>
                    ) : (
                      <span className="italic text-muted-foreground/80">Belum dijadwalkan</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className={buttonVariants({
                          variant: "ghost",
                          size: "icon",
                          className: "size-8 p-0 cursor-pointer text-muted-foreground hover:text-foreground",
                        })}
                      >
                        <MoreVertical className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 shadow-md border-border/80">
                        <DropdownMenuLabel className="text-xs">Aksi Konten</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => router.push(`/contents/${content.id}`)}
                          className="cursor-pointer text-xs"
                        >
                          <Edit className="size-3.5 mr-2" />
                          <span>Edit Konten</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDuplicate(content.id)}
                          disabled={duplicatingId === content.id}
                          className="cursor-pointer text-xs"
                        >
                          {duplicatingId === content.id ? (
                            <Loader2 className="size-3.5 mr-2 animate-spin" />
                          ) : (
                            <Copy className="size-3.5 mr-2" />
                          )}
                          <span>Duplikasi Konten</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className="text-[11px] text-muted-foreground uppercase font-medium">
                          Ubah Status
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(content.id, "DRAFT")}
                          className="cursor-pointer text-xs"
                        >
                          <FileText className="size-3.5 mr-2" />
                          <span>Set Draft</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(content.id, "SCHEDULED")}
                          className="cursor-pointer text-xs"
                        >
                          <Calendar className="size-3.5 mr-2" />
                          <span>Set Scheduled</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(content.id, "PUBLISHED")}
                          className="cursor-pointer text-xs"
                        >
                          <CheckCircle2 className="size-3.5 mr-2" />
                          <span>Set Published</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setContentToDelete(content.id)}
                          className="text-destructive focus:text-destructive cursor-pointer text-xs"
                        >
                          <Trash2 className="size-3.5 mr-2" />
                          <span>Hapus Konten</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Confirmation Dialog for Deletion */}
      <AlertDialog
        open={!!contentToDelete}
        onOpenChange={(open) => !open && setContentToDelete(null)}
      >
        <AlertDialogContent className="border-border/80">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-semibold">Konfirmasi Penghapusan</AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-muted-foreground">
              Apakah Anda yakin ingin menghapus materi konten ini? Tindakan ini bersifat permanen
              dan tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting} className="h-8 text-xs">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 h-8 text-xs"
            >
              {isDeleting ? "Menghapus..." : "Hapus Permanen"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
