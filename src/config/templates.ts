import { SocialPlatform } from "@/components/shared/platform-badge";

export interface ContentTemplate {
  id: string;
  name: string;
  category: "promotional" | "educational" | "storytelling" | "announcement" | "engagement";
  description: string;
  defaultPlatform: SocialPlatform;
  title: string;
  caption: string;
  hashtags: string[];
  notes: string;
}

export const contentTemplates: ContentTemplate[] = [
  {
    id: "promo-flash-sale",
    name: "Promosi / Flash Sale",
    category: "promotional",
    description: "Format penawaran dengan batas waktu, dorongan urgensi, dan Call-to-Action jelas.",
    defaultPlatform: "INSTAGRAM",
    title: "Flash Sale Spesial Minggu Ini",
    caption: `🚨 PENAWARAN SPESIAL TERBATAS! 🚨

Hanya untuk [X] hari ke depan, dapatkan diskon hingga [X]% untuk seluruh produk pilihan kami!

Kenapa Anda tidak boleh melewatkannya?
✨ [Benefit utama 1: Lebih hemat]
✨ [Benefit utama 2: Kualitas terbaik terjamin]
✨ [Benefit utama 3: Bonus ekstra gratis ongkir]

Promo ini hanya berlaku sampai [Hari, Tanggal] pukul 23:59 WIB. Jangan sampai kehabisan stok!

👉 Klik link di bio profil sekarang untuk klaim voucher promo Anda sebelum kuota habis!`,
    hashtags: ["promospesial", "flashsale", "diskonhariini", "hematbanget", "belanjaonline"],
    notes: "Sertakan banner promosi mencolok dengan countdown timer di stories.",
  },
  {
    id: "educational-tips",
    name: "Tips & Edukasi Praktis",
    category: "educational",
    description: "Format carousel edukasi atau video tips ringkas yang mudah dipraktikkan audiens.",
    defaultPlatform: "INSTAGRAM",
    title: "5 Tips Praktis Meningkatkan Produktivitas Harian",
    caption: `Sering merasa kehabisan waktu tapi pekerjaan belum selesai? 🤔

Coba terapkan 5 langkah sederhana ini agar hari Anda jauh lebih terstruktur dan produktif:

1️⃣ Buat Top 3 Prioritas di pagi hari sebelum membuka media sosial
2️⃣ Terapkan teknik Time Blocking (25 menit fokus, 5 menit istirahat)
3️⃣ Kelompokkan tugas sejenis (Batching tasks)
4️⃣ Singkirkan distraksi notifikasi smartphone saat deep work
5️⃣ Lakukan evaluasi 5 menit di akhir hari kerja

Mana dari tips di atas yang sudah Anda terapkan secara konsisten?

📌 Simpan (Save) postingan ini agar bisa dibaca ulang saat Anda butuh pengingat!`,
    hashtags: ["tipsberguna", "produktivitas", "selfgrowth", "belajartiap hari", "contentcreator"],
    notes: "Gunakan format slide carousels untuk keterbacaan optimal.",
  },
  {
    id: "storytelling-journey",
    name: "Storytelling / Behind The Scene",
    category: "storytelling",
    description: "Kisah autentik perjalanan, tantangan nyata, dan pelajaran berharga yang membangun empati.",
    defaultPlatform: "LINKEDIN",
    title: "Pelajaran Berharga di Balik Kegagalan Pertama Saya",
    caption: `1 tahun lalu, saya membuat keputusan yang hampir membuat project kami gulung tikar.

Saat itu saya berpikir bahwa [asumsi awal/ekspektasi]. Namun kenyataan di lapangan berkata lain:
- Hasil penjualan jauh di bawah target
- Tim sempat merasa lelah dan kehilangan arah
- Keraguan mulai muncul apakah ide ini layak dilanjutkan

Alih-alih menyalahkan keadaan, kami memutuskan untuk mundur satu langkah dan mengevaluasi:
💡 Pelajaran 1: Dengarkan apa yang benar-benar dibutuhkan pengguna, bukan apa yang kita asumsikan.
💡 Pelajaran 2: Konsistensi perbaikan kecil harian jauh lebih berdampak daripada perubahan instan.

Hari ini, kami bersyukur karena kegagalan tersebut justru menjadi pondasi sistem kami sekarang.

Bagi teman-teman yang sedang menghadapi kebuntuan: kegagalan bukan akhir, melainkan data baru untuk melangkah lebih bijak.

Pernahkah Anda mengalami titik balik serupa dalam karir atau bisnis? Mari berdiskusi di kolom komentar.`,
    hashtags: ["storytelling", "leadership", "entrepreneurship", "growthmindset", "lessonslearned"],
    notes: "Fokus pada nilai autentisitas dan refleksi nyata tanpa terkesan flexing.",
  },
  {
    id: "product-announcement",
    name: "Peluncuran Produk Baru",
    category: "announcement",
    description: "Pengumuman rilis produk atau fitur baru yang menjawab keresahan utama pengguna.",
    defaultPlatform: "TIKTOK",
    title: "Akhirnya Rilis: Solusi Baru yang Anda Nantikan!",
    caption: `Yang dari kemarin nanyain... AKHIRNYA RESMI KAMI LUNCURKAN! 🎉✨

Perkenalkan inovasi terbaru dari kami: [Nama Produk / Fitur]!

Dirancang khusus untuk membantu Anda [masalah utama yang diselesaikan]:
🔥 Lebih cepat dan mudah digunakan
🔥 Fitur andalan: [Sebutkan fitur kunci]
🔥 Hasil terbukti optimal sejak penggunaan pertama

Kabar baiknya, batch pertama tersedia dengan kuota terbatas & harga early-bird khusus minggu ini!

Mau jadi yang pertama mencoba? Tulis kata "MAU" di kolom komentar atau langsung klik tautan di profil!`,
    hashtags: ["launching", "produkbaru", "racuntiktok", "wajibpunya", "solusicerita"],
    notes: "Gunakan hook visual dinamis pada 3 detik pertama video.",
  },
  {
    id: "engagement-community",
    name: "Diskusi & Interaksi Komunitas",
    category: "engagement",
    description: "Pertanyaan pemicu diskusi interaktif untuk menaikkan rasio komentar dan keterlibatan.",
    defaultPlatform: "X",
    title: "Diskusi Interaktif: Pilihan Tim A vs Tim B",
    caption: `Pertanyaan penting buat teman-teman kreator & profesional:

Kalau harus memilih satu cara kerja seumur hidup, Anda pilih yang mana?

🅰️ Kerja Remote 100% dari mana saja, jam kerja bebas, tapi koordinasi serba online
🅱️ Kerja Hybrid (3 hari kantor, 2 hari rumah) dengan lingkungan tim tatap muka langsung

Kelebihan dan kekurangan pasti ada. Tulis pilihan Anda beserta alasannya di bawah ya! 👇`,
    hashtags: ["diskusiseru", "remotework", "workculture", "communitytalk", "ngobrolsantai"],
    notes: "Balas setiap komentar masuk dalam 1 jam pertama untuk menaikkan engagement score.",
  },
];
