import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function NewContentPage() {
  return (
    <div className="space-y-6">
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
        description="Rancang naskah judul, caption, tagar, dan pilih platform publikasi."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Main Editor (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Detail Konten</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="title">
                  Judul Konten <span className="text-destructive">*</span>
                </label>
                <Input id="title" placeholder="Contoh: 5 Tips Produktif untuk Solo Creator" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium" htmlFor="caption">
                    Caption Teks
                  </label>
                  <Link
                    href="/ai-generator"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                      className: "h-7 text-xs text-primary",
                    })}
                  >
                    <Sparkles className="size-3.5 mr-1" />
                    Generate AI
                  </Link>
                </div>
                <Textarea
                  id="caption"
                  rows={6}
                  placeholder="Tulis caption materi konten Anda di sini..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="hashtags">
                  Hashtag
                </label>
                <Input id="hashtags" placeholder="#produktivitas #contentcreator #tips" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Pengaturan Publikasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Platform Media Sosial</label>
                <Input readOnly value="Instagram (Default)" className="bg-muted cursor-not-allowed text-xs" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status Konten</label>
                <Input readOnly value="DRAFT" className="bg-muted cursor-not-allowed text-xs" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Waktu Tayang</label>
                <Input type="datetime-local" className="text-xs" />
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <Button className="w-full">Simpan Konten</Button>
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
    </div>
  );
}
