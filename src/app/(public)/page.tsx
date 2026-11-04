import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Lightbulb, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

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
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-28 lg:py-32 flex flex-col items-center text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6">
          <Sparkles className="size-3.5" />
          <span>Platform Perencanaan Konten Modern</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
          Kelola Jadwal & Buat Caption Media Sosial{" "}
          <span className="text-primary underline decoration-primary/30 underline-offset-8">
            Lebih Cepat
          </span>{" "}
          dengan AI
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl sm:text-xl">
          Satukan ide, susun jadwal tayang bulanan di kalender visual, dan hasilkan caption menarik dalam hitungan detik.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <Link
            href="/register"
            className={buttonVariants({ size: "lg", className: "h-12 px-8 text-base" })}
          >
            Mulai Gratis Sekarang
            <ArrowRight className="size-4 ml-2" />
          </Link>
          <Link
            href="/dashboard"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "h-12 px-8 text-base",
            })}
          >
            Lihat Demo Dashboard
          </Link>
        </div>

        {/* Value Highlights */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-primary" />
            <span>Tanpa Kartu Kredit</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-primary" />
            <span>Mendukung 6 Platform Sosial</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-primary" />
            <span>AI Caption Generator Bawaan</span>
          </div>
        </div>
      </section>

      {/* Core Features Preview */}
      <section className="w-full py-16 bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Dirancang untuk Produktivitas Konten Anda
            </h2>
            <p className="mt-3 text-muted-foreground text-sm sm:text-base">
              Tiga pilar utama untuk mempercepat alur kerja pembuatan konten sosial harian Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border/60 bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="size-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Calendar className="size-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Content Calendar</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Visualisasi jadwal tayang bulanan & mingguan. Pantau kesiapan materi konten tanpa ada tanggal kosong yang terlewat.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="size-11 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                  <Lightbulb className="size-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Content Ideas Board</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Catat inspirasi seketika. Kembangkan ide menjadi draft materi hanya dalam satu klik saat siap diproduksi.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-3">
                <div className="size-11 rounded-lg bg-pink-500/10 text-pink-600 flex items-center justify-center">
                  <Sparkles className="size-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">AI Caption Generator</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Hasilkan 3 variasi hook & copywriting, lengkap dengan rekomendasi tagar relevan untuk Instagram, TikTok, LinkedIn, dan lainnya.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

