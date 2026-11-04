# PROJECT_PRD_AND_PLAYBOOK.md

# ContentPilot — Product Requirements Document & Sequential Development Playbook

MVP First

Web Application

AI-Powered

10 Development Phases

Project Overview

| Informasi        | Detail                                                 |
| ---------------- | ------------------------------------------------------ |
| Project Name     | ContentPilot                                           |
| Product Type     | Social Media Content Management SaaS                   |
| Platform         | Web Application                                        |
| Target User      | Public / Individual / Content Creator / Small Business |
| Development      | Solo Developer + AI Coding Assistant                   |
| Architecture     | Modular Monolith                                       |
| Frontend         | Next.js App Router + TypeScript                        |
| Styling          | Tailwind CSS + shadcn/ui                               |
| State Management | React State + Zustand (selektif)                       |
| Backend          | Next.js Route Handlers                                 |
| Database         | PostgreSQL                                             |
| ORM              | Prisma                                                 |
| Authentication   | Auth.js                                                |
| AI Integration   | OpenAI API (provider-based abstraction)                |
| Deployment       | VPS / Docker atau managed hosting                      |

Dokumen ini merupakan single source of truth untuk pengembangan ContentPilot.

Seluruh pengembangan harus mengikuti urutan 10 phase yang telah ditentukan. AI Coding Assistant tidak diperbolehkan mengerjakan seluruh aplikasi sekaligus atau melanjutkan phase secara otomatis.

# PART A — PRODUCT REQUIREMENTS DOCUMENT (PRD)

# 1. Product Information

## 1.1 Product Identity

Nama: ContentPilot

Tagline: Plan Smarter. Create Better. Publish Consistently.

Deskripsi:

ContentPilot adalah aplikasi SaaS berbasis web yang membantu individu, content creator, social media manager, dan pemilik bisnis dalam merencanakan, membuat, mengorganisasi, dan menjadwalkan konten media sosial melalui satu dashboard terintegrasi.

ContentPilot menggabungkan content calendar, AI caption generator, pengelolaan ide konten, dan sistem penjadwalan posting untuk membantu pengguna mengelola aktivitas media sosial secara lebih terstruktur dan efisien.

## 1.2 Platform

- Web application.
- Responsive desktop, tablet, dan mobile.
- Browser-based.
- Tidak memerlukan instalasi aplikasi desktop.

## 1.3 Target Users

Produk ditujukan untuk publik, terutama:

1. Individual content creator.
2. Social media manager.
3. UMKM dan pemilik bisnis.
4. Digital marketing freelancer.
5. Personal brand owner.
6. Tim marketing kecil.

## 1.4 Development Approach

- Solo developer.
- AI-assisted development.
- MVP first.
- Modular monolith.
- Clean architecture pragmatis.
- Reusable components.
- Type-safe development.
- Feature-based folder organization.
- Minimal dependencies.
- Incremental development.

## 1.5 Technology Stack

| Layer          | Technology             | Alasan                               |
| -------------- | ---------------------- | ------------------------------------ |
| Frontend       | Next.js App Router     | Framework utama                      |
| Language       | TypeScript             | Type safety                          |
| Styling        | Tailwind CSS           | Utility-first styling                |
| UI Components  | shadcn/ui              | Reusable UI                          |
| Icons          | Lucide React           | Icon system                          |
| State          | React State            | State lokal                          |
| Global State   | Zustand                | State lintas halaman jika diperlukan |
| Backend        | Next.js Route Handlers | Backend MVP                          |
| Database       | PostgreSQL             | Penyimpanan data relasional          |
| ORM            | Prisma                 | Database access                      |
| Authentication | Auth.js                | User authentication                  |
| Validation     | Zod                    | Schema validation                    |
| Form           | React Hook Form        | Form management                      |
| AI             | OpenAI API             | AI caption generation                |
| Date Handling  | date-fns               | Calendar manipulation                |
| Notifications  | Sonner                 | Toast notifications                  |
| Testing        | Vitest + Playwright    | Unit dan E2E testing                 |
| Deployment     | VPS / Managed Hosting  | Production hosting                   |

Catatan keputusan teknologi:

1. PostgreSQL digunakan karena ContentPilot memiliki relasi data antar-user, workspace, ide, konten, dan jadwal.
2. Prisma digunakan untuk mempermudah pengelolaan schema dan query.
3. Auth.js digunakan untuk autentikasi pengguna.
4. Next.js Route Handlers menjadi backend utama.
5. OpenAI API digunakan untuk AI generation. Provider harus diisolasi agar dapat diganti tanpa mengubah business logic.
6. Zustand tidak diwajibkan untuk seluruh state aplikasi.
7. Axios tidak diperlukan karena native `fetch` Next.js sudah mencukupi.
8. Redis dan background worker belum menjadi dependency MVP.

# 2. Product Overview

## 2.1 Problem Statement

Pengelolaan konten media sosial sering kali dilakukan menggunakan banyak aplikasi yang terpisah.

Contohnya:

- Ide konten dicatat di Google Keep atau Notion.
- Caption ditulis di dokumen terpisah.
- Jadwal posting dicatat di spreadsheet.
- Kalender konten dibuat secara manual.
- Proses mencari inspirasi konten dilakukan secara berulang.
- Pengguna kesulitan menjaga konsistensi posting.

Akibatnya, proses pengelolaan konten menjadi tidak efisien.

## 2.2 Proposed Solution

ContentPilot menyediakan satu platform untuk mengelola seluruh proses perencanaan konten.

## ContentPilot Workflow

Content Ideas

Catat dan organisasi ide konten.

AI Content Creation

Generate caption, hashtag, dan variasi konten.

Content Calendar

Atur tanggal dan waktu publikasi.

Content Management

Kelola status dan riwayat konten.

## 2.3 Core Value Proposition

ContentPilot membantu pengguna:

- Mengurangi waktu membuat caption.
- Menyimpan seluruh ide konten dalam satu tempat.
- Menjaga konsistensi publikasi.
- Memiliki gambaran jadwal konten secara visual.
- Mengelola konten berdasarkan platform media sosial.
- Mengurangi pekerjaan administratif dalam content planning.

## 2.4 Product Positioning

ContentPilot diposisikan sebagai lightweight content planning SaaS.

Bukan sebagai social media management enterprise platform.

Fokus MVP adalah membantu pengguna mengelola proses perencanaan konten, bukan melakukan publikasi otomatis ke seluruh platform media sosial.

# 3. Product Goals

## 3.1 Primary Goals

| ID    | Goal                          | Target MVP                                 |
| ----- | ----------------------------- | ------------------------------------------ |
| PG-01 | Mempermudah content planning  | Pengguna dapat membuat dan mengatur konten |
| PG-02 | Mempercepat pembuatan caption | Caption dapat dibuat menggunakan AI        |
| PG-03 | Mengorganisasi ide            | Ide tersimpan dan dapat dikelola           |
| PG-04 | Mempermudah scheduling        | Konten dapat dijadwalkan melalui kalender  |
| PG-05 | Menyediakan dashboard         | Pengguna dapat melihat ringkasan aktivitas |

## 3.2 Measurable Goals

Target pengujian MVP:

- Pengguna dapat membuat satu konten dalam waktu kurang dari 3 menit menggunakan alur normal.
- AI dapat menghasilkan caption dalam waktu target kurang dari 20 detik pada kondisi layanan normal.
- Seluruh konten pengguna tersimpan secara persisten.
- Kalender dapat menampilkan konten berdasarkan tanggal.
- Pengguna dapat mengelola minimal tiga platform media sosial.
- Tidak ada akses silang terhadap data antar-user.
- Core user flow berhasil tanpa error pada pengujian end-to-end.

Target performa merupakan sasaran awal, bukan jaminan SLA.

## 3.3 MVP Success Metrics

- Number of registered users.
- Number of created content items.
- Number of generated captions.
- Number of scheduled content items.
- Weekly active users.
- Content creation completion rate.

# 4. Target Users

## 4.1 User Persona

### Persona 1 — Individual Content Creator

Kebutuhan:

- Menyimpan ide konten.
- Menghasilkan caption dengan cepat.
- Menjadwalkan konten.
- Melihat kalender publikasi.

Pain points:

- Sering kehabisan ide.
- Sulit konsisten posting.
- Banyak waktu terbuang untuk menulis caption.

### Persona 2 — UMKM Owner

Kebutuhan:

- Mengelola konten promosi.
- Mengatur jadwal promosi.
- Membuat caption produk.
- Mengelola beberapa platform.

Pain points:

- Tidak memiliki social media manager.
- Tidak memiliki sistem content planning.
- Membuat konten secara mendadak.

### Persona 3 — Social Media Manager

Kebutuhan:

- Mengorganisasi banyak konten.
- Mengelola content calendar.
- Memisahkan konten berdasarkan platform.
- Melacak status publikasi.

Pain points:

- Jadwal konten tersebar.
- Sulit melihat keseluruhan rencana publikasi.
- Pengelolaan konten masih manual.

## 4.2 User Roles

Untuk MVP, hanya terdapat dua kategori:

| Role               | Access                                     |
| ------------------ | ------------------------------------------ |
| Guest              | Melihat landing page dan informasi produk  |
| Authenticated User | Mengakses seluruh fitur workspace miliknya |

Multi-user collaboration belum termasuk MVP.

# 5. Scope & Feature Priorities

## 5.1 P0 — Core MVP

Wajib tersedia

| Feature              | Description                            |
| -------------------- | -------------------------------------- |
| Authentication       | Register, login, logout                |
| Dashboard            | Ringkasan aktivitas konten             |
| Content Ideas        | Membuat dan mengelola ide              |
| Content Management   | CRUD konten                            |
| AI Caption Generator | Generate caption menggunakan AI        |
| Content Calendar     | Kalender bulanan dan mingguan          |
| Content Scheduling   | Menentukan tanggal dan waktu publikasi |
| Platform Management  | Memilih platform konten                |
| Content Status       | Draft, scheduled, published            |
| Content Search       | Mencari dan memfilter konten           |

### Detail fitur P0

1\. Authentication

- Registrasi pengguna.
- Login.
- Logout.
- Protected routes.
- Session management.

2\. Dashboard

Menampilkan:

- Total konten.
- Total ide.
- Konten draft.
- Konten scheduled.
- Konten published.
- Upcoming content.
- Recent activities.

3\. Content Ideas

Pengguna dapat:

- Menambahkan ide.
- Mengubah ide.
- Menghapus ide.
- Mengubah status ide.
- Mengubah ide menjadi konten.

4\. AI Caption Generator

Pengguna dapat menentukan:

- Platform media sosial.
- Topik konten.
- Target audience.
- Tone of voice.
- Bahasa.
- Panjang caption.
- Keyword opsional.
- Call to action.

AI menghasilkan:

- Caption.
- Hashtag.
- Call to action.
- Alternatif caption.

Pengguna dapat memilih hasil, mengedit, dan menyimpannya sebagai konten.

5\. Content Calendar

Tampilan:

- Monthly view.
- Weekly view.
- Upcoming schedule.

Fitur:

- Navigasi bulan.
- Navigasi minggu.
- Menampilkan konten pada tanggal.
- Klik tanggal untuk membuat konten.
- Klik konten untuk melihat detail.
- Filter berdasarkan platform dan status.

6\. Content Management

Data konten mencakup:

- Title.
- Caption.
- Hashtags.
- Platform.
- Scheduled date.
- Status.
- Notes.

7\. Content Scheduling

Pengguna menentukan waktu posting.

Untuk MVP, scheduling berfungsi sebagai pengelolaan rencana publikasi dan pengingat visual di kalender.

Tidak ada klaim bahwa ContentPilot otomatis mengirimkan posting ke media sosial.

## 5.2 P1 — Supporting Features

Setelah core MVP

- Content templates.
- Hashtag suggestions.
- Content duplication.
- Calendar drag-and-drop.
- Export content calendar ke CSV.
- Advanced content filtering.
- Basic activity history.
- Content performance notes.
- Custom tone of voice presets.
- Light/dark theme.

## 5.3 P2 — Future Development

Future roadmap

- Automatic publishing.
- Instagram API integration.
- Facebook publishing.
- TikTok integration.
- LinkedIn publishing.
- Multi-workspace.
- Team collaboration.
- Approval workflow.
- Analytics integration.
- Competitor content analysis.
- AI content strategy.
- AI image generation.
- Recurring content scheduling.
- Subscription and billing.
- Mobile application.

## 5.4 Explicit Out of Scope

Fitur berikut tidak boleh diimplementasikan pada MVP:

1. Automatic posting ke media sosial.
2. Social media account OAuth integration.
3. Team collaboration.
4. Subscription billing.
5. Advanced analytics.
6. AI image generation.
7. Social media scraping.
8. Multi-tenant organization management.
9. Native mobile application.
10. Background publishing engine.

Alasan: Fitur tersebut meningkatkan kompleksitas infrastruktur, integrasi pihak ketiga, dan maintenance.

# 6. Functional Requirements

## FR-01 — User Registration

Description: Pengguna dapat membuat akun.

System behavior:

- Pengguna mengisi nama, email, dan password.
- Sistem memvalidasi input.
- Email harus unik.
- Password di-hash menggunakan mekanisme aman.
- Pengguna dapat login setelah registrasi berhasil.

Acceptance criteria:

- Registrasi valid berhasil.
- Email duplikat ditolak.
- Password tidak pernah disimpan dalam plaintext.
- Input tidak valid menghasilkan pesan yang jelas.

## FR-02 — User Login

Description: Pengguna dapat masuk ke aplikasi.

Acceptance criteria:

- Kredensial valid berhasil login.
- Kredensial salah ditolak.
- Session dibuat dengan aman.
- Halaman dashboard hanya dapat diakses pengguna terautentikasi.

## FR-03 — Dashboard

Description: Menampilkan ringkasan aktivitas.

Acceptance criteria:

- Statistik diambil dari database.
- Statistik sesuai dengan user yang login.
- Upcoming content ditampilkan berdasarkan jadwal.
- Empty state tersedia untuk pengguna baru.

## FR-04 — Create Content Idea

Description: Pengguna dapat menambahkan ide konten.

Acceptance criteria:

- Judul ide wajib diisi.
- Deskripsi bersifat opsional.
- Ide tersimpan di database.
- Ide hanya dimiliki oleh user pembuatnya.

## FR-05 — Edit Content Idea

Acceptance criteria:

- Pengguna dapat memperbarui ide miliknya.
- Perubahan tersimpan.
- Pengguna tidak dapat mengubah ide user lain.

## FR-06 — Delete Content Idea

Acceptance criteria:

- Pengguna dapat menghapus ide.
- Sistem meminta konfirmasi.
- Data tidak dapat diakses setelah dihapus.

## FR-07 — Convert Idea to Content

Acceptance criteria:

- Ide dapat digunakan untuk membuat konten.
- Informasi awal ide dapat disalin ke form konten.
- Ide tidak otomatis terhapus.

## FR-08 — Generate AI Caption

Description:

Sistem menghasilkan caption menggunakan AI berdasarkan input pengguna.

Acceptance criteria:

- Platform wajib dipilih.
- Topik wajib diisi.
- Tone of voice dapat dipilih.
- Bahasa dapat dipilih.
- Sistem menampilkan loading state.
- Hasil ditampilkan kepada pengguna.
- Pengguna dapat mengedit hasil.
- Error dari provider ditangani dengan benar.
- API key tidak pernah dikirim ke browser.

## FR-09 — Save Generated Caption

