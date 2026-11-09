"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PageHeader } from "@/components/shared/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlatformBadge, SocialPlatform } from "@/components/shared/platform-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
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
import { toast } from "sonner";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { ArrowLeft, Trash2, Calendar, FileText, Loader2, Copy } from "lucide-react";

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Judul konten wajib diisi")
    .max(150, "Maksimal 150 karakter"),
  caption: z.string().max(5000, "Maksimal 5000 karakter").optional(),
  hashtags: z.string().optional(),
  platform: z.enum([
    "INSTAGRAM",
    "FACEBOOK",
    "TIKTOK",
    "LINKEDIN",
    "X",
    "YOUTUBE",
  ]),
  status: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED"]),
  scheduledAt: z.string().optional(),
  notes: z.string().max(1000).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const platformOptions: SocialPlatform[] = [
  "INSTAGRAM",
  "TIKTOK",
  "LINKEDIN",
  "FACEBOOK",
  "X",
  "YOUTUBE",
];

export function ContentDetailClient() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [content, setContent] = useState<ContentItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDuplicating, setIsDuplicating] = useState(false);

  const handleDuplicate = async () => {
    setIsDuplicating(true);
    try {
      const duplicated = await api.contents.duplicate(id);
      toast.success(`Konten "${duplicated.title}" berhasil digandakan!`);
      router.push(`/contents/${duplicated.id}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menduplikasi konten.";
      toast.error(msg);
    } finally {
      setIsDuplicating(false);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      caption: "",
      hashtags: "",
      platform: "INSTAGRAM",
      status: "DRAFT",
      scheduledAt: "",
      notes: "",
    },
  });

  const watchedCaption = useWatch({ control, name: "caption" }) || "";

  useEffect(() => {
    let isMounted = true;
    api.contents
      .get(id)
      .then((data) => {
        if (isMounted) {
          setContent(data);
          setError(null);
          setIsLoading(false);

          let formattedDate = "";
          if (data.scheduledAt) {
            try {
              const d = new Date(data.scheduledAt);
              formattedDate = format(d, "yyyy-MM-dd'T'HH:mm");
            } catch {
              formattedDate = "";
            }
          }

          reset({
            title: data.title,
            caption: data.caption || "",
            hashtags: data.hashtags ? data.hashtags.map((h) => `#${h}`).join(" ") : "",
            platform: data.platform,
            status: data.status,
            scheduledAt: formattedDate,
            notes: data.notes || "",
          });
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : "Gagal memuat detail konten.";
          setError(msg);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id, reset]);

  const onSubmit = async (values: FormValues) => {
    try {
      const parsedHashtags = values.hashtags
        ? values.hashtags
            .split(/[\s,]+/)
            .map((t) => t.trim().replace(/^#/, ""))
            .filter(Boolean)
        : [];

      const updated = await api.contents.update(id, {
        title: values.title,
        caption: values.caption || null,
        hashtags: parsedHashtags,
        platform: values.platform,
        status: values.status,
        scheduledAt: values.scheduledAt ? new Date(values.scheduledAt).toISOString() : null,
        notes: values.notes || null,
      });

      setContent(updated);
      toast.success("Perubahan materi konten berhasil disimpan!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal memperbarui konten.";
      toast.error(msg);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await api.contents.delete(id);
      toast.success("Konten berhasil dihapus.");
      setDeleteDialogOpen(false);
      router.push("/contents");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus konten.";
      toast.error(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-3/4" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-4">
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
          <div className="lg:col-span-4">
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="space-y-6">
        <Link
          href="/contents"
          className={buttonVariants({ variant: "ghost", size: "sm", className: "-ml-2 h-8 text-xs text-muted-foreground" })}
        >
          <ArrowLeft className="size-3.5 mr-1" />
          Kembali ke Daftar Konten
        </Link>
        <div className="rounded-xl border border-border/80 bg-card p-6 shadow-2xs">
          <EmptyState
            icon={FileText}
            title="Konten Tidak Ditemukan"
            description={error || `Konten dengan ID "${id}" tidak ditemukan dalam sistem.`}
            actionLabel="Kembali ke Daftar Konten"
            onAction={() => router.push("/contents")}
          />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-5xl animate-in fade-in-50 duration-150">
      {/* Top back button and action buttons */}
      <div className="flex items-center justify-between">
        <Link
          href="/contents"
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className: "-ml-2 text-muted-foreground hover:text-foreground h-8 text-xs",
          })}
        >
          <ArrowLeft className="size-3.5 mr-1" />
          <span>Kembali ke Daftar Konten</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDuplicate}
            disabled={isDuplicating}
            className="text-xs h-8 gap-1.5 shadow-2xs"
          >
            {isDuplicating ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Copy className="size-3.5" />
            )}
            <span>Duplikasi</span>
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => setDeleteDialogOpen(true)}
            className="text-xs h-8 gap-1.5 shadow-xs"
          >
            <Trash2 className="size-3.5" />
            <span>Hapus</span>
          </Button>
        </div>
      </div>

      <PageHeader
        title={content.title}
        description={`Terakhir diperbarui pada ${format(new Date(content.updatedAt), "d MMMM yyyy, HH:mm", { locale: idLocale })}`}
      >
        <div className="flex items-center gap-2">
          <PlatformBadge platform={content.platform} size="sm" />
          <StatusBadge status={content.status} size="sm" />
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Main Editor Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Platform Selector Grid */}
          <Card className="border-border/80 shadow-2xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-foreground">
                Platform Media Sosial
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Controller
                name="platform"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {platformOptions.map((p) => {
                      const isSelected = field.value === p;
                      return (
                        <button
                          type="button"
                          key={p}
                          onClick={() => field.onChange(p)}
                          className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                            isSelected
                              ? "border-foreground bg-accent ring-1 ring-foreground/20 shadow-2xs"
                              : "border-border/80 bg-card hover:bg-muted/40"
                          }`}
                        >
                          <PlatformBadge platform={p} size="sm" />
                          <span
                            className={`size-3.5 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? "border-foreground bg-foreground text-background"
                                : "border-muted-foreground/30"
                            }`}
                          >
                            {isSelected && <span className="size-1.5 rounded-full bg-background" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              />
            </CardContent>
          </Card>

          {/* Title & Caption */}
          <Card className="border-border/80 shadow-2xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-foreground">Isi & Naskah Konten</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground" htmlFor="title">
                  Judul Konten
                </label>
                <Input id="title" className="h-9 text-xs sm:text-sm" {...register("title")} />
                {errors.title && (
                  <p className="text-[11px] font-medium text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground" htmlFor="caption">
                    Caption Teks
                  </label>
                  <span className="text-[11px] text-muted-foreground">
                    {watchedCaption.length} karakter
                  </span>
                </div>
                <Textarea id="caption" rows={7} className="text-xs sm:text-sm leading-relaxed" {...register("caption")} />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground" htmlFor="hashtags">
                  Hashtag
                </label>
                <Input id="hashtags" className="h-9 text-xs sm:text-sm" {...register("hashtags")} />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground" htmlFor="notes">
                  Catatan Internal
                </label>
                <Input id="notes" className="h-9 text-xs sm:text-sm" {...register("notes")} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-border/80 shadow-2xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-foreground">Publikasi & Jadwal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Status Konten</label>
                <select
                  {...register("status")}
                  className="w-full h-9 rounded-lg border border-input/90 bg-card/60 px-3 py-1.5 text-xs text-foreground shadow-2xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 cursor-pointer"
                >
                  <option value="DRAFT" className="bg-popover text-popover-foreground">DRAFT</option>
                  <option value="SCHEDULED" className="bg-popover text-popover-foreground">SCHEDULED</option>
                  <option value="PUBLISHED" className="bg-popover text-popover-foreground">PUBLISHED</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5" htmlFor="scheduledAt">
                  <Calendar className="size-3.5 text-indigo-500" />
                  Waktu Tayang Publikasi
                </label>
                <Input
                  id="scheduledAt"
                  type="datetime-local"
                  {...register("scheduledAt")}
                  className="text-xs h-9"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <Button type="submit" disabled={isSubmitting} className="w-full h-9 font-semibold text-xs shadow-xs">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin mr-2" />
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan Perubahan"
                  )}
                </Button>
                <Link
                  href="/contents"
                  className={buttonVariants({ variant: "outline", size: "sm", className: "w-full h-9 text-xs font-medium" })}
                >
                  Batal
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="border-border/80">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-semibold">Hapus Materi Konten Ini?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-muted-foreground">
              Konten &quot;{content.title}&quot; akan dihapus secara permanen dari sistem. Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting} className="h-8 text-xs">Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 h-8 text-xs"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="size-3.5 animate-spin mr-1.5" />
                  Menghapus...
                </>
              ) : (
                "Hapus Sekarang"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
}
