"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/shared/empty-state";
import { PlatformBadge } from "@/components/shared/platform-badge";
import { StatusBadge, ContentStatus } from "@/components/shared/status-badge";
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
import { useMockStore } from "@/features/shared/mock-store";
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
  const { contents, deleteContent, updateContent } = useMockStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Deletion modal state
  const [contentToDelete, setContentToDelete] = useState<string | null>(null);

  // Filtered contents
  const filteredContents = useMemo(() => {
    return contents.filter((item) => {
      // Search filter
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.caption && item.caption.toLowerCase().includes(searchQuery.toLowerCase()));

      // Platform filter
      const matchesPlatform =
        selectedPlatform === "ALL" || item.platform === selectedPlatform;

      // Status filter
      const matchesStatus =
        selectedStatus === "all" || item.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesPlatform && matchesStatus;
    });
  }, [contents, searchQuery, selectedPlatform, selectedStatus]);

  const handleDelete = () => {
    if (contentToDelete) {
      deleteContent(contentToDelete);
      toast.success("Konten berhasil dihapus.");
      setContentToDelete(null);
    }
  };

  const handleStatusChange = (id: string, newStatus: ContentStatus) => {
    updateContent(id, { status: newStatus });
    toast.success(`Status konten diperbarui ke ${newStatus}!`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Daftar Konten"
        description="Kelola seluruh draft, jadwal tayang, dan materi konten media sosial Anda."
      >
        <Link
          href="/contents/new"
          className={buttonVariants({ size: "sm" })}
        >
          <Plus className="size-4 mr-1.5" />
          Buat Konten Baru
        </Link>
      </PageHeader>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Cari judul atau caption..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Platform Filter */}
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {platforms.map((p) => (
              <option key={p.value} value={p.value}>
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
          <TabsList className="grid w-full grid-cols-4 sm:w-auto">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content Table Area */}
      {filteredContents.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8">
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
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
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
              {filteredContents.map((content) => (
                <TableRow key={content.id} className="hover:bg-muted/30">
                  <TableCell>
                    <PlatformBadge platform={content.platform} />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      <Link
                        href={`/contents/${content.id}`}
                        className="font-medium text-sm text-foreground hover:text-primary transition-colors block"
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
                    <StatusBadge status={content.status} />
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {content.scheduledAt ? (
                      <div className="flex items-center gap-1.5 text-foreground">
                        <Calendar className="size-3.5 text-primary" />
                        <span>
                          {format(new Date(content.scheduledAt), "d MMM yyyy, HH:mm", {
                            locale: idLocale,
                          })}
                        </span>
                      </div>
                    ) : (
                      <span className="italic">Belum dijadwalkan</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className={buttonVariants({
                          variant: "ghost",
                          size: "icon",
                          className: "size-8 p-0 cursor-pointer",
                        })}
                      >
                        <MoreVertical className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Aksi Konten</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Link
                            href={`/contents/${content.id}`}
                            className="flex items-center w-full px-2 py-1.5 cursor-pointer"
                          >
                            <Edit className="size-4 mr-2" />
                            <span>Edit Konten</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                          Ubah Status
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(content.id, "DRAFT")}
                        >
                          <FileText className="size-4 mr-2" />
                          <span>Set Draft</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(content.id, "SCHEDULED")}
                        >
                          <Calendar className="size-4 mr-2" />
                          <span>Set Scheduled</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(content.id, "PUBLISHED")}
                        >
                          <CheckCircle2 className="size-4 mr-2" />
                          <span>Set Published</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setContentToDelete(content.id)}
                          className="text-destructive focus:text-destructive cursor-pointer"
                        >
                          <Trash2 className="size-4 mr-2" />
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

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog
        open={Boolean(contentToDelete)}
        onOpenChange={(open) => !open && setContentToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Materi Konten?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Konten akan dihapus dari daftar dan kalender publikasi Anda.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Hapus Konten
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
