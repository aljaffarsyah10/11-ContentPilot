# ContentPilot 🚀

> **Plan Smarter. Create Better. Publish Consistently.**

ContentPilot adalah aplikasi SaaS berbasis web (_Social Media Content Planning Platform_) yang dirancang untuk membantu individu, _content creator_, _social media manager_, dan pemilik bisnis (UMKM) dalam merencanakan, membuat, mengorganisasi, dan menjadwalkan konten media sosial dalam satu dashboard terpadu.

Aplikasi ini menggabungkan manajemen ide konten, generator caption & hashtag berbasis AI, kalender konten visual, serta sistem penjadwalan terstruktur untuk meningkatkan efisiensi dan konsistensi publikasi media sosial.

---

## 📸 Preview Tampilan Aplikasi

### 🌟 Homepage & Hero Studio (Tema Gelap & Terang)

|                   Tema Gelap (Dark Mode)                    |                   Tema Terang (Light Mode)                    |
| :---------------------------------------------------------: | :-----------------------------------------------------------: |
| ![Homepage Dark Mode](public/docs/images/homepage-dark.png) | ![Homepage Light Mode](public/docs/images/homepage-light.png) |

> _Tampilan antarmuka landing page dengan ambient glow multi-stop gradient, interactive calendar showcase card, tipografi modern Plus Jakarta Sans, dan dark mode yang kontras dan tajam._

---

