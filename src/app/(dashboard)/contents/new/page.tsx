"use client";

import React, { Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PageHeader } from "@/components/shared/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlatformBadge, SocialPlatform } from "@/components/shared/platform-badge";
import { useMockStore } from "@/features/shared/mock-store";
import { toast } from "sonner";
import { Sparkles, ArrowLeft, Loader2, Calendar } from "lucide-react";

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

function NewContentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addContent } = useMockStore();

  const {
    register,
    handleSubmit,
    control,
    setValue,
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

  // Prefill from search parameters if directed from AI Generator or Calendar
  useEffect(() => {
    const prefillTitle = searchParams.get("title");
    const prefillCaption = searchParams.get("caption");
    const prefillHashtags = searchParams.get("hashtags");
    const prefillPlatform = searchParams.get("platform") as SocialPlatform;
    const prefillDate = searchParams.get("date");

    if (prefillTitle) setValue("title", prefillTitle);
    if (prefillCaption) setValue("caption", prefillCaption);
    if (prefillHashtags) setValue("hashtags", prefillHashtags);
    if (prefillPlatform && platformOptions.includes(prefillPlatform)) {
      setValue("platform", prefillPlatform);
    }
    if (prefillDate) {
      setValue("scheduledAt", `${prefillDate}T10:00`);
      setValue("status", "SCHEDULED");
    }
  }, [searchParams, setValue]);

  const watchedStatus = useWatch({ control, name: "status" });
  const watchedCaption = useWatch({ control, name: "caption" }) || "";
  const selectedPlatform = useWatch({ control, name: "platform" });

  const onSubmit = async (values: FormValues) => {
    try {
      // Parse hashtags
      const parsedHashtags = values.hashtags
        ? values.hashtags
            .split(/[\s,]+/)
            .map((t) => t.trim().replace(/^#/, ""))
            .filter(Boolean)
        : [];

      addContent({
        title: values.title,
        caption: values.caption || null,
        hashtags: parsedHashtags,
        platform: values.platform,
        status: values.status,
        scheduledAt: values.scheduledAt ? new Date(values.scheduledAt).toISOString() : null,
        notes: values.notes || null,
      });

      toast.success("Konten berhasil dibuat dan disimpan!");
      router.push("/contents");
    } catch {
      toast.error("Gagal menyimpan konten. Periksa formulir Anda.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center gap-2">
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
      </div>

      <PageHeader
        title="Buat Konten Baru"
        description="Rancang materi postingan, kelola jadwal tayang, dan pilih saluran media sosial Anda."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Main Editor Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Platform Selector Grid */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                Platform Media Sosial
              </CardTitle>
              <CardDescription>
                Pilih satu platform target untuk menyesuaikan format konten
              </CardDescription>
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
              <CardTitle className="text-base font-semibold">Isi & Naskah Konten</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium" htmlFor="title">
                    Judul Konten <span className="text-destructive">*</span>
                  </label>
                  <span className="text-xs text-muted-foreground">Maks 150 karakter</span>
                </div>
                <Input
                  id="title"
                  placeholder="Contoh: 5 Tips Efektif Menata Feed Instagram Bisnis"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-xs text-destructive">{errors.title.message}</p>
                )}
              </div>

              {/* Caption */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium" htmlFor="caption">
                    Caption Teks
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {watchedCaption.length} karakter
                    </span>
                    <Link
                      href={`/ai-generator?platform=${selectedPlatform}`}
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                        className: "h-7 text-xs text-purple-600 dark:text-purple-400 font-medium",
                      })}
                    >
                      <Sparkles className="size-3.5 mr-1" />
                      Buat dengan AI
                    </Link>
                  </div>
                </div>
                <Textarea
                  id="caption"
                  rows={7}
                  placeholder="Tuliskan naskah caption materi Anda di sini..."
                  {...register("caption")}
                />
                {errors.caption && (
                  <p className="text-xs text-destructive">{errors.caption.message}</p>
                )}
              </div>

              {/* Hashtags */}
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="hashtags">
                  Hashtag Rekomendasi
                </label>
                <Input
                  id="hashtags"
                  placeholder="#tipsbisnis #contentstrategy #socialmediamarketing"
                  {...register("hashtags")}
                />
                <p className="text-xs text-muted-foreground">
                  Pisahkan dengan spasi atau koma (tanda # otomatis ditambahkan).
                </p>
              </div>

              {/* Internal Notes */}
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="notes">
                  Catatan Internal (Opsional)
                </label>
                <Input
                  id="notes"
                  placeholder="Misal: Gunakan foto produk varian cokelat, link WA di bio"
                  {...register("notes")}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Jadwal & Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Status Konten</label>
                <select
                  {...register("status")}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="DRAFT">DRAFT (Disimpan sementara)</option>
                  <option value="SCHEDULED">SCHEDULED (Jadwalkan tayang)</option>
                  <option value="PUBLISHED">PUBLISHED (Sudah ditayangkan)</option>
                </select>
              </div>

              {/* Scheduled datetime */}
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
                {watchedStatus === "SCHEDULED" && (
                  <p className="text-[11px] text-muted-foreground">
                    Konten ini akan dipetakan ke tanggal bersangkutan pada Kalender Konten.
                  </p>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex flex-col gap-2">
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin mr-2" />
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan Konten"
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
    </form>
  );
}

export default function NewContentPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground">Memuat formulir...</div>}>
      <NewContentForm />
    </Suspense>
  );
}
