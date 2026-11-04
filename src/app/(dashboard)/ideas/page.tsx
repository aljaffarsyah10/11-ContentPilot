"use client";

import React, { useState, useMemo } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { StatusBadge, IdeaStatus } from "@/components/shared/status-badge";
import { PlatformBadge, SocialPlatform } from "@/components/shared/platform-badge";
import { EmptyState } from "@/components/shared/empty-state";
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
import { useMockStore } from "@/features/shared/mock-store";
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
  const { ideas, addIdea, updateIdea, deleteIdea, convertIdeaToContent } = useMockStore();

  const [quickInput, setQuickInput] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  // Convert Modal State
  const [ideaToConvert, setIdeaToConvert] = useState<string | null>(null);
  const [targetPlatform, setTargetPlatform] = useState<SocialPlatform>("INSTAGRAM");

  // Edit Modal State
  const [ideaToEdit, setIdeaToEdit] = useState<{ id: string; title: string; description: string } | null>(null);

  // Delete State
  const [ideaToDelete, setIdeaToDelete] = useState<string | null>(null);

  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      if (selectedTab === "all") return true;
      return idea.status.toLowerCase() === selectedTab.toLowerCase();
    });
  }, [ideas, selectedTab]);

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;

    addIdea({
      title: quickInput.trim(),
      description: null,
      status: "NEW",
    });

    toast.success("Ide baru berhasil dicatat!");
    setQuickInput("");
  };

  const handleStatusChange = (id: string, newStatus: IdeaStatus) => {
    updateIdea(id, { status: newStatus });
    toast.success(`Status ide diubah ke ${newStatus}`);
  };

  const handleConfirmConvert = () => {
    if (!ideaToConvert) return;
    const created = convertIdeaToContent(ideaToConvert, { platform: targetPlatform });
    if (created) {
      toast.success("Ide berhasil dikonversi menjadi materi konten!");
      setIdeaToConvert(null);
    }
  };

  const handleSaveEdit = () => {
    if (!ideaToEdit || !ideaToEdit.title.trim()) return;
    updateIdea(ideaToEdit.id, {
      title: ideaToEdit.title.trim(),
      description: ideaToEdit.description.trim() || null,
    });
    toast.success("Ide berhasil diperbarui!");
    setIdeaToEdit(null);
  };

  const handleConfirmDelete = () => {
    if (ideaToDelete) {
      deleteIdea(ideaToDelete);
      toast.success("Ide telah dihapus.");
      setIdeaToDelete(null);
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
          className="flex-1"
        />
        <Button type="submit">
          <Plus className="size-4 mr-1.5" />
          Tambah Ide
        </Button>
      </form>

      {/* Tabs Filter */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 sm:w-auto">
          <TabsTrigger value="all">Semua ({ideas.length})</TabsTrigger>
          <TabsTrigger value="new">
            Baru ({ideas.filter((i) => i.status === "NEW").length})
          </TabsTrigger>
          <TabsTrigger value="in_progress">
            Sedang Dibuat ({ideas.filter((i) => i.status === "IN_PROGRESS").length})
          </TabsTrigger>
          <TabsTrigger value="used">
            Sudah Dipakai ({ideas.filter((i) => i.status === "USED").length})
          </TabsTrigger>
          <TabsTrigger value="archived">
            Arsip ({ideas.filter((i) => i.status === "ARCHIVED").length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Ideas Card Grid */}
      {filteredIdeas.length === 0 ? (
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
          {filteredIdeas.map((idea) => (
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
                    className="h-8 text-xs text-primary border-primary/30 hover:bg-primary/5 font-medium"
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
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition-all ${
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
            <Button variant="outline" onClick={() => setIdeaToConvert(null)}>
              Batal
            </Button>
            <Button onClick={handleConfirmConvert}>Konversi Sekarang</Button>
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
                  onChange={(e) =>
                    setIdeaToEdit({ ...ideaToEdit, description: e.target.value })
                  }
                  placeholder="Tambahkan catatan referensi angle topik..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIdeaToEdit(null)}>
              Batal
            </Button>
            <Button onClick={handleSaveEdit}>Simpan Perubahan</Button>
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
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Hapus Ide
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