## 📌 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan (Tech Stack)](#-teknologi-yang-digunakan-tech-stack)
- [Struktur Direktori Proyek](#-struktur-direktori-proyek)
- [Prasyarat Sistem](#-prasyarat-sistem)
- [Panduan Instalasi & Menjalankan Lokal](#-panduan-instalasi--menjalankan-lokal)
- [Environment Variables](#-environment-variables)
- [Pengujian (Testing & QA)](#-pengujian-testing--qa)
- [Deployment & Produksi](#-deployment--produksi)
- [Dokumentasi Proyek](#-dokumentasi-proyek)
- [Lisensi](#-lisensi)

---

## ✨ Fitur Utama

### 1. 📊 Dashboard Analytics & Ringkasan Aktivitas

- Ringkasan metrik total konten (Draft, Scheduled, Published) dan total ide backlog.
- Widget **Upcoming Content** untuk memantau konten yang akan segera tayang.
- Feed ide terbaru dan tombol aksi cepat (_Quick Actions_).

### 2. 💡 Manajemen Ide Konten (Idea Backlog)

- Pencatatan ide konten secara cepat tanpa kehilangan momentum.
- Siklus status ide: `NEW` ➔ `IN_PROGRESS` ➔ `USED` ➔ `ARCHIVED`.
- **Convert to Content**: Konversi ide backlog langsung menjadi draft konten terjadwal dengan riwayat sumber ide (_origin tracking_).

### 3. 🤖 AI Caption & Hashtag Generator

- Integrasi OpenAI API (model default `gpt-4o-mini`) dengan isolasi server-side yang aman.
- Kustomisasi parameter: Platform tujuan, Topik, Target Audiens, _Tone of Voice_, Bahasa (Indonesia/Inggris), Panjang Caption, dan _Call-to-Action_ (CTA).
- Menghasilkan caption utama, variasi alternatif, hashtag relevan, dan rekomendasi CTA.
- Fitur _Copy to Clipboard_ dan simpan langsung ke manajemen konten.

### 4. 📅 Kalender Konten Interaktif (Content Calendar)

- Tampilan kalender bulanan (_Monthly View_) dan mingguan (_Weekly View_).
- Menampilkan jadwal konten dengan badge platform dan indikator status.
- Filter kalender berdasarkan platform dan status publikasi.
- Navigasi antar bulan/minggu yang responsif.

### 5. 📝 Manajemen & Pengorganisasian Konten

- CRUD lengkap untuk konten dengan form validasi ketat via Zod.
- Status alur: `DRAFT` ➔ `SCHEDULED` (wajib ada tanggal jadwal) ➔ `PUBLISHED`.
- Dukungan 6 platform populer: **Instagram, TikTok, LinkedIn, Facebook, X (Twitter), dan YouTube**.
- Fitur **Duplikasi Konten**: Gandakan konten dengan reset otomatis ke status `DRAFT` untuk repurpose konten lama.

### 6. 📂 Template Konten & Export CSV

- Template bawaan siap pakai untuk berbagai tipe post (edukasi, promosi, tips praktis, peluncuran produk).
- Fitur **Export CSV**: Ekspor seluruh daftar konten sesuai standar RFC 4180 dengan UTF-8 BOM untuk kompatibilitas sempurna di Microsoft Excel dan Google Sheets.

### 7. 🔒 Keamanan & Isolasi Data Multi-Tenant (IDOR-Safe)

- Autentikasi berbasis session menggunakan Auth.js (NextAuth) dan hashing password bcrypt (salt rounds: 12).
- Seluruh endpoint API memverifikasi session server-side (`requireAuthUser`) — ID pengguna diambil murni dari session JWT, mencegah eksploitasi IDOR (_Insecure Direct Object References_).
- Validasi skema Zod di seluruh layer HTTP request.

### 8. 🌓 Tema Gelap / Terang & Tampilan Responsif

- Dukungan _Dark Mode_ dan _Light Mode_ bawaan (`next-themes`).
- Desain antarmuka responsif untuk perangkat Desktop, Tablet, dan Smartphone.

---

## 🛠️ Teknologi yang Digunakan (Tech Stack)

| Layer               | Teknologi                                                                                       | Keterangan                                  |
| ------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------- |
| **Framework**       | [Next.js 16](https://nextjs.org/) (App Router, Turbopack)                                       | Server Components & Route Handlers          |
| **Language**        | [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode)                                   | Type-safe end-to-end                        |
| **Styling**         | [Tailwind CSS 4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)                | Desain antarmuka modern & konsisten         |
| **Icons**           | [Lucide React](https://lucide.dev/)                                                             | Library ikon SVG                            |
| **Database**        | [PostgreSQL](https://www.postgresql.org/)                                                       | Relational Database                         |
| **ORM**             | [Prisma 6](https://www.prisma.io/)                                                              | Schema management & Type-safe query builder |
| **Authentication**  | [Auth.js](https://authjs.dev/) / NextAuth v5 + [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Session & Password Hashing                  |
| **Validation**      | [Zod](https://zod.dev/)                                                                         | Data schema validation                      |
| **Form Management** | [React Hook Form](https://react-hook-form.com/)                                                 | High-performance form handling              |
| **AI Integration**  | [OpenAI API](https://platform.openai.com/)                                                      | Caption & Hashtag generator                 |
| **Testing**         | [Vitest](https://vitest.dev/)                                                                   | Unit, Integration, dan E2E test runner      |
| **Deployment**      | Docker & Docker Compose                                                                         | Multi-stage build standalone                |

---

## 📁 Struktur Direktori Proyek

```text
ContentPilot/
├── prisma/
│   └── schema.prisma           # Skema database Prisma (User, Content, ContentIdea, dsb.)
├── public/                     # Aset statis & ikon
├── src/
│   ├── app/                    # Next.js App Router (Halaman & Route Handlers)
│   │   ├── (auth)/             # Route grup autentikasi (login, register)
│   │   ├── (dashboard)/        # Route grup dashboard (calendar, contents, ideas, settings, ai)
│   │   ├── api/                # REST API Route Handlers (auth, contents, ideas, ai, calendar, health)
│   │   ├── layout.tsx          # Root Layout & Provider (Theme, Session)
│   │   └── page.tsx            # Public Landing Page
│   ├── components/             # Reusable UI & Feature components
│   │   ├── layout/             # Sidebar, Header, Navbar
│   │   ├── providers/          # ThemeProvider, SessionProvider
│   │   └── ui/                 # Komponen dasar shadcn/ui
│   ├── config/                 # Konfigurasi aplikasi & data template
│   ├── lib/                    # Utilitas global (auth, db prisma, validation, error handler)
│   ├── repositories/           # Data Access Layer (Prisma query abstraction)
│   ├── services/               # Business Logic Layer (Content, Idea, AI, Dashboard, Calendar)
│   └── types/                  # Definisi tipe TypeScript
├── tests/                      # Suite pengujian otomatis (Vitest)
│   ├── unit/                   # Unit tests (validation, templates, csv, status transitions)
│   ├── integration/            # Integration tests (auth, multi-tenant IDOR data isolation)
│   └── e2e/                    # E2E workflow tests (register -> content -> calendar -> export)
├── Dockerfile                  # Multi-stage production build
├── docker-compose.yml          # Konfigurasi container app + PostgreSQL
├── DEPLOYMENT_GUIDE.md         # Panduan deployment ke VPS / Vercel
├── RELEASE_NOTES.md            # Catatan rilis versi 1.0.0
└── TEST_REPORT.md              # Laporan hasil testing lengkap Phase 9
```

---

## 💻 Prasyarat Sistem

Sebelum menjalankan proyek di komputer lokal, pastikan telah terinstal:

- **Node.js**: versi `22.x` atau lebih baru
- **npm**: versi `10.x` atau lebih baru
- **PostgreSQL**: versi `15.x` atau lebih baru (berjalan lokal atau remote)
- **Git**

---

## 🚀 Panduan Instalasi & Menjalankan Lokal

### 1. Clone Repository

```bash
git clone https://github.com/<your-username>/ContentPilot.git
cd ContentPilot
```

### 2. Instal Dependensi

```bash
npm install --legacy-peer-deps
```

### 3. Konfigurasi Environment Variables

Salin file contoh konfigurasi:

```bash
cp .env.example .env
```

Buka file `.env` dan lengkapi kredensial Anda (lihat bagian [Environment Variables](#-environment-variables) di bawah).

### 4. Setup Database & Jalankan Migrasi Prisma

Pastikan PostgreSQL sudah berjalan, kemudian eksekusi:

```bash
# Generate Prisma Client
npx prisma generate

# Jalankan migrasi skema database
npx prisma migrate dev --name init
```

_(Opsional) Untuk melihat atau mengedit data database secara visual:_

```bash
npx prisma studio
```

### 5. Jalankan Development Server

```bash
npm run dev
```

Buka browser dan akses: [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Environment Variables

File `.env` membutuhkan beberapa konfigurasi utama:

```env
# Mode Lingkungan
NODE_ENV=development

# Koneksi Database PostgreSQL
DATABASE_URL="postgresql://postgres:password@localhost:5432/contentpilot?schema=public"

# Kunci Rahasia Auth.js / NextAuth (generate via: openssl rand -hex 32)
AUTH_SECRET="your-super-secret-key-min-32-chars"
AUTH_URL="http://localhost:3000"

# OpenAI API Key (Hanya diakses di server-side)
OPENAI_API_KEY="sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx"
OPENAI_MODEL="gpt-4o-mini"

# URL Publik Aplikasi
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

> [!WARNING]
> Jangan pernah membagikan atau melakukan `git commit` pada file `.env` atau nilai rahasia seperti `AUTH_SECRET`, `DATABASE_URL`, dan `OPENAI_API_KEY`.

---

## 🧪 Pengujian (Testing & QA)

ContentPilot dilengkapi dengan pengujian menyeluruh (Unit, Integrasi, dan End-to-End) menggunakan **Vitest**.

### Menjalankan Seluruh Test Suite

```bash
npm run test
```

### Hasil Test Suite Aktual (Phase 9)

```text
✓ tests/unit/csv-export.test.ts (6 tests)
✓ tests/unit/templates.test.ts (3 tests)
✓ tests/unit/validation.test.ts (15 tests)
✓ tests/unit/status-transition.test.ts (2 tests)
✓ tests/integration/data-isolation.test.ts (11 tests)
✓ tests/integration/auth.test.ts (3 tests)
✓ tests/e2e/core-workflow.test.ts (8 tests)

Test Files  7 passed (7)
     Tests  48 passed (48)
```

### Pemeriksaan TypeScript & Linter

```bash
# Validasi Type Checking
npx tsc --noEmit

# Validasi ESLint
npm run lint
```

Laporan pengujian lengkap dapat dilihat di [TEST_REPORT.md](TEST_REPORT.md).

---

## 🐳 Deployment & Produksi

### 1. Build Standalone Produksi Lokal

```bash
npm run build
npm run start
```

### 2. Menggunakan Docker Compose (Self-Hosted VPS)

Proyek ini telah dilengkapi dengan `Dockerfile` (multi-stage build standalone) dan `docker-compose.yml`.

```bash
# Salin konfigurasi production
cp .env.example .env.production

# Jalankan container (PostgreSQL + Migration + Next.js App)
docker compose --env-file .env.production up -d --build
```

Panduan lengkap konfigurasi Reverse Proxy Nginx, SSL Let's Encrypt, strategi backup database, dan health check dapat dibaca di [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).

---

## 📚 Dokumentasi Proyek

Dokumen pelengkap yang tersedia di dalam repositori:

- [PROJECT_PRD_AND_PLAYBOOK.md](PRD%20and%20Playbook.md) — Product Requirements Document (PRD) dan 10-phase development playbook.
- [TECHNICAL_PLAN.md](TECHNICAL_PLAN.md) — Arsitektur teknis, desain database, dan standar pengkodean.
- [UI_UX_GUIDE.md](UI_UX_GUIDE.md) — Panduan desain UI/UX, tata letak, dan sistem warna.
- [TEST_REPORT.md](TEST_REPORT.md) — Laporan pengujian otomatis, audit keamanan, dan optimasi performa.
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) — Panduan langkah demi langkah deployment ke server produksi.
- [RELEASE_NOTES.md](RELEASE_NOTES.md) — Catatan rilis resmi versi MVP 1.0.0.

---

## 📄 Lisensi

Didistribusikan di bawah lisensi privat / proprietary untuk ContentPilot. Hak cipta dilindungi undang-undang.
Version 1.1
