import { ContentItem } from "@/types/content.types";

export function getMockContents(): ContentItem[] {
  return [
    {
      id: "cnt-1",
      userId: "usr-demo",
      title: "5 Tips Produktivitas untuk Solo Creator",
      caption:
        "Sering merasa overwhelmed membagi waktu antara riset, produksi video, dan interaksi audiens? Coba terapkan teknik time-blocking 90 menit ini agar workflow harianmu tetap teratur tanpa burnout! Simak slide berikutnya untuk breakdown detailnya 👉",
      hashtags: ["produktivitas", "creatorlife", "tipsngonten", "timemanagement"],
      platform: "INSTAGRAM",
      status: "SCHEDULED",
      scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1).toISOString(), // Besok
      notes: "Gunakan carrousel 5 slide template biru",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "cnt-2",
      userId: "usr-demo",
      title: "Behind The Scenes: Setup Meja Kerja 2026",
      caption:
        "Setup meja kerja minimalis yang bikin fokus kerja berjam-jam tanpa sakit leher. Lampu monitor bar dan vertical mouse ini beneran jadi game changer!",
      hashtags: ["desksetup", "workspace", "techgear", "minimalist"],
      platform: "TIKTOK",
      status: "SCHEDULED",
      scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 hari lagi
      notes: "Ambil footage b-roll lampu menyala saat ruangan gelap",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "cnt-3",
      userId: "usr-demo",
      title: "Mengapa UMKM Wajib Mulai Content Marketing di 2026",
      caption:
        "Biaya iklan berbayar (paid ads) kian meningkat setiap kuartal. Konten organik berbasis edukasi dan storytelling adalah aset jangka panjang yang membangun kepercayaan pelanggan secara berkelanjutan.",
      hashtags: ["digitalmarketing", "bisnisumkm", "contentmarketing", "growth"],
      platform: "LINKEDIN",
      status: "DRAFT",
      scheduledAt: null,
      notes: "Tambahkan data statistik persentase konversi",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "cnt-4",
      userId: "usr-demo",
      title: "Promo Flash Sale Diskon Akhir Pekan",
      caption:
        "Koleksi terbatas hanya untuk 50 pembeli pertama! Dapatkan potongan 30% menggunakan kode diskon CPPROMO30 saat checkout sebelum hari Minggu malam.",
      hashtags: ["promospesial", "flashsale", "diskonhariini", "belanjaonline"],
      platform: "FACEBOOK",
      status: "PUBLISHED",
      scheduledAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 hari lalu
      notes: "Tautkan link katalog WhatsApp di komentar utama",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    },
    {
      id: "cnt-5",
      userId: "usr-demo",
      title: "Kupas Tuntas Algoritma Video Pendek",
      caption:
        "Hook 3 detik pertama menentukan 80% keberhasilan video kamu masuk FYP. Ini 3 pola hook verbal yang terbukti menaikkan retensi penonton secara signifikan.",
      hashtags: ["videocreator", "algoritma", "kontenviral", "shorts"],
      platform: "YOUTUBE",
      status: "SCHEDULED",
      scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
      notes: "Jadwalkan upload YouTube Shorts jam 17:00 WIB",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

