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
  const [ideaToEdit, setIdeaToEdit] = useState<{ id: string; title: string; description: string } | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Delete State
  const [ideaToDelete, setIdeaToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchIdeas = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.ideas.list({
        status: selectedTab === "all" ? undefined : selectedTab.toUpperCase(),
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
        status: selectedTab === "all" ? undefined : selectedTab.toUpperCase(),
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
        description: null,
        status: "NEW",
      });

      toast.success("Ide baru berhasil dicatat!");
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
    <div className="space-y-6">
      <PageHeader
        title="Papan Ide Konten"
        description="Kumpulkan dan kelola seluruh gagasan topik sebelum diproduksi menjadi materi konten."
      />

      {/* Quick Add Bar */}
      <form onSubmit={handleQuickAdd} className="flex gap-2">
        <Input
          placeholder="Tulis ide atau inspirasi konten baru yang terlintas... (tekan Enter)"
          value={quickInput}
          onChange={(e) => setQuickInput(e.target.value)}
          disabled={isAdding}
          className="flex-1"
        />
        <Button type="submit" disabled={isAdding} className="cursor-pointer">
          {isAdding ? (
            <Loader2 className="size-4 animate-spin mr-1.5" />
          ) : (
            <Plus className="size-4 mr-1.5" />
          )}
          Tambah Ide
        </Button>
      </form>

      {/* Tabs Filter */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 sm:w-auto">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="NEW">Baru</TabsTrigger>
          <TabsTrigger value="IN_PROGRESS">Sedang Dibuat</TabsTrigger>
          <TabsTrigger value="USED">Sudah Dipakai</TabsTrigger>
          <TabsTrigger value="ARCHIVED">Arsip</TabsTrigger>
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
            <Card key={i} className="p-4 space-y-3">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-12 w-full" />
            </Card>
          ))}
        </div>
      ) : ideas.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8">
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
            <Card key={idea.id} className="flex flex-col justify-between hover:shadow-xs transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <StatusBadge status={idea.status} />
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={buttonVariants({
                        variant: "ghost",
                        size: "icon",
                        className: "size-7 p-0 cursor-pointer text-muted-foreground",
                      })}
                    >
                      <MoreVertical className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Kelola Ide</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() =>
                          setIdeaToEdit({
                            id: idea.id,
                            title: idea.title,
                            description: idea.description || "",
                          })
                        }
                      >
                        <Edit className="size-4 mr-2" />
                        <span>Edit Ide</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel className="text-xs text-muted-foreground">
                        Ubah Status
                      </DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleStatusChange(idea.id, "NEW")}>
                        <Lightbulb className="size-4 mr-2" />
                        <span>Set Ide Baru</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(idea.id, "IN_PROGRESS")}>
                        <ArrowRight className="size-4 mr-2" />
                        <span>Set Sedang Dibuat</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(idea.id, "USED")}>
                        <CheckCircle2 className="size-4 mr-2" />
                        <span>Set Sudah Dipakai</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(idea.id, "ARCHIVED")}>
                        <Archive className="size-4 mr-2" />
                        <span>Arsipkan</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setIdeaToDelete(idea.id)}
                        className="text-destructive focus:text-destructive cursor-pointer"
                      >
                        <Trash2 className="size-4 mr-2" />
                        <span>Hapus Ide</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="text-base font-semibold leading-snug pt-2">
                  {idea.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 pb-3">
                {idea.description ? (
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {idea.description}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground/60 italic">
                    Tidak ada deskripsi tambahan
                  </p>
                )}
              </CardContent>
              <CardFooter className="pt-2 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {format(new Date(idea.createdAt), "d MMM yyyy", { locale: idLocale })}
                </span>
                {idea.status !== "USED" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs text-primary border-primary/30 hover:bg-primary/5 font-medium cursor-pointer"
                    onClick={() => setIdeaToConvert(idea.id)}
                  >
                    <Sparkles className="size-3.5 mr-1 text-purple-600" />
                    Jadikan Konten
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Convert to Content Dialog */}
      <Dialog open={Boolean(ideaToConvert)} onOpenChange={(open) => !open && setIdeaToConvert(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Konversi Ide Jadi Konten</DialogTitle>
            <DialogDescription>
              Pilih platform media sosial tujuan untuk membuat draf konten dari ide ini. Status ide akan otomatis ditandai sebagai &quot;Sudah Dipakai&quot;.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <label className="text-sm font-medium">Pilih Platform Target</label>
            <div className="grid grid-cols-2 gap-2">
              {platformList.map((p) => {
                const isSelected = targetPlatform === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setTargetPlatform(p)}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:bg-muted/50"
                    }`}
                  >
                    <PlatformBadge platform={p} />
                  </button>
                );
              })}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" disabled={isConverting} onClick={() => setIdeaToConvert(null)}>
              Batal
            </Button>
            <Button onClick={handleConfirmConvert} disabled={isConverting} className="cursor-pointer">
              {isConverting ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-1.5" />
                  Mengonversi...
                </>
              ) : (
                "Konversi Sekarang"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Idea Dialog */}
      <Dialog open={Boolean(ideaToEdit)} onOpenChange={(open) => !open && setIdeaToEdit(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Ide Konten</DialogTitle>
          </DialogHeader>
          {ideaToEdit && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="edit-title">
                  Judul Ide
                </label>
                <Input
                  id="edit-title"
                  value={ideaToEdit.title}
                  disabled={isSavingEdit}
                  onChange={(e) =>
                    setIdeaToEdit({ ...ideaToEdit, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="edit-desc">
                  Deskripsi / Poin Bahasan
                </label>
                <Input
                  id="edit-desc"
                  value={ideaToEdit.description}
                  disabled={isSavingEdit}
                  onChange={(e) =>
                    setIdeaToEdit({ ...ideaToEdit, description: e.target.value })
                  }
                  placeholder="Tambahkan catatan referensi angle topik..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" disabled={isSavingEdit} onClick={() => setIdeaToEdit(null)}>
              Batal
            </Button>
            <Button onClick={handleSaveEdit} disabled={isSavingEdit} className="cursor-pointer">
              {isSavingEdit ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-1.5" />
                  Menyimpan...
                </>
              ) : (
                "Simpan Perubahan"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog
        open={Boolean(ideaToDelete)}
        onOpenChange={(open) => !open && setIdeaToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Ide Ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Ide konten yang dihapus tidak dapat dipulihkan kembali.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-1.5" />
                  Menghapus...
                </>
              ) : (
                "Hapus Ide"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
