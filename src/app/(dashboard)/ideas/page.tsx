"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { StatusBadge, IdeaStatus } from "@/components/shared/status-badge";
import { PlatformBadge, SocialPlatform } from "@/components/shared/platform-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { IdeaItem } from "@/types/idea.types";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { toast } from "sonner";
import {
  Lightbulb,
  Plus,
  Sparkles,
  MoreVertical,
  Edit,
  Trash2,
  ArrowRight,
  CheckCircle2,
  Archive,
  AlertCircle,
  RefreshCw,
  Loader2,
} from "lucide-react";

const platformList: SocialPlatform[] = [
  "INSTAGRAM",
  "TIKTOK",
  "LINKEDIN",
  "FACEBOOK",
  "X",
  "YOUTUBE",
];

export default function IdeasPage() {
  const router = useRouter();
  const [ideas, setIdeas] = useState<IdeaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [quickInput, setQuickInput] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");

  // Convert Modal State
  const [ideaToConvert, setIdeaToConvert] = useState<string | null>(null);
  const [targetPlatform, setTargetPlatform] = useState<SocialPlatform>("INSTAGRAM");
  const [isConverting, setIsConverting] = useState(false);

  // Edit Modal State
  const [ideaToEdit, setIdeaToEdit] = useState<{
    id: string;
    title: string;
    description: string;
  } | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Delete Dialog State
  const [ideaToDelete, setIdeaToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchIdeas = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.ideas.list({
        status: selectedTab !== "all" ? selectedTab : undefined,
      });
      setIdeas(data || []);
      setError(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memuat papan ide.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [selectedTab]);

  useEffect(() => {
    let isMounted = true;
    api.ideas
      .list({
        status: selectedTab !== "all" ? selectedTab : undefined,
      })
      .then((data) => {
        if (isMounted) {
          setIdeas(data || []);
          setError(null);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : "Gagal memuat papan ide.";
          setError(msg);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedTab]);

  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;

    setIsAdding(true);
    try {
      await api.ideas.create({
        title: quickInput.trim(),
        status: "NEW",
      });
      toast.success("Ide baru berhasil ditambahkan!");
      setQuickInput("");
      fetchIdeas();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mencatat ide baru.";
      toast.error(msg);
    } finally {
      setIsAdding(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: IdeaStatus) => {
    try {
      await api.ideas.update(id, { status: newStatus });
      toast.success(`Status ide diubah ke ${newStatus}`);
      fetchIdeas();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memperbarui status ide.";
      toast.error(msg);
    }
  };

  const handleConfirmConvert = async () => {
    if (!ideaToConvert) return;
    setIsConverting(true);
    try {
      const createdContent = await api.ideas.convert(ideaToConvert, {
        platform: targetPlatform,
      });
      toast.success("Ide berhasil dikonversi menjadi materi konten!");
      setIdeaToConvert(null);
      fetchIdeas();
      if (createdContent?.id) {
        router.push(`/contents/${createdContent.id}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengonversi ide.";
      toast.error(msg);
    } finally {
      setIsConverting(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!ideaToEdit || !ideaToEdit.title.trim()) return;
    setIsSavingEdit(true);
    try {
      await api.ideas.update(ideaToEdit.id, {
        title: ideaToEdit.title.trim(),
        description: ideaToEdit.description.trim() || null,
      });
      toast.success("Ide berhasil diperbarui!");
      setIdeaToEdit(null);
      fetchIdeas();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memperbarui ide.";
      toast.error(msg);
    } finally {
      setIsSavingEdit(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!ideaToDelete) return;
    setIsDeleting(true);
    try {
      await api.ideas.delete(ideaToDelete);
      toast.success("Ide telah dihapus.");
      setIdeaToDelete(null);
      fetchIdeas();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus ide.";
      toast.error(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <PageHeader
        title="Backlog Ide Konten"
        description="Kumpulkan dan kelola seluruh gagasan topik sebelum diproduksi menjadi materi konten."
      />

      {/* Quick Add Bar */}
      <form onSubmit={handleQuickAdd} className="flex gap-2">
        <Input
          placeholder="Tulis ide atau inspirasi konten baru yang terlintas... (tekan Enter)"
          value={quickInput}
          onChange={(e) => setQuickInput(e.target.value)}
          disabled={isAdding}
          className="flex-1 h-10 text-xs sm:text-sm"
        />
        <Button type="submit" disabled={isAdding} className="h-10 text-xs font-semibold gap-1.5 shadow-xs">
          {isAdding ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Plus className="size-4" />
          )}
          <span>Tambah Ide</span>
        </Button>
      </form>

      {/* Tabs Filter */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 sm:w-auto h-9 p-1 bg-muted/60 border border-border/60">
          <TabsTrigger value="all" className="text-xs px-3">Semua</TabsTrigger>
          <TabsTrigger value="NEW" className="text-xs px-3">Baru</TabsTrigger>
          <TabsTrigger value="IN_PROGRESS" className="text-xs px-3">Sedang Dibuat</TabsTrigger>
          <TabsTrigger value="USED" className="text-xs px-3">Sudah Dipakai</TabsTrigger>
          <TabsTrigger value="ARCHIVED" className="text-xs px-3">Arsip</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Ideas Content Area */}
      {error ? (
        <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl border border-destructive/20 bg-destructive/5 space-y-3">
          <AlertCircle className="size-6 text-destructive" />
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button onClick={fetchIdeas} variant="outline" size="sm">
            <RefreshCw className="mr-2 size-3.5" />
            Coba Lagi
          </Button>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-4 space-y-3 border-border/80 shadow-2xs">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-12 w-full" />
            </Card>
          ))}
        </div>
      ) : ideas.length === 0 ? (
        <div className="rounded-xl border border-border/80 bg-card p-6 shadow-2xs">
          <EmptyState
            icon={Lightbulb}
            title="Tidak Ada Ide"
            description={
              selectedTab !== "all"
                ? `Tidak ada ide dalam status ${selectedTab}.`
                : "Belum ada ide yang tersimpan. Gunakan formulir di atas untuk mencatat ide pertama Anda!"
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ideas.map((idea) => (
            <Card key={idea.id} className="flex flex-col justify-between border-border/80 hover:border-border hover:shadow-2xs transition-all duration-150">
              <CardHeader className="pb-2.5">
                <div className="flex items-start justify-between gap-2">
                  <StatusBadge status={idea.status} size="sm" />
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={buttonVariants({
                        variant: "ghost",
                        size: "icon",
                        className: "size-7 p-0 cursor-pointer text-muted-foreground hover:text-foreground",
                      })}
                    >
                      <MoreVertical className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 shadow-md border-border/80">
                      <DropdownMenuLabel className="text-xs">Kelola Ide</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() =>
                          setIdeaToEdit({
                            id: idea.id,
                            title: idea.title,
                            description: idea.description || "",
                          })
                        }
                        className="cursor-pointer text-xs"
                      >
                        <Edit className="size-3.5 mr-2" />
                        <span>Edit Ide</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel className="text-[11px] text-muted-foreground uppercase font-medium">
                        Ubah Status
                      </DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleStatusChange(idea.id, "NEW")} className="cursor-pointer text-xs">
                        <Lightbulb className="size-3.5 mr-2" />
                        <span>Set Ide Baru</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(idea.id, "IN_PROGRESS")} className="cursor-pointer text-xs">
                        <ArrowRight className="size-3.5 mr-2" />
                        <span>Set Sedang Dibuat</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(idea.id, "USED")} className="cursor-pointer text-xs">
                        <CheckCircle2 className="size-3.5 mr-2" />
                        <span>Set Sudah Dipakai</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(idea.id, "ARCHIVED")} className="cursor-pointer text-xs">
                        <Archive className="size-3.5 mr-2" />
                        <span>Arsipkan</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setIdeaToDelete(idea.id)}
                        className="text-destructive focus:text-destructive cursor-pointer text-xs"
                      >
                        <Trash2 className="size-3.5 mr-2" />
                        <span>Hapus Ide</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="text-sm font-semibold leading-snug pt-1.5 text-foreground">
                  {idea.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 pb-3">
                {idea.description ? (
                  <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                    {idea.description}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground/50 italic">
                    Tidak ada catatan tambahan
                  </p>
                )}
              </CardContent>
              <CardFooter className="pt-2 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                <span className="text-[11px]">
                  {format(new Date(idea.createdAt), "d MMM yyyy", { locale: idLocale })}
                </span>
                {idea.status !== "USED" && (
                  <Button
                    size="xs"
                    variant="outline"
                    className="h-7 text-xs font-medium gap-1 text-foreground shadow-2xs"
                    onClick={() => setIdeaToConvert(idea.id)}
                  >
                    <Sparkles className="size-3 text-indigo-500" />
                    <span>Jadikan Konten</span>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Convert to Content Dialog */}
      <Dialog open={Boolean(ideaToConvert)} onOpenChange={(open) => !open && setIdeaToConvert(null)}>
        <DialogContent className="sm:max-w-md border-border/80">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">Konversi Ide Jadi Konten</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
              Pilih platform media sosial tujuan untuk membuat draf konten dari ide ini. Status ide akan otomatis ditandai sebagai &quot;Sudah Dipakai&quot;.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Pilih Platform Target</label>
              <div className="grid grid-cols-3 gap-2">
                {platformList.map((p) => {
                  const isSelected = targetPlatform === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setTargetPlatform(p)}
                      className={`flex items-center justify-center p-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                        isSelected
                          ? "border-foreground bg-accent font-semibold shadow-2xs"
                          : "border-border/80 bg-card hover:bg-muted/40"
                      }`}
                    >
                      <PlatformBadge platform={p} size="sm" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t border-border/50">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIdeaToConvert(null)}
              disabled={isConverting}
              className="text-xs h-8"
            >
              Batal
            </Button>
            <Button
              size="sm"
              onClick={handleConfirmConvert}
              disabled={isConverting}
              className="text-xs h-8 gap-1.5 shadow-xs"
            >
              {isConverting ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Sparkles className="size-3.5" />
              )}
              <span>Buat Konten Sekarang</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Idea Dialog */}
      <Dialog open={Boolean(ideaToEdit)} onOpenChange={(open) => !open && setIdeaToEdit(null)}>
        <DialogContent className="sm:max-w-md border-border/80">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">Edit Ide Konten</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Perbarui judul atau catatan inspirasi untuk ide ini.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3.5 py-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Judul Ide</label>
              <Input
                value={ideaToEdit?.title || ""}
                onChange={(e) =>
                  setIdeaToEdit((prev) => (prev ? { ...prev, title: e.target.value } : null))
                }
                placeholder="Judul ide konten..."
                className="h-9 text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Deskripsi / Catatan Tambahan</label>
              <textarea
                value={ideaToEdit?.description || ""}
                onChange={(e) =>
                  setIdeaToEdit((prev) => (prev ? { ...prev, description: e.target.value } : null))
                }
                placeholder="Tambahkan catatan poin, hook, atau referensi..."
                rows={4}
                className="w-full rounded-lg border border-input/90 bg-card/60 p-3 text-xs sm:text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/25"
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t border-border/50">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIdeaToEdit(null)}
              disabled={isSavingEdit}
              className="text-xs h-8"
            >
              Batal
            </Button>
            <Button
              size="sm"
              onClick={handleSaveEdit}
              disabled={isSavingEdit || !ideaToEdit?.title.trim()}
              className="text-xs h-8 shadow-xs"
            >
              {isSavingEdit ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={Boolean(ideaToDelete)}
        onOpenChange={(open) => !open && setIdeaToDelete(null)}
      >
        <AlertDialogContent className="border-border/80">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-semibold">Hapus Ide Konten?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-muted-foreground">
              Apakah Anda yakin ingin menghapus ide ini dari backlog? Tindakan ini bersifat permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting} className="h-8 text-xs">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
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
