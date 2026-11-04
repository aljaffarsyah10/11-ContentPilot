import { AICaptionInput, AICaptionResult } from "@/types/ai.types";

export function getMockCaptionResult(input: Partial<AICaptionInput>): AICaptionResult {
  const topic = input.topic || "Strategi Konten Media Sosial";
  const platform = input.platform || "INSTAGRAM";

  return {
    captions: [
      {
        id: "var-1",
        caption: `🚀 Mau konsisten ngonten tanpa harus kehabisan ide setiap hari? \n\nKuncinya ada pada content batching! Luangkan 1 hari di akhir pekan khusus untuk riset dan buat outline ${topic}. Saat hari kerja tiba, kamu tinggal eksekusi tanpa mikir dari nol lagi. \n\nCoba terapkan minggu ini dan rasakan bedanya!`,
        hashtags: ["produktivitas", "tipsngonten", "contentstrategy", platform.toLowerCase()],
        callToAction: "Simpan postingan ini biar gak lupa saat weekend nanti! 📌",
      },
      {
        id: "var-2",
        caption: `Stop buang waktu bikin konten dadakan yang bikin stres! ❌\n\nBanyak kreator menyerah bukan karena gak bisa bikin konten, tapi karena gak punya sistem kerja yang jelas seputar ${topic}.\n\nDengan perencanaan terstruktur, kamu bisa menjaga kualitas sekaligus konsistensi akunmu.`,
        hashtags: ["creatorgrowth", "manajemenwaktu", "belajarngonten", "socialmediatips"],
        callToAction: "Komen 'MAU' kalau kamu pengen template checklist perencanaan konten gratis! 👇",
      },
      {
        id: "var-3",
        caption: `3 Hal sederhana yang mengubah cara pandang saya tentang ${topic}:\n\n1. Kuantitas melatih kualitas di tahap awal\n2. Hook yang tajam menentukan retensi penonton\n3. Value yang relevan selalu mengalahkan tren sesaat\n\nMana dari 3 poin di atas yang paling relate dengan pengalamanmu sekarang?`,
        hashtags: ["mindsetcreator", "growthtips", "storytelling", platform.toLowerCase()],
        callToAction: "Share postingan ini ke teman kreatormu yang lagi butuh insight ini! 🔄",
      },
    ],
  };
}

