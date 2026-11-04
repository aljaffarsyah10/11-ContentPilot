# UI_UX_GUIDE.md — ContentPilot Design System & UX Blueprint

> **Project:** ContentPilot  
> **Document Version:** 1.0.0  
> **Target Audience:** Frontend Developers, Product Designers, QA Engineers  
> **Source Baseline:** `PRD and Playbook.md` (Sections 8, 9, 10) & `TECHNICAL_PLAN.md`

---

## 1. Design Direction & Principles

ContentPilot mengadopsi estetika **Modern SaaS Dashboard — Clean, Minimal, and Productive**. Antarmuka berfokus pada kecepatan input konten, visualisasi jadwal yang rapi, dan kemudahan generasi teks AI tanpa distraksi visual.

### Core Principles
1. **Clean & Minimal:** Menghilangkan elemen dekoratif berlebihan. Menggunakan kontras halus, border tipis (1px), dan white space yang lapang untuk fokus pada konten pengguna.
2. **Productive & Task-Driven:** Alur kreasi konten (ide → draft → jadwal tayang) harus dapat diakses dalam 1-2 klik dari halaman mana pun melalui shortcut atau Quick Actions.
3. **Consistent Hierarchy:** Ukuran font, padding, dan warna status konsisten di seluruh modul (Dashboard, Ide, Konten, Kalender, AI Generator).
4. **Accessible by Default:** Rasio kontras teks minimum WCAG 2.1 AA (4.5:1 untuk normal text), dukungan navigasi keyboard, dan focus ring yang jelas.
5. **Mobile-First Responsive Layout:** Pengguna UMKM dan kreator individual sering memantau kalender konten melalui smartphone; tampilan mobile harus fungsional dengan drawer navigation dan compact cards.

---

## 2. Design Tokens (Tailwind CSS v4 & shadcn/ui)

Tokens dirancang agar terintegrasi mulus dengan format CSS variables shadcn/ui.

### 2.1 Color Palette

```css
:root {
  /* Base Neutral Tokens */
  --background: 0 0% 100%;                  /* #FFFFFF */
  --foreground: 222 47% 11%;                /* #0F172A - Slate 900 */
  --card: 0 0% 100%;                        /* #FFFFFF */
  --card-foreground: 222 47% 11%;           /* #0F172A */
  --popover: 0 0% 100%;                     /* #FFFFFF */
  --popover-foreground: 222 47% 11%;        /* #0F172A */

  /* Brand Primary (Indigo/Violet) */
  --primary: 243 75% 59%;                   /* #4F46E5 - Indigo 600 */
  --primary-foreground: 210 40% 98%;        /* #F8FAFC */
  --primary-hover: 243 75% 50%;             /* #4338CA - Indigo 700 */

  /* Secondary / Muted */
  --secondary: 220 14% 96%;                 /* #F1F5F9 - Slate 100 */
  --secondary-foreground: 222 47% 11%;      /* #0F172A */
  --muted: 220 14% 96%;                     /* #F1F5F9 - Slate 100 */
  --muted-foreground: 215 16% 47%;          /* #64748B - Slate 500 */
  --accent: 220 14% 96%;                    /* #F1F5F9 */
  --accent-foreground: 222 47% 11%;         /* #0F172A */

  /* Semantic Feedback Tokens */
  --success: 142 71% 45%;                   /* #16A34A - Green 600 */
  --success-foreground: 0 0% 100%;
  --warning: 38 92% 50%;                    /* #EAB308 - Amber 500 */
  --warning-foreground: 0 0% 100%;
  --destructive: 0 84% 60%;                 /* #DC2626 - Red 600 */
  --destructive-foreground: 210 40% 98%;    /* #F8FAFC */

  /* Borders & Inputs */
  --border: 220 13% 91%;                    /* #E2E8F0 - Slate 200 */
  --input: 220 13% 91%;                     /* #E2E8F0 */
  --ring: 243 75% 59%;                      /* #4F46E5 */

  /* Radii */
  --radius-sm: 0.375rem;                    /* 6px */
  --radius-md: 0.5rem;                      /* 8px (default) */
  --radius-lg: 0.75rem;                     /* 12px */
  --radius-xl: 1rem;                        /* 16px */
}
```

