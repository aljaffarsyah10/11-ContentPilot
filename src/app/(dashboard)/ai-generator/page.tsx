"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlatformBadge, SocialPlatform } from "@/components/shared/platform-badge";
import { AICaptionVariant, CaptionTone, CaptionLength } from "@/types/ai.types";
import { api } from "@/lib/api/api-client";
import { toast } from "sonner";
import {
  Sparkles,
  Copy,
  Check,
  RotateCw,
  Plus,
  Loader2,
  HelpCircle,
  FileText,
} from "lucide-react";

const toneOptions: Array<{ label: string; value: CaptionTone }> = [
  { label: "Casual & Santai", value: "casual" },
  { label: "Profesional", value: "professional" },
  { label: "Humoris & Lucu", value: "humorous" },
  { label: "Inspiratif", value: "inspirational" },
  { label: "Persuasif / Jualan", value: "persuasive" },
  { label: "Edukatif", value: "educational" },
];

const platformOptions: SocialPlatform[] = [
  "INSTAGRAM",
  "TIKTOK",
  "LINKEDIN",
  "FACEBOOK",
  "X",
  "YOUTUBE",
];

export default function AIGeneratorPage() {
  const router = useRouter();

  // Form State
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<SocialPlatform>("INSTAGRAM");
  const [tone, setTone] = useState<CaptionTone>("casual");
  const [language, setLanguage] = useState<"indonesian" | "english">("indonesian");
  const [length, setLength] = useState<CaptionLength>("medium");
  const [audience, setAudience] = useState("");
  const [additionalInstructions, setAdditionalInstructions] = useState("");

  // UI States
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<AICaptionVariant[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savingVariantId, setSavingVariantId] = useState<string | null>(null);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) {
      toast.error("Mohon isi topik atau ide konten Anda.");
      return;
    }

    setIsGenerating(true);
    try {
      const res = await api.ai.generateCaption({
        topic: topic.trim(),
        platform,
        tone,
        language,
        length,
        audience: audience.trim() || undefined,
        additionalInstructions: additionalInstructions.trim() || undefined,
      });

      setResults(res.captions || []);
      toast.success(`${res.captions?.length || 0} variasi caption AI berhasil dihasilkan!`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghasilkan caption AI. Silakan coba lagi.";
      toast.error(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success("Caption berhasil disalin ke clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleUseAsContent = (variant: AICaptionVariant) => {
    const params = new URLSearchParams({
      title: topic.slice(0, 80),
      caption: `${variant.caption}\n\n${variant.callToAction}`,
      hashtags: variant.hashtags.map((h) => `#${h}`).join(" "),
      platform: platform,
    });

    router.push(`/contents/new?${params.toString()}`);
  };

  const handleSaveDraftDirectly = async (variant: AICaptionVariant) => {
    setSavingVariantId(variant.id);
    try {
      await api.contents.create({
        title: topic.slice(0, 100),
        caption: `${variant.caption}\n\n${variant.callToAction}`,
        hashtags: variant.hashtags,
        platform: platform,
        status: "DRAFT",
      });

      toast.success("Variasi caption berhasil disimpan sebagai draf konten!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan variasi sebagai draf.";
      toast.error(msg);
    } finally {
      setSavingVariantId(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Caption Generator"
        description="Hasilkan copywriting caption, hook pembuka menarik, dan rekomendasi tagar relevan dalam hitungan detik."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        {/* Left Column: Form (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="border-border shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Sparkles className="size-4 text-purple-600" />
                Parameter Generasi AI
              </CardTitle>
              <CardDescription>
                Sesuaikan instruksi agar hasil copywriting sesuai dengan target audiens Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerate} className="space-y-4">
                {/* Topic Input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-foreground" htmlFor="topic">
                      Topik atau Produk <span className="text-destructive">*</span>
                    </label>
                    <span className="text-[10px] text-muted-foreground">
                      {topic.length}/300
                    </span>
                  </div>
                  <Textarea
                    id="topic"
                    rows={3}
                    maxLength={300}
                    placeholder="Contoh: Tips cara bangun kebiasaan membaca buku 15 menit setiap hari..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="text-xs leading-relaxed"
                  />
                </div>

                {/* Platform Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Platform Media Sosial
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as SocialPlatform)}
                    className="w-full h-8 rounded-md border border-input bg-background px-2.5 py-1 text-xs shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    {platformOptions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tone Chips */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Gaya Bahasa (Tone of Voice)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {toneOptions.map((t) => {
                      const isSelected = tone === t.value;
                      return (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => setTone(t.value)}
                          className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors border cursor-pointer ${
                            isSelected
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-muted/50 text-muted-foreground border-border hover:bg-muted"
                          }`}
                        >
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Length & Language Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">
                      Panjang Caption
                    </label>
                    <select
                      value={length}
                      onChange={(e) => setLength(e.target.value as CaptionLength)}
                      className="w-full h-8 rounded-md border border-input bg-background px-2.5 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="short">Pendek (&lt; 50 kata)</option>
                      <option value="medium">Sedang (50-150 kata)</option>
                      <option value="long">Panjang (&gt; 150 kata)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">
                      Bahasa
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as "indonesian" | "english")}
                      className="w-full h-8 rounded-md border border-input bg-background px-2.5 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="indonesian">Bahasa Indonesia</option>
                      <option value="english">English</option>
                    </select>
                  </div>
                </div>

                {/* Target Audience */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground" htmlFor="audience">
                    Target Audiens (Opsional)
                  </label>
                  <Input
                    id="audience"
                    placeholder="Contoh: Mahasiswa, Ibu Rumah Tangga, Pekerja Kantoran"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="text-xs h-8"
                  />
                </div>

                {/* Additional Instructions */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground" htmlFor="instructions">
                    Instruksi Tambahan (Opsional)
                  </label>
                  <Input
                    id="instructions"
                    placeholder="Contoh: Sertakan ajakan untuk follow akun"
                    value={additionalInstructions}
                    onChange={(e) => setAdditionalInstructions(e.target.value)}
                    className="text-xs h-8"
                  />
                </div>

                {/* Submit Action */}
                <Button
                  type="submit"
                  disabled={isGenerating || !topic.trim()}
                  className="w-full h-9 bg-primary hover:bg-primary/90 text-primary-foreground font-medium mt-2 cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="size-4 animate-spin mr-2" />
                      Sedang Menghasilkan...
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4 mr-2" />
                      Generate 3 Variasi Caption
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Output Variations (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {results.length === 0 ? (
            <Card className="border-dashed border-2 border-border/80 bg-card/60 p-12 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="size-14 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center mb-4">
                  <Sparkles className="size-7" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1">
                  Variasi Caption Belum Dibuat
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Isi topik dan preferensi copywriting di sebelah kiri, lalu klik tombol &quot;Generate&quot; untuk melihat hasilnya.
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                  <HelpCircle className="size-3.5" />
                  <span>Tips: Semakin spesifik topik Anda, semakin tajam hook yang dihasilkan.</span>
                </div>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    Hasil Generasi ({results.length} Variasi)
                  </h3>
                  <PlatformBadge platform={platform} />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleGenerate()}
                  disabled={isGenerating}
                  className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <RotateCw className="size-3.5 mr-1" />
                  Regenerate
                </Button>
              </div>

              {results.map((variant, index) => (
                <Card key={variant.id} className="border-border bg-card shadow-xs">
                  <CardHeader className="py-3 px-4 bg-muted/20 border-b border-border/60 flex flex-row items-center justify-between space-y-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Variasi #{index + 1}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs cursor-pointer"
                        onClick={() =>
                          handleCopy(
                            variant.id,
                            `${variant.caption}\n\n${variant.callToAction}\n\n${variant.hashtags
                              .map((h) => `#${h}`)
                              .join(" ")}`
                          )
                        }
                      >
                        {copiedId === variant.id ? (
                          <>
                            <Check className="size-3 mr-1 text-emerald-600" />
                            Tersalin
                          </>
                        ) : (
                          <>
                            <Copy className="size-3 mr-1" />
                            Salin
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs cursor-pointer"
                        disabled={savingVariantId === variant.id}
                        onClick={() => handleSaveDraftDirectly(variant)}
                      >
                        {savingVariantId === variant.id ? (
                          <Loader2 className="size-3 mr-1 animate-spin" />
                        ) : (
                          <FileText className="size-3 mr-1" />
                        )}
                        Simpan Draft
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        className="h-7 text-xs cursor-pointer"
                        onClick={() => handleUseAsContent(variant)}
                      >
                        <Plus className="size-3 mr-1" />
                        Jadikan Konten
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-line font-sans">
                      {variant.caption}
                    </p>

                    <div className="p-2.5 rounded-md bg-muted/40 border border-border/60 text-xs font-medium text-primary/90">
                      💡 {variant.callToAction}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {variant.hashtags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
