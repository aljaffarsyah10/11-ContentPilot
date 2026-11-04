import React, { Suspense } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";

interface ContentDetailPageProps {
  params: Promise<{ id: string }>;
}

async function ContentDetailView({ params }: ContentDetailPageProps) {
  const { id } = await params;

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
        title="Detail Konten"
        description={`ID Konten: ${id}`}
      >
        <Button variant="outline" size="sm">
          <Edit className="size-4 mr-1.5" />
          Edit
        </Button>
        <Button variant="destructive" size="sm">
          <Trash2 className="size-4 mr-1.5" />
          Hapus
        </Button>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Informasi Konten</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>Halaman pratinjau dan edit konten akan aktif dengan data nyata pada Phase 5 & Phase 7.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ContentDetailPage(props: ContentDetailPageProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground">Memuat detail konten...</div>}>
      <ContentDetailView {...props} />
    </Suspense>
  );
}
