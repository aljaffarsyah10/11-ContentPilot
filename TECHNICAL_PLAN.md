# TECHNICAL_PLAN.md — ContentPilot Architecture & Implementation Plan

> **Project:** ContentPilot  
> **Type:** Social Media Content Planning SaaS (MVP)  
> **Document Version:** 1.0.0  
> **Status:** APPROVED BASELINE (Phase 2)  
> **Source PRD:** `PRD and Playbook.md`

---

## 1. Architecture Overview

ContentPilot mengadopsi arsitektur **Modular Monolith** berbasis **Next.js App Router (Fullstack)**. Seluruh presentation, API backend, database access, dan integrasi pihak ketiga (AI & Authentication) berada dalam satu repository dan deployment unit, tetapi dipisahkan secara tegas ke dalam lapisan-lapisan (*layers*) yang terisolasi.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           Client Browser                                │
│        (React Server Components + Interactive Client Components)        │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ HTTP (fetch) / Server Actions
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        Next.js App Router API                           │
│                      (API Route Handlers / Edge)                        │
└──────────────────┬─────────────────┬─────────────────┬──────────────────┘
                   │                 │                 │
                   ▼                 ▼                 ▼
          ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
          │ Authentication │ │ Input/Schema   │ │ Application    │
          │ Server Session │ │ Validation     │ │ Services       │
          │ (Auth.js)      │ │ (Zod Schemas)  │ │ (Use Cases)    │
          └────────────────┘ └────────────────┘ └────────┬───────┘
                                                         │
                   ┌─────────────────────────────────────┴────────────┐
                   ▼                                                  ▼
          ┌────────────────┐                                ┌────────────────┐
          │ AI Provider    │                                │ Data Access    │
          │ Adapter        │                                │ Repository     │
          │ (OpenAI SDK)   │                                │ (Prisma ORM)   │
          └────────┬───────┘                                └────────┬───────┘
                   │                                                 │
                   ▼                                                 ▼
          ┌────────────────┐                                ┌────────────────┐
          │   OpenAI API   │                                │   PostgreSQL   │
          │ (External AI)  │                                │   (Database)   │
          └────────────────┘                                └────────────────┘
