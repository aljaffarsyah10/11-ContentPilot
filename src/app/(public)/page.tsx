import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Lightbulb,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Share2,
  Layers,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ContentPilot - Social Media Content Planning & AI Caption Platform",
  description:
    "Satukan ide, susun jadwal tayang bulanan di kalender visual, dan hasilkan caption menarik dalam hitungan detik dengan AI.",
  keywords: [
    "content planning",
    "social media scheduling",
    "ai caption generator",
    "perencanaan konten",
    "kalender media sosial",
    "kreator indonesia",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://contentpilot.id",
    siteName: "ContentPilot",
    title: "ContentPilot - Social Media Content Planning & AI Caption Platform",
    description:
      "Rencanakan jadwal tayang, kelola inspirasi ide, dan hasilkan caption media sosial berkualitas tinggi dalam hitungan detik.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ContentPilot - Social Media Content Planning & AI Caption Platform",
    description:
      "Rencanakan jadwal tayang, kelola inspirasi ide, dan hasilkan caption media sosial berkualitas tinggi dalam hitungan detik.",
  },
};

export default function LandingPage() {
  return (
    <div className="relative flex flex-col items-center overflow-hidden">
      {/* Background radial gradient mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/15 via-purple-500/5 to-transparent pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-28 lg:py-36 flex flex-col items-center text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/5 px-4 py-1.5 text-xs font-semibold text-foreground mb-6 shadow-2xs backdrop-blur-md">
          <Sparkles className="size-3.5 text-indigo-500" />
          <span>SaaS Perencanaan Konten Media Sosial Modern</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl leading-[1.1]">
          Rencanakan Konten & Hasilkan Caption{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400">
            Jauh Lebih Cepat.
          </span>
        </h1>

        <p className="mt-6 text-base text-muted-foreground max-w-2xl sm:text-lg leading-relaxed">
          Kumpulkan ide backlog, atur jadwal publikasi mingguan di kalender interaktif, dan buat copywriting caption berkualitas tinggi dalam hitungan detik dengan bantuan AI.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
          <Link
            href="/register"
            className={buttonVariants({
              variant: "gradient",
              size: "lg",
              className: "h-11 px-7 text-sm font-semibold shadow-md",
            })}
          >
            Mulai Gratis Sekarang
            <ArrowRight className="size-4 ml-2" />
          </Link>
          <Link
            href="/dashboard"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "h-11 px-7 text-sm font-semibold shadow-2xs",
            })}
          >
            Buka Demo Dashboard
          </Link>
        </div>

        {/* Value Highlights with subtle badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-2 bg-card/60 border border-border/60 px-3 py-1 rounded-full shadow-2xs">
            <CheckCircle2 className="size-4 text-emerald-500" />
            <span>Tanpa Biaya Tersembunyi</span>
          </div>
          <div className="flex items-center gap-2 bg-card/60 border border-border/60 px-3 py-1 rounded-full shadow-2xs">
            <CheckCircle2 className="size-4 text-emerald-500" />
            <span>Mendukung 6 Platform Utama</span>
          </div>
          <div className="flex items-center gap-2 bg-card/60 border border-border/60 px-3 py-1 rounded-full shadow-2xs">
            <CheckCircle2 className="size-4 text-emerald-500" />
            <span>AI Copywriting Multi-Bahasa</span>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="w-full py-16 md:py-24 border-t border-border/60 bg-gradient-to-b from-card/30 via-background to-card/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">
              <Zap className="size-3.5" />
              <span>Fitur Utama</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Dirancang Khusus untuk Kreator, UMKM & Tim
            </h2>
            <p className="text-sm text-muted-foreground">
              Semua perlengkapan kerja yang Anda butuhkan untuk menjaga konsistensi publikasi setiap hari.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="relative overflow-hidden border-border/80 bg-gradient-to-b from-card via-card to-card/90 hover:border-indigo-500/40 transition-all duration-300 group">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500/40 via-amber-500/20 to-transparent" />
              <CardContent className="p-6 space-y-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-2xs group-hover:scale-105 transition-transform">
                  <Lightbulb className="size-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">Backlog Ide Terpusat</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Catat inspirasi konten secara spontan. Pilah status dari Baru, Dikerjakan, hingga Siap Tayang tanpa takut ide hilang.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-border/80 bg-gradient-to-b from-card via-card to-card/90 hover:border-indigo-500/40 transition-all duration-300 group shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500" />
              <CardContent className="p-6 space-y-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-violet-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 shadow-2xs group-hover:scale-105 transition-transform">
                  <Sparkles className="size-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">AI Caption & Hashtag Studio</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Hasilkan variasi caption, hashtag terarah, dan kalimat Call-to-Action (CTA) berdasarkan platform dan tone of voice yang Anda pilih.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-border/80 bg-gradient-to-b from-card via-card to-card/90 hover:border-indigo-500/40 transition-all duration-300 group">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/40 via-blue-500/20 to-transparent" />
              <CardContent className="p-6 space-y-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 text-blue-600 dark:text-blue-400 border border-blue-500/30 shadow-2xs group-hover:scale-105 transition-transform">
                  <Calendar className="size-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">Kalender Konten Interaktif</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Lihat visual rencana posting bulanan dan mingguan. Pantau kesiapan materi tayang per platform dengan indikator status jelas.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Secondary Features row with subtle gradients */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border/70 bg-gradient-to-br from-card to-accent/30 shadow-2xs">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                <Layers className="size-4 shrink-0" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-foreground">Template Post Siap Pakai</p>
                <p className="text-muted-foreground">Struktur posting edukasi, promo & tips</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border/70 bg-gradient-to-br from-card to-accent/30 shadow-2xs">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                <Share2 className="size-4 shrink-0" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-foreground">Duplikasi Sekali Klik</p>
                <p className="text-muted-foreground">Repurpose konten sukses dengan mudah</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border/70 bg-gradient-to-br from-card to-accent/30 shadow-2xs">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                <ShieldCheck className="size-4 shrink-0" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-foreground">Ekspor CSV Standard</p>
                <p className="text-muted-foreground">Kompatibel penuh dengan Microsoft Excel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Glowing Gradient Box */}
      <section className="w-full py-20 px-4 sm:px-6 flex flex-col items-center text-center">
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/50 via-slate-900/70 to-purple-950/50 p-8 sm:p-12 max-w-4xl mx-auto shadow-2xl backdrop-blur-md">
          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Mulai Kelola Konten Anda Lebih Konsisten
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Bergabunglah dengan ratusan kreator dan pemilik bisnis yang menghemat waktu perencanaan konten setiap minggunya.
            </p>
            <div className="pt-3">
              <Link
                href="/register"
                className={buttonVariants({
                  variant: "gradient",
                  size: "lg",
                  className: "h-11 px-8 text-sm font-semibold shadow-md",
                })}
              >
                Daftar Sekarang — Gratis
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