Acceptance criteria:

- Pengguna dapat menyimpan hasil AI.
- Caption dapat diedit sebelum disimpan.
- Caption tersimpan sebagai draft.

## FR-10 — Create Content

Acceptance criteria:

- Pengguna dapat membuat konten manual.
- Title dan platform wajib diisi.
- Caption dapat dikosongkan ketika membuat draft.
- Data tersimpan ke database.

## FR-11 — Edit Content

Acceptance criteria:

- Pengguna dapat mengubah konten miliknya.
- Perubahan tersimpan.
- Status dapat diperbarui.
- Jadwal dapat diperbarui.

## FR-12 — Delete Content

Acceptance criteria:

- Pengguna dapat menghapus konten.
- Konfirmasi ditampilkan.
- Konten user lain tidak dapat dihapus.

## FR-13 — Content Calendar

Acceptance criteria:

- Kalender menampilkan konten berdasarkan jadwal.
- Navigasi bulan bekerja.
- Navigasi minggu bekerja.
- Setiap item menunjukkan platform dan status.
- Konten dapat dibuka melalui kalender.

## FR-14 — Schedule Content

Acceptance criteria:

- Pengguna dapat memilih tanggal.
- Pengguna dapat memilih waktu.
- Tanggal disimpan sebagai timestamp yang benar.
- Kalender menampilkan konten sesuai zona waktu pengguna.
- Jadwal yang sudah lewat tidak secara otomatis dianggap published.

## FR-15 — Content Status Management

Status yang didukung:

- DRAFT.
- SCHEDULED.
- PUBLISHED.

Acceptance criteria:

- Status dapat diperbarui.
- Scheduled membutuhkan tanggal dan waktu.
- Published hanya menunjukkan status yang dikonfirmasi pengguna.
- Perubahan status tercermin pada dashboard dan kalender.

## FR-16 — Content Search

Acceptance criteria:

- Pengguna dapat mencari berdasarkan judul dan caption.
- Filter platform bekerja.
- Filter status bekerja.
- Hasil pencarian hanya berasal dari data user tersebut.

## FR-17 — Platform Selection

Platform MVP:

- Instagram.
- Facebook.
- TikTok.
- LinkedIn.
- X.
- YouTube.

Acceptance criteria:

- Pengguna dapat memilih platform.
- Platform disimpan bersama konten.
- Platform ditampilkan di kalender dan content list.

## FR-18 — User Data Isolation

Acceptance criteria:

- Semua query data user dibatasi berdasarkan user ID.
- User tidak dapat membaca data user lain.
- User tidak dapat mengubah data user lain.
- User tidak dapat menghapus data user lain.

# 7. Non-Functional Requirements

## 7.1 Performance

- Dashboard target initial load di bawah 3 detik pada koneksi normal.
- API CRUD target response di bawah 500 ms untuk operasi sederhana pada lingkungan normal.
- AI generation memiliki timeout yang wajar.
- Database query menggunakan pagination jika dibutuhkan.
- Kalender tidak mengambil seluruh data tanpa batas.

## 7.2 Security

- Password hashing menggunakan Auth.js-compatible secure mechanism.
- API key disimpan di server.
- Validasi input menggunakan Zod.
- Semua endpoint privat membutuhkan session.
- Authorization dilakukan di server.
- Proteksi CSRF mengikuti mekanisme autentikasi.
- Rate limiting untuk AI generation.

## 7.3 Reliability

- Data harus tersimpan secara persisten.
- Kegagalan AI tidak boleh menghapus data pengguna.
- Error ditampilkan secara informatif.
- Database backup tersedia dalam deployment production.

## 7.4 Scalability

MVP menggunakan modular monolith.

Struktur memungkinkan pemisahan AI provider dan background processing apabila traffic meningkat.

## 7.5 Maintainability

- TypeScript strict mode.
- Modular folder structure.
- Reusable UI components.
- Centralized validation schemas.
- Centralized API error handling.
- Business logic tidak diletakkan seluruhnya di React components.

## 7.6 Accessibility

- Form memiliki label.
- Keyboard navigation tersedia.
- Button memiliki accessible name.
- Kontras warna memadai.
- Dialog mendukung keyboard interaction.

## 7.7 Compatibility

Browser target:

- Chrome.
- Edge.
- Firefox.
- Safari.

Responsive support:

- Desktop.
- Tablet.
- Mobile.

## 7.8 Privacy

- Data pengguna bersifat privat.
- Data AI generation tidak boleh dipublikasikan secara otomatis.
- Pengguna mengetahui bahwa caption dikirim ke AI provider.
- API key tidak terekspos.

# 8. Application Structure & Navigation

## 8.1 Public Routes

| Route       | Description      |
| ----------- | ---------------- |
| `/`         | Landing page     |
| `/login`    | Login            |
| `/register` | Register         |
| `/privacy`  | Privacy policy   |
| `/terms`    | Terms of service |

## 8.2 Protected Routes

| Route                     | Description          |
| ------------------------- | -------------------- |
| `/dashboard`              | Dashboard            |
| `/dashboard/calendar`     | Content calendar     |
| `/dashboard/content`      | Content management   |
| `/dashboard/content/new`  | Create content       |
| `/dashboard/content/[id]` | Content detail       |
| `/dashboard/ideas`        | Content ideas        |
| `/dashboard/ideas/new`    | Create idea          |
| `/dashboard/ai-generator` | AI caption generator |
| `/dashboard/settings`     | User settings        |

## 8.3 Navigation Structure

ContentPilot Dashboard

Dashboard

Content Calendar

My Content

Content Ideas

AI Generator

Settings

## 8.4 Layout

Gunakan dua layout utama:

Public Layout

- Navbar.
- Main content.
- Footer.

Dashboard Layout

- Sidebar.
- Top navigation.
- Main content.
- User menu.

## 8.5 Reusable Components

Global components:

- Button.
- Input.
- Textarea.
- Select.
- Dialog.
- Dropdown.
- Badge.
- Card.
- Tabs.
- Toast.
- Loading skeleton.

Feature components:

- ContentCard.
- ContentStatusBadge.
- ContentCalendar.
- CalendarDay.
- CalendarEvent.
- IdeaCard.
- IdeaForm.
- CaptionGeneratorForm.
- CaptionResultCard.
- DashboardStatCard.
- UpcomingContentList.
- ContentFilter.

# 9. User Flow

## 9.1 Main User Flow

\#chatgpt-mermaid-\_r_24k\_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(13, 13, 13);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_24k\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_24k\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_24k\_ .error-icon{fill:rgb(243, 243, 243);}#chatgpt-mermaid-\_r_24k\_ .error-text{fill:rgb(13, 13, 13);stroke:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_24k\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_24k\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_24k\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_24k\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_24k\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_24k\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_24k\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_24k\_ .marker.cross{stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_24k\_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-\_r_24k\_ p{margin:0;}#chatgpt-mermaid-\_r_24k\_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_24k\_ .cluster-label text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_24k\_ .cluster-label span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_24k\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_24k\_ .label text,#chatgpt-mermaid-\_r_24k\_ span{fill:rgb(13, 13, 13);color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_24k\_ .node rect,#chatgpt-mermaid-\_r_24k\_ .node circle,#chatgpt-mermaid-\_r_24k\_ .node ellipse,#chatgpt-mermaid-\_r_24k\_ .node polygon,#chatgpt-mermaid-\_r_24k\_ .node path{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_24k\_ .rough-node .label text,#chatgpt-mermaid-\_r_24k\_ .node .label text,#chatgpt-mermaid-\_r_24k\_ .image-shape .label,#chatgpt-mermaid-\_r_24k\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_24k\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_24k\_ .rough-node .label,#chatgpt-mermaid-\_r_24k\_ .node .label,#chatgpt-mermaid-\_r_24k\_ .image-shape .label,#chatgpt-mermaid-\_r_24k\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_24k\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_24k\_ .root .anchor path{fill:rgb(143, 143, 143)!important;stroke-width:0;stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_24k\_ .arrowheadPath{fill:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_24k\_ .edgePath .path{stroke:rgb(143, 143, 143);stroke-width:1px;}#chatgpt-mermaid-\_r_24k\_ .flowchart-link{stroke:rgb(143, 143, 143);fill:none;}#chatgpt-mermaid-\_r_24k\_ .edgeLabel{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_24k\_ .edgeLabel p{background-color:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_24k\_ .edgeLabel rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_24k\_ .labelBkg{background-color:rgba(252, 252, 252, 0.5);}#chatgpt-mermaid-\_r_24k\_ .cluster rect{fill:rgb(243, 243, 243);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_24k\_ .cluster text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_24k\_ .cluster span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_24k\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:12px;background:rgb(243, 243, 243);border:1px solid rgba(0, 0, 0, 0.1);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_24k\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_24k\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_24k\_ .icon-shape,#chatgpt-mermaid-\_r_24k\_ .image-shape{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_24k\_ .icon-shape p,#chatgpt-mermaid-\_r_24k\_ .image-shape p{background-color:rgb(252, 252, 252);padding:2px;}#chatgpt-mermaid-\_r_24k\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_24k\_ .image-shape .label rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_24k\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_24k\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_24k\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_24k\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_24k\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_24k\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_24k\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_24k\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_24k\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_24k\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_24k\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_24k\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_24k\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_24k\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_24k\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_24k\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_24k\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_24k\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_24k\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_24k\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_24k\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_24k\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_24k\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_24k\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_24k\_ .node rect,#chatgpt-mermaid-\_r_24k\_ .node circle,#chatgpt-mermaid-\_r_24k\_ .node ellipse,#chatgpt-mermaid-\_r_24k\_ .node polygon,#chatgpt-mermaid-\_r_24k\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_24k\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_24k\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_24k\_ .edgePaths .flowchart-link{stroke:rgb(143, 143, 143);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_24k\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_24k\_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}Open ContentPilotAuthenticated?Register or LoginDashboardChoose ActionIdea FormSave IdeaAI GeneratorEnter Topic and PreferencesGenerate CaptionEdit ResultSave as DraftContent FormSave ContentSet ScheduleContent CalendarNoYesCreate IdeaGenerate CaptionCreate ContentView Calendar

## 9.2 Content Creation Flow

1. Pengguna login.
2. Pengguna membuka Content.
3. Pengguna memilih Create Content.
4. Pengguna mengisi judul.
5. Pengguna memilih platform.
6. Pengguna mengisi caption.
7. Pengguna menentukan status.
8. Jika scheduled, pengguna menentukan waktu.
9. Pengguna menyimpan konten.
10. Konten muncul di kalender.

## 9.3 AI Generation Flow

1. Pengguna membuka AI Generator.
2. Pengguna memasukkan topik.
3. Pengguna memilih platform.
4. Pengguna menentukan target audience.
5. Pengguna memilih tone.
6. Pengguna memilih bahasa.
7. Sistem mengirim permintaan ke AI provider.
8. Sistem menerima hasil.
9. Pengguna memilih hasil terbaik.
10. Pengguna mengedit caption.
11. Pengguna menyimpan sebagai draft.

## 9.4 Idea Management Flow

1. Pengguna membuka Ideas.
2. Pengguna menambahkan ide.
3. Pengguna menyimpan ide.
4. Ide muncul di daftar.
5. Pengguna dapat mengedit, menghapus, atau mengubahnya menjadi konten.

# 10. UI/UX Requirements

## 10.1 Design Direction

ContentPilot menggunakan gaya desain:

Modern SaaS Dashboard — Clean, Minimal, Productive.

Karakteristik:

- Clean interface.
- Minimal visual noise.
- Soft background.
- Clear information hierarchy.
- Consistent spacing.
- Professional dashboard appearance.

## 10.2 Color Direction

| Token      | Purpose         |
| ---------- | --------------- |
| Primary    | Indigo / Violet |
| Secondary  | Slate           |
| Background | Neutral light   |
| Surface    | White           |
| Success    | Green           |
| Warning    | Amber           |
| Error      | Red             |
| Border     | Light gray      |

Warna harus didefinisikan sebagai design tokens, bukan tersebar sebagai nilai hardcoded di setiap komponen.

## 10.3 Typography

Gunakan:

- Inter atau Geist Sans.
- Heading: semibold.
- Body: regular.
- Caption: muted.

## 10.4 Dashboard Layout