```

### Prinsip Utama Arsitektur:
1. **MVP-First & Pragmatic Clean Architecture:** Memisahkan concerns tanpa menciptakan over-engineering atau layer abstraksi yang tidak diperlukan.
2. **Strict User Ownership Isolation:** Setiap query data baca/tulis diikat langsung dengan `userId` dari session server. Tidak ada query data tanpa relasi `userId`.
3. **Provider Decoupling:** AI provider dibungkus oleh antarmuka generic (`AIProvider`), sehingga provider OpenAI dapat diganti di masa depan tanpa mengubah use case service.
4. **Zero Background Workers in MVP:** MVP berfokus pada penjadwalan konten kalender secara deklaratif (display & management) tanpa job scheduler atau queue background.

---

## 2. Technology Decisions

| Kategori | Teknologi Terpilih | Alasan & Justifikasi Teknis |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Single runtime untuk SSR/RSC, client UI, dan Route Handlers. Mengeliminasi overhead maintenance repositori frontend & backend terpisah. |
| **Bahasa** | TypeScript 5 (Strict Mode) | Memberikan type safety menyeluruh dari database model (Prisma), DTO API, hingga komponen UI. |
| **Styling** | Tailwind CSS v4 | Styling berbasis utilitas modern, kompilasi cepat via Turbopack engine, konsisten dengan design system shadcn/ui. |
| **UI Components** | shadcn/ui + Lucide React | Komponen accessible (Radix/Base-UI), headless, copy-paste ownership tanpa black-box dependency styling. |
| **Database** | PostgreSQL 16+ | Penyimpanan ACID relasional untuk User, Content, Ideas, Calendar, dan AI Generation logs. |
| **ORM** | Prisma ORM | Type-safe query builder, deklaratif schema migrations, dan integrasi mudah dengan Next.js Server Components / Handlers. |
| **Authentication** | Auth.js (NextAuth v5) | Solusi standar industri untuk auth Next.js App Router; mendukung Credentials provider (email/password) dan OAuth provider. |
| **Validation** | Zod v4 | Schema validation di boundary API (request body, query params) dan form input di client via `@hookform/resolvers`. |
| **Forms** | React Hook Form | Manajemen controlled/uncontrolled forms yang efisien dengan minimal re-rendering. |
| **AI Integration** | OpenAI API (Adapter Pattern) | Model `gpt-4o-mini` / `gpt-4o` dengan structured JSON output, diakses strictly dari server-side via generic adapter. |
| **Date Handling** | date-fns v4 | Manipulasi tanggal, timezone parsing, dan kalkulasi grid kalender yang modular dan tree-shakeable. |
| **Notifications** | Sonner | Toast notification modern, responsif, dan mudah dipanggil dari client component mana pun. |
| **Testing** | Vitest + Playwright | Vitest untuk unit/integration tests yang super cepat; Playwright untuk E2E browser automation. |

---

## 3. Folder Structure

Struktur direktori mengkombinasikan Next.js App Router route groups dengan feature-based architecture:

```
contentpilot/
├── docs/                               # Dokumentasi teknis, flow, & arsitektur
├── prisma/
│   ├── schema.prisma                   # Single source of truth database schema
│   ├── seed.ts                         # Development seed script
│   └── migrations/                     # Prisma migration history
├── public/                             # Static assets (icons, logo, favicon)
├── src/
│   ├── app/
│   │   ├── (public)/                   # Route group: Landing page, legal, docs
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (auth)/                     # Route group: Login, Register, Forgot Password
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/                # Route group: Protected user workspace
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx            # Ringkasan statistik & jadwal terdekat
│   │   │   ├── contents/
│   │   │   │   ├── page.tsx            # List konten & filter status
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx        # Editor pembuatan konten baru
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx        # Detail & edit konten
│   │   │   ├── ideas/
│   │   │   │   └── page.tsx            # Ideation board & convert to content
│   │   │   ├── calendar/
│   │   │   │   └── page.tsx            # Kalender bulanan & mingguan
│   │   │   ├── ai-generator/
│   │   │   │   └── page.tsx            # AI Caption & Hashtag Generator
│   │   │   └── layout.tsx              # Sidebar, Header, User Profile Layout
│   │   ├── api/                        # Backend REST Route Handlers
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── dashboard/
│   │   │   │   └── route.ts
│   │   │   ├── contents/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── ideas/
│   │   │   │   ├── route.ts
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── [id]/convert/
│   │   │   │       └── route.ts
│   │   │   ├── calendar/
│   │   │   │   └── route.ts
│   │   │   └── ai/
│   │   │       └── generate-caption/
│   │   │           └── route.ts
│   │   ├── layout.tsx                  # Root layout (Fonts, Providers, Toaster)
│   │   └── globals.css                 # Tailwind v4 theme variables
│   │
│   ├── components/
│   │   ├── ui/                         # shadcn/ui atoms (button, input, modal, dll)
│   │   ├── layout/                     # Sidebar, AppHeader, MobileNav, Breadcrumbs
│   │   └── shared/                     # EmptyState, ConfirmDialog, StatCard, DataTable
│   │
│   ├── features/                       # Feature-specific UI components & sub-hooks
│   │   ├── auth/                       # LoginForm, RegisterForm, AuthCard
│   │   ├── dashboard/                  # DashboardMetrics, UpcomingContentList
│   │   ├── contents/                   # ContentEditor, ContentTable, PlatformBadge
│   │   ├── ideas/                      # IdeaCard, IdeaFormDialog, ConvertIdeaModal
│   │   ├── calendar/                   # CalendarGrid, CalendarHeader, DayCell, EventCard
│   │   └── ai-generator/               # CaptionGeneratorForm, OutputVariantList, HashtagList
│   │
│   ├── services/                       # Application Business Use Cases (Pure Node/TS)
│   │   ├── content.service.ts          # Content CRUD, scheduling, validation
│   │   ├── idea.service.ts             # Idea CRUD, conversion logic
│   │   ├── calendar.service.ts         # Date range queries & calendar aggregations
│   │   ├── dashboard.service.ts        # Metrics, statistics & recent activity
│   │   └── ai-caption.service.ts       # Orchestrator for caption generation & quotas
│   │
│   ├── lib/
│   │   ├── auth/                       # Auth.js configuration, callbacks, options
│   │   │   ├── auth.ts
│   │   │   └── session.ts              # getServerSession helper & ownership validator
│   │   ├── db/
│   │   │   └── prisma.ts               # Global Prisma Client instance (singleton)
│   │   ├── ai/
│   │   │   ├── ai-provider.interface.ts # Generic AI Provider contract
│   │   │   └── openai.adapter.ts       # OpenAI API SDK implementation
│   │   ├── validation/                 # Zod validation schemas
│   │   │   ├── content.schema.ts
│   │   │   ├── idea.schema.ts
│   │   │   ├── ai.schema.ts
│   │   │   └── auth.schema.ts
│   │   ├── error/                      # Custom App Errors & HTTP Error mapper
│   │   │   └── api-error.ts
│   │   └── utils.ts                    # ClassNames merging, date formatters
│   │
│   ├── types/                          # Shared TypeScript types & interfaces
│   │   ├── api.types.ts                # API Response envelope & pagination
│   │   ├── content.types.ts
│   │   ├── idea.types.ts
│   │   ├── calendar.types.ts
│   │   └── ai.types.ts
│   │
│   └── hooks/                          # Reusable UI custom hooks
│       ├── use-debounced-search.ts
│       ├── use-calendar-navigation.ts
│       └── use-copy-to-clipboard.ts
│
├── .env.example
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── PRD and Playbook.md
├── README.md
├── TECHNICAL_PLAN.md
└── tsconfig.json
```

---

## 4. Application Layers & Data Flow

Sistem dibagi menjadi 5 layer independen dengan alur komunikasi satu arah:

1. **Presentation Layer (`src/app/`, `src/components/`, `src/features/`):**
   - Bertanggung jawab merender UI, visual feedback, penanganan form state, toast notifications.
   - Tidak melakukan direct database call atau memproses business logic kompleks.
   - Mengonsumsi data melalui API Handlers atau Server Components.

2. **API Boundary Layer (`src/app/api/`):**
   - Menangani HTTP incoming request, parsing params & headers.
   - Memeriksa autentikasi session via `getServerSession()`.
   - Menjalankan schema validation Zod terhadap request body / query parameters.
   - Meneruskan data yang sudah valid ke Application Services.
   - Mengembalikan response JSON standar dan memetakan error ke HTTP status codes.

3. **Application & Business Logic Layer (`src/services/`):**
   - Mengimplementasikan seluruh use case aplikasi (e.g. `createContent`, `scheduleContent`, `convertIdeaToContent`, `generateCaptions`).
   - Menerapkan aturan bisnis: validasi kepemilikan data, transisi status konten (`DRAFT` → `SCHEDULED` → `PUBLISHED`), batas jadwal waktu.
   - Bebas dari referensi HTTP (tidak memanggil `NextRequest` atau `Response` langsung), memudahkan unit testing.

4. **Data Access Layer (`src/lib/db/`, Prisma):**
   - Menghubungkan logika bisnis dengan PostgreSQL database via Prisma client.
   - Memastikan semua query memiliki filter scoped `userId`.
   - Mengelola transactions untuk operasi atomik (misal: convert ide menjadi konten sekaligus update status ide).

5. **Infrastructure & External Adapter Layer (`src/lib/ai/`, `src/lib/auth/`):**
   - Berisi adapter untuk third-party service: OpenAI API client, Auth.js credential hashing (bcrypt/argon2).
   - Terisolasi di balik interface generic.

---

## 5. Database Design & Prisma Schema

### 5.1 Entities and Enums

```prisma
// datasource and generator
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// --------------------------------------------------------------------------
// Enums
// --------------------------------------------------------------------------

