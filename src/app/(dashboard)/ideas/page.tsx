import React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/shared/empty-state";
import { Lightbulb, Plus } from "lucide-react";

export default function IdeasPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Papan Ide Konten"
        description="Kumpulkan dan kelola seluruh gagasan topik sebelum diproduksi menjadi materi konten."
      >
        <Button size="sm">
          <Plus className="size-4 mr-1.5" />
          Tambah Ide Baru
        </Button>
      </PageHeader>

      {/* Quick Add Form Bar */}
      <div className="flex gap-2">
        <Input placeholder="Tulis inspirasi atau ide konten baru secara cepat..." className="flex-1" />
        <Button>Tambah</Button>
      </div>

      {/* Tabs Filter */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 sm:w-auto">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="new">Ide Baru</TabsTrigger>
          <TabsTrigger value="in_progress">Sedang Dibuat</TabsTrigger>
          <TabsTrigger value="used">Sudah Dipakai</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Ideas Board Empty State Placeholder */}
      <div className="rounded-xl border border-border bg-card p-6">
        <EmptyState
          icon={Lightbulb}
          title="Belum Ada Ide Tersimpan"
          description="Gunakan kolom di atas untuk mencatat ide pertama Anda atau klik tombol Tambah Ide Baru."
          actionLabel="Tambah Ide Sekarang"
        />
      </div>
    </div>
  );
}