[Content Dashboard designs, themes, templates and downloadable graphic elements on Dribbble](https://images.openai.com/static-rsc-4/XCnF1ok05XPbDgbjVPV2kEvgRef9XpLXTfvqiZpK5BBtLJIjeBGd34TaU0KB5edDV-0WaYzFFXR-Lrl3PgJtP1_xWOcpGWJJlcWO4dl92dGTj5iGZaUhdhSHvRczjgTqSyGLaQTPqQkMm1IqFkrsIYB-JlYklQHL67pXdjNczAc?purpose=inline)

[dribbble.com](https://dribbble.com/tags/content-dashboard?utm_source=chatgpt.com)

Dashboard menampilkan:

- Greeting.
- Quick action.
- Content statistics.
- Upcoming posts.
- Recent content.
- Content activity summary.

## 10.5 Calendar UI

[ContentStudio: Unified Social Media Management Tool](https://images.openai.com/static-rsc-4/L32PA5ix7kumxG81Aj7Va48xF6vbI5Y9o6Qdj_Os_zUkoBkxp2QZKWk-lf3kHDbSh_tGiPz-uKwUhLEZB9gScikc_Ksne2fFno0gQvxwHsn3OW4sYIkiFRJBi8k0dLeyb80twAqXIYdqDek8PHmPBdFy8q53wO6rUUaEoHGmdLs?purpose=inline)

[contentstudio.io](https://contentstudio.io/?utm_source=chatgpt.com)

Calendar menampilkan:

- Month navigation.
- Today indicator.
- Content events.
- Platform indicator.
- Status badge.
- Quick create action.

## 10.6 AI Generator UI

[How To Leverage Social Media Caption Generators For Instagram | Cloud Campaign](https://images.openai.com/static-rsc-4/GkMYqNWyIEPv0JQXEMRCkXw3-yqpIOCoeRsD-VqroDCYh2gN8xydm-fAtbwMtbitqydsj3RRfA4PKE6nzw-DAYU5rJZ6j86PuuyE3lq1GRbfbth9Vi0MIJb4w5Ex5O8rQqmTsEo7MWqMhTajeIvkovqxAEC-SbjuBnTrlIw4YE0?purpose=inline)

[cloudcampaign.com](https://www.cloudcampaign.com/blog/how-to-leverage-social-media-caption-generators-for-instagram?utm_source=chatgpt.com)

Form:

- Topic.
- Platform.
- Audience.
- Tone.
- Language.
- Caption length.
- Additional instructions.

Result:

- Generated caption.
- Hashtags.
- CTA.
- Regenerate.
- Copy.
- Save.

## 10.7 Responsive Behavior

Desktop:

- Sidebar visible.
- Calendar full width.
- Dashboard multi-column.

Tablet:

- Sidebar collapsible.
- Calendar optimized.

Mobile:

- Sidebar becomes drawer.
- Single-column dashboard.
- Calendar menggunakan compact view.
- Form menggunakan full width.

## 10.8 UI States

Setiap halaman harus memiliki:

| State      | Behavior                    |
| ---------- | --------------------------- |
| Loading    | Skeleton                    |
| Empty      | Helpful message + CTA       |
| Error      | Clear error message + retry |
| Success    | Toast notification          |
| Disabled   | Visual disabled state       |
| Submitting | Loading indicator           |

# 11. Error Handling

| Error             | Cause                  | Expected Response                      |
| ----------------- | ---------------------- | -------------------------------------- |
| AUTH_INVALID      | Login salah            | Tampilkan pesan kredensial tidak valid |
| AUTH_REQUIRED     | Session tidak ada      | Redirect ke login                      |
| VALIDATION_ERROR  | Input tidak valid      | Tampilkan error field                  |
| NOT_FOUND         | Data tidak ditemukan   | Tampilkan not found                    |
| FORBIDDEN         | Akses data user lain   | Return 403 atau 404 sesuai kebijakan   |
| DATABASE_ERROR    | Database bermasalah    | Generic error dan server logging       |
| AI_TIMEOUT        | AI lambat              | Beri pesan timeout                     |
| AI_PROVIDER_ERROR | Provider error         | Tampilkan kegagalan generation         |
| AI_RATE_LIMIT     | Terlalu banyak request | Informasikan batas penggunaan          |
| NETWORK_ERROR     | Koneksi gagal          | Tampilkan retry                        |
| INVALID_SCHEDULE  | Jadwal tidak valid     | Tampilkan validasi tanggal             |
| INTERNAL_ERROR    | Error tidak terduga    | Generic error tanpa stack trace        |

## 11.1 API Error Format

Gunakan format respons konsisten:

```
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please check your input.",
    "details": {
      "topic": "Topic is required."
    }
  }
}
```

Success response:

```
{
  "success": true,
  "data": {}
}
```

# 12. Technical Architecture

## 12.1 Architecture Decision

Selected Architecture

Modular Monolith menggunakan Next.js App Router.

Alasan:

1. MVP dapat dibangun oleh satu developer.
2. Tidak membutuhkan infrastruktur microservices.
3. API dan frontend berada dalam satu repository.
4. Deployment lebih sederhana.
5. Business logic tetap dapat dipisahkan secara modular.
6. Dapat dikembangkan ke arsitektur terpisah jika kebutuhan meningkat.

## 12.2 Architecture Overview

\#chatgpt-mermaid-\_r_25p\_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(13, 13, 13);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_25p\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_25p\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_25p\_ .error-icon{fill:rgb(243, 243, 243);}#chatgpt-mermaid-\_r_25p\_ .error-text{fill:rgb(13, 13, 13);stroke:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_25p\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_25p\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_25p\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_25p\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_25p\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_25p\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_25p\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_25p\_ .marker.cross{stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_25p\_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-\_r_25p\_ p{margin:0;}#chatgpt-mermaid-\_r_25p\_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_25p\_ .cluster-label text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_25p\_ .cluster-label span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_25p\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_25p\_ .label text,#chatgpt-mermaid-\_r_25p\_ span{fill:rgb(13, 13, 13);color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_25p\_ .node rect,#chatgpt-mermaid-\_r_25p\_ .node circle,#chatgpt-mermaid-\_r_25p\_ .node ellipse,#chatgpt-mermaid-\_r_25p\_ .node polygon,#chatgpt-mermaid-\_r_25p\_ .node path{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_25p\_ .rough-node .label text,#chatgpt-mermaid-\_r_25p\_ .node .label text,#chatgpt-mermaid-\_r_25p\_ .image-shape .label,#chatgpt-mermaid-\_r_25p\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_25p\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_25p\_ .rough-node .label,#chatgpt-mermaid-\_r_25p\_ .node .label,#chatgpt-mermaid-\_r_25p\_ .image-shape .label,#chatgpt-mermaid-\_r_25p\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_25p\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_25p\_ .root .anchor path{fill:rgb(143, 143, 143)!important;stroke-width:0;stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_25p\_ .arrowheadPath{fill:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_25p\_ .edgePath .path{stroke:rgb(143, 143, 143);stroke-width:1px;}#chatgpt-mermaid-\_r_25p\_ .flowchart-link{stroke:rgb(143, 143, 143);fill:none;}#chatgpt-mermaid-\_r_25p\_ .edgeLabel{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_25p\_ .edgeLabel p{background-color:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_25p\_ .edgeLabel rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_25p\_ .labelBkg{background-color:rgba(252, 252, 252, 0.5);}#chatgpt-mermaid-\_r_25p\_ .cluster rect{fill:rgb(243, 243, 243);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_25p\_ .cluster text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_25p\_ .cluster span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_25p\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:12px;background:rgb(243, 243, 243);border:1px solid rgba(0, 0, 0, 0.1);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_25p\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_25p\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_25p\_ .icon-shape,#chatgpt-mermaid-\_r_25p\_ .image-shape{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_25p\_ .icon-shape p,#chatgpt-mermaid-\_r_25p\_ .image-shape p{background-color:rgb(252, 252, 252);padding:2px;}#chatgpt-mermaid-\_r_25p\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_25p\_ .image-shape .label rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_25p\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_25p\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_25p\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_25p\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_25p\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_25p\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_25p\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_25p\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_25p\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_25p\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_25p\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_25p\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_25p\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_25p\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_25p\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_25p\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_25p\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_25p\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_25p\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_25p\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_25p\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_25p\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_25p\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_25p\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_25p\_ .node rect,#chatgpt-mermaid-\_r_25p\_ .node circle,#chatgpt-mermaid-\_r_25p\_ .node ellipse,#chatgpt-mermaid-\_r_25p\_ .node polygon,#chatgpt-mermaid-\_r_25p\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_25p\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_25p\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_25p\_ .edgePaths .flowchart-link{stroke:rgb(143, 143, 143);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_25p\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_25p\_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}User BrowserNext.js App RouterReact UI ComponentsNext.js Route HandlersAuth.jsApplication ServicesBusiness LogicRepository LayerPostgreSQLAI Provider AdapterOpenAI API

## 12.3 Layer Responsibilities

### Presentation Layer

Tanggung jawab:

- Render UI.
- Mengelola interaksi.
- Form submission.
- Loading state.
- Error display.

Teknologi:

- React.
- Next.js.
- Tailwind.
- shadcn/ui.

### Application Layer

Tanggung jawab:

- Mengatur use case.
- Menghubungkan domain dan repository.
- Menjalankan business workflows.

Contoh:

- CreateContentService.
- UpdateContentService.
- GenerateCaptionService.
- CreateIdeaService.
- GetDashboardStatsService.

### Business Logic Layer

Tanggung jawab:

- Validasi business rules.
- Status transition.
- Scheduling rules.
- Content ownership rules.
- Caption generation input rules.

### Data Access Layer

Tanggung jawab:

- Database queries.
- CRUD operations.
- Relational data management.

Teknologi:

\- Prisma.

### Infrastructure Layer

Tanggung jawab:

- Database connection.
- AI provider.
- Authentication.
- External API.
- Logging.

## 12.4 Frontend Responsibilities

Next.js pages:

- Route rendering.
- Layout composition.
- Server-side data loading bila relevan.
- Route protection.

React components:

- UI rendering.
- Interaction.
- Reusable presentation.

Custom hooks:

- UI-specific state management.
- Calendar interaction.
- Form-related state.

Zustand:

Hanya digunakan untuk state global yang memang dibutuhkan lintas komponen, misalnya:

- User interface preferences.
- Persistent filter preferences.
- Shared client-side workspace state.

Tidak digunakan untuk menggantikan database.

## 12.5 Backend Responsibilities

Next.js Route Handlers:

```
app/api/auth/[...nextauth]/route.ts
app/api/ideas/route.ts
app/api/ideas/[id]/route.ts
app/api/contents/route.ts
app/api/contents/[id]/route.ts
app/api/calendar/route.ts
app/api/dashboard/route.ts
app/api/ai/generate-caption/route.ts
```

Route Handlers bertanggung jawab untuk:

- HTTP request.
- Authentication.
- Input validation.
- Calling application services.
- HTTP response.
- Error mapping.

Jangan menempatkan seluruh business logic di route handler.

## 12.6 AI Integration Architecture

Gunakan provider adapter.

\#chatgpt-mermaid-\_r_265\_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(13, 13, 13);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_265\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_265\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_265\_ .error-icon{fill:rgb(243, 243, 243);}#chatgpt-mermaid-\_r_265\_ .error-text{fill:rgb(13, 13, 13);stroke:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_265\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_265\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_265\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_265\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_265\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_265\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_265\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_265\_ .marker.cross{stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_265\_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-\_r_265\_ p{margin:0;}#chatgpt-mermaid-\_r_265\_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_265\_ .cluster-label text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_265\_ .cluster-label span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_265\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_265\_ .label text,#chatgpt-mermaid-\_r_265\_ span{fill:rgb(13, 13, 13);color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_265\_ .node rect,#chatgpt-mermaid-\_r_265\_ .node circle,#chatgpt-mermaid-\_r_265\_ .node ellipse,#chatgpt-mermaid-\_r_265\_ .node polygon,#chatgpt-mermaid-\_r_265\_ .node path{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_265\_ .rough-node .label text,#chatgpt-mermaid-\_r_265\_ .node .label text,#chatgpt-mermaid-\_r_265\_ .image-shape .label,#chatgpt-mermaid-\_r_265\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_265\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_265\_ .rough-node .label,#chatgpt-mermaid-\_r_265\_ .node .label,#chatgpt-mermaid-\_r_265\_ .image-shape .label,#chatgpt-mermaid-\_r_265\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_265\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_265\_ .root .anchor path{fill:rgb(143, 143, 143)!important;stroke-width:0;stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_265\_ .arrowheadPath{fill:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_265\_ .edgePath .path{stroke:rgb(143, 143, 143);stroke-width:1px;}#chatgpt-mermaid-\_r_265\_ .flowchart-link{stroke:rgb(143, 143, 143);fill:none;}#chatgpt-mermaid-\_r_265\_ .edgeLabel{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_265\_ .edgeLabel p{background-color:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_265\_ .edgeLabel rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_265\_ .labelBkg{background-color:rgba(252, 252, 252, 0.5);}#chatgpt-mermaid-\_r_265\_ .cluster rect{fill:rgb(243, 243, 243);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_265\_ .cluster text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_265\_ .cluster span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_265\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:12px;background:rgb(243, 243, 243);border:1px solid rgba(0, 0, 0, 0.1);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_265\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_265\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_265\_ .icon-shape,#chatgpt-mermaid-\_r_265\_ .image-shape{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_265\_ .icon-shape p,#chatgpt-mermaid-\_r_265\_ .image-shape p{background-color:rgb(252, 252, 252);padding:2px;}#chatgpt-mermaid-\_r_265\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_265\_ .image-shape .label rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_265\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_265\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_265\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_265\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_265\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_265\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_265\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_265\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_265\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_265\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_265\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_265\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_265\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_265\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_265\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_265\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_265\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_265\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_265\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_265\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_265\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_265\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_265\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_265\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_265\_ .node rect,#chatgpt-mermaid-\_r_265\_ .node circle,#chatgpt-mermaid-\_r_265\_ .node ellipse,#chatgpt-mermaid-\_r_265\_ .node polygon,#chatgpt-mermaid-\_r_265\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_265\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_265\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_265\_ .edgePaths .flowchart-link{stroke:rgb(143, 143, 143);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_265\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_265\_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}Caption Generator FormGenerate Caption APICaption Generation ServiceAI Provider InterfaceOpenAI AdapterOpenAI APINormalize Response

Contoh interface:

```
export interface CaptionGenerationInput {
  topic: string;
  platform: SocialPlatform;
  audience?: string;
  tone: string;
  language: string;
  length: "short" | "medium" | "long";
  additionalInstructions?: string;
}

export interface CaptionGenerationResult {
  captions: {
    caption: string;
    hashtags: string[];
    callToAction?: string;
  }[];
}

export interface AIProvider {
  generateCaption(
    input: CaptionGenerationInput
  ): Promise<CaptionGenerationResult>;
}
```

Ketentuan:

- AI API hanya dipanggil dari server.
- API key disimpan di environment variable.
- AI output dianggap untrusted.
- Output divalidasi sebelum digunakan.
- Pengguna tetap memiliki kontrol untuk mengedit.
- Jangan menyimpan prompt sensitif tanpa kebutuhan.
- Jangan menganggap AI selalu menghasilkan format valid.

## 12.7 Background Jobs

Tidak diperlukan background worker untuk MVP.

Alasan:

- Tidak ada automatic publishing.
- Tidak ada scheduled external API execution.
- Scheduling hanya menyimpan jadwal dan menampilkan kalender.

Jika di masa depan ditambahkan automatic publishing, diperlukan:

- Queue.
- Background worker.
- Retry mechanism.
- Idempotency.
- Provider-specific publishing adapters.

# 13. Data Model

## 13.1 Database Decision

Gunakan PostgreSQL.

Database diperlukan karena:

- Data pengguna harus persisten.
- Terdapat relasi user dengan content dan ideas.
- Calendar membutuhkan query berdasarkan waktu.
- Dashboard membutuhkan agregasi.
- Data tidak boleh hilang ketika browser ditutup.

## 13.2 Entity Overview

\#chatgpt-mermaid-\_r_26i\_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(13, 13, 13);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_26i\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_26i\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_26i\_ .error-icon{fill:rgb(243, 243, 243);}#chatgpt-mermaid-\_r_26i\_ .error-text{fill:rgb(13, 13, 13);stroke:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_26i\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_26i\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_26i\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_26i\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_26i\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_26i\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_26i\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_26i\_ .marker.cross{stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_26i\_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-\_r_26i\_ p{margin:0;}#chatgpt-mermaid-\_r_26i\_ .entityBox{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_26i\_ .relationshipLabelBox{fill:rgb(243, 243, 243);opacity:0.7;background-color:rgb(243, 243, 243);}#chatgpt-mermaid-\_r_26i\_ .relationshipLabelBox rect{opacity:0.5;}#chatgpt-mermaid-\_r_26i\_ .labelBkg{background-color:rgba(243, 243, 243, 0.5);}#chatgpt-mermaid-\_r_26i\_ .edgeLabel{background-color:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_26i\_ .edgeLabel .label rect{fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_26i\_ .edgeLabel .label text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_26i\_ .edgeLabel .label{fill:rgb(83, 154, 248);font-size:14px;}#chatgpt-mermaid-\_r_26i\_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_26i\_ .edge-pattern-dashed{stroke-dasharray:8,8;}#chatgpt-mermaid-\_r_26i\_ .node rect,#chatgpt-mermaid-\_r_26i\_ .node circle,#chatgpt-mermaid-\_r_26i\_ .node ellipse,#chatgpt-mermaid-\_r_26i\_ .node polygon{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_26i\_ .relationshipLine{stroke:rgb(143, 143, 143);stroke-width:1px;fill:none;}#chatgpt-mermaid-\_r_26i\_ .marker{fill:none!important;stroke:rgb(143, 143, 143)!important;stroke-width:1;}#chatgpt-mermaid-\_r_26i\_ [data-look=neo].labelBkg{background-color:rgba(243, 243, 243, 0.5);}#chatgpt-mermaid-\_r_26i\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_26i\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_26i\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_26i\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_26i\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_26i\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_26i\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_26i\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_26i\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_26i\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_26i\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_26i\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_26i\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_26i\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_26i\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_26i\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_26i\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_26i\_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}USERstringidPKstringnamestringemailUKdatetimecreatedAtCONTENTstringidPKstringuserIdFKstringtitletextcaptionjsonhashtagsstringplatformstringstatusdatetimescheduledAtdatetimecreatedAtdatetimeupdatedAtCONTENT_IDEAstringidPKstringuserIdFKstringtitletextdescriptionstringstatusdatetimecreatedAtAI_GENERATIONstringidPKstringuserIdFKstringplatformstringtopicstringtonedatetimecreatedAtownsownscreates

## 13.3 User Entity

```
interface User {
  id: string;
  name: string | null;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
```

Authentication account dan session mengikuti schema Auth.js yang digunakan.

## 13.4 Content Entity

```
type SocialPlatform =
  | "INSTAGRAM"
  | "FACEBOOK"
  | "TIKTOK"
  | "LINKEDIN"
  | "X"
  | "YOUTUBE";

type ContentStatus =
  | "DRAFT"
  | "SCHEDULED"
  | "PUBLISHED";

interface Content {
  id: string;
  userId: string;
  title: string;
  caption: string | null;
  hashtags: string[];
  platform: SocialPlatform;
  status: ContentStatus;
  scheduledAt: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

## 13.5 Content Idea Entity

```
type IdeaStatus =
  | "NEW"
  | "IN_PROGRESS"
  | "USED"
  | "ARCHIVED";

interface ContentIdea {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  status: IdeaStatus;
  createdAt: Date;
  updatedAt: Date;
}
```

## 13.6 AI Generation Entity

```
interface AIGeneration {
  id: string;
  userId: string;
  topic: string;
  platform: SocialPlatform;
  tone: string;
  language: string;
  createdAt: Date;
}
```

AI generation history merupakan supporting feature. Jika disimpan, jangan menyimpan API key, credential, atau informasi sensitif.

## 13.7 Database Relationships

- User memiliki banyak Content.
- User memiliki banyak ContentIdea.
- User memiliki banyak AIGeneration.
- Content tidak dapat diakses tanpa validasi ownership.
- ContentIdea tidak dapat diakses tanpa validasi ownership.

## 13.8 Indexes

Tambahkan index:

```
Content(userId)
Content(userId, status)
Content(userId, scheduledAt)
ContentIdea(userId)
ContentIdea(userId, status)
AIGeneration(userId)
```

Gunakan composite index sesuai pola query aktual.

## 13.9 Storage Strategy

- PostgreSQL untuk relational data.
- Tidak menggunakan localStorage sebagai database.
- Tidak menggunakan file JSON untuk production persistence.
- Media upload belum termasuk MVP.
- Jika media upload ditambahkan, gunakan object storage.

# 14. Security & Privacy

## 14.1 Authentication

- Gunakan Auth.js.
- Session harus diverifikasi di server.
- Dashboard protected.
- Password disimpan menggunakan hashing yang aman jika menggunakan credentials provider.

## 14.2 Authorization

Setiap operasi terhadap Content dan ContentIdea harus memeriksa user ID.

Contoh:

```
const content = await prisma.content.findFirst({
  where: {
    id: contentId,
    userId: session.user.id,
  },
});
```

Jangan hanya mencari berdasarkan ID tanpa ownership validation.

## 14.3 Input Validation

Gunakan Zod.

Contoh:

```
import { z } from "zod";

export const createContentSchema = z.object({
  title: z.string().trim().min(1).max(150),
  caption: z.string().max(10000).optional(),
  platform: z.enum([
    "INSTAGRAM",
    "FACEBOOK",
    "TIKTOK",
    "LINKEDIN",
    "X",
    "YOUTUBE",
  ]),
  status: z.enum([
    "DRAFT",
    "SCHEDULED",
    "PUBLISHED",
  ]),
  scheduledAt: z.string().datetime().nullable().optional(),
});
```

Validasi business rules tetap diperlukan setelah schema validation.

## 14.4 Rate Limiting

AI generation harus mempunyai rate limiting.

Strategi MVP:

- Batas jumlah request per user.
- Batas panjang prompt.
- Request timeout.
- Penanganan provider rate limit.

Implementasi rate limiting harus mempertimbangkan deployment multi-instance. Jangan mengandalkan in-memory limiter sebagai satu-satunya proteksi production jika aplikasi berjalan pada banyak instance.

## 14.5 Environment Variables

Contoh:

```
DATABASE_URL=
AUTH_SECRET=
AUTH_URL=
OPENAI_API_KEY=
OPENAI_MODEL=
```

Jangan pernah mengirim `OPENAI_API_KEY` ke client.

## 14.6 Privacy

- Data user tidak dapat diakses user lain.
- Jangan mengekspos database error.
- AI generation harus memiliki batas input.
- Jangan menyimpan informasi yang tidak diperlukan.
- Sediakan mekanisme penghapusan akun dan data sebagai bagian dari penyelesaian kebijakan privasi dan persyaratan operasional sebelum peluncuran publik.

# 15. Success Criteria

MVP dinyatakan selesai apabila:

| ID    | Requirement          | Expected                                      |
| ----- | -------------------- | --------------------------------------------- |
| SC-01 | Authentication       | Berfungsi                                     |
| SC-02 | Dashboard            | Menampilkan data nyata                        |
| SC-03 | Content CRUD         | Berfungsi                                     |
| SC-04 | Idea CRUD            | Berfungsi                                     |
| SC-05 | AI Caption Generator | Berfungsi dengan provider nyata               |
| SC-06 | Save AI Caption      | Berfungsi                                     |
| SC-07 | Content Calendar     | Menampilkan jadwal nyata                      |
| SC-08 | Scheduling           | Tersimpan dengan benar                        |
| SC-09 | Search and Filter    | Berfungsi                                     |
| SC-10 | Data Isolation       | Terverifikasi                                 |
| SC-11 | Responsive UI        | Berfungsi                                     |
| SC-12 | Production Build     | Berhasil                                      |
| SC-13 | Security             | Tidak ada critical issue yang belum ditangani |
| SC-14 | Deployment           | Production dapat diakses                      |

# 16. Risks & Technical Constraints

| Risk                    | Impact              | Mitigation                                 |
| ----------------------- | ------------------- | ------------------------------------------ |
| AI API cost             | Biaya meningkat     | Rate limiting dan penggunaan token terukur |
| AI unavailable          | Generation gagal    | Error handling dan retry manual            |
| AI output inconsistent  | Hasil tidak sesuai  | Structured output dan validation           |
| Database outage         | Aplikasi terganggu  | Backup dan monitoring                      |
| Timezone bugs           | Jadwal salah        | UTC storage dan timezone-aware display     |
| Data leakage            | Pelanggaran privasi | Ownership validation                       |
| Auth misconfiguration   | Unauthorized access | Server-side session validation             |
| API abuse               | Biaya AI meningkat  | Per-user rate limit                        |
| Scope creep             | MVP terlambat       | Batasi P0                                  |
| Third-party API changes | Integration rusak   | Provider abstraction                       |

## 16.1 Technical Constraints

- Tidak ada automatic publishing di MVP.
- Tidak ada background worker di MVP.
- Tidak ada media upload di MVP.
- Tidak ada team collaboration.
- Tidak ada microservices.
- Tidak ada dedicated backend service.
- Tidak ada Redis kecuali kebutuhan aktual muncul.

# PART B — SEQUENTIAL DEVELOPMENT PLAYBOOK

# PHASE 1 — Environment & Project Bootstrap

Foundation

## 1. Phase Objective

Mempersiapkan environment development dan membuat project Next.js yang dapat dijalankan secara lokal.

Belum ada implementasi business logic.

## 2. Scope of Work

- Setup Node.js.
- Setup package manager.
- Setup Next.js.
- Setup TypeScript.
- Setup Tailwind CSS.
- Setup shadcn/ui.
- Setup ESLint.
- Setup Git.
- Setup struktur awal.
- Verifikasi development server.

## 3. Detailed Implementation Steps

### Step 1 — Install Development Tools

Rekomendasi:

- Node.js LTS.
- npm.
- Git.
- VS Code.
- Browser Chrome atau Firefox.

Verifikasi:

```
node -v
npm -v
git --version
```

### Step 2 — Create Next.js Project

```
npx create-next-app@latest contentpilot
```

Pilih:

```
TypeScript: Yes
ESLint: Yes
Tailwind CSS: Yes
src/ directory: Yes
App Router: Yes
Turbopack: Default
Import alias: @/*
```

Kemudian:

```
cd contentpilot
```

### Step 3 — Initialize shadcn/ui

```
npx shadcn@latest init
```

Pilih konfigurasi default yang kompatibel dengan project.

### Step 4 — Install Initial Dependencies

```
npm install lucide-react
npm install sonner
npm install date-fns
npm install zod
npm install react-hook-form
npm install @hookform/resolvers
npm install zustand
```

Zustand diinstal sebagai dependency yang tersedia, tetapi penggunaannya tetap selektif.

### Step 5 — Configure Git

```
git init
git add .
git commit -m "chore: initialize contentpilot project"
```

### Step 6 — Run Development Server

```
npm run dev
```

Buka:

```
http://localhost:3000
```

### Step 7 — Verify

```
npm run lint
npx tsc --noEmit
npm run build
```

Jika script lint belum tersedia, sesuaikan dengan konfigurasi ESLint hasil bootstrap.

## 4. Required Commands

```
node -v
npm -v
git --version

npx create-next-app@latest contentpilot

cd contentpilot

npx shadcn@latest init

npm install lucide-react sonner date-fns zod
npm install react-hook-form @hookform/resolvers zustand

npm run dev
npm run lint
npx tsc --noEmit
npm run build
```

## 5. AI Coding Assistant Prompt

# PHASE 1 — PROJECT BOOTSTRAP

Kamu bertindak sebagai Senior Fullstack Developer.

Project: ContentPilot

Dokumen utama: PROJECT_PRD_AND_PLAYBOOK.md

## Objective

Setup dan verifikasi environment Next.js untuk ContentPilot.

## Instructions

1. Baca bagian Product Information dan Phase 1.
2. Periksa apakah repository sudah memiliki file atau konfigurasi.
3. Jangan menimpa konfigurasi yang sudah benar.
4. Gunakan Next.js App Router.
5. Gunakan TypeScript.
6. Gunakan Tailwind CSS.
7. Setup shadcn/ui.
8. Install hanya dependency yang dibutuhkan.
9. Pastikan ESLint dan TypeScript berjalan.
10. Jangan membuat fitur bisnis.
11. Jangan membuat database.
12. Jangan mengimplementasikan authentication.
13. Jangan melanjutkan Phase 2.

## Expected Files

- package.json
- tsconfig.json
- next.config.ts
- eslint configuration
- components.json
- src/app/layout.tsx
- src/app/page.tsx
- src/app/globals.css

Sesuaikan dengan hasil bootstrap aktual.

## Expected Output

Project ContentPilot dapat dijalankan secara lokal.

## Acceptance Criteria

- Next.js berjalan.
- TypeScript aktif.
- Tailwind bekerja.
- shadcn/ui siap digunakan.
- Dependency terpasang.
- ESLint berhasil.
- Type checking berhasil.
- Production build berhasil.

## Final Report

Laporkan:

1. File dibuat.
2. File diubah.
3. Dependency ditambahkan.
4. Command yang dijalankan.
5. Hasil testing aktual.
6. Kendala yang ditemukan.

Jangan lanjut ke phase berikutnya.

## 6. Expected Deliverables

- Next.js project.
- TypeScript configuration.
- Tailwind configuration.
- shadcn/ui configuration.
- ESLint configuration.
- Git repository.
- Working development server.

## 7. Acceptance Criteria

- Project dapat dijalankan.
- Tidak ada error TypeScript.
- Tidak ada error lint.
- Production build berhasil.
- shadcn/ui dapat digunakan.
- Git repository aktif.

## 8. Testing Requirements

```
npm run dev
npm run lint
npx tsc --noEmit
npm run build
```

## 9. Git Checkpoint

```
git add .
git commit -m "phase 1: project bootstrap"
```

# PHASE 2 — Technical Planning & Architecture

Architecture

## 1. Phase Objective

Menyusun technical architecture secara detail sebelum mengimplementasikan fitur utama.

Hasil utama:

`TECHNICAL_PLAN.md`

## 2. Scope of Work

- Analisis PRD.
- Finalisasi stack.
- Menentukan folder structure.
- Menentukan database architecture.
- Menentukan Prisma schema awal.
- Menentukan Auth.js architecture.
- Menentukan AI integration architecture.
- Menentukan API endpoints.
- Menentukan data flow.
- Menentukan security approach.
- Mengidentifikasi technical risks.

## 3. Detailed Implementation Steps

### Step 1 — Analyze Requirements

Identifikasi seluruh FR-01 sampai FR-18.

Kelompokkan:

- Authentication.
- Content management.
- Ideas management.
- Calendar.
- AI generation.
- Dashboard.
- Search and filtering.

### Step 2 — Finalize Architecture

Tetapkan:

- Modular monolith.
- Next.js Route Handlers.
- PostgreSQL.
- Prisma.
- Auth.js.
- OpenAI adapter.

### Step 3 — Define Folder Structure

Target:

```
src/
├── app/
│   ├── (public)/
│   ├── (auth)/
│   ├── (dashboard)/
│   └── api/
│
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
│
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── contents/
│   ├── ideas/
│   ├── calendar/
│   └── ai-generator/
│
├── lib/
│   ├── auth/
│   ├── db/
│   ├── ai/
│   ├── validation/
│   └── utils/
│
├── services/
│
├── types/
│
└── hooks/
```

### Step 4 — Define Database Schema

Tentukan model:

- User.
- Account.
- Session.
- VerificationToken.
- Content.
- ContentIdea.
- AIGeneration.

Model Auth.js mengikuti adapter yang dipilih dan versi package yang digunakan.

### Step 5 — Define API Contracts

| Method | Endpoint                   | Purpose        |
| ------ | -------------------------- | -------------- |
| GET    | `/api/contents`            | List contents  |
| POST   | `/api/contents`            | Create content |
| GET    | `/api/contents/[id]`       | Detail         |
| PATCH  | `/api/contents/[id]`       | Update         |
| DELETE | `/api/contents/[id]`       | Delete         |
| GET    | `/api/ideas`               | List ideas     |
| POST   | `/api/ideas`               | Create idea    |
| PATCH  | `/api/ideas/[id]`          | Update idea    |
| DELETE | `/api/ideas/[id]`          | Delete idea    |
| GET    | `/api/calendar`            | Calendar data  |
| GET    | `/api/dashboard`           | Dashboard data |
| POST   | `/api/ai/generate-caption` | AI generation  |

### Step 6 — Define AI Integration

Dokumentasikan:

- Provider interface.
- Input schema.
- Output schema.
- Error handling.
- Timeout.
- Rate limiting.
- API key management.

### Step 7 — Create Technical Plan

Hasilkan `TECHNICAL_PLAN.md`.

## 4. Required Commands

```
mkdir -p docs

mkdir -p src/features
mkdir -p src/services
mkdir -p src/types
mkdir -p src/hooks

mkdir -p src/lib/auth
mkdir -p src/lib/db
mkdir -p src/lib/ai
mkdir -p src/lib/validation

git status
```

Folder final boleh disesuaikan berdasarkan Next.js route groups.

## 5. AI Coding Assistant Prompt

# PHASE 2 — TECHNICAL PLANNING

Kamu bertindak sebagai Senior Software Architect dan Senior Fullstack Developer.

Project: ContentPilot

Dokumen utama: PROJECT_PRD_AND_PLAYBOOK.md

## Objective

Buat dokumen technical architecture yang lengkap dan konsisten.

## Instructions

1. Baca seluruh PRD.
2. Analisis FR-01 sampai FR-18.
3. Finalisasi modular monolith.
4. Tentukan folder structure.
5. Tentukan database schema.
6. Tentukan Auth.js integration.
7. Tentukan Prisma architecture.
8. Tentukan AI provider abstraction.
9. Tentukan API contract.
10. Tentukan validation strategy.
11. Tentukan error handling.
12. Tentukan security architecture.
13. Tentukan environment variables.
14. Tentukan deployment architecture.
15. Identifikasi risiko teknis.

## Expected File

TECHNICAL_PLAN.md

## Important Constraints

- Jangan implementasikan fitur.
- Jangan membuat database migration.
- Jangan menambahkan external backend service.
- Jangan membuat microservices.
- Jangan menambahkan Redis.
- Jangan mengimplementasikan automatic publishing.
- Jangan mengganti tech stack tanpa alasan kuat.

## Expected Document Sections

1. Architecture Overview
2. Technology Decisions
3. Folder Structure
4. Application Layers
5. Database Design
6. Authentication Architecture
7. API Design
8. AI Integration
9. Validation Strategy
10. Security
11. Error Handling
12. Environment Variables
13. Deployment
14. Technical Risks

## Acceptance Criteria

- Seluruh kebutuhan P0 terakomodasi.
- Arsitektur konsisten.
- Database relationship jelas.
- API contract jelas.
- Tidak ada dependency yang tidak diperlukan.
- Tidak ada implementasi fitur utama.

Jangan lanjut ke Phase 3.

## 6. Expected Deliverables

- `TECHNICAL_PLAN.md`
- Folder structure proposal.
- API architecture.
- Database design.
- Security design.
- AI integration design.

## 7. Acceptance Criteria

- Technical plan lengkap.
- Seluruh P0 terakomodasi.
- Data model konsisten.
- API contract tersedia.
- AI integration terdokumentasi.
- Tidak ada fitur utama yang diimplementasikan.

## 8. Testing Requirements

Review dokumen:

- Apakah seluruh FR memiliki implementasi teknis?
- Apakah setiap endpoint memiliki tujuan?
- Apakah seluruh data memiliki ownership?
- Apakah deployment sesuai karakteristik Next.js?

## 9. Git Checkpoint

```
git add .
git commit -m "phase 2: technical architecture"
```

# PHASE 3 — UI/UX Planning & Design System

Product Design

## 1. Phase Objective

Menentukan tampilan, layout, visual hierarchy, design tokens, dan UI component system.

Hasil utama:

`UI_UX_GUIDE.md`

## 2. Scope of Work

- Design direction.
- Color palette.
- Typography.
- Spacing system.
- Navigation.
- Dashboard layout.
- Content management UI.
- Calendar UI.
- Ideas UI.
- AI generator UI.
- Responsive behavior.
- UI state definitions.

## 3. Detailed Implementation Steps

### Step 1 — Define Design Principles

- Clean.
- Minimal.
- Productive.
- Consistent.
- Accessible.
- Responsive.

### Step 2 — Define Color Tokens

```
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;

  --primary: 245 75% 59%;
  --secondary: 220 14% 96%;

  --muted: 220 14% 96%;
  --border: 220 13% 91%;

  --success: 142 71% 45%;
  --warning: 38 92% 50%;
  --destructive: 0 84% 60%;
}
```

Nilai harus disesuaikan dengan konfigurasi shadcn/ui aktual.

### Step 3 — Define Typography

- Heading.
- Body.
- Caption.
- Label.
- Button.

### Step 4 — Define Navigation

Desktop:

- Sidebar fixed.
- Topbar.
- Main content.

Mobile:

- Sidebar drawer.
- Compact header.
- Single-column layout.

### Step 5 — Design Each Core Page

Buat spesifikasi untuk:

1. Dashboard.
2. Calendar.
3. Content list.
4. Content form.
5. Ideas.
6. AI generator.
7. Settings.

### Step 6 — Define Components

- Sidebar.
- Topbar.
- Stat card.
- Content card.
- Idea card.
- Calendar event.
- Status badge.
- Form field.
- Empty state.

### Step 7 — Document UI States

Loading, empty, error, success, disabled.

### Step 8 — Create UI/UX Guide

## 4. Required Commands

```
mkdir -p docs/design

git status
```

Tidak perlu menambahkan dependency pada phase ini.

## 5. AI Coding Assistant Prompt

# PHASE 3 — UI/UX PLANNING

Kamu bertindak sebagai Senior Product Designer dan Frontend Architect.

Project: ContentPilot

Dokumen utama: PROJECT_PRD_AND_PLAYBOOK.md

Technical reference: TECHNICAL_PLAN.md

## Objective

Buat UI_UX_GUIDE.md sebagai panduan implementasi visual ContentPilot.

## Instructions

1. Baca PRD dan technical plan.
2. Tentukan design direction.
3. Tentukan color palette.
4. Tentukan typography.
5. Tentukan spacing.
6. Tentukan navigation.
7. Tentukan dashboard layout.
8. Tentukan calendar layout.
9. Tentukan content management layout.
10. Tentukan ideas layout.
11. Tentukan AI generator layout.
12. Tentukan responsive behavior.
13. Tentukan loading, empty, error, success states.
14. Tentukan reusable components.

## Expected File

UI_UX_GUIDE.md

## Constraints

- Jangan implementasikan halaman.
- Jangan membuat business logic.
- Jangan menambahkan dependency.
- Gunakan shadcn/ui sebagai basis.
- Hindari desain terlalu kompleks.
- Pastikan mobile responsiveness.

## Acceptance Criteria

UI guide harus cukup detail agar frontend developer dapat mengimplementasikannya tanpa menebak-nebak layout utama.

Jangan lanjut ke Phase 4.

## 6. Expected Deliverables

- `UI_UX_GUIDE.md`
- Design tokens.
- Page specifications.
- Responsive specifications.
- Component specifications.

## 7. Acceptance Criteria

- Design direction jelas.
- Seluruh halaman P0 dirancang.
- Responsive behavior tersedia.
- Component inventory tersedia.
- Design tokens tersedia.
- UI states terdokumentasi.

## 8. Testing Requirements

Review konsistensi:

- Warna.
- Typography.
- Spacing.
- Component behavior.
- Mobile layout.
- Navigation.

## 9. Git Checkpoint

```
git add .
git commit -m "phase 3: ui ux planning"
```

# PHASE 4 — Frontend Foundation & Application Shell

Frontend Foundation

## 1. Phase Objective

Membangun fondasi frontend, global layout, navigasi, dan reusable components.

Belum ada business logic utama.

## 2. Scope of Work

- Folder structure final.
- Global layout.
- Public layout.
- Dashboard layout.
- Sidebar.
- Topbar.
- Navigation.
- Footer.
- Design tokens.
- Reusable components.
- Route placeholders.

## 3. Detailed Implementation Steps

### Step 1 — Implement Folder Structure

Ikuti `TECHNICAL_PLAN.md`.

### Step 2 — Implement Global Layout

File:

```
src/app/layout.tsx
src/app/globals.css
```

Implementasi:

- Font.
- Metadata.
- Global CSS.
- Theme configuration.

### Step 3 — Implement Public Layout

File:

```
src/app/(public)/layout.tsx
src/app/(public)/page.tsx
```

### Step 4 — Implement Dashboard Layout

File:

```
src/app/(dashboard)/dashboard/layout.tsx
```

### Step 5 — Implement Sidebar

Menu:

- Dashboard.
- Calendar.
- Content.
- Ideas.
- AI Generator.
- Settings.

### Step 6 — Implement Topbar

Komponen:

- Page title.
- User menu placeholder.
- Notification placeholder jika relevan.
- Mobile navigation toggle.

### Step 7 — Implement Reusable UI

Gunakan shadcn/ui.

### Step 8 — Create Placeholder Routes

Semua route P0 memiliki halaman dasar.

Belum ada data asli.

## 4. Required Commands

```
npx shadcn@latest add button card input textarea
npx shadcn@latest add dialog dropdown-menu
npx shadcn@latest add badge avatar separator
npx shadcn@latest add sheet skeleton tabs
```

Pastikan nama dan ketersediaan komponen sesuai versi shadcn/ui yang terpasang.

## 5. AI Coding Assistant Prompt

# PHASE 4 — FRONTEND FOUNDATION

Kamu bertindak sebagai Senior Frontend Developer.

Project: ContentPilot

Dokumen utama: PROJECT_PRD_AND_PLAYBOOK.md

Technical reference: TECHNICAL_PLAN.md

UI reference: UI_UX_GUIDE.md

## Objective

Implementasikan application shell dan frontend foundation.

## Expected Files

- Global layout.
- Global styles.
- Public layout.
- Dashboard layout.
- Sidebar.
- Topbar.
- Footer.
- Reusable UI components.
- Placeholder pages.
- Navigation configuration.

## Instructions

1. Periksa struktur project.
2. Ikuti technical plan.
3. Ikuti UI guide.
4. Implementasikan global layout.
5. Implementasikan dashboard shell.
6. Implementasikan public shell.
7. Implementasikan sidebar.
8. Implementasikan topbar.
9. Implementasikan navigation.
10. Implementasikan responsive behavior.
11. Gunakan reusable components.
12. Gunakan shadcn/ui.
13. Pastikan semua route placeholder dapat diakses.

## Constraints

- Jangan implementasikan CRUD.
- Jangan implementasikan authentication.
- Jangan implementasikan AI.
- Jangan implementasikan database.
- Jangan menggunakan mock data sebagai production data.
- Jangan mengimplementasikan business logic.

## Acceptance Criteria

- Dashboard shell tampil.
- Public layout tampil.
- Sidebar bekerja.
- Navigation bekerja.
- Mobile drawer bekerja.
- Seluruh placeholder routes dapat dibuka.
- Tidak ada TypeScript error.

Jangan lanjut ke Phase 5.

## 6. Expected Deliverables

- Application shell.
- Sidebar.
- Topbar.
- Global styles.
- Reusable UI components.
- Placeholder pages.

## 7. Acceptance Criteria

- Layout konsisten.
- Sidebar bekerja.
- Mobile navigation bekerja.
- Public layout bekerja.
- Dashboard layout bekerja.
- Seluruh routes tersedia.
- Tidak ada business logic utama.

## 8. Testing Requirements

```
npm run lint
npx tsc --noEmit
npm run build
```

Lakukan pemeriksaan manual pada desktop dan mobile.

## 9. Git Checkpoint

```
git add .
git commit -m "phase 4: frontend foundation"
```

# PHASE 5 — Core Frontend Feature Development

Core UI Development

## 1. Phase Objective

Mengimplementasikan seluruh UI utama berdasarkan kebutuhan P0 menggunakan mock data sementara.

## 2. Scope of Work

- Dashboard UI.
- Content list UI.
- Content form.
- Content detail.
- Calendar UI.
- Ideas UI.
- AI generator UI.
- Form validation.
- UI interactions.
- Loading states.
- Empty states.
- Error states.

## 3. Detailed Implementation Steps

### Step 1 — Dashboard

Komponen:

- Welcome section.
- Stat cards.
- Upcoming content.
- Recent content.
- Quick actions.

### Step 2 — Content Management

Implementasi:

- Content list.
- Search.
- Platform filter.
- Status filter.
- Create form.
- Edit form.
- Detail view.
- Delete confirmation.

### Step 3 — Content Ideas

Implementasi:

- Idea list.
- Create idea.
- Edit idea.
- Delete idea.
- Idea status.
- Convert idea to content.

### Step 4 — Calendar

Implementasi:

- Monthly view.
- Weekly view.
- Previous/next navigation.
- Today navigation.
- Event cards.
- Date selection.

Gunakan `date-fns` untuk manipulasi tanggal.

### Step 5 — AI Generator

Implementasi form:

- Topic.
- Platform.
- Audience.
- Tone.
- Language.
- Length.
- Additional instructions.

Implementasi result card:

- Caption.
- Hashtags.
- CTA.
- Copy.
- Regenerate.
- Save.

### Step 6 — Form Validation

Gunakan Zod dan React Hook Form jika form membutuhkan pengelolaan kompleks.

### Step 7 — Mock Data

Mock data disimpan terpisah:

```
src/features/contents/mocks/
src/features/ideas/mocks/
src/features/calendar/mocks/
src/features/ai-generator/mocks/
```

Beri nama fungsi secara eksplisit:

```
getMockContents()
getMockIdeas()
getMockCaptionResult()
```

Jangan menggabungkan mock data dengan production services.

### Step 8 — State Management

Gunakan:

- React state untuk state lokal.
- Zustand hanya jika state lintas komponen benar-benar dibutuhkan.
- Mock services untuk simulasi UI.

## 4. Required Commands

```
npm install react-hook-form @hookform/resolvers zod date-fns

npx shadcn@latest add calendar popover select
npx shadcn@latest add form alert-dialog
npx shadcn@latest add table checkbox
```

Validasi apakah komponen telah tersedia sebelum menambahkan ulang.

## 5. AI Coding Assistant Prompt

# PHASE 5 — CORE FRONTEND FEATURES

Kamu bertindak sebagai Senior Frontend Developer.

Project: ContentPilot

Dokumen utama: PROJECT_PRD_AND_PLAYBOOK.md

Technical reference: TECHNICAL_PLAN.md

UI reference: UI_UX_GUIDE.md

## Objective

Implementasikan seluruh core frontend UI ContentPilot.

## Features

1. Dashboard.
2. Content Management.
3. Content Form.
4. Content Detail.
5. Content Ideas.
6. Content Calendar.
7. AI Caption Generator.
8. Search and Filtering.
9. Form Validation.
10. Loading and Empty States.

## Instructions

1. Periksa struktur project.
2. Ikuti technical plan dan UI guide.
3. Implementasikan halaman sesuai PRD.
4. Gunakan reusable components.
5. Gunakan React Hook Form dan Zod bila diperlukan.
6. Implementasikan calendar interaction.
7. Implementasikan content filtering.
8. Implementasikan idea management UI.
9. Implementasikan AI generator UI.
10. Implementasikan loading, error, empty, dan success states.
11. Gunakan mock services untuk tahap ini.
12. Pisahkan mock data dari production service.

## Expected Files

- Dashboard pages.
- Content pages.
- Idea pages.
- Calendar pages.
- AI generator pages.
- Feature components.
- Form schemas.
- Mock data.
- Mock services.

## Constraints

- Jangan mengimplementasikan backend.
- Jangan menghubungkan database.
- Jangan memanggil OpenAI API secara langsung.
- Jangan menganggap mock data sebagai production.
- Jangan mengimplementasikan automatic publishing.

## Acceptance Criteria

Semua core UI dapat digunakan dengan mock data dan seluruh interaksi frontend utama berjalan.

Jangan lanjut ke Phase 6.

## 6. Expected Deliverables

- Dashboard UI.
- Content CRUD UI.
- Idea CRUD UI.
- Calendar UI.
- AI generator UI.
- Mock services.
- Form schemas.
- Responsive states.

## 7. Acceptance Criteria

- Dashboard tampil.
- Content form bekerja.
- Idea form bekerja.
- Calendar navigation bekerja.
- AI generator form bekerja.
- Search dan filter bekerja.
- Mock data terisolasi.
- Responsive layout bekerja.
- Tidak ada backend production yang disimulasikan sebagai nyata.

## 8. Testing Requirements

- Manual UI testing.
- Form validation testing.
- Calendar navigation testing.
- Search and filtering testing.
- Mobile responsive testing.

## 9. Git Checkpoint

```
git add .
git commit -m "phase 5: core frontend features"
```

# PHASE 6 — Backend & Core Business Logic

Backend Implementation

## 1. Phase Objective

Membangun backend production menggunakan Next.js Route Handlers, Prisma, PostgreSQL, Auth.js, dan OpenAI API.

## 2. Scope of Work

- Database.
- Prisma schema.
- Authentication.
- Authorization.
- Content CRUD.
- Ideas CRUD.
- Calendar API.
- Dashboard API.
- AI generation.
- Validation.
- Error handling.
- Security.
- Logging.

## 3. Detailed Implementation Steps

### Step 1 — Install Backend Dependencies

```
npm install prisma @prisma/client
npm install next-auth @auth/prisma-adapter
npm install openai
npm install @upstash/ratelimit @upstash/redis
```

Catatan:

`@upstash/ratelimit` dan `@upstash/redis` merupakan opsi implementasi rate limiting terdistribusi. Gunakan hanya jika layanan Redis tersedia dan diperlukan untuk deployment. Jangan memasangnya tanpa konfigurasi backend yang benar.

Pastikan versi Auth.js, adapter, dan Prisma saling kompatibel sebelum implementasi.

### Step 2 — Initialize Prisma

```
npx prisma init
```

### Step 3 — Configure PostgreSQL

Tambahkan:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/contentpilot"
```

Jangan memasukkan credential asli ke Git.

### Step 4 — Create Prisma Schema

Implementasikan:

- User.
- Account.
- Session.
- VerificationToken.
- Content.
- ContentIdea.
- AIGeneration.

Tambahkan index dan relationship sesuai data model.

### Step 5 — Run Migration

```
npx prisma migrate dev --name init
npx prisma generate
```

### Step 6 — Configure Auth.js

Implementasikan:

- Auth configuration.
- Prisma adapter.
- Session handling.
- Protected routes.
- Registration workflow.

Pilih satu mekanisme login yang benar-benar diimplementasikan. Untuk MVP, email/password dapat digunakan dengan password hashing yang aman. Jangan membuat sistem email verification yang bergantung pada provider email yang belum dikonfigurasi.

### Step 7 — Implement Repository Layer

Contoh:

```
contents.repository.ts
ideas.repository.ts
dashboard.repository.ts
```

### Step 8 — Implement Application Services

```
create-content.service.ts
update-content.service.ts
delete-content.service.ts
create-idea.service.ts
generate-caption.service.ts
get-dashboard.service.ts
```

### Step 9 — Implement API Endpoints

Implementasikan seluruh API contract.

### Step 10 — Implement AI Provider

Buat:

```
src/lib/ai/provider.ts
src/lib/ai/openai.adapter.ts
src/lib/ai/caption.schema.ts
```

### Step 11 — Implement Security

- Session validation.
- Ownership validation.
- Zod validation.
- AI rate limiting.
- Request timeout.
- Error mapping.

### Step 12 — Implement Logging

Catat:

- API error.
- AI provider error.
- Database error.
- Unexpected exception.

Jangan mencatat password, API key, atau informasi sensitif.

## 4. Required Commands

```
npm install prisma @prisma/client
npm install next-auth @auth/prisma-adapter
npm install openai

npx prisma init

npx prisma migrate dev --name init
npx prisma generate

npx prisma studio
```

## 5. AI Coding Assistant Prompt

# PHASE 6 — BACKEND IMPLEMENTATION

Kamu bertindak sebagai Senior Backend Developer dan Software Architect.

Project: ContentPilot

Dokumen utama: PROJECT_PRD_AND_PLAYBOOK.md

Technical reference: TECHNICAL_PLAN.md

## Objective

Implementasikan backend production ContentPilot.

## Required Features

1. PostgreSQL integration.
2. Prisma schema.
3. Auth.js.
4. Registration.
5. Login and logout.
6. Protected API.
7. Content CRUD.
8. Idea CRUD.
9. Dashboard API.
10. Calendar API.
11. AI Caption Generation API.
12. Validation.
13. Authorization.
14. Error handling.
15. Logging.

## Instructions

1. Periksa struktur project.
2. Ikuti technical plan.
3. Install dependency yang diperlukan.
4. Implementasikan Prisma schema.
5. Implementasikan database connection.
6. Implementasikan authentication.
7. Implementasikan repository layer.
8. Implementasikan application services.
9. Implementasikan API handlers.
10. Implementasikan AI provider abstraction.
11. Implementasikan OpenAI adapter.
12. Implementasikan Zod validation.
13. Implementasikan ownership validation.
14. Implementasikan rate limiting yang sesuai deployment.
15. Implementasikan error handling.
16. Jalankan migration.
17. Verifikasi API.

## Security Rules

- Jangan expose API key.
- Jangan mengizinkan akses data user lain.
- Jangan percaya user ID dari client.
- Ambil user ID dari session.
- Validasi semua input.
- Jangan expose stack trace.
- Jangan mencatat secret.

## Constraints

- Jangan implementasikan automatic publishing.
- Jangan membuat microservices.
- Jangan membuat background worker.
- Jangan menambahkan Redis tanpa kebutuhan dan konfigurasi yang jelas.
- Jangan mengubah frontend secara luas.
- Jangan mengganti mock services di phase ini kecuali diperlukan untuk verifikasi backend.

## Acceptance Criteria

Seluruh API core berfungsi dengan database dan authentication nyata.

Jangan lanjut ke Phase 7.

## 6. Expected Deliverables

- Prisma schema.
- Database migrations.
- Auth.js.
- Authentication workflow.
- API endpoints.
- Repository layer.
- Application services.
- AI provider integration.
- Validation.
- Error handling.
- Security implementation.

## 7. Acceptance Criteria

- PostgreSQL terkoneksi.
- Prisma migration berhasil.
- Authentication bekerja.
- Content CRUD bekerja.
- Ideas CRUD bekerja.
- Calendar API bekerja.
- Dashboard API bekerja.
- AI generation menggunakan provider nyata.
- Ownership validation bekerja.
- Error handling tersedia.
- API key tidak terekspos.

## 8. Testing Requirements

```
npx prisma validate
npx prisma generate
npx tsc --noEmit
npm run lint
npm run build
```

Tambahkan pengujian API untuk:

- Unauthorized access.
- Invalid payload.
- Cross-user access.
- CRUD.
- AI provider failure.

## 9. Git Checkpoint

```
git add .
git commit -m "phase 6: backend implementation"
```

# PHASE 7 — Frontend & Backend Integration

End-to-End Integration

## 1. Phase Objective

Menghubungkan frontend dengan backend dan mengganti seluruh mock service pada core feature dengan implementasi production.

## 2. Scope of Work

- API client.
- Data fetching.
- Content integration.
- Ideas integration.
- Calendar integration.
- Dashboard integration.
- AI integration.
- Form submission.
- Error mapping.
- Loading states.
- State synchronization.

## 3. Detailed Implementation Steps

### Step 1 — Create API Client

Gunakan native fetch.

Contoh:

```
export async function apiRequest<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.error?.message ?? "Request failed"
    );
  }

  return result.data;
}
```

Sesuaikan response handling dengan standar API aktual.

### Step 2 — Replace Content Mock Service

- List content.
- Create content.
- Update content.
- Delete content.

### Step 3 — Replace Idea Mock Service

- List ideas.
- Create idea.
- Update idea.
- Delete idea.
- Convert idea to content.

### Step 4 — Integrate Dashboard

Data statistik harus berasal dari API.

### Step 5 — Integrate Calendar

- Fetch events.
- Filter by date.
- Update schedule.
- Refresh after mutations.

### Step 6 — Integrate AI Generator

- Submit prompt.
- Show loading.
- Display generated result.
- Copy caption.
- Save as draft.
- Handle errors.

### Step 7 — Remove Mock Production Paths

Hapus seluruh penggunaan mock services dari production flow.

Pertahankan mock hanya jika masih diperlukan untuk test fixtures atau storybook-like development.

### Step 8 — Validate End-to-End Flow

Pastikan alur utama berfungsi.

## 4. Required Commands

```
npm run dev
npm run lint
npx tsc --noEmit
npm run build
```

## 5. AI Coding Assistant Prompt

# PHASE 7 — FRONTEND BACKEND INTEGRATION

Kamu bertindak sebagai Senior Fullstack Developer.

Project: ContentPilot

Dokumen utama: PROJECT_PRD_AND_PLAYBOOK.md

Technical reference: TECHNICAL_PLAN.md

## Objective

Integrasikan seluruh frontend dengan backend production.

## Integration Scope

1. Dashboard API.
2. Content CRUD API.
3. Ideas CRUD API.
4. Calendar API.
5. AI Generation API.
6. Authentication.
7. Form submission.
8. Search and filtering.
9. Error handling.
10. Loading state.

## Instructions

1. Periksa API yang sudah dibuat.
2. Periksa frontend mock services.
3. Buat API client jika diperlukan.
4. Integrasikan dashboard.
5. Integrasikan content management.
6. Integrasikan ideas.
7. Integrasikan calendar.
8. Integrasikan AI generator.
9. Integrasikan authentication state.
10. Implementasikan error mapping.
11. Implementasikan loading states.
12. Implementasikan empty states.
13. Sinkronkan UI setelah mutations.
14. Hapus penggunaan mock service dari production flow.

## Constraints

- Jangan mengganti backend architecture.
- Jangan menambahkan fitur baru.
- Jangan menggunakan mock data untuk menggantikan API production.
- Jangan mengekspos secret.
- Jangan mengubah API contract tanpa alasan dan dokumentasi.

## Acceptance Criteria

Seluruh core user flow berjalan end-to-end menggunakan database dan AI provider nyata.

Jangan lanjut ke Phase 8.

## 6. Expected Deliverables

- API client.
- Integrated frontend.
- Real dashboard data.
- Real content management.
- Real ideas management.
- Real calendar data.
- Real AI generation.
- Removed mock production dependencies.

## 7. Acceptance Criteria

- Dashboard menampilkan data nyata.
- Content CRUD berhasil.
- Ideas CRUD berhasil.
- Calendar menggunakan database.
- AI generator bekerja.
- AI result dapat disimpan.
- Login/logout bekerja.
- Error states bekerja.
- Loading states bekerja.
- Mock data tidak digunakan untuk production flow.

## 8. Testing Requirements

Uji end-to-end:

1. Register.
2. Login.
3. Create idea.
4. Edit idea.
5. Convert idea to content.
6. Generate caption.
7. Save caption.
8. Edit content.
9. Schedule content.
10. Verify calendar.
11. Delete content.
12. Logout.

## 9. Git Checkpoint

```
git add .
git commit -m "phase 7: frontend backend integration"
```

# PHASE 8 — Additional Features & Product Completion

Product Completion

## 1. Phase Objective

Menyelesaikan fitur pendukung P1 yang memberikan peningkatan nyata terhadap usability dan kualitas MVP.

## 2. Scope of Work

P1 yang dipilih:

1. Content duplication.
2. CSV export.
3. Content templates.
4. Advanced filtering.
5. Basic activity history atau content update history jika implementasinya sederhana.
6. SEO.
7. Accessibility improvement.
8. Theme support jika waktu memungkinkan.

Tidak wajib mengimplementasikan seluruh fitur P1 jika akan mengganggu stabilitas MVP.

## 3. Detailed Implementation Steps

### Step 1 — Content Duplication

Pengguna dapat menggandakan konten.

Field yang disalin:

- Title.
- Caption.
- Hashtags.
- Platform.
- Notes.

Status default:

`DRAFT`

Scheduled date harus dikosongkan.

### Step 2 — Content Templates

Sediakan beberapa template dasar:

- Promotional.
- Educational.
- Storytelling.
- Product announcement.
- Engagement.

Template dapat disimpan sebagai konfigurasi statis.

Tidak perlu membuat template marketplace.

### Step 3 — CSV Export

Pengguna dapat mengekspor daftar konten.

Kolom:

- Title.
- Platform.
- Caption.
- Hashtags.
- Status.
- Scheduled date.
- Created date.

Pastikan export hanya memuat data user yang sedang login.

### Step 4 — Advanced Filtering

Filter:

- Platform.
- Status.
- Date range.
- Keyword.

### Step 5 — SEO

Implementasi:

- Metadata.
- Open Graph.
- Page title.
- Description.
- Public landing page metadata.
- Sitemap dan robots jika relevan.

Jangan mengindeks dashboard privat.

### Step 6 — Accessibility

- Label.
- Focus state.
- Keyboard navigation.
- Semantic HTML.
- Accessible dialog.

### Step 7 — Theme Support

Opsional.

Gunakan konfigurasi yang sesuai shadcn/ui apabila benar-benar diperlukan.

## 4. Required Commands

```
npm run lint
npx tsc --noEmit
npm run build
```

Tidak perlu menambahkan dependency jika fitur dapat diimplementasikan dengan stack yang tersedia.

## 5. AI Coding Assistant Prompt

# PHASE 8 — ADDITIONAL FEATURES

Kamu bertindak sebagai Senior Fullstack Developer.

Project: ContentPilot

Dokumen utama: PROJECT_PRD_AND_PLAYBOOK.md

Technical reference: TECHNICAL_PLAN.md

## Objective

Implementasikan fitur pendukung P1 yang realistis dan meningkatkan usability MVP.

## Priority

1. Content duplication.
2. CSV export.
3. Content templates.
4. Advanced filtering.
5. Basic activity history jika diperlukan.
6. SEO.
7. Accessibility.
8. Theme support jika waktu memungkinkan.

## Instructions

1. Review seluruh fitur P0.
2. Pastikan core flow sudah stabil.
3. Implementasikan fitur P1 secara selektif.
4. Gunakan reusable components.
5. Ikuti architecture.
6. Pastikan authorization.
7. Pastikan CSV export aman.
8. Jangan expose data user lain.
9. Perbarui dokumentasi.

## Constraints

- Jangan mengimplementasikan P2.
- Jangan implementasikan automatic publishing.
- Jangan implementasikan billing.
- Jangan membuat team collaboration.
- Jangan menambahkan kompleksitas tanpa manfaat jelas.

## Acceptance Criteria

Fitur P1 yang dipilih berjalan dengan baik tanpa merusak P0.

Jangan lanjut ke Phase 9.

## 6. Expected Deliverables

- Content duplication.
- CSV export.
- Content templates.
- Advanced filtering.
- SEO improvements.
- Accessibility improvements.
- Optional theme support.

## 7. Acceptance Criteria

- Fitur P0 tetap berfungsi.
- Content duplication bekerja.
- CSV export bekerja.
- Export aman.
- Template dapat digunakan.
- Filter tambahan bekerja.
- SEO tersedia.
- Accessibility diperbaiki.

## 8. Testing Requirements

- Feature regression testing.
- CSV export verification.
- Authorization testing.
- Responsive testing.
- Accessibility review.
- SEO metadata inspection.

## 9. Git Checkpoint

```
git add .
git commit -m "phase 8: additional features"
```

# PHASE 9 — Testing, Security & Optimization

Quality Assurance

## 1. Phase Objective

Melakukan verifikasi kualitas, keamanan, performa, dan stabilitas sebelum production deployment.

Hasil utama:

`TEST_REPORT.md`

## 2. Scope of Work

- Unit testing.
- Integration testing.
- E2E testing.
- Type checking.
- Linting.
- Build verification.
- Security audit.
- Responsive testing.
- Browser compatibility.
- Performance optimization.
- Bug fixing.

Tidak boleh menambahkan fitur baru.

## 3. Detailed Implementation Steps

### Step 1 — Setup Testing Tools

```
npm install -D vitest @vitejs/plugin-react
npm install -D @playwright/test
```

Konfigurasi Vitest harus disesuaikan dengan Next.js dan TypeScript project.

### Step 2 — Unit Testing

Prioritaskan:

- Content validation.
- Idea validation.
- Scheduling rules.
- AI output validation.
- Status transition.
- Utility functions.

### Step 3 — Integration Testing

Uji:

- Authentication.
- Database operations.
- Content ownership.
- API handlers.
- AI provider adapter.

### Step 4 — E2E Testing

Gunakan Playwright.

Skenario:

- Register.
- Login.
- Create content.
- Create idea.
- Generate caption.
- Schedule content.
- Verify calendar.
- Delete content.
- Logout.

Gunakan AI provider mock hanya dalam automated test agar pengujian tidak bergantung pada biaya dan ketersediaan provider eksternal.

### Step 5 — Security Audit

Periksa:

- Authentication bypass.
- IDOR.
- Data ownership.
- Secret exposure.
- Input validation.
- Rate limiting.
- Error leakage.
- Dependency vulnerabilities.

Jalankan:

```
npm audit
```

Periksa hasilnya dan prioritaskan vulnerability berdasarkan tingkat risiko. Jangan menjalankan `npm audit fix --force` tanpa review.

### Step 6 — Performance Audit

Periksa:

- Bundle size.
- Database query.
- Dashboard loading.
- Calendar loading.
- AI timeout.
- Image optimization jika ada media.

### Step 7 — Responsive Testing

Uji:

- Desktop.
- Tablet.
- Mobile.

### Step 8 — Browser Testing

Uji:

- Chrome.
- Firefox.
- Edge.
- Safari jika tersedia.

### Step 9 — Fix Critical Bugs

Prioritas:

1. Security issues.
2. Data corruption.
3. Core workflow errors.
4. Functional bugs.
5. Responsive bugs.
6. UI polish.

### Step 10 — Create Test Report

Dokumentasikan:

- Test cases.
- Test results.
- Failed tests.
- Fixed bugs.
- Remaining issues.
- Security findings.
- Release recommendation.

## 4. Required Commands

```
npm run lint

npx tsc --noEmit

npx prisma validate

npm run build

npx vitest run

npx playwright test

npm audit
```

Sesuaikan command dengan script yang telah dikonfigurasi.

## 5. AI Coding Assistant Prompt

# PHASE 9 — TESTING AND OPTIMIZATION

Kamu bertindak sebagai Senior QA Engineer, Security Engineer, dan Performance Engineer.

Project: ContentPilot

Dokumen utama: PROJECT_PRD_AND_PLAYBOOK.md

Technical reference: TECHNICAL_PLAN.md

## Objective

Melakukan pengujian dan perbaikan seluruh aplikasi sebelum deployment.

## Instructions

1. Review seluruh fitur P0 dan P1 yang dipilih.
2. Jalankan lint.
3. Jalankan type checking.
4. Jalankan unit testing.
5. Jalankan integration testing.
6. Jalankan E2E testing.
7. Periksa database validation.
8. Periksa authorization.
9. Periksa data isolation.
10. Periksa API security.
11. Periksa secret exposure.
12. Periksa responsive layout.
13. Periksa browser compatibility.
14. Periksa performance.
15. Perbaiki bug yang ditemukan.
16. Dokumentasikan hasil testing.

## Constraints

- Jangan menambahkan fitur baru.
- Jangan melakukan refactoring besar tanpa kebutuhan.
- Jangan menghapus test yang gagal untuk membuat build berhasil.
- Jangan mengarang hasil testing.
- Jangan menyatakan lulus jika command belum dijalankan.

## Expected File

TEST_REPORT.md

## Report Sections

1. Test Environment
2. Unit Test Results
3. Integration Test Results
4. E2E Test Results
5. Security Audit
6. Performance Review
7. Responsive Review
8. Known Issues
9. Bug Fixes
10. Release Readiness

## Acceptance Criteria

Tidak ada critical bug atau critical security issue yang belum ditangani.

Seluruh hasil pengujian harus berdasarkan hasil aktual.

Jangan lanjut ke Phase 10.

## 6. Expected Deliverables

- Unit tests.
- Integration tests.
- E2E tests.
- Security review.
- Performance review.
- Responsive review.
- `TEST_REPORT.md`.

## 7. Acceptance Criteria

- Lint berhasil.
- Type checking berhasil.
- Build berhasil.
- Unit test lulus.
- Integration test lulus.
- E2E test lulus.
- Data isolation teruji.
- Tidak ada critical vulnerability yang belum ditangani.
- Tidak ada critical bug.
- TEST_REPORT.md tersedia.

## 8. Testing Requirements

Semua command harus benar-benar dijalankan.

Jangan menulis PASS untuk pengujian yang belum dilakukan.

## 9. Git Checkpoint

```
git add .
git commit -m "phase 9: testing and optimization"
```

# PHASE 10 — Production Deployment & Release

Production Release

## 1. Phase Objective

Mempersiapkan dan menjalankan ContentPilot di production.

Hasil utama:

- `DEPLOYMENT_GUIDE.md`
- `RELEASE_NOTES.md`

## 2. Scope of Work

- Production environment.
- Environment variables.
- Database production.
- Build configuration.
- Domain.
- DNS.
- HTTPS.
- Hosting.
- Docker jika diperlukan.
- Reverse proxy jika menggunakan VPS.
- Monitoring.
- Backup.
- Smoke testing.
- Release documentation.

## 3. Deployment Architecture

### Recommended MVP Architecture

Untuk deployment sederhana, gunakan:

- Next.js application.
- Managed PostgreSQL.
- VPS atau managed Node.js hosting.
- HTTPS.
- Reverse proxy jika menggunakan VPS.

\#chatgpt-mermaid-\_r_2jn\_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(13, 13, 13);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_2jn\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_2jn\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_2jn\_ .error-icon{fill:rgb(243, 243, 243);}#chatgpt-mermaid-\_r_2jn\_ .error-text{fill:rgb(13, 13, 13);stroke:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_2jn\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_2jn\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_2jn\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_2jn\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_2jn\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_2jn\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_2jn\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_2jn\_ .marker.cross{stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_2jn\_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-\_r_2jn\_ p{margin:0;}#chatgpt-mermaid-\_r_2jn\_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_2jn\_ .cluster-label text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_2jn\_ .cluster-label span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_2jn\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_2jn\_ .label text,#chatgpt-mermaid-\_r_2jn\_ span{fill:rgb(13, 13, 13);color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_2jn\_ .node rect,#chatgpt-mermaid-\_r_2jn\_ .node circle,#chatgpt-mermaid-\_r_2jn\_ .node ellipse,#chatgpt-mermaid-\_r_2jn\_ .node polygon,#chatgpt-mermaid-\_r_2jn\_ .node path{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_2jn\_ .rough-node .label text,#chatgpt-mermaid-\_r_2jn\_ .node .label text,#chatgpt-mermaid-\_r_2jn\_ .image-shape .label,#chatgpt-mermaid-\_r_2jn\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_2jn\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_2jn\_ .rough-node .label,#chatgpt-mermaid-\_r_2jn\_ .node .label,#chatgpt-mermaid-\_r_2jn\_ .image-shape .label,#chatgpt-mermaid-\_r_2jn\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_2jn\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_2jn\_ .root .anchor path{fill:rgb(143, 143, 143)!important;stroke-width:0;stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_2jn\_ .arrowheadPath{fill:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_2jn\_ .edgePath .path{stroke:rgb(143, 143, 143);stroke-width:1px;}#chatgpt-mermaid-\_r_2jn\_ .flowchart-link{stroke:rgb(143, 143, 143);fill:none;}#chatgpt-mermaid-\_r_2jn\_ .edgeLabel{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_2jn\_ .edgeLabel p{background-color:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_2jn\_ .edgeLabel rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_2jn\_ .labelBkg{background-color:rgba(252, 252, 252, 0.5);}#chatgpt-mermaid-\_r_2jn\_ .cluster rect{fill:rgb(243, 243, 243);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_2jn\_ .cluster text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_2jn\_ .cluster span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_2jn\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:12px;background:rgb(243, 243, 243);border:1px solid rgba(0, 0, 0, 0.1);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_2jn\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_2jn\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_2jn\_ .icon-shape,#chatgpt-mermaid-\_r_2jn\_ .image-shape{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_2jn\_ .icon-shape p,#chatgpt-mermaid-\_r_2jn\_ .image-shape p{background-color:rgb(252, 252, 252);padding:2px;}#chatgpt-mermaid-\_r_2jn\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_2jn\_ .image-shape .label rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_2jn\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_2jn\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_2jn\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_2jn\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_2jn\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_2jn\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_2jn\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_2jn\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_2jn\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_2jn\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_2jn\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_2jn\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_2jn\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_2jn\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_2jn\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_2jn\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_2jn\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_2jn\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_2jn\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_2jn\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_2jn\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_2jn\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_2jn\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_2jn\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_2jn\_ .node rect,#chatgpt-mermaid-\_r_2jn\_ .node circle,#chatgpt-mermaid-\_r_2jn\_ .node ellipse,#chatgpt-mermaid-\_r_2jn\_ .node polygon,#chatgpt-mermaid-\_r_2jn\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_2jn\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_2jn\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_2jn\_ .edgePaths .flowchart-link{stroke:rgb(143, 143, 143);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_2jn\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_2jn\_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}User BrowserDomain and DNSHTTPS Reverse ProxyNext.js ApplicationManaged PostgreSQLOpenAI API

Managed PostgreSQL direkomendasikan untuk mengurangi beban operasional solo developer.

Jika menggunakan VPS, Docker dapat dipakai untuk deployment yang lebih konsisten.

## 3.1 Deployment Option A — Managed Hosting

Contoh:

- Vercel untuk Next.js.
- Managed PostgreSQL.
- Environment variables melalui dashboard hosting.

Kelebihan:

- Setup sederhana.
- Tidak perlu mengelola reverse proxy.
- Deployment lebih cepat.
- Cocok untuk MVP.

Perhatian:

- Pastikan Auth.js session dan database adapter kompatibel dengan runtime.
- Periksa batas timeout function untuk AI generation.
- Gunakan rate limiting yang mendukung deployment terdistribusi.
- Jangan menyimpan state penting di memory instance.

## 3.2 Deployment Option B — VPS + Docker

Gunakan jika membutuhkan kontrol server lebih besar.

Arsitektur:

- Ubuntu VPS.
- Docker.
- Next.js container.
- PostgreSQL managed atau container dengan volume persisten.
- Nginx atau Caddy.
- HTTPS.

### Step 1 — Prepare Production Environment

Pastikan:

- Domain tersedia.
- DNS dapat dikelola.
- VPS tersedia jika menggunakan opsi VPS.
- PostgreSQL production tersedia.
- API key AI tersedia.

### Step 2 — Production Environment Variables

```
NODE_ENV=production

DATABASE_URL=

AUTH_SECRET=
AUTH_URL=

OPENAI_API_KEY=
OPENAI_MODEL=
```

Gunakan secret production yang berbeda dari development.

### Step 3 — Build Application

```
npm ci
npx prisma generate
npx prisma migrate deploy
npm run build
```

### Step 4 — Start Application

```
npm run start
```

### Step 5 — Configure Domain

Contoh:

```
contentpilot.example.com
```

Atur DNS sesuai hosting provider.

### Step 6 — Configure HTTPS

Gunakan HTTPS dari hosting provider atau reverse proxy.

Jangan menggunakan HTTP untuk production authentication dan AI API.

### Step 7 — Database Backup

Pastikan:

- Backup terjadwal.
- Retention policy.
- Restore procedure.
- Backup verification.

### Step 8 — Monitoring

Monitor:

- Application uptime.
- API errors.
- Database availability.
- AI provider failures.
- Response time.
- Resource usage.

### Step 9 — Production Smoke Test

Verifikasi:

1. Landing page.
2. Register.
3. Login.
4. Dashboard.
5. Content CRUD.
6. Ideas CRUD.
7. AI generation.
8. Content scheduling.
9. Calendar.
10. Logout.

### Step 10 — Release Documentation

Buat:

`DEPLOYMENT_GUIDE.md`

`RELEASE_NOTES.md`

## 4. Optional Docker Configuration

Gunakan hanya jika deployment VPS dipilih.

Contoh Dockerfile:

```
FROM node:22-alpine AS base

WORKDIR /app

FROM base AS deps

COPY package*.json ./

RUN npm ci

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npx prisma generate
RUN npm run build

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
```

Pastikan konfigurasi `output: "standalone"` telah ditambahkan pada Next.js jika menggunakan Dockerfile tersebut.

Database migration dijalankan melalui proses release terpisah, bukan secara otomatis oleh setiap container yang berjalan.

## 5. Required Commands

```
npm ci

npx prisma generate

npx prisma migrate deploy

npm run build

npm run start
```

Opsional Docker:

```
docker build -t contentpilot .

docker run -d \
  --name contentpilot \
  -p 3000:3000 \
  --env-file .env.production \
  contentpilot
```

Jangan menyimpan `.env.production` ke repository.

## 6. AI Coding Assistant Prompt

# PHASE 10 — PRODUCTION DEPLOYMENT

Kamu bertindak sebagai Senior DevOps Engineer dan Release Manager.

Project: ContentPilot

Dokumen utama: PROJECT_PRD_AND_PLAYBOOK.md

Technical reference: TECHNICAL_PLAN.md

Testing reference: TEST_REPORT.md

## Objective

Persiapkan deployment production dan dokumentasikan proses release.

## Instructions

1. Review technical architecture.
2. Review test report.
3. Tentukan deployment target.
4. Konfigurasi production environment.
5. Konfigurasi database.
6. Konfigurasi environment variables.
7. Konfigurasi build.
8. Konfigurasi domain dan DNS.
9. Konfigurasi HTTPS.
10. Konfigurasi hosting.
11. Gunakan Docker hanya jika diperlukan.
12. Siapkan monitoring.
13. Siapkan backup strategy.
14. Jalankan production smoke test.
15. Dokumentasikan release.

## Expected Files

- DEPLOYMENT_GUIDE.md
- RELEASE_NOTES.md
- Dockerfile jika diperlukan.
- docker-compose.yml jika diperlukan.
- Production configuration jika diperlukan.

## Constraints

- Jangan mengubah arsitektur tanpa alasan.
- Jangan expose environment variables.
- Jangan commit secrets.
- Jangan mengklaim deployment berhasil jika belum diverifikasi.
- Jangan menghapus data production.
- Jangan menjalankan destructive migration tanpa backup.
- Jangan menggunakan konfigurasi desktop application.

## Deployment Requirements

Aplikasi harus berjalan sebagai web application melalui HTTPS.

Database harus persistent.

AI API key harus berada di server.

Pastikan deployment mendukung session authentication.

## Acceptance Criteria

- Production build berhasil.
- Production environment terkonfigurasi.
- Database production dapat diakses.
- HTTPS aktif.
- Core flow berhasil melalui production URL.
- Backup strategy tersedia.
- Monitoring tersedia.
- Deployment documentation tersedia.
- Release notes tersedia.

## Final Report

Laporkan:

1. Hosting provider.
2. Deployment architecture.
3. Domain.
4. Database.
5. Environment variables yang diperlukan tanpa menampilkan secret.
6. Build result.
7. Smoke test result.
8. Known issues.
9. Backup configuration.
10. Release status.

Jangan mengklaim deployment selesai sebelum seluruh verifikasi aktual berhasil.

## 7. Expected Deliverables

- Production application.
- Production database.
- HTTPS configuration.
- Domain configuration.
- Monitoring.
- Backup.
- `DEPLOYMENT_GUIDE.md`.
- `RELEASE_NOTES.md`.

## 8. Acceptance Criteria

- Production build berhasil.
- Domain aktif.
- HTTPS aktif.
- Database production berfungsi.
- Authentication berfungsi.
- AI generation berfungsi.
- Content CRUD berfungsi.
- Calendar berfungsi.
- Monitoring tersedia.
- Backup tersedia.
- Smoke test lulus.
- Deployment guide tersedia.
- Release notes tersedia.

## 9. Git Checkpoint

```
git add .
git commit -m "phase 10: production deployment"
```

# PART C — GLOBAL AI CODING RULES

Bagian ini menjadi aturan permanen untuk seluruh phase.

## C.1 Project Context

```
Project: ContentPilot

Type:
Social Media Content Planning SaaS

Platform:
Web Application

Frontend:
Next.js App Router
TypeScript
Tailwind CSS
shadcn/ui

Backend:
Next.js Route Handlers

Database:
PostgreSQL

ORM:
Prisma

Authentication:
Auth.js

AI:
OpenAI API

Development:
Solo Developer
AI Coding Assistant
MVP First
Pragmatic Clean Architecture
```

## C.2 Mandatory Rules

1. Baca PRD sebelum mengubah kode.
2. Baca technical plan jika sudah tersedia.
3. Kerjakan hanya phase yang diminta.
4. Periksa kondisi repository.
5. Jangan menghapus pekerjaan yang sudah ada.
6. Jangan mengubah tech stack tanpa persetujuan.
7. Jangan menambahkan dependency tanpa alasan.
8. Jangan membuat fitur di luar scope.
9. Jangan menganggap mock data sebagai production data.
10. Jangan menyimpan secret di frontend.
11. Jangan mempercayai user ID dari client.
12. Jangan mengabaikan ownership validation.
13. Jangan membuat API tanpa validasi.
14. Jangan membuat abstraksi berlebihan.
15. Jangan membuat microservices.
16. Jangan membuat background worker tanpa kebutuhan.
17. Jangan mengimplementasikan automatic publishing pada MVP.
18. Jalankan testing aktual.
19. Laporkan hasil testing aktual.
20. Jangan melanjutkan phase secara otomatis.

## C.3 Architecture Rules

- Presentation tidak mengandung business logic kompleks.
- Route Handler tidak mengandung seluruh business logic.
- Repository bertanggung jawab terhadap data access.
- Application services bertanggung jawab terhadap use case.
- Validation menggunakan Zod.
- Authentication dilakukan di server.
- Database access menggunakan Prisma.
- AI provider menggunakan adapter.
- Client tidak boleh mengetahui secret server.

## C.4 Code Quality Rules

- TypeScript strict.
- Hindari `any`.
- Gunakan reusable components.
- Gunakan meaningful naming.
- Hindari duplicated logic.
- Hindari oversized components.
- Hindari unnecessary dependencies.
- Gunakan proper error handling.
- Gunakan semantic HTML.

## C.5 Mock Data Rules

Mock data hanya boleh digunakan pada Phase 5.

Setelah Phase 7:

- Production flow harus menggunakan database.
- AI generator harus menggunakan provider nyata.
- Tidak boleh ada fallback diam-diam ke mock data.
- Test fixtures boleh tetap menggunakan mock.

## C.6 Phase Completion Report

Setiap phase harus menghasilkan laporan:

```
PHASE REPORT

Phase:
Status:

1. Summary
2. Files Created
3. Files Modified
4. Dependencies Added
5. Commands Executed
6. Testing Results
7. Acceptance Criteria
8. Known Issues
9. Technical Decisions
10. Git Commit Hash
11. Recommendation

Next Phase:
Not started.
Waiting for approval.
```

# PART D — GIT & EXECUTION RULES

## D.1 Git Strategy

Gunakan satu branch utama:

```
main
```

Untuk development, opsional gunakan:

```
develop
```

Setiap phase harus mempunyai checkpoint.

## D.2 Commit Convention

| Phase | Commit                                  |
| ----- | --------------------------------------- |
| 1     | `phase 1: project bootstrap`            |
| 2     | `phase 2: technical architecture`       |
| 3     | `phase 3: ui ux planning`               |
| 4     | `phase 4: frontend foundation`          |
| 5     | `phase 5: core frontend features`       |
| 6     | `phase 6: backend implementation`       |
| 7     | `phase 7: frontend backend integration` |
| 8     | `phase 8: additional features`          |
| 9     | `phase 9: testing and optimization`     |
| 10    | `phase 10: production deployment`       |

## D.3 Phase Execution Rules

\#chatgpt-mermaid-\_r_2mf\_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(13, 13, 13);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_2mf\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_2mf\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_2mf\_ .error-icon{fill:rgb(243, 243, 243);}#chatgpt-mermaid-\_r_2mf\_ .error-text{fill:rgb(13, 13, 13);stroke:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_2mf\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_2mf\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_2mf\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_2mf\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_2mf\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_2mf\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_2mf\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_2mf\_ .marker.cross{stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_2mf\_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-\_r_2mf\_ p{margin:0;}#chatgpt-mermaid-\_r_2mf\_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_2mf\_ .cluster-label text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_2mf\_ .cluster-label span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_2mf\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_2mf\_ .label text,#chatgpt-mermaid-\_r_2mf\_ span{fill:rgb(13, 13, 13);color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_2mf\_ .node rect,#chatgpt-mermaid-\_r_2mf\_ .node circle,#chatgpt-mermaid-\_r_2mf\_ .node ellipse,#chatgpt-mermaid-\_r_2mf\_ .node polygon,#chatgpt-mermaid-\_r_2mf\_ .node path{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_2mf\_ .rough-node .label text,#chatgpt-mermaid-\_r_2mf\_ .node .label text,#chatgpt-mermaid-\_r_2mf\_ .image-shape .label,#chatgpt-mermaid-\_r_2mf\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_2mf\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_2mf\_ .rough-node .label,#chatgpt-mermaid-\_r_2mf\_ .node .label,#chatgpt-mermaid-\_r_2mf\_ .image-shape .label,#chatgpt-mermaid-\_r_2mf\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_2mf\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_2mf\_ .root .anchor path{fill:rgb(143, 143, 143)!important;stroke-width:0;stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_2mf\_ .arrowheadPath{fill:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_2mf\_ .edgePath .path{stroke:rgb(143, 143, 143);stroke-width:1px;}#chatgpt-mermaid-\_r_2mf\_ .flowchart-link{stroke:rgb(143, 143, 143);fill:none;}#chatgpt-mermaid-\_r_2mf\_ .edgeLabel{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_2mf\_ .edgeLabel p{background-color:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_2mf\_ .edgeLabel rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_2mf\_ .labelBkg{background-color:rgba(252, 252, 252, 0.5);}#chatgpt-mermaid-\_r_2mf\_ .cluster rect{fill:rgb(243, 243, 243);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_2mf\_ .cluster text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_2mf\_ .cluster span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_2mf\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:12px;background:rgb(243, 243, 243);border:1px solid rgba(0, 0, 0, 0.1);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_2mf\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_2mf\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_2mf\_ .icon-shape,#chatgpt-mermaid-\_r_2mf\_ .image-shape{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_2mf\_ .icon-shape p,#chatgpt-mermaid-\_r_2mf\_ .image-shape p{background-color:rgb(252, 252, 252);padding:2px;}#chatgpt-mermaid-\_r_2mf\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_2mf\_ .image-shape .label rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_2mf\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_2mf\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_2mf\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_2mf\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_2mf\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_2mf\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_2mf\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_2mf\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_2mf\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_2mf\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_2mf\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_2mf\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_2mf\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_2mf\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_2mf\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_2mf\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_2mf\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_2mf\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_2mf\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_2mf\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_2mf\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_2mf\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_2mf\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_2mf\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_2mf\_ .node rect,#chatgpt-mermaid-\_r_2mf\_ .node circle,#chatgpt-mermaid-\_r_2mf\_ .node ellipse,#chatgpt-mermaid-\_r_2mf\_ .node polygon,#chatgpt-mermaid-\_r_2mf\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_2mf\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_2mf\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_2mf\_ .edgePaths .flowchart-link{stroke:rgb(143, 143, 143);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_2mf\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_2mf\_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}Start PhaseRead PRD and TechnicalReferencesInspect RepositoryExecute Phase TasksRun Required TestsAcceptance Criteria Passed?Fix IssuesReview ChangesCreate Git CheckpointSubmit Phase ReportUser Approval?WaitStart Next PhaseNoYesNoYes

## D.4 Commit Rules

Jangan melakukan commit apabila:

- Testing belum dijalankan.
- Acceptance criteria belum dipenuhi.
- Terdapat perubahan yang belum direview.
- Ada secret dalam perubahan.
- Terdapat file konfigurasi yang tidak seharusnya masuk repository.

Gunakan:

```
git status

git diff

git diff --check

git add .

git commit -m "phase X: description"
```

## D.5 Rollback Strategy

Jika phase menyebabkan kerusakan:

```
git log --oneline
```

Jika perubahan belum di-commit:

```
git restore .
```

Jika ingin kembali ke checkpoint tertentu, review terlebih dahulu sebelum menjalankan reset.

Jangan menjalankan destructive Git command tanpa memastikan perubahan yang akan hilang.

# PART E — COMMAND CHEAT SHEET

## E.1 Development

```
npm run dev
```

## E.2 Production Build

```
npm run build
npm run start
```

## E.3 Lint

```
npm run lint
```

## E.4 Type Checking

```
npx tsc --noEmit
```

## E.5 Prisma

```
npx prisma init

npx prisma generate

npx prisma migrate dev --name init

npx prisma migrate deploy

npx prisma studio

npx prisma validate
```

## E.6 Testing

```
npx vitest run

npx playwright test
```

## E.7 Git

```
git status

git add .

git commit -m "phase X: description"

git log --oneline
```

## E.8 Dependency Management

Install:

```
npm install package-name
```

Development dependency:

```
npm install -D package-name
```

Remove:

```
npm uninstall package-name
```

Check:

```
npm ls
```

## E.9 Security

```
npm audit
```

# PART F — FINAL CHECKLIST & DOCUMENTATION

## F.1 Project Documentation Structure

Pada akhir development, struktur dokumentasi yang diharapkan:

```
contentpilot/
│
├── PROJECT_PRD_AND_PLAYBOOK.md
├── TECHNICAL_PLAN.md
├── UI_UX_GUIDE.md
├── TEST_REPORT.md
├── DEPLOYMENT_GUIDE.md
├── RELEASE_NOTES.md
│
├── docs/
│   ├── architecture/
│   ├── design/
│   └── api/
│
├── prisma/
│   └── schema.prisma
│
├── public/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   └── types/
│
├── tests/
│
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── next.config.ts
```

## F.2 Final Product Checklist

### Authentication

- Registration.
- Login.
- Logout.
- Session management.
- Protected routes.

### Dashboard

- Statistics.
- Upcoming content.
- Recent content.
- Quick actions.

### Content Management

- Create content.
- Edit content.
- Delete content.
- View content.
- Search content.
- Filter content.
- Change status.

### Content Ideas

- Create idea.
- Edit idea.
- Delete idea.
- Change idea status.
- Convert idea to content.

### AI Caption Generator

- Topic input.
- Platform selection.
- Audience input.
- Tone selection.
- Language selection.
- Caption generation.
- Hashtag generation.
- CTA generation.
- Copy caption.
- Save caption.

### Calendar

- Monthly view.
- Weekly view.
- Date navigation.
- Scheduled content.
- Platform filtering.
- Status indicator.

### Security

- Server-side authentication.
- Authorization.
- Ownership validation.
- Input validation.
- API key protection.
- Rate limiting.
- Error handling.

### Production

- Production build.
- Production database.
- Domain.
- HTTPS.
- Monitoring.
- Backup.
- Smoke testing.
- Release notes.

## F.3 Development Phase Tracker

Gunakan tracker berikut untuk memantau perkembangan.

ContentPilot Development Progress

# 0/10

0% completed

Phase 1

Environment & Project Bootstrap

Phase 2

Technical Planning & Architecture

Phase 3

UI/UX Planning & Design System

Phase 4

Frontend Foundation & Application Shell

Phase 5

Core Frontend Feature Development

Phase 6

Backend & Core Business Logic

Phase 7

Frontend & Backend Integration

Phase 8

Additional Features & Product Completion

Phase 9

Testing, Security & Optimization

Phase 10

Production Deployment & Release

Reset tracker

Tracker ini hanya untuk checklist sesi percakapan, bukan penyimpanan status development di repository.

## F.4 Final Release Criteria

ContentPilot dapat dinyatakan siap digunakan apabila:

1. Seluruh fitur P0 berfungsi.
2. Seluruh core flow berjalan end-to-end.
3. AI generation menggunakan provider nyata.
4. Database menyimpan data secara persisten.
5. Data antar-user terisolasi.
6. Tidak ada critical security issue yang belum ditangani.
7. Responsive UI berfungsi.
8. Automated tests berhasil.
9. Production build berhasil.
10. Production deployment telah diverifikasi.
11. Backup dan monitoring tersedia.
12. Dokumentasi deployment dan release tersedia.

# PENUTUP — DEVELOPMENT EXECUTION STRATEGY

ContentPilot dikembangkan menggunakan pendekatan bertahap dengan 10 phase yang saling bergantung.

Urutan pengembangan:

| Phase | Fokus        | Output Utama           |
| ----- | ------------ | ---------------------- |
| 1     | Bootstrap    | Next.js project        |
| 2     | Architecture | TECHNICAL_PLAN.md      |
| 3     | Design       | UI_UX_GUIDE.md         |
| 4     | Foundation   | Application shell      |
| 5     | Frontend     | Core UI                |
| 6     | Backend      | API + Database + AI    |
| 7     | Integration  | End-to-end application |
| 8     | Completion   | Supporting features    |
| 9     | QA           | TEST_REPORT.md         |
| 10    | Release      | Production application |

Prinsip terpenting: Jangan terburu-buru membangun semua fitur sekaligus.

Untuk solo developer yang menggunakan AI Coding Assistant, keberhasilan project lebih ditentukan oleh pembagian pekerjaan, konsistensi arsitektur, verifikasi hasil, dan kontrol scope daripada kecepatan menghasilkan kode.

Rekomendasi urutan eksekusi:

1. Simpan dokumen ini sebagai `PROJECT_PRD_AND_PLAYBOOK.md` di root repository.
2. Jalankan prompt Phase 1 di VS Code.
3. Review perubahan dan hasil testing.
4. Buat Git checkpoint.
5. Lanjutkan Phase 2 hanya setelah Phase 1 disetujui.
6. Ulangi pola yang sama sampai Phase 10.

## ContentPilot MVP — Definition of Done

Pengguna dapat mendaftar, login, mencatat ide konten, membuat caption dengan AI, mengelola konten, mengatur jadwal publikasi, dan melihat semua rencana publikasinya melalui content calendar dalam satu aplikasi web.

Itulah MVP ContentPilot. Fitur auto-publishing, analytics, kolaborasi tim, dan monetisasi dapat dikembangkan setelah MVP stabil.