enum SocialPlatform {
  INSTAGRAM
  FACEBOOK
  TIKTOK
  LINKEDIN
  X
  YOUTUBE
}

enum ContentStatus {
  DRAFT
  SCHEDULED
  PUBLISHED
}

enum IdeaStatus {
  NEW
  IN_PROGRESS
  USED
  ARCHIVED
}

// --------------------------------------------------------------------------
// Authentication Models (Auth.js Compatible)
// --------------------------------------------------------------------------

model User {
  id            String          @id @default(cuid())
  name          String?
  email         String          @unique
  emailVerified DateTime?
  image         String?
  passwordHash  String?
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt

  accounts      Account[]
  sessions      Session[]
  contents      Content[]
  ideas         ContentIdea[]
  aiGenerations AIGeneration[]

  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

// --------------------------------------------------------------------------
// Domain Models
// --------------------------------------------------------------------------

model Content {
  id          String         @id @default(cuid())
  userId      String
  title       String         @db.VarChar(150)
  caption     String?        @db.Text
  hashtags    String[]       @default([])
  platform    SocialPlatform
  status      ContentStatus  @default(DRAFT)
  scheduledAt DateTime?
  notes       String?        @db.Text
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt

  // Relasi opsional ke ide asal
  originIdeaId String?
  originIdea   ContentIdea?  @relation(fields: [originIdeaId], references: [id], onDelete: SetNull)

  user        User           @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([userId, status])
  @@index([userId, scheduledAt])
  @@index([userId, platform])
  @@map("contents")
}

model ContentIdea {
  id          String     @id @default(cuid())
  userId      String
  title       String     @db.VarChar(200)
  description String?    @db.Text
  status      IdeaStatus @default(NEW)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  contents    Content[]
  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([userId, status])
  @@map("content_ideas")
}

model AIGeneration {
  id          String         @id @default(cuid())
  userId      String
  platform    SocialPlatform
  topic       String         @db.VarChar(300)
  tone        String         @db.VarChar(50)
  language    String         @db.VarChar(20)
  captionCount Int           @default(1)
  createdAt   DateTime       @default(now())

  user        User           @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([userId, createdAt])
  @@map("ai_generations")
}
```

### 5.2 Kebijakan Timezone
- Seluruh kolom `DateTime` disimpan dalam format **UTC (`toISOString()`)** di database.
- Konversi ke timezone lokal pengguna (e.g. `Asia/Jakarta`, WIB/WITA/WIT) dilakukan pada Presentation Layer menggunakan `date-fns` dan Intl API browser.

---

## 6. Authentication Architecture

1. **Framework:** Auth.js v5 (NextAuth.js) dengan Prisma Adapter.
2. **Strategy:**
   - **Credentials Provider:** Login email & password (password di-hash menggunakan `bcryptjs` dengan minimum 12 rounds).
   - **Session Strategy:** JWT Session Strategy (stateless, efisien pada Next.js Server Components dan Route Handlers tanpa query session table di setiap request).
3. **Session Payload:**
   ```typescript
   export interface AppSessionUser {
     id: string;
     email: string;
     name?: string | null;
     image?: string | null;
   }
   ```
4. **Server Authentication Helper:**
   Helper `getCurrentUser()` memvalidasi token session dan mengembalikan data user terverifikasi. Jika session tidak valid, otomatis melempar `UnauthorizedError (401)`.
5. **Route Protection:**
   - Menggunakan Next.js Proxy/Middleware di `src/proxy.ts` atau `middleware.ts` untuk memproteksi path `/(dashboard)/:path*` dan redirect user unauthenticated ke `/login`.
   - API endpoints memvalidasi auth session langsung pada handler masing-masing.

---

## 7. API Design & Contracts

### 7.1 Standard Response Envelope

Seluruh response API mengadopsi format terstandarisasi:

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Resource retrieved successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      { "field": "title", "message": "Title is required" }
    ]
  }
}
```

### 7.2 Endpoint Specifications

| Method | Endpoint | Query / Body Params | Response Data | HTTP Codes |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/dashboard` | - | `stats`: totalContent, scheduledCount, draftCount, publishedCount, ideaCount; `upcoming`: Content[] | 200, 401 |
| **GET** | `/api/contents` | `search`, `status`, `platform`, `page`, `limit` | `items`: Content[], `meta`: { total, page, limit, totalPages } | 200, 401 |
| **POST** | `/api/contents` | `{ title, caption, hashtags, platform, status, scheduledAt, notes, originIdeaId? }` | Content (created) | 201, 400, 401 |
| **GET** | `/api/contents/[id]` | - | Content | 200, 401, 404 |
| **PATCH** | `/api/contents/[id]` | `{ title?, caption?, hashtags?, platform?, status?, scheduledAt?, notes? }` | Content (updated) | 200, 400, 401, 404 |
| **DELETE** | `/api/contents/[id]` | - | `{ id: string }` | 200, 401, 404 |
| **GET** | `/api/ideas` | `search`, `status`, `page`, `limit` | `items`: ContentIdea[], `meta`: pagination | 200, 401 |
| **POST** | `/api/ideas` | `{ title, description? }` | ContentIdea (created) | 201, 400, 401 |
| **PATCH** | `/api/ideas/[id]` | `{ title?, description?, status? }` | ContentIdea (updated) | 200, 400, 401, 404 |
| **DELETE** | `/api/ideas/[id]` | - | `{ id: string }` | 200, 401, 404 |
| **POST** | `/api/ideas/[id]/convert`| `{ platform, scheduledAt? }` | Content (created with originIdeaId linked) | 201, 400, 401, 404 |
| **GET** | `/api/calendar` | `startDate`, `endDate`, `platform?` | Content[] (yang scheduledAt berada dalam rentang tanggal) | 200, 400, 401 |
| **POST** | `/api/ai/generate-caption`| `{ topic, platform, tone, language, length, audience?, additionalInstructions? }` | `{ captions: [{ caption, hashtags, callToAction }] }` | 200, 400, 401, 429, 502 |

---

## 8. AI Integration Architecture

### 8.1 Provider Abstraction Interface

```typescript
// src/lib/ai/ai-provider.interface.ts

export type CaptionTone = "professional" | "casual" | "humorous" | "inspirational" | "persuasive" | "educational";
export type CaptionLength = "short" | "medium" | "long";

export interface CaptionGenerationInput {
  topic: string;
  platform: SocialPlatform;
  tone: CaptionTone | string;
  language: "indonesian" | "english" | string;
  length: CaptionLength;
  audience?: string;
  additionalInstructions?: string;
  variantCount?: number; // default 3 variants
}

export interface GeneratedCaptionVariant {
  caption: string;
  hashtags: string[];
  callToAction?: string;
}

export interface CaptionGenerationResult {
  captions: GeneratedCaptionVariant[];
  usage: {
    totalTokens: number;
    promptTokens: number;
    completionTokens: number;
  };
}

export interface AIProvider {
  generateCaptions(input: CaptionGenerationInput): Promise<CaptionGenerationResult>;
}
```

### 8.2 OpenAI Adapter Implementation Policy
1. **Server-Side Exclusivity:** OpenAI API key hanya diakses dari runtime Node.js server. `NEXT_PUBLIC_` dilarang untuk AI keys.
2. **Structured Outputs:** Menggunakan JSON Mode (`response_format: { type: "json_object" }`) yang divalidasi dengan Zod schema parser sebelum dikembalikan ke caller.
3. **Safety & Fallback:**
   - Request timeout diatur maksimum 25 detik.
   - Jika parsing JSON output AI gagal, adapter mengulangi 1 kali atau melempar `AIProviderError` dengan pesan human-readable.
4. **Audit Logging:** Setiap keberhasilan generasi dicatat di tabel `AIGeneration` (hanya metadata: topic, platform, tone, timestamp; tidak menyimpan API keys atau data sensitif).

---

## 9. Validation Strategy

Semua request divalidasi di boundary menggunakan **Zod**:

```typescript
// src/lib/validation/content.schema.ts
import { z } from "zod";

export const createContentSchema = z.object({
  title: z.string().trim().min(1, "Judul wajib diisi").max(150, "Maksimal 150 karakter"),
  caption: z.string().max(10000).optional().nullable(),
  hashtags: z.array(z.string().trim().regex(/^#?[\w\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/, "Format hashtag tidak valid")).default([]),
  platform: z.enum(["INSTAGRAM", "FACEBOOK", "TIKTOK", "LINKEDIN", "X", "YOUTUBE"]),
  status: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED"]).default("DRAFT"),
  scheduledAt: z.string().datetime({ offset: true }).nullable().optional().refine(val => {
    if (!val) return true;
    return new Date(val) > new Date();
  }, { message: "Jadwal tayang harus di masa depan" }),
  notes: z.string().max(2000).optional().nullable(),
  originIdeaId: z.string().cuid().optional().nullable(),
});

export const updateContentSchema = createContentSchema.partial();
```

```typescript
// src/lib/validation/ai.schema.ts
import { z } from "zod";

export const generateCaptionInputSchema = z.object({
  topic: z.string().trim().min(3, "Topik minimal 3 karakter").max(300, "Topik maksimal 300 karakter"),
  platform: z.enum(["INSTAGRAM", "FACEBOOK", "TIKTOK", "LINKEDIN", "X", "YOUTUBE"]),
  tone: z.enum(["professional", "casual", "humorous", "inspirational", "persuasive", "educational"]).default("casual"),
  language: z.enum(["indonesian", "english"]).default("indonesian"),
  length: z.enum(["short", "medium", "long"]).default("medium"),
  audience: z.string().trim().max(100).optional(),
  additionalInstructions: z.string().trim().max(500).optional(),
});
```

---

## 10. Security Architecture

1. **Authentication & Session:**
   - Session disimpan dalam HttpOnly, Secure, SameSite=Lax cookie.
   - Tidak ada token rahasia yang disimpan dalam `localStorage` atau `sessionStorage`.
2. **Authorization & Data Ownership Enforcement:**
   - Tidak pernah menerima `userId` dari request body client.
   - Seluruh Prisma query di-scope ke session server:
     ```typescript
     const content = await prisma.content.findFirst({
       where: { id, userId: session.user.id },
     });
     if (!content) throw new NotFoundError("Konten tidak ditemukan");
     ```
3. **AI Rate Limiting (Pencegahan Abuse):**
   - Batas generasi AI: maksimum 10 request per user per 10 menit pada MVP.
   - Validasi panjang prompt input (maks 300 karakter).
4. **Data Sanitization & Injection Defense:**
   - Input disanitasi dari null-byte dan trimmed.
   - Prisma parameterized queries melindungi secara native terhadap SQL Injection.
   - React JSX encoding melindungi secara native terhadap Cross-Site Scripting (XSS).

---

## 11. Error Handling Strategy

Standardized Error Classes di `src/lib/error/api-error.ts`:

```typescript
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code: string = "INTERNAL_ERROR",
    public details?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 400, "VALIDATION_ERROR", details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Forbidden") {
    super(message, 403, "FORBIDDEN");
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, 404, "NOT_FOUND");
  }
}

