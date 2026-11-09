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
import { TemplatePickerDialog } from "@/components/content/template-picker-dialog";
import { ContentTemplate } from "@/config/templates";
import { api } from "@/lib/api/api-client";
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
    const prefillPlatform = searchParams.get("platform");
    const prefillDate = searchParams.get("date");

    if (prefillTitle) setValue("title", prefillTitle);
    if (prefillCaption) setValue("caption", prefillCaption);
    if (prefillHashtags) setValue("hashtags", prefillHashtags);
    if (
      prefillPlatform &&
      platformOptions.includes(prefillPlatform as SocialPlatform)
    ) {
      setValue("platform", prefillPlatform as SocialPlatform);
    }
    if (prefillDate) {
      setValue("scheduledAt", `${prefillDate}T09:00`);
      setValue("status", "SCHEDULED");
    }
  }, [searchParams, setValue]);

  const watchedCaption = useWatch({ control, name: "caption" }) || "";
  const watchedStatus = useWatch({ control, name: "status" });
  const selectedPlatform = useWatch({ control, name: "platform" });

  const handleSelectTemplate = (template: ContentTemplate) => {
    setValue("title", template.title);
    setValue("caption", template.caption);
    setValue("hashtags", template.hashtags.join(" "));
    if (template.defaultPlatform) {
      setValue("platform", template.defaultPlatform);
    }
    if (template.notes) {
      setValue("notes", template.notes);
    }
    toast.success(`Template "${template.name}" berhasil diterapkan!`);
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const formattedHashtags = values.hashtags
        ? values.hashtags
            .split(/[\s,]+/)
            .map((h) => h.replace(/^#/, "").trim())
            .filter(Boolean)
        : [];

      let scheduledDateIso: string | undefined = undefined;
      if (values.status === "SCHEDULED") {
        if (!values.scheduledAt) {
          toast.error("Wajib menentukan tanggal jadwal jika status adalah SCHEDULED");
          return;
        }
        scheduledDateIso = new Date(values.scheduledAt).toISOString();
      }

      const created = await api.contents.create({
        title: values.title,
        caption: values.caption || null,
        hashtags: formattedHashtags,
        platform: values.platform,
        status: values.status,
        scheduledAt: scheduledDateIso || null,
        notes: values.notes || null,
      });

      toast.success("Konten berhasil dibuat!");
      router.push(`/contents/${created.id}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal membuat konten baru.";
      toast.error(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-5xl animate-in fade-in-50 duration-150">
      <div className="flex items-center gap-2">
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
      </div>

      <PageHeader
        title="Buat Konten Baru"
        description="Rancang materi postingan, kelola jadwal tayang, dan pilih saluran media sosial Anda."
      >
        <TemplatePickerDialog onSelect={handleSelectTemplate} />
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
              <CardDescription className="text-xs">
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
              {/* Title */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground" htmlFor="title">
                    Judul Konten <span className="text-destructive">*</span>
                  </label>
                  <span className="text-[11px] text-muted-foreground">Maks 150 karakter</span>
                </div>
                <Input
                  id="title"
                  placeholder="Contoh: 5 Tips Efektif Menata Feed Instagram Bisnis"
                  className="h-9 text-xs sm:text-sm"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-[11px] font-medium text-destructive">{errors.title.message}</p>
                )}
              </div>

              {/* Caption */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground" htmlFor="caption">
                    Caption Teks
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground">
                      {watchedCaption.length} karakter
                    </span>
                    <Link
                      href={`/ai-generator?platform=${selectedPlatform}`}
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                        className: "h-7 text-xs text-indigo-600 dark:text-indigo-400 font-medium px-2",
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
                  className="text-xs sm:text-sm leading-relaxed"
                  {...register("caption")}
                />
                {errors.caption && (
                  <p className="text-[11px] font-medium text-destructive">{errors.caption.message}</p>
                )}
              </div>

              {/* Hashtags */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground" htmlFor="hashtags">
                  Hashtag Rekomendasi
                </label>
                <Input
                  id="hashtags"
                  placeholder="#tipsbisnis #contentstrategy #socialmediamarketing"
                  className="h-9 text-xs sm:text-sm"
                  {...register("hashtags")}
                />
                <p className="text-[11px] text-muted-foreground">
                  Pisahkan dengan spasi atau koma (tanda # otomatis ditambahkan).
                </p>
              </div>

              {/* Internal Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground" htmlFor="notes">
                  Catatan Internal (Opsional)
                </label>
                <Input
                  id="notes"
                  placeholder="Misal: Gunakan foto produk varian cokelat, link WA di bio"
                  className="h-9 text-xs sm:text-sm"
                  {...register("notes")}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-border/80 shadow-2xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-foreground">Jadwal & Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Status Konten</label>
                <select
                  {...register("status")}
                  className="w-full h-9 rounded-lg border border-input/90 bg-card/60 px-3 py-1.5 text-xs text-foreground shadow-2xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 cursor-pointer"
                >
                  <option value="DRAFT" className="bg-popover text-popover-foreground">DRAFT (Disimpan sementara)</option>
                  <option value="SCHEDULED" className="bg-popover text-popover-foreground">SCHEDULED (Jadwalkan tayang)</option>
                  <option value="PUBLISHED" className="bg-popover text-popover-foreground">PUBLISHED (Sudah ditayangkan)</option>
                </select>
              </div>

              {/* Scheduled datetime */}
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
                {watchedStatus === "SCHEDULED" && (
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Konten ini akan dipetakan ke tanggal bersangkutan pada Kalender Konten.
                  </p>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <Button type="submit" disabled={isSubmitting} className="w-full h-9 font-semibold text-xs shadow-xs">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin mr-2" />
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan Konten"
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
    </form>
  );
}

export default function NewContentPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-muted-foreground">Memuat formulir...</div>}>
      <NewContentForm />
    </Suspense>
  );
}