### 2.2 Platform Badge Colors

Setiap platform media sosial memiliki warna aksen khusus untuk memudahkan identifikasi visual:

| Platform | Badge Background | Badge Text / Border | Icon (Lucide) |
| :--- | :--- | :--- | :--- |
| **INSTAGRAM** | `bg-pink-50 dark:bg-pink-950/30` | `text-pink-600 border-pink-200` | `Instagram` |
| **FACEBOOK** | `bg-blue-50 dark:bg-blue-950/30` | `text-blue-600 border-blue-200` | `Facebook` |
| **TIKTOK** | `bg-zinc-100 dark:bg-zinc-800` | `text-zinc-900 border-zinc-300` | `Video` / `Music2` |
| **LINKEDIN** | `bg-sky-50 dark:bg-sky-950/30` | `text-sky-700 border-sky-200` | `Linkedin` |
| **X** | `bg-zinc-100 dark:bg-zinc-800` | `text-zinc-800 border-zinc-300` | `Twitter` / `Hash` |
| **YOUTUBE** | `bg-red-50 dark:bg-red-950/30` | `text-red-600 border-red-200` | `Youtube` |

### 2.3 Status Badge Colors

| Status | Badge Background | Badge Text | Keterangan |
| :--- | :--- | :--- | :--- |
| **DRAFT** | `bg-slate-100 dark:bg-slate-800` | `text-slate-700 dark:text-slate-300` | Konten masih dalam penulisan |
| **SCHEDULED** | `bg-blue-50 dark:bg-blue-950/40` | `text-blue-700 dark:text-blue-300` | Konten siap tayang dengan tanggal & jam |
| **PUBLISHED** | `bg-emerald-50 dark:bg-emerald-950/40` | `text-emerald-700 dark:text-emerald-300`| Konten telah selesai ditayangkan |
| **NEW (Idea)** | `bg-purple-50 dark:bg-purple-950/40` | `text-purple-700 dark:text-purple-300`| Ide baru belum diproses |
| **IN_PROGRESS** | `bg-amber-50 dark:bg-amber-950/40` | `text-amber-700 dark:text-amber-300` | Ide sedang dikembangkan jadi draft |
| **USED** | `bg-zinc-100 dark:bg-zinc-800` | `text-zinc-600 dark:text-zinc-400` | Ide telah dikonversi menjadi konten |
| **ARCHIVED** | `bg-zinc-50 dark:bg-zinc-900` | `text-zinc-400 dark:text-zinc-500` | Ide diarsipkan |

---

## 3. Typography System

Menggunakan font **Geist Sans** (default Next.js modern) dengan fallback `system-ui, -apple-system, sans-serif`.

| Role | Class Tailwind | Ukuran / Line Height | Font Weight | Penggunaan |
| :--- | :--- | :--- | :--- | :--- |
| **Display Heading** | `text-3xl font-bold tracking-tight` | 30px / 36px | Bold (700) | Landing page hero, Page Title utama |
| **Section Heading** | `text-xl font-semibold tracking-tight` | 20px / 28px | Semibold (600) | Judul kartu, sub-section dashboard |
| **Card / Item Title** | `text-base font-medium` | 16px / 24px | Medium (500) | Judul konten pada list, kalender, ide |
| **Body Regular** | `text-sm text-foreground` | 14px / 20px | Regular (400) | Teks isi, caption preview, deskripsi |
| **Body Muted** | `text-sm text-muted-foreground` | 14px / 20px | Regular (400) | Subtitle, metadata, keterangan form |
| **Caption / Small** | `text-xs text-muted-foreground` | 12px / 16px | Regular/Medium (400/500) | Timestamp, tag jumlah karakter, hashtag |
| **Button / Action** | `text-sm font-medium` | 14px / 20px | Medium (500) | Tombol aksi utama, tab navigation |