export class AIProviderError extends AppError {
  constructor(message: string = "AI provider service error") {
    super(message, 502, "AI_PROVIDER_ERROR");
  }
}
```

Centralized Error Handler (`handleApiError`) menerjemahkan exception menjadi payload JSON seragam, tanpa mengekspos stack trace atau error internal database ke client di production.

---

## 12. Environment Variables

Berikut adalah spesifikasi file `.env`:

| Variable | Required | Deskripsi | Contoh Nilai |
| :--- | :--- | :--- | :--- |
| `NODE_ENV` | Ya | Environment runtime | `development` / `production` |
| `DATABASE_URL` | Ya | PostgreSQL Connection String | `postgresql://postgres:pass@localhost:5432/contentpilot?schema=public` |
| `AUTH_SECRET` | Ya | Secret key untuk enkripsi JWT session Auth.js | `openssl rand -hex 32` |
| `AUTH_URL` | Ya | Canonical base URL aplikasi | `http://localhost:3000` |
| `OPENAI_API_KEY` | Ya (Phase 6+) | API Key dari OpenAI Platform | `sk-proj-...` |
| `OPENAI_MODEL` | Tidak | Model OpenAI yang digunakan | `gpt-4o-mini` (default) |
| `NEXT_PUBLIC_APP_URL` | Tidak | Public URL untuk client redirects | `http://localhost:3000` |

