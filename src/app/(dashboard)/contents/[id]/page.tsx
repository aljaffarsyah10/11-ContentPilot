import type { Metadata } from "next";
import { Suspense } from "react";
import { ContentDetailClient } from "./content-detail-client";

export async function generateMetadata(): Promise<Metadata> {
  "use cache";
  return {
    title: "Detail Konten",
    description: "Lihat dan perbarui jadwal serta materi posting konten",
  };
}

export default function ContentDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm text-muted-foreground">
          Memuat detail konten...
        </div>
      }
    >
      <ContentDetailClient />
    </Suspense>
  );
}
