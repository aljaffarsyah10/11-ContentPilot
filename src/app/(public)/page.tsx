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
    <div className="flex flex-col items-center overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-28 lg:py-36 flex flex-col items-center text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-3.5 py-1 text-xs font-medium text-foreground mb-6 shadow-2xs backdrop-blur-xs">
          <Sparkles className="size-3.5 text-indigo-500" />
          <span>SaaS Perencanaan Konten Media Sosial Modern</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl leading-[1.1]">
          Rencanakan Konten & Hasilkan Caption{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/90 to-indigo-600 dark:to-indigo-400">
            Jauh Lebih Cepat.
          </span>
        </h1>

        <p className="mt-6 text-base text-muted-foreground max-w-2xl sm:text-lg leading-relaxed">
          Kumpulkan ide backlog, atur jadwal publikasi mingguan di kalender interaktif, dan buat copywriting caption berkualitas tinggi dalam hitungan detik dengan bantuan AI.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
          <Link
            href="/register"
            className={buttonVariants({ size: "lg", className: "h-11 px-6 text-sm font-semibold shadow-xs" })}
          >
            Mulai Gratis Sekarang
            <ArrowRight className="size-4 ml-2" />
          </Link>
          <Link
            href="/dashboard"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "h-11 px-6 text-sm font-semibold shadow-2xs",
            })}
          >
            Buka Demo Dashboard
          </Link>
        </div>

        {/* Value Highlights */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-500" />
            <span>Tanpa Biaya Tersembunyi</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-500" />
            <span>Mendukung 6 Platform Utama</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-500" />
            <span>AI Copywriting Multi-Bahasa</span>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="w-full py-16 md:py-24 border-t border-border/60 bg-card/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Fitur Dirancang Khusus untuk Kreator & Tim
            </h2>
            <p className="text-sm text-muted-foreground">
              Semua perlengkapan kerja yang Anda butuhkan untuk menjaga konsistensi publikasi setiap hari.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border/80 bg-card hover:border-border transition-all">
              <CardContent className="p-6 space-y-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-foreground border border-border/60 shadow-2xs">
                  <Lightbulb className="size-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground">Backlog Ide Terpusat</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Catat inspirasi konten secara spontan. Pilah status dari Baru, Dikerjakan, hingga Siap Tayang tanpa takut ide hilang.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/80 bg-card hover:border-border transition-all">
              <CardContent className="p-6 space-y-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-indigo-500 border border-border/60 shadow-2xs">
                  <Sparkles className="size-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground">AI Caption & Hashtag Studio</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Hasilkan variasi caption, hashtag terarah, dan kalimat Call-to-Action (CTA) berdasarkan platform dan tone of voice yang Anda pilih.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/80 bg-card hover:border-border transition-all">
              <CardContent className="p-6 space-y-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-foreground border border-border/60 shadow-2xs">
                  <Calendar className="size-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground">Kalender Konten Interaktif</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Lihat visual rencana posting bulanan dan mingguan. Pantau kesiapan materi tayang per platform dengan indikator status jelas.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Secondary Features row */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border/60 bg-card/50">
              <Layers className="size-5 text-muted-foreground shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-foreground">Template Post Siap Pakai</p>
                <p className="text-muted-foreground">Struktur posting edukasi, promo & tips</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border/60 bg-card/50">
              <Share2 className="size-5 text-muted-foreground shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-foreground">Duplikasi Sekali Klik</p>
                <p className="text-muted-foreground">Repurpose konten sukses dengan mudah</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border/60 bg-card/50">
              <ShieldCheck className="size-5 text-muted-foreground shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-foreground">Ekspor CSV Standard</p>
                <p className="text-muted-foreground">Kompatibel penuh dengan Microsoft Excel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="w-full py-20 px-4 sm:px-6 flex flex-col items-center text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Mulai Kelola Konten Anda Lebih Konsisten
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Bergabunglah dengan ratusan kreator dan pemilik bisnis yang menghemat waktu perencanaan konten setiap minggunya.
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className={buttonVariants({
                size: "lg",
                className: "h-11 px-8 text-sm font-semibold shadow-xs",
              })}
            >
              Daftar Sekarang — Gratis
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