---

## 13. Deployment Architecture

### 13.1 Deployment Mode (VPS / Docker / PaaS)
- **Target Runtime:** Node.js 22 LTS dalam mode Standalone Build (`output: 'standalone'` di `next.config.ts`).
- **Database:** Managed PostgreSQL (e.g., Supabase / Neon / Self-hosted PostgreSQL on VPS).
- **Process Manager:** PM2 atau Docker container dengan reverse proxy NGINX + SSL Certbot Let's Encrypt.
- **CI/CD Pipeline:**
  1. `npm run lint`
  2. `npx tsc --noEmit`
  3. `npx prisma validate`
  4. `npm run build`
  5. `npx prisma migrate deploy`
  6. Zero-downtime container restart / PM2 reload.

---

## 14. Technical Risks & Mitigation

| No | Risiko Teknis | Dampak | Strategi Mitigasi Terencana |
| :--- | :--- | :--- | :--- |
| 1 | **AI Latency & Timeout** | Request timeout jika OpenAI mengalami antrean (cold start / latency) | Mengatur abort timeout 25s, loading skeleton informatif pada UI, fallback retry manual. |
| 2 | **Format Output AI Tidak Konsisten** | Gagal parsing JSON / UI crash | Menggunakan `json_object` format pada API call dan validasi Zod schema parser pada response adapter. |
| 3 | **AI Cost Spikes** | Penggunaan token berlebih jika user melakukan spam | Rate limit 10 request per user per 10 menit, default model hemat biaya `gpt-4o-mini`, max completion tokens dibatasi. |
| 4 | **Perbedaan Timezone pada Jadwal Kalender** | Konten tampil di tanggal/jam yang keliru antara server dan browser user | Semua data jadwal disimpan murni dalam UTC format di DB; formatting UI menggunakan timezone lokal browser client. |
| 5 | **Database Connection Exhaustion** | Koneksi PostgreSQL habis pada concurrent serverless / handler requests | Singleton Prisma client instance pada Node.js lifecycle; konfigurasi connection pool limit pada `DATABASE_URL`. |
| 6 | **Data Leakage Antar User** | User A dapat membaca atau mengedit konten milik User B | Enforce ownership validation (`userId: session.user.id`) pada semua query Prisma di Service Layer. |

