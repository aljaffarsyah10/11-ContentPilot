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
      toast.success("Berhasil menghasilkan 3 variasi caption!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menghasilkan caption.";
      toast.error(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Caption berhasil disalin ke clipboard!");
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleUseAsContent = (variant: AICaptionVariant) => {
    const query = new URLSearchParams({
      title: topic.slice(0, 50),
      caption: variant.caption,
      hashtags: variant.hashtags.join(","),
      platform,
    });

    router.push(`/contents/new?${query.toString()}`);
  };

  const handleSaveDraftDirectly = async (variant: AICaptionVariant) => {
    setSavingVariantId(variant.id);
    try {
      await api.contents.create({
        title: topic.slice(0, 60),
        caption: variant.caption,
        hashtags: variant.hashtags,
        platform,
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
    <div className="space-y-6 animate-in fade-in-50 duration-150">
      <PageHeader
        title="AI Caption Studio"
        description="Hasilkan copywriting caption, hook pembuka menarik, dan rekomendasi tagar relevan dalam hitungan detik."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        {/* Left Column: Form (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="border-border/80 shadow-2xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
                <Sparkles className="size-4 text-indigo-500" />
                Parameter Generasi AI
              </CardTitle>
              <CardDescription className="text-xs">
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
                    className="w-full h-9 rounded-lg border border-input/90 bg-card/60 px-3 py-1.5 text-xs text-foreground font-medium shadow-2xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 cursor-pointer"
                  >
                    {platformOptions.map((p) => (
                      <option key={p} value={p} className="bg-popover text-popover-foreground">
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
                          className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 border cursor-pointer ${
                            isSelected
                              ? "bg-foreground text-background border-foreground font-semibold shadow-2xs"
                              : "bg-muted/40 text-muted-foreground border-border/80 hover:bg-accent hover:text-foreground"
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
                      className="w-full h-9 rounded-lg border border-input/90 bg-card/60 px-2.5 py-1.5 text-xs text-foreground shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 cursor-pointer"
                    >
                      <option value="short" className="bg-popover text-popover-foreground">Pendek (&lt; 50 kata)</option>
                      <option value="medium" className="bg-popover text-popover-foreground">Sedang (50-150 kata)</option>
                      <option value="long" className="bg-popover text-popover-foreground">Panjang (&gt; 150 kata)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">
                      Bahasa
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as "indonesian" | "english")}
                      className="w-full h-9 rounded-lg border border-input/90 bg-card/60 px-2.5 py-1.5 text-xs text-foreground shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 cursor-pointer"
                    >
                      <option value="indonesian" className="bg-popover text-popover-foreground">Bahasa Indonesia</option>
                      <option value="english" className="bg-popover text-popover-foreground">English</option>
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
                    className="text-xs h-9"
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
                    className="text-xs h-9"
                  />
                </div>

                {/* Submit Action */}
                <Button
                  type="submit"
                  disabled={isGenerating || !topic.trim()}
                  className="w-full h-9 font-semibold text-xs shadow-xs mt-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin mr-2" />
                      Sedang Menghasilkan...
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-3.5 mr-2" />
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
            <Card className="border-dashed border border-border/80 bg-card/40 p-12 text-center shadow-2xs">
              <div className="flex flex-col items-center justify-center">
                <div className="size-12 rounded-xl bg-accent text-foreground flex items-center justify-center mb-4 border border-border/60 shadow-2xs">
                  <Sparkles className="size-5 text-indigo-500" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  Variasi Caption Belum Dibuat
                </h3>
                <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
                  Isi topik dan preferensi copywriting di sebelah kiri, lalu klik tombol &quot;Generate&quot; untuk melihat hasilnya.
                </p>
                <div className="mt-6 flex items-center gap-1.5 text-xs text-muted-foreground/80">
                  <HelpCircle className="size-3.5" />
                  <span>Tips: Semakin spesifik topik Anda, semakin tajam hook yang dihasilkan.</span>
                </div>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Hasil Generasi ({results.length} Variasi)
                  </h3>
                  <PlatformBadge platform={platform} size="sm" />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleGenerate()}
                  disabled={isGenerating}
                  className="text-xs text-muted-foreground hover:text-foreground h-7 px-2"
                >
                  <RotateCw className="size-3.5 mr-1" />
                  Regenerate
                </Button>
              </div>

              {results.map((variant, index) => (
                <Card key={variant.id} className="border-border/80 bg-card shadow-2xs">
                  <CardHeader className="py-2.5 px-4 bg-muted/20 border-b border-border/60 flex flex-row items-center justify-between space-y-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Variasi #{index + 1}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Button
                        size="xs"
                        variant="ghost"
                        className="h-7 text-xs font-normal"
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
                        size="xs"
                        variant="outline"
                        className="h-7 text-xs font-normal"
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
                        size="xs"
                        variant="default"
                        className="h-7 text-xs font-medium shadow-2xs"
                        onClick={() => handleUseAsContent(variant)}
                      >
                        <Plus className="size-3 mr-1" />
                        Jadikan Konten
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <p className="text-xs sm:text-sm text-foreground leading-relaxed whitespace-pre-line font-sans">
                      {variant.caption}
                    </p>

                    {variant.callToAction && (
                      <div className="rounded-lg border border-border/60 bg-muted/30 p-2.5 text-xs text-foreground/90">
                        <span className="font-semibold text-foreground mr-1.5">Call to Action:</span>
                        {variant.callToAction}
                      </div>
                    )}

                    {variant.hashtags && variant.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {variant.hashtags.map((h, i) => (
                          <span
                            key={i}
                            className="rounded-md bg-accent px-2 py-0.5 text-[11px] font-medium text-muted-foreground border border-border/60"
                          >
                            #{h.replace(/^#/, "")}
                          </span>
                        ))}
                      </div>
                    )}
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
