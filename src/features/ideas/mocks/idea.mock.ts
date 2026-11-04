import { IdeaItem } from "@/types/idea.types";

export function getMockIdeas(): IdeaItem[] {
  return [
    {
      id: "ida-1",
      userId: "usr-demo",
      title: "Rekomendasi 3 Tools Gratis untuk Riset Tren Konten",
      description: "Bahas Google Trends, AnswerThePublic, dan TikTok Creative Center.",
      status: "NEW",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "ida-2",
      userId: "usr-demo",
      title: "Studi Kasus: Cara Brand Kopi Lokal Meningkatkan Followers 300%",
      description: "Fokus pada interaksi storytelling barista dan behind-the-scene pembuatan espresso.",
      status: "IN_PROGRESS",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "ida-3",
      userId: "usr-demo",
      title: "Mitos vs Fakta Jam Terbaik Upload Reels Instagram",
      description: "Jelaskan bahwa konsistensi dan relevansi konten lebih berpengaruh daripada jam sakti.",
      status: "USED",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    },
    {
      id: "ida-4",
      userId: "usr-demo",
      title: "Q&A: Menjawab 5 Pertanyaan Terbanyak di DM Pelanggan",
      description: "Kumpulkan FAQ seputar pengiriman, garansi, dan cara pemesanan.",
      status: "NEW",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

