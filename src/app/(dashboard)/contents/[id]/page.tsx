"use client";

import React, { use, useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { toast } from "sonner";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { ArrowLeft, Trash2, Calendar, FileText, Loader2 } from "lucide-react";

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

interface ContentDetailPageProps {
  params: Promise<{ id: string }>;
}

function ContentDetailView({ params }: ContentDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { getContentById, updateContent, deleteContent } = useMockStore();

  const content = getContentById(id);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
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

  // Call all hooks unconditionally before any return
  const watchedCaption = useWatch({ control, name: "caption" }) || "";

  useEffect(() => {
    if (content) {
      let formattedDate = "";
      if (content.scheduledAt) {
        try {
          const d = new Date(content.scheduledAt);
          formattedDate = d.toISOString().slice(0, 16);
        } catch {
          // ignore parsing error
        }
      }

      reset({
        title: content.title,
        caption: content.caption || "",
        hashtags: content.hashtags.join(" "),
        platform: content.platform,
        status: content.status,
        scheduledAt: formattedDate,
        notes: content.notes || "",
      });
    }
  }, [content, reset]);

  if (!content) {
    return (
      <div className="space-y-6">
        <Link
          href="/contents"
          className={buttonVariants({ variant: "ghost", size: "sm", className: "-ml-2" })}
        >
          <ArrowLeft className="size-4 mr-1" />
          Kembali ke Daftar Konten
        </Link>
        <div className="rounded-xl border border-border bg-card p-8">
          <EmptyState
            icon={FileText}
            title="Konten Tidak Ditemukan"
            description={`Konten dengan ID "${id}" tidak ditemukan dalam sistem.`}
            actionLabel="Kembali ke Daftar Konten"
            onAction={() => router.push("/contents")}
          />
        </div>
      </div>
    );
  }

  const onSubmit = async (values: FormValues) => {
    try {
      const parsedHashtags = values.hashtags
        ? values.hashtags
            .split(/[\s,]+/)
            .map((t) => t.trim().replace(/^#/, ""))
            .filter(Boolean)
        : [];

      updateContent(id, {
        title: values.title,
        caption: values.caption || null,
        hashtags: parsedHashtags,
        platform: values.platform,
        status: values.status,
        scheduledAt: values.scheduledAt ? new Date(values.scheduledAt).toISOString() : null,
        notes: values.notes || null,
      });

      toast.success("Perubahan materi konten berhasil disimpan!");
    } catch {
      toast.error("Gagal memperbarui konten.");
    }
  };

  const handleDelete = () => {
    deleteContent(id);
    toast.success("Konten berhasil dihapus.");
    setDeleteDialogOpen(false);
    router.push("/contents");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Top back button */}
      <div className="flex items-center justify-between">
        <Link
          href="/contents"
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className: "-ml-2 text-muted-foreground",
          })}
        >
          <ArrowLeft className="size-4 mr-1" />
          Kembali ke Daftar Konten
        </Link>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={() => setDeleteDialogOpen(true)}
        >
          <Trash2 className="size-4 mr-1.5" />
          Hapus Konten
        </Button>
      </div>

      <PageHeader
        title={content.title}
        description={`Terakhir diperbarui: ${format(
          new Date(content.updatedAt),
          "d MMMM yyyy, HH:mm",
          { locale: idLocale }
        )}`}
      >
        <div className="flex items-center gap-2">
          <PlatformBadge platform={content.platform} />
          <StatusBadge status={content.status} />
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Main Editor (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Platform Selector Grid */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Platform Target</CardTitle>
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
                          className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                            isSelected
                              ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs"
                              : "border-border hover:bg-muted/50"
                          }`}
                        >
                          <PlatformBadge platform={p} />
                          <span
                            className={`size-3.5 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-muted-foreground/30"
                            }`}
                          >
                            {isSelected && <span className="size-1.5 rounded-full bg-white" />}
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
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Materi Konten</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="title">
                  Judul Konten
                </label>
                <Input id="title" {...register("title")} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium" htmlFor="caption">
                    Caption Teks
                  </label>
                  <span className="text-xs text-muted-foreground">
                    {watchedCaption.length} karakter
                  </span>
                </div>
                <Textarea id="caption" rows={7} {...register("caption")} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="hashtags">
                  Hashtag
                </label>
                <Input id="hashtags" {...register("hashtags")} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="notes">
                  Catatan Internal
                </label>
                <Input id="notes" {...register("notes")} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Publikasi & Jadwal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status Konten</label>
                <select
                  {...register("status")}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="DRAFT">DRAFT</option>
                  <option value="SCHEDULED">SCHEDULED</option>
                  <option value="PUBLISHED">PUBLISHED</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1.5" htmlFor="scheduledAt">
                  <Calendar className="size-4 text-primary" />
                  Waktu Tayang Publikasi
                </label>
                <Input
                  id="scheduledAt"
                  type="datetime-local"
                  {...register("scheduledAt")}
                  className="text-xs"
                />
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin mr-2" />
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan Perubahan"
                  )}
                </Button>
                <Link
                  href="/contents"
                  className={buttonVariants({ variant: "outline", className: "w-full" })}
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Materi Konten Ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Konten &quot;{content.title}&quot; akan dihapus secara permanen dari sistem.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Hapus Sekarang
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
}

export default function ContentDetailPage(props: ContentDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm text-muted-foreground">
          Memuat detail konten...
        </div>
      }
    >
      <ContentDetailView {...props} />
    </Suspense>
  );
}
