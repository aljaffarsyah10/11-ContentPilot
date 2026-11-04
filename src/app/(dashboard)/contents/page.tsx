import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/shared/empty-state";
import { FileText, Plus, Search } from "lucide-react";

export default function ContentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Daftar Konten"
        description="Kelola seluruh draft, jadwal tayang, dan materi konten media sosial Anda."
      >
        <Link
          href="/contents/new"
          className={buttonVariants({ size: "sm" })}
        >
          <Plus className="size-4 mr-1.5" />
          Buat Konten Baru
        </Link>
      </PageHeader>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Cari judul konten..." className="pl-9" />
        </div>

        <Tabs defaultValue="all" className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-4 sm:w-auto">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content List Area */}
      <div className="rounded-xl border border-border bg-card p-6">
        <EmptyState
          icon={FileText}
          title="Belum Ada Konten"
          description="Anda belum memiliki materi konten. Mulai buat draft pertama atau rencanakan jadwal publikasi Anda."
          actionLabel="Buat Konten Baru"
        />
      </div>
    </div>
  );
}