---

## 4. Navigation & Layout Architecture

### 4.1 Shell Breakdown

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Sidebar (240px Desktop)       │ Topbar (Header 60px)                         │
│ ┌───────────────────────────┐ ├──────────────────────────────────────────────┤
│ │ Logo: ContentPilot        │ │ Breadcrumb / Page Title  | User Profile Menu │
│ ├───────────────────────────┤ ├──────────────────────────────────────────────┤
│ │ ⌘ Dashboard               │ │ Main Content Area                            │
│ │ 📅 Calendar               │ │ (Max-w-7xl, Auto-padding, Scrollable)        │
│ │ 📝 Contents               │ │                                              │
│ │ 💡 Content Ideas          │ │                                              │
│ │ ✨ AI Caption Generator   │ │                                              │
│ ├───────────────────────────┤ │                                              │
│ │ ⚙ Settings                │ │                                              │
│ │ 🚪 Sign Out               │ │                                              │
│ └───────────────────────────┘ └──────────────────────────────────────────────┘
```

### 4.2 Desktop Navigation (`lg: >= 1024px`)
- **Sidebar:** Fixed di kiri layar, lebar `w-64 (256px)`, border-right `border-border`.
- **Active State:** Tombol menu aktif menggunakan background `bg-primary/10`, teks `text-primary font-semibold`, dan icon beraksen primer.
- **Header:** Sticky di bagian atas `h-14 (56px)`, border-bottom, menampung breadcrumb, quick "+ Create" button, dan avatar dropdown profil user.

### 4.3 Mobile & Tablet Navigation (`< 1024px`)
- **Sidebar:** Tersembunyi secara default; dibuka melalui tombol hamburger menu di header kiri via Drawer/Sheet component shadcn/ui.
- **Header:** Menampilkan hamburger icon di kiri, logo ContentPilot di tengah, dan profile avatar di kanan.
- **Bottom Bar (Opsional Mobile UX):** Akses cepat ke 4 modul utama: Dashboard, Kalender, Konten, Ide.

---

## 5. Page Specifications (P0 Scope)

### 5.1 Dashboard (`/dashboard`)
*Tujuan: Memberikan gambaran seketika mengenai performa jadwal dan konten terdekat.*

1. **Header Section:**
   - Greeting personal: *"Selamat datang kembali, [Nama]!"*
   - Subtitle tanggal hari ini: *"Rabu, 4 November 2026"*
   - Tombol Quick Action: `+ Buat Konten Baru` (primary), `✨ Generate AI Caption` (outline).
2. **Stat Cards Row (Grid 4 kolom desktop, 2 kolom tablet, 1 kolom mobile):**
   - **Total Konten:** Total konten aktif di semua status.
   - **Jadwal Tayang (Scheduled):** Jumlah konten dengan status `SCHEDULED`.
   - **Draft Konten:** Jumlah konten yang masih berstatus `DRAFT`.
   - **Ide Tersimpan:** Jumlah ide di papan ide yang berstatus `NEW` atau `IN_PROGRESS`.
3. **Main Content Split (2 Kolom 60% : 40% Desktop):**
   - **Kolom Kiri (Jadwal Tayang Mendatang):** List 5 konten berstatus `SCHEDULED` terdekat diurutkan berdasarkan `scheduledAt ASC`. Menampilkan badge platform, judul, tanggal & jam tayang, serta tombol edit.
   - **Kolom Kanan (Ide & Aktivitas Cepat):** 3 ide terbaru dengan tombol `Convert to Content`, dan ringkasan distribusi platform (Instagram, TikTok, LinkedIn, dll).

---

### 5.2 Content Management (`/contents`)
*Tujuan: Mengelola seluruh entitas konten (CRUD, filter, search).*

1. **Toolbar Header:**
   - Pencarian real-time (Debounced search input 300ms) berdasarkan judul dan caption.
   - Filter Status: Dropdown tab (`Semua`, `Draft`, `Scheduled`, `Published`).
   - Filter Platform: Multi-select atau dropdown (`Semua Platform`, `Instagram`, `TikTok`, dll).
   - Tombol `+ Buat Konten` (Primary button).
2. **Data Presentation:**
   - **Table View (Desktop):** Kolom: Platform Icon + Judul, Status Badge, Jadwal Tayang (UTC converted to local), Terakhir Diubah, Actions (Dropdown menu: Edit, Ubah Status, Hapus).
   - **Card View (Mobile):** Kartu ringkas dengan badge platform di sudut kiri, status di sudut kanan, judul bold, potongan caption 2 baris, tanggal tayang, dan tombol aksi swipe/tap.
3. **Editor Form (`/contents/new` & `/contents/[id]`):**
   - **Kolom Kiri Form (65%):**
     - Field Judul Konten (Input text, max 150 chars).
     - Field Caption (Textarea auto-resize, penghitung karakter, tombol `Sisipkan Hasil AI`).
     - Field Hashtags (Input tag dengan separator spasi atau koma).
     - Field Catatan Internal (Opsional, untuk referensi visual/angle shot).
   - **Kolom Kanan Settings (35%):**
     - Pilihan Platform (Radio group kartu ber-icon: Instagram, TikTok, LinkedIn, X, Facebook, YouTube).
     - Status Selector (Select: Draft, Scheduled, Published).
     - Date & Time Picker (Pop-up calendar + time selector; wajib diisi jika status `SCHEDULED`).
     - Tombol Aksi: `Simpan Konten` (Primary), `Batal` (Ghost), `Hapus Konten` (Destructive, hanya pada mode edit).

---

### 5.3 Content Calendar (`/calendar`)
*Tujuan: Memvisualisasikan distribusi jadwal tayang konten dalam format kalender bulanan dan mingguan.*

1. **Calendar Toolbar:**
   - Kontrol Navigasi Bulan: Tombol `Prev (<)`, Tombol `Next (>)`, dan Tombol `Hari Ini`.
   - Teks Bulan & Tahun: *"November 2026"* (Font size `text-xl font-semibold`).
   - Filter Platform: Checkbox/pills cepat untuk menyaring konten tertentu pada kalender.
   - View Switcher: `Bulan` (default) dan `Minggu`.
2. **Calendar Grid (Month View):**
   - Header 7 kolom: Sen, Sel, Rab, Kam, Jum, Sab, Min.
   - 35 s/d 42 cells tanggal.
   - Tanggal di luar bulan berjalan berbayang muted (`text-muted-foreground/50`).
   - Hari ini ditandai dengan lingkaran/badge aksen primer.
3. **Event Chips di Dalam Cell:**
   - Setiap jadwal konten dirender sebagai pill kecil dengan warna aksen platform, jam tayang, dan potongan judul (e.g. `[IG Icon] 14:00 - Launching Produk A`).
   - Maksimum 3 event terlihat per tanggal; jika lebih, muncul teks `+2 lainnya` yang membuka modal preview daftar harian.
   - Klik pada cell kosong langsung membuka dialog `+ Jadwalkan Konten di Tanggal Ini`.
   - Klik pada event chip membuka modal preview detail konten dengan tombol cepat `Edit Konten`.

---

### 5.4 Content Ideas (`/ideas`)
*Tujuan: Menampung ide-ide kreatif konten secara cepat sebelum diproduksi menjadi materi konten.*

1. **Top Bar Action:**
   - Input cepat pembuatan ide: Input field satu baris *"Ketik ide konten baru..."* + Tombol `+ Tambah Ide` (Enter to submit).
   - Filter Status Tab: `Semua`, `Ide Baru (New)`, `Sedang Dibuat (In Progress)`, `Sudah Dipakai (Used)`, `Arsip`.
2. **Card Grid View (3 kolom desktop, 2 tablet, 1 mobile):**
   - **Header Kartu:** Badge status ide dan menu titik tiga (Ubah Status, Edit, Hapus).
   - **Isi Kartu:** Judul ide (bold) dan deskripsi ide / referensi catatan.
   - **Footer Kartu:** Tanggal dibuat dan Tombol Aksi Utama: `Jadikan Konten (Convert)` (Tombol icon panah / plus).
3. **Modal Convert to Content:**
   - Dialog pop-up yang mengonfirmasi judul ide dipindahkan ke pembuatan konten baru.
   - Memilih platform target dan opsional jadwal tayang langsung.
   - Setelah selesai, status ide otomatis berubah menjadi `USED` dan konten baru tercipta di database.

---

### 5.5 AI Caption Generator (`/ai-generator`)
*Tujuan: Menghasilkan variasi caption, hook copywriting, dan rekomendasi hashtag menggunakan AI.*

1. **Layout 2 Kolom Seimbang (Desktop 50% : 50%):**
   - **Sisi Kiri — Generator Form:**
     - **Topik Konten (Wajib):** Textarea pendek deskripsi produk/ide (max 300 karakter).
     - **Platform Target (Wajib):** Pilihan Instagram, TikTok, LinkedIn, dll (menentukan gaya format dan limit karakter).
     - **Gaya Bahasa / Tone (Wajib):** Dropdown/Chips: `Casual & Santai`, `Profesional`, `Humoris`, `Inspiratif`, `Persuasif / Promosi`, `Edukatif`.
     - **Bahasa:** `Bahasa Indonesia` (default) atau `English`.
     - **Panjang Caption:** `Pendek (< 50 kata)`, `Sedang (50-150 kata)`, `Panjang (> 150 kata)`.
     - **Target Audiens (Opsional):** e.g. "Mahasiswa, Gen-Z, Pemilik UMKM".
     - **Instruksi Tambahan (Opsional):** e.g. "Sertakan call to action beli via DM".
     - **Tombol Eksekusi:** `✨ Generate Caption` (Warna aksen gradient primer, disable saat submitting).
   - **Sisi Kanan — Output & Variations:**
     - Tab atau list berisi **3 Variasi Caption** yang dihasilkan oleh AI.
     - Setiap variasi menampilkan:
       - Teks caption lengkap (dengan spacing dan baris baru yang rapi).
       - Kumpulan rekomendasi hashtag (bisa diklik untuk copy tersendiri).
       - Rekomendasi Call-to-Action (CTA).
     - **Toolbar Aksi per Variasi:**
       - Tombol `Salin ke Clipboard` (Icon Copy dengan feedback animasi "Tersalin!").
       - Tombol `Simpan Jadi Konten Baru` (Otomatis membuka editor konten dengan caption dan hashtag terisi).
       - Tombol `Regenerate` (Menghasilkan ulang jika belum puas).

---

## 6. UI States System

Setiap komponen pemuatan data dan interaksi pengguna wajib memiliki 6 state terdefinisi:

| State | Indikator Visual | Perilaku & Interaksi |
| :--- | :--- | :--- |
| **1. Loading** | Skeleton loader (shimmer animation) dengan dimensi sesuai komponen target | Mencegah layout shift (CLS). Tombol submit menampilkan spinner `<Loader2 className="animate-spin" />` dan disabled. |
| **2. Empty** | Ilustrasi / Icon muted + Judul informatif + Deskripsi bantuan + Call to Action | Muncul jika data 0 (misal: "Belum ada jadwal konten untuk bulan ini. Jadwalkan konten pertamamu!"). |
| **3. Error** | Alert box `border-destructive/30 bg-destructive/10 text-destructive` | Pesan kesalahan manusiawi (bukan stack trace) + Tombol `Coba Lagi` (Retry action). |
| **4. Success** | Toast notification (`sonner`) di sudut kanan bawah dengan icon centang hijau | Durasi auto-dismiss 3500ms; tindakan destruktif menyediakan tombol `Undo` jika relevan. |
| **5. Disabled** | Opacity `opacity-50 pointer-events-none cursor-not-allowed` | Form fields dan tombol saat request sedang diproses atau input belum memenuhi validasi minimal. |
| **6. Submitting** | Spinner aktif, teks tombol berubah (e.g. "Menyimpan...", "Menghasilkan Caption...") | Mencegah double click dan duplicate request ke server. |

---

## 7. Reusable Component Inventory

Daftar komponen yang dibangun berbasis `shadcn/ui` dan custom helpers:

### 7.1 Primitives (shadcn/ui)
- `Button`: Varian `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`.
- `Input`: Text field dengan focus ring indigo dan invalid state merah.
- `Textarea`: Multi-line text field dengan auto-resize.
- `Select` & `DropdownMenu`: Dropdown accessible untuk filter, opsi status, dan context menu.
- `Dialog` & `AlertDialog`: Modal konfirmasi hapus dan formulir pop-up.
- `Badge`: Status and platform tags dengan warna semantik terstandar.
- `Card`, `CardHeader`, `CardTitle`, `CardContent`: Wrapper kartu dashboard dan list.
- `Tabs`, `TabsList`, `TabsTrigger`: Tab filter status konten dan ide.
- `Calendar` / `Popover`: Komponen pemilih tanggal date-fns.
- `Skeleton`: Shimmer placeholder state.
- `Sheet`: Drawer sidebar untuk responsive mobile view.

### 7.2 Custom Composite Components
1. `PlatformBadge({ platform, showIcon, size })`: Merender badge warna resmi platform media sosial bersangkutan.
2. `StatusBadge({ status, type: 'content' | 'idea' })`: Merender badge status semantik (`DRAFT`, `SCHEDULED`, `PUBLISHED`, dll).
3. `EmptyState({ icon, title, description, actionLabel, onAction })`: Standar tampilan kosong yang seragam di seluruh tabel/list.
4. `ConfirmDialog({ open, title, description, onConfirm, onCancel, isDestructive })`: Modal konfirmasi aksi penting/destruktif (misal: hapus konten).
5. `StatCard({ title, value, icon, changeLabel, trend })`: Kartu ringkasan angka statistik pada dashboard.
6. `CopyButton({ textToCopy, label })`: Tombol salin satu klik dengan animasi feedback centang sementara.

---

## 8. Responsive Breakpoints & Adaptive Behavior

| Device | Breakpoint | Sidebar Behavior | Content Area | Calendar View |
| :--- | :--- | :--- | :--- | :--- |
| **Mobile** | `< 640px` (`sm`) | Tersembunyi (Hamburger Sheet) | Full width, single column, padding 16px | Compact Agenda / List View harian |
| **Tablet** | `640px - 1023px` (`md`) | Tersembunyi / Icon-only | Multi-column grid 2 kolom, padding 20px | Compact month grid dengan event dots |
| **Desktop** | `>= 1024px` (`lg`) | Fixed Sidebar `w-64` | Multi-column grid 3-4 kolom, padding 24px | Full 7-column month grid dengan event chips |
| **Wide** | `>= 1280px` (`xl`) | Fixed Sidebar `w-64` | Max container `max-w-7xl` centered | Full calendar dengan waktu detail |

---

## 9. Accessibility (a11y) & UX Guidelines

1. **Keyboard Navigability:** Seluruh tombol, modal, dropdown, dan kalender dapat dijelajahi menggunakan tombol `Tab`, `Shift+Tab`, `Enter`, dan `Escape` untuk menutup dialog.
2. **Focus Visibility:** Menggunakan utility `focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`.
3. **Form Clarity:** Setiap field input memiliki `<label>` terkait secara eksplisit dan pesan error validasi diletakkan tepat di bawah field bersangkutan dengan warna teks `text-destructive text-xs`.
4. **Destructive Actions Warning:** Seluruh aksi penghapusan (Delete Konten / Delete Ide) wajib didahului oleh dialog konfirmasi `ConfirmDialog`.

