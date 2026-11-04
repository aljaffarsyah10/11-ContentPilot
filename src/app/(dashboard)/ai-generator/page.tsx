import React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Copy } from "lucide-react";

export default function AIGeneratorPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Caption Generator"
        description="Buat copywriting caption, hook menarik, dan rekomendasi tagar otomatis dengan AI."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Generator Form (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Parameter Generasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="topic">
                  Topik / Produk <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="topic"
                  rows={3}
                  placeholder="Ceritakan tentang apa konten Anda (maks 300 karakter)..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Platform Target</label>
                  <Input readOnly value="Instagram" className="bg-muted text-xs cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Gaya Bahasa (Tone)</label>
                  <Input readOnly value="Casual & Santai" className="bg-muted text-xs cursor-not-allowed" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="audience">
                  Target Audiens (Opsional)
                </label>
                <Input id="audience" placeholder="Contoh: Pemilik UMKM, Gen-Z" />
              </div>

              <Button className="w-full">
                <Sparkles className="size-4 mr-2" />
                Generate Caption
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Output Preview (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="h-full flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold">Variasi Hasil</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs" disabled>
                <Copy className="size-3.5 mr-1" />
                Salin Semua
              </Button>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
              <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Sparkles className="size-6" />
              </div>
              <p className="text-sm font-medium text-foreground">Hasil AI akan Tampil di Sini</p>
              <p className="text-xs text-muted-foreground max-w-xs mt-1">
                Isi topik di formulir sebelah kiri dan klik tombol generate untuk melihat variasi caption.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

