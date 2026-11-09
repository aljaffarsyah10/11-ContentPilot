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
  TrendingUp,
  Clock,
  Flame,
} from "lucide-react";
import { PlatformBadge } from "@/components/shared/platform-badge";

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
      {/* Dynamic Animated Ambient Glow Orbs for both Light & Dark Mode */}
      <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-full max-w-7xl h-[850px] pointer-events-none -z-10 overflow-hidden">
        {/* Core radial gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[480px] bg-gradient-to-b from-indigo-500/20 via-purple-500/15 to-transparent dark:from-indigo-500/30 dark:via-purple-500/20 dark:to-transparent blur-[110px] rounded-full animate-pulse-slow" />
        {/* Secondary ambient lights with vibrant accent in light and dark */}
        <div className="absolute top-20 left-[10%] w-[420px] h-[420px] bg-gradient-to-br from-indigo-400/25 to-blue-500/20 dark:from-indigo-600/25 dark:to-violet-600/20 blur-[130px] rounded-full animate-float" />
        <div className="absolute top-36 right-[10%] w-[450px] h-[450px] bg-gradient-to-bl from-purple-400/25 via-pink-400/15 to-cyan-400/20 dark:from-cyan-500/20 dark:via-purple-500/20 dark:to-indigo-500/25 blur-[140px] rounded-full animate-pulse-slow [animation-delay:2.5s]" />
      </div>

      {/* Grid Pattern overlay for depth and modern developer/creator feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#8080800e_1px,transparent_1px),linear-gradient(to_bottom,#8080800e_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-28 lg:py-36 flex flex-col items-center text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-indigo-500/10 dark:from-indigo-950/80 dark:via-purple-900/60 dark:to-indigo-950/80 px-4 py-1.5 text-xs font-semibold text-foreground mb-6 shadow-sm backdrop-blur-md hover:border-indigo-500/50 transition-colors">
          <Sparkles className="size-3.5 text-indigo-500 dark:text-indigo-400 animate-spin [animation-duration:8s]" />
          <span className="text-foreground/90 font-medium">SaaS Perencanaan Konten Media Sosial Modern</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl leading-[1.12]">
          Rencanakan Konten & Hasilkan Caption{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 dark:from-indigo-400 dark:via-violet-300 dark:to-cyan-400 animate-shine">
            Jauh Lebih Cepat.
          </span>
        </h1>

        <p className="mt-6 text-base text-muted-foreground dark:text-slate-300 max-w-2xl sm:text-lg leading-relaxed">
          Kumpulkan ide backlog, atur jadwal publikasi mingguan di kalender interaktif, dan buat copywriting caption berkualitas tinggi dalam hitungan detik dengan bantuan AI.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
          <Link
            href="/register"
            className={buttonVariants({
              variant: "gradient",
              size: "lg",
              className: "h-11 px-7 text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:-translate-y-0.5 transition-all",
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
              className: "h-11 px-7 text-sm font-semibold shadow-2xs hover:-translate-y-0.5 transition-all dark:bg-card/70 dark:border-border/80 dark:hover:bg-accent/80",
            })}
          >
            Buka Demo Dashboard
          </Link>
        </div>

        {/* Value Highlights with subtle badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-foreground/90">
          <div className="flex items-center gap-2 bg-card/70 dark:bg-slate-900/80 border border-border/80 dark:border-indigo-500/20 px-3.5 py-1.5 rounded-full shadow-2xs backdrop-blur-sm">
            <CheckCircle2 className="size-4 text-emerald-500 dark:text-emerald-400" />
            <span className="font-medium">Tanpa Biaya Tersembunyi</span>
          </div>
          <div className="flex items-center gap-2 bg-card/70 dark:bg-slate-900/80 border border-border/80 dark:border-indigo-500/20 px-3.5 py-1.5 rounded-full shadow-2xs backdrop-blur-sm">
            <CheckCircle2 className="size-4 text-emerald-500 dark:text-emerald-400" />
            <span className="font-medium">Mendukung 6 Platform Utama</span>
          </div>
          <div className="flex items-center gap-2 bg-card/70 dark:bg-slate-900/80 border border-border/80 dark:border-indigo-500/20 px-3.5 py-1.5 rounded-full shadow-2xs backdrop-blur-sm">
            <CheckCircle2 className="size-4 text-emerald-500 dark:text-emerald-400" />
            <span className="font-medium">AI Copywriting Multi-Bahasa</span>
          </div>
        </div>

        {/* Hero Interactive UI Preview Card Showcase */}
        <div className="mt-16 w-full max-w-4xl relative group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-cyan-500/30 dark:from-indigo-500/40 dark:via-purple-500/40 dark:to-cyan-400/30 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="relative rounded-2xl border border-border/80 dark:border-indigo-500/30 bg-card/90 dark:bg-slate-900/90 shadow-2xl backdrop-blur-xl p-4 sm:p-6 text-left overflow-hidden">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/60">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="size-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs text-muted-foreground ml-2 font-mono font-medium">contentpilot.id / calendar</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 font-semibold border border-indigo-500/20">
                  <Flame className="size-3" /> Live Planning
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-background/80 dark:bg-slate-950/60 border border-border/70 space-y-2">
                <div className="flex items-center justify-between">
                  <PlatformBadge platform="INSTAGRAM" size="sm" />
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 font-bold border border-emerald-500/20">Siap</span>
                </div>
                <p className="text-xs font-semibold text-foreground line-clamp-1">5 Trik Hook Konten FYP TikTok 2026</p>
                <p className="text-[11px] text-muted-foreground dark:text-slate-400 line-clamp-2">Caption AI: Stop scrolling! Ini rahasia retensi video 3 detik pertama...</p>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/40">
                  <span className="flex items-center gap-1"><Clock className="size-3" /> 10:00 WIB</span>
                  <span className="text-foreground/80 font-medium">#MarketingTips</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-background/80 dark:bg-slate-950/60 border border-border/70 space-y-2">
                <div className="flex items-center justify-between">
                  <PlatformBadge platform="LINKEDIN" size="sm" />
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500 dark:text-amber-400 font-bold border border-amber-500/20">Draft</span>
                </div>
                <p className="text-xs font-semibold text-foreground line-clamp-1">Pelajaran Berharga Saat Scale-up Bisnis</p>
                <p className="text-[11px] text-muted-foreground dark:text-slate-400 line-clamp-2">Caption AI: Bukan tentang kerja lebih keras, tapi membangun sistem yang...</p>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/40">
                  <span className="flex items-center gap-1"><Clock className="size-3" /> 14:30 WIB</span>
                  <span className="text-foreground/80 font-medium">#Leadership</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-background/80 dark:bg-slate-950/60 border border-border/70 space-y-2">
                <div className="flex items-center justify-between">
                  <PlatformBadge platform="X" size="sm" />
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-500 dark:text-indigo-400 font-bold border border-indigo-500/20">Scheduled</span>
                </div>
                <p className="text-xs font-semibold text-foreground line-clamp-1">7 Tools AI Wajib Creator Konten</p>
                <p className="text-[11px] text-muted-foreground dark:text-slate-400 line-clamp-2">Caption AI: Utas singkat: tools apa saja yang hemat 15 jam kerja seminggu...</p>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/40">
                  <span className="flex items-center gap-1"><Clock className="size-3" /> 19:00 WIB</span>
                  <span className="text-foreground/80 font-medium">#Productivity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="w-full py-20 md:py-28 border-t border-border/60 bg-gradient-to-b from-indigo-50/40 via-background/70 to-slate-100/50 dark:from-slate-950/60 dark:via-[#090E1D]/80 dark:to-slate-950/80 backdrop-blur-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-1">
              <Zap className="size-3.5" />
              <span>Fitur Utama</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Dirancang Khusus untuk Kreator, UMKM & Tim
            </h2>
            <p className="text-sm text-muted-foreground dark:text-slate-300">
              Semua perlengkapan kerja yang Anda butuhkan untuk menjaga konsistensi publikasi setiap hari.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="relative overflow-hidden border-border/80 dark:border-indigo-500/20 bg-gradient-to-b from-card via-card/95 to-amber-500/5 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-slate-950/90 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300 group hover:-translate-y-1">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-amber-400 to-transparent" />
              <CardContent className="p-6 space-y-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-2xs group-hover:scale-105 transition-transform">
                  <Lightbulb className="size-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">Backlog Ide Terpusat</h3>
                <p className="text-xs sm:text-sm text-muted-foreground dark:text-slate-300 leading-relaxed">
                  Catat inspirasi konten secara spontan. Pilah status dari Baru, Dikerjakan, hingga Siap Tayang tanpa takut ide hilang.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-border/80 dark:border-indigo-500/30 bg-gradient-to-b from-card via-card/95 to-indigo-500/5 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-slate-950/90 hover:border-indigo-500/60 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 group hover:-translate-y-1">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500" />
              <CardContent className="p-6 space-y-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-violet-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 shadow-2xs group-hover:scale-105 transition-transform">
                  <Sparkles className="size-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">AI Caption & Hashtag Studio</h3>
                <p className="text-xs sm:text-sm text-muted-foreground dark:text-slate-300 leading-relaxed">
                  Hasilkan variasi caption, hashtag terarah, dan kalimat Call-to-Action (CTA) berdasarkan platform dan tone of voice yang Anda pilih.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-border/80 dark:border-indigo-500/20 bg-gradient-to-b from-card via-card/95 to-blue-500/5 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-slate-950/90 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group hover:-translate-y-1">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent" />
              <CardContent className="p-6 space-y-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 text-blue-600 dark:text-blue-400 border border-blue-500/30 shadow-2xs group-hover:scale-105 transition-transform">
                  <Calendar className="size-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">Kalender Konten Interaktif</h3>
                <p className="text-xs sm:text-sm text-muted-foreground dark:text-slate-300 leading-relaxed">
                  Lihat visual rencana posting bulanan dan mingguan. Pantau kesiapan materi tayang per platform dengan indikator status jelas.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Secondary Features row with subtle gradients */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border/70 dark:border-border/80 bg-gradient-to-br from-card via-indigo-500/5 to-accent/30 dark:from-slate-900/80 dark:via-indigo-950/30 dark:to-slate-800/40 shadow-2xs hover:border-indigo-500/30 transition-colors">
              <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                <Layers className="size-4 shrink-0" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-foreground">Template Post Siap Pakai</p>
                <p className="text-muted-foreground dark:text-slate-400">Struktur posting edukasi, promo & tips</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border/70 dark:border-border/80 bg-gradient-to-br from-card via-blue-500/5 to-accent/30 dark:from-slate-900/80 dark:via-blue-950/30 dark:to-slate-800/40 shadow-2xs hover:border-blue-500/30 transition-colors">
              <div className="p-2 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <Share2 className="size-4 shrink-0" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-foreground">Duplikasi Sekali Klik</p>
                <p className="text-muted-foreground dark:text-slate-400">Repurpose konten sukses dengan mudah</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border/70 dark:border-border/80 bg-gradient-to-br from-card via-emerald-500/5 to-accent/30 dark:from-slate-900/80 dark:via-emerald-950/30 dark:to-slate-800/40 shadow-2xs hover:border-emerald-500/30 transition-colors">
              <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="size-4 shrink-0" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-foreground">Ekspor CSV Standard</p>
                <p className="text-muted-foreground dark:text-slate-400">Kompatibel penuh dengan Microsoft Excel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof & Performance Stats Section */}
      <section className="w-full py-16 px-4 sm:px-6 border-t border-border/60 bg-gradient-to-b from-slate-100/60 via-card/40 to-slate-100/40 dark:from-[#090E1D]/50 dark:via-slate-950/40 dark:to-[#070B14]/60">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1 p-5 rounded-2xl bg-card/70 dark:bg-slate-900/70 border border-border/70 dark:border-indigo-500/20 shadow-xs backdrop-blur-xs">
            <p className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-cyan-400 tracking-tight">10x</p>
            <p className="text-xs text-muted-foreground dark:text-slate-300 font-medium">Lebih Cepat Buat Caption</p>
          </div>
          <div className="space-y-1 p-5 rounded-2xl bg-card/70 dark:bg-slate-900/70 border border-border/70 dark:border-indigo-500/20 shadow-xs backdrop-blur-xs">
            <p className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-300 tracking-tight">6+</p>
            <p className="text-xs text-muted-foreground dark:text-slate-300 font-medium">Platform Media Sosial</p>
          </div>
          <div className="space-y-1 p-5 rounded-2xl bg-card/70 dark:bg-slate-900/70 border border-border/70 dark:border-indigo-500/20 shadow-xs backdrop-blur-xs">
            <p className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-300 tracking-tight">100%</p>
            <p className="text-xs text-muted-foreground dark:text-slate-300 font-medium">Privasi & Kontrol Konten</p>
          </div>
          <div className="space-y-1 p-5 rounded-2xl bg-card/70 dark:bg-slate-900/70 border border-border/70 dark:border-indigo-500/20 shadow-xs backdrop-blur-xs">
            <p className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-yellow-300 tracking-tight">0 IDR</p>
            <p className="text-xs text-muted-foreground dark:text-slate-300 font-medium">Bisa Dimulai Gratis</p>
          </div>
        </div>
      </section>

      {/* CTA Section with Glowing Gradient Box */}
      <section className="w-full py-20 px-4 sm:px-6 flex flex-col items-center text-center">
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 via-slate-900/80 to-purple-950/60 dark:from-indigo-950/90 dark:via-slate-900/95 dark:to-purple-950/90 p-8 sm:p-12 max-w-4xl mx-auto shadow-2xl backdrop-blur-md">
          {/* Decorative ambient flare */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 dark:bg-indigo-500/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <TrendingUp className="size-3.5" />
              <span>Tingkatkan Konsistensi Posting</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Mulai Kelola Konten Anda Lebih Konsisten
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Bergabunglah dengan ratusan kreator dan pemilik bisnis yang menghemat waktu perencanaan konten setiap minggunya.
            </p>
            <div className="pt-3">
              <Link
                href="/register"
                className={buttonVariants({
                  variant: "gradient",
                  size: "lg",
                  className: "h-11 px-8 text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all",
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
