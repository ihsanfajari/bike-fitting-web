# Backlog MVP — GowesFit Marketplace (Master)

**Dibuat:** 2026-04-27
**Last updated:** 2026-05-03
**Referensi:** PRD v1.0 | ERD v1.0 | Dev Checklist | Diskusi Monetisasi & Pengiriman & Value Prop
**Target launch:** ~16–18 minggu dari mulai development
**Status:** Pre-development

> **Single source of truth** untuk semua backlog MVP — development debt, bisnis, monetisasi, dan diferensiasi.

---

## Dokumen Pendukung

| Dokumen | Isi |
|---------|-----|
| [simulasi-roi-mvp.md](simulasi-roi-mvp.md) | Simulasi revenue, cost, profit/loss, break-even point |
| [modal-minimum-launch.md](modal-minimum-launch.md) | Breakdown modal minimum untuk launch (~Rp 7 juta minimum) |
| [value-proposition-analysis.md](value-proposition-analysis.md) | Diferensiasi 7 pillar + analisis kompetitor |
| [../notes/PRD-marketplace-sepeda-MVP.md](../notes/PRD-marketplace-sepeda-MVP.md) | PRD lengkap — 33 layar, user flow |
| [../notes/ERD-marketplace-sepeda.md](../notes/ERD-marketplace-sepeda.md) | Database schema 20 tabel |
| [../notes/owner-discussion-followup.md](../notes/owner-discussion-followup.md) | Topik diskusi dengan owner |

---

## Cara Baca Dokumen

- **ID**: kode unik tiap item
- **Prioritas**: `🔴 Blocker` `🟠 Tinggi` `🟡 Menengah` `🟢 Rendah / Post-MVP`
- **Effort**: `S` (< 1 hari) `M` (1–3 hari) `L` (3–7 hari) `XL` (> 1 minggu)
- **Tipe**: `[DEV]` development `[BIZ]` bisnis/operasional `[LEGAL]` legal/compliance
- **Status**: `⬜ Belum` belum dimulai · `🔄 Jalan` sedang dikerjakan · `✅ Selesai` sudah selesai · `⏸️ Ditunda` ditunda/blocked

---

# BAGIAN A — BACKLOG BISNIS

## A.1 Pre-Development Blockers (Wajib Selesai Sebelum Coding)

| ID | Tipe | Item | PIC | Prioritas | Status |
|----|------|------|-----|-----------|--------|
| PRE-01 | [BIZ] | Sepakati model kerja sama: co-owner (equity) vs vendor (fee) | Owner + Dev | 🔴 Blocker | ⬜ Belum |
| PRE-02 | [LEGAL] | Tandatangani perjanjian / kontrak sebelum satu baris kode ditulis | Owner + Dev | 🔴 Blocker | ⬜ Belum |
| PRE-03 | [LEGAL] | Bentuk badan usaha (PT atau CV) — syarat Midtrans production | Owner | 🔴 Blocker | ⬜ Belum |
| PRE-04 | [BIZ] | Daftar akun Midtrans merchant (approval 2–4 minggu) | Owner | 🔴 Blocker | ⬜ Belum |
| PRE-05 | [LEGAL] | Buat Privacy Policy & Terms of Service (UU PDP compliance) | Owner + Lawyer | 🟠 Tinggi | ⬜ Belum |
| PRE-06 | [BIZ] | Tentukan platform komunikasi kerja (WA/Slack/Notion) | Bersama | 🟠 Tinggi | ⬜ Belum |
| PRE-07 | [BIZ] | Modal awal disiapkan: minimum Rp 7 juta (lihat modal-minimum-launch.md) | Owner | 🔴 Blocker | ⬜ Belum |
| PRE-08 | [BIZ] | Beli domain (.com + .id) | Owner | 🟠 Tinggi | ⬜ Belum |

## A.2 Validasi Bisnis Pre-MVP (Customer Research)

| ID | Tipe | Item | Effort | Prioritas | Status |
|----|------|------|--------|-----------|--------|
| BIZ-RES-01 | [BIZ] | Buat interview script 15 goweser (5 seller, 5 buyer, 5 keduanya) | S | 🟠 Tinggi | ⬜ Belum |
| BIZ-RES-02 | [BIZ] | Lakukan 15 customer interview — pain point, willingness to pay | L | 🟠 Tinggi | ⬜ Belum |
| BIZ-RES-03 | [BIZ] | Validasi: apakah seller mau bayar fee 1% atau lebih? | M | 🟠 Tinggi | ⬜ Belum |
| BIZ-RES-04 | [BIZ] | Validasi: apakah buyer paham nilai biaya admin Rp 10–15rb? | M | 🟠 Tinggi | ⬜ Belum |
| BIZ-RES-05 | [BIZ] | Validasi: apakah fitur Bike Recommendation menarik untuk pemula? | M | 🟠 Tinggi | ⬜ Belum |
| BIZ-RES-06 | [BIZ] | Analisis kompetitor: OLX, Tokopedia, FB Groups | M | 🟡 Menengah | ⬜ Belum |
| BIZ-RES-07 | [BIZ] | Dokumentasikan findings di `notes/customer-research-findings.md` | S | 🟠 Tinggi | ⬜ Belum |

## A.3 Strategi Monetisasi & Aktivasi

| ID | Tipe | Item | Kapan Aktif | Prioritas | Status |
|----|------|------|-------------|-----------|--------|
| MON-01 | [BIZ] | **Transaction fee 1.5–2%** (validasi via research dulu) min Rp 5.000 | Bulan 2 | 🔴 Blocker | ⬜ Belum |
| MON-02 | [BIZ] | **Featured Listing / Boost** Rp 25.000/7 hari (margin 84% — driver profit utama) | Bulan 2–3 | 🟠 Tinggi | ⬜ Belum |
| MON-03 | [BIZ] | **Listing Fee** Rp 10.000/listing (opsional — fast-track publish) | Bulan 2 | 🟡 Menengah | ⬜ Belum |
| MON-04 | [BIZ] | **Seller Subscription** Rp 49.000/bulan (margin 92%) | Bulan 4+ | 🟢 Post-MVP | ⬜ Belum |
| MON-05 | [BIZ] | Strategi: bebankan biaya admin transparan ke buyer (Rp 10–15rb) bukan ke seller | Sejak bulan 2 | 🟠 Tinggi | ⬜ Belum |

> ⚠️ **Insight kritis dari simulasi ROI**: fee 1% rugi ~Rp 37rb per transaksi karena cost Midtrans ~1.5% + flat fee. **Naikkan ke 2% atau bebankan ke buyer.**

## A.4 Anti-Bypass Platform (Cegah COD di Luar)

| ID | Tipe | Item | Effort | Prioritas | Status |
|----|------|------|--------|-----------|--------|
| TRUST-01 | [BIZ] | Sembunyikan nomor HP seller — partial mask, full hanya setelah order | M | 🟠 Tinggi | ⬜ Belum |
| TRUST-02 | [BIZ] | Buyer Protection Messaging di listing detail | S | 🟠 Tinggi | ⬜ Belum |
| TRUST-03 | [BIZ] | Rating & badge "X transaksi sukses" hanya dari transaksi on-platform | M | 🟠 Tinggi | ⬜ Belum |
| TRUST-04 | [BIZ] | Watermark foto listing dengan logo GowesFit | S | 🟡 Menengah | ⬜ Belum |
| TRUST-05 | [BIZ] | Chat in-app (default), redirect ke WA dimatikan | M | 🟡 Menengah | ⬜ Belum |

## A.5 Diferensiasi & Value Proposition (Moat)

| ID | Tipe | Item | Phase | Prioritas | Status |
|----|------|------|-------|-----------|--------|
| DIFF-01 | [BIZ] | **Bike Recommendation Level 1** — rule-based sizing (input tinggi+inseam → filter sepeda yang fit) | **MVP** | 🟠 Tinggi | ⬜ Belum |
| DIFF-02 | [BIZ] | Spec-rich filter (frame_size, groupset, material, year) — sudah di ERD | MVP | 🔴 Blocker | ⬜ Belum |
| DIFF-03 | [BIZ] | Komunitas-first onboarding (50 seller awal dari roadbike.co.id, FB Groups) | MVP | 🔴 Blocker | ⬜ Belum |
| DIFF-04 | [BIZ] | Verified Community Member badge | MVP | 🟡 Menengah | ⬜ Belum |
| DIFF-05 | [BIZ] | Manual review listing high-value (>Rp 20jt) | MVP | 🟠 Tinggi | ⬜ Belum |
| DIFF-06 | [BIZ] | Mulai collect data harga transaksi (untuk Price Valuation Tool nanti) | MVP | 🟡 Menengah | ⬜ Belum |
| DIFF-07 | [BIZ] | **Bike Fitting Tool ↔ Marketplace integration (Level 2: pose-based)** | Phase 2 | 🟢 Post-MVP | ⬜ Belum |
| DIFF-08 | [BIZ] | Verified Bike Listing badge (serial number verification) | Phase 2 | 🟢 Post-MVP | ⬜ Belum |
| DIFF-09 | [BIZ] | Bike Inspector Network (partner bengkel lokal) | Phase 3 | 🟢 Post-MVP | ⬜ Belum |
| DIFF-10 | [BIZ] | Bike Passport (ownership + service history) | Phase 3 | 🟢 Post-MVP | ⬜ Belum |
| DIFF-11 | [BIZ] | Price Valuation Tool (data-driven) | Phase 3 | 🟢 Post-MVP | ⬜ Belum |

## A.6 Marketing & Soft Launch

| ID | Tipe | Item | Effort | Prioritas | Status |
|----|------|------|--------|-----------|--------|
| MKT-01 | [BIZ] | Recruit 50 seller awal dari roadbike.co.id, FB Groups | XL | 🔴 Blocker | ⬜ Belum |
| MKT-02 | [BIZ] | Onboarding manual 50 seller pertama | L | 🔴 Blocker | ⬜ Belum |
| MKT-03 | [BIZ] | Konten visual untuk soft launch (foto, video pendek) | M | 🟠 Tinggi | ⬜ Belum |
| MKT-04 | [BIZ] | Tagline & messaging: "Marketplace yang tahu sepeda mana yang FIT untukmu" | S | 🟠 Tinggi | ⬜ Belum |
| MKT-05 | [BIZ] | Email sequence onboarding seller (D+0, D+3, D+7) | M | 🟡 Menengah | ⬜ Belum |
| MKT-06 | [BIZ] | Press release / kerja sama media komunitas (roadbike.co.id) | M | 🟡 Menengah | ⬜ Belum |

---

# BAGIAN B — BACKLOG DEVELOPMENT

## B.0 Infrastruktur & Setup

| ID | Tipe | Item | Effort | Prioritas | Status |
|----|------|------|--------|-----------|--------|
| M0-INF-01 | [DEV] | Setup PostgreSQL via Supabase Free Tier (local + staging) | S | 🔴 Blocker | ✅ Selesai |
| M0-INF-02 | [DEV] | Setup project Next.js 16 App Router untuk marketplace | M | 🔴 Blocker | ✅ Selesai |
| M0-INF-03 | [DEV] | Setup Prisma ORM + schema awal dari ERD (20 tabel) | L | 🔴 Blocker | ✅ Selesai |
| M0-INF-04 | [DEV] | Setup environment variables (.env.local, staging, production) | S | 🟠 Tinggi | 🔄 Jalan |
| M0-INF-05 | [DEV] | Setup hosting: VPS Hostinger Rp 60k/bulan ATAU Vercel Free Tier | S | 🟠 Tinggi | ⬜ Belum |
| M0-INF-06 | [DEV] | Setup CI/CD — GitHub Actions auto-deploy | S | 🟠 Tinggi | ⬜ Belum |
| M0-INF-07 | [DEV] | Setup Sentry untuk error tracking sejak awal | S | 🟡 Menengah | ⬜ Belum |
| M0-INF-08 | [DEV] | Setup Cloudflare DNS + SSL (gratis) | S | 🟠 Tinggi | ⬜ Belum |

## B.1 Auth & User Foundation

### Database
| ID | Item | Effort | Prioritas | Status |
|----|------|--------|-----------|--------|
| M1-DB-01 | Migrasi tabel: `users` (UUID PK, soft delete, balance, kyc_status) | S | 🔴 Blocker | ✅ Selesai |
| M1-DB-02 | Migrasi tabel: `otp_verifications` | S | 🔴 Blocker | ✅ Selesai |
| M1-DB-03 | Migrasi tabel: `addresses` (is_primary, partial unique index) | S | 🔴 Blocker | ✅ Selesai |
| M1-DB-04 | Migrasi tabel: `bank_accounts` | S | 🔴 Blocker | ✅ Selesai |
| M1-DB-05 | Seed admin user | S | 🟠 Tinggi | ✅ Selesai |
| M1-DB-06 | Tambah kolom `body_height_cm`, `inseam_cm`, `arm_reach_cm`, `flexibility_level` di `users` (untuk Bike Recommendation) | S | 🟠 Tinggi | ⬜ Belum |

### Backend API
| ID | Item | Effort | Prioritas | Status |
|----|------|--------|-----------|--------|
| M1-API-01 | `POST /api/auth/register` — email + password (bcrypt/argon2) | S | 🔴 Blocker | ⬜ Belum |
| M1-API-02 | `POST /api/auth/login` — JWT/session | S | 🔴 Blocker | ⬜ Belum |
| M1-API-03 | `POST /api/auth/google` — Google OAuth via NextAuth.js v5 | M | 🟠 Tinggi | ⬜ Belum |
| M1-API-04 | `POST /api/auth/otp/send` — Zenziva SMS / WhatsApp | M | 🔴 Blocker | ⬜ Belum |
| M1-API-05 | `POST /api/auth/otp/verify` — set `phone_verified_at`, rate limit | S | 🔴 Blocker | ⬜ Belum |
| M1-API-06 | `GET /api/users/me` | S | 🔴 Blocker | ⬜ Belum |
| M1-API-07 | `PUT /api/users/me` (termasuk body profile untuk recommendation) | S | 🟠 Tinggi | ⬜ Belum |
| M1-API-08 | `POST/PUT /api/users/me/addresses` | S | 🔴 Blocker | ⬜ Belum |
| M1-API-09 | `POST /api/users/me/bank-accounts` (validasi nama via Midtrans) | M | 🟠 Tinggi | ⬜ Belum |
| M1-API-10 | Rate limiting login + brute force protection | S | 🟠 Tinggi | ⬜ Belum |
| M1-API-11 | Middleware auth — proteksi protected routes | S | 🔴 Blocker | ⬜ Belum |

### Frontend
| ID | Item | Effort | Prioritas | Status |
|----|------|--------|-----------|--------|
| M1-FE-01 | Halaman Sign Up (email + Google OAuth) | M | 🔴 Blocker | ⬜ Belum |
| M1-FE-02 | Halaman Sign In | S | 🔴 Blocker | ⬜ Belum |
| M1-FE-03 | Halaman Verifikasi OTP | S | 🔴 Blocker | ⬜ Belum |
| M1-FE-04 | Halaman Edit Profil + body measurements (untuk Bike Recommendation) | M | 🟠 Tinggi | ⬜ Belum |
| M1-FE-05 | Halaman Manage Alamat | M | 🔴 Blocker | ⬜ Belum |
| M1-FE-06 | Optimize signup flow CRO | M | 🟠 Tinggi | ⬜ Belum |

## B.2 Listing System

### Database
| ID | Item | Effort | Prioritas | Status |
|----|------|--------|-----------|--------|
| M2-DB-01 | Migrasi tabel: `categories` (self-referencing, spec_schema JSONB) | S | 🔴 Blocker | ✅ Selesai |
| M2-DB-02 | Migrasi tabel: `listings` (extra_specs JSONB, soft delete) | M | 🔴 Blocker | ✅ Selesai |
| M2-DB-03 | Migrasi tabel: `listing_photos` | S | 🔴 Blocker | ✅ Selesai |
| M2-DB-04 | Setup PostgreSQL Full-Text Search (`tsvector` GENERATED column) | M | 🟠 Tinggi | ⬜ Belum |
| M2-DB-05 | Seed 7 root category + sub-kategori sesuai PRD | M | 🔴 Blocker | ✅ Selesai |
| M2-DB-06 | Seed `spec_schema` per kategori | M | 🟠 Tinggi | ⬜ Belum |
| M2-DB-07 | Tambah field `recommended_height_min_cm`, `recommended_height_max_cm`, `recommended_inseam_min_cm`, `recommended_inseam_max_cm` di listings sepeda utuh | S | 🟠 Tinggi | ⬜ Belum |
| M2-DB-08 | Seed sizing chart per merek/tipe (untuk Bike Recommendation Level 1) | M | 🟠 Tinggi | ⬜ Belum |

### Backend API
| ID | Item | Effort | Prioritas | Status |
|----|------|--------|-----------|--------|
| M2-API-01 | `GET /api/categories` | S | 🔴 Blocker | ⬜ Belum |
| M2-API-02 | `POST /api/listings` (draft) | M | 🔴 Blocker | ⬜ Belum |
| M2-API-03 | `PUT /api/listings/:id` (validasi ownership) | S | 🔴 Blocker | ⬜ Belum |
| M2-API-04 | `POST /api/listings/:id/publish` (wajib phone verified, min 3 foto) | S | 🔴 Blocker | ⬜ Belum |
| M2-API-05 | `POST /api/listings/:id/pause` | S | 🟠 Tinggi | ⬜ Belum |
| M2-API-06 | `DELETE /api/listings/:id` (soft delete) | S | 🟠 Tinggi | ⬜ Belum |
| M2-API-07 | `GET /api/listings` filter + sort + pagination | L | 🔴 Blocker | ⬜ Belum |
| M2-API-08 | `GET /api/listings/:slug` (atomic view increment) | S | 🔴 Blocker | ⬜ Belum |
| M2-API-09 | `GET /api/listings/search?q=` (FTS) | M | 🟠 Tinggi | ⬜ Belum |
| M2-API-10 | Upload foto + client-side compress (browser-image-compression, maks 1200px, quality 80%) + server-side convert ke WebP (sharp) | L | 🔴 Blocker | ⬜ Belum |
| M2-API-11 | `GET /api/users/:id/listings` (publik) | S | 🟡 Menengah | ⬜ Belum |

### Frontend
| ID | Item | Effort | Prioritas | Status |
|----|------|--------|-----------|--------|
| M2-FE-01 | Buat Listing Step 1: kategori + foto upload (dengan auto kompresi) | M | 🔴 Blocker | ⬜ Belum |
| M2-FE-02 | Buat Listing Step 2: spesifikasi (form dinamis dari `spec_schema`) | L | 🔴 Blocker | ⬜ Belum |
| M2-FE-03 | Buat Listing Step 3: harga, kondisi, lokasi, COD | M | 🔴 Blocker | ⬜ Belum |
| M2-FE-04 | Preview listing sebelum publish | S | 🟠 Tinggi | ⬜ Belum |
| M2-FE-05 | Dashboard Listing Saya (status, view count, edit/pause) | M | 🔴 Blocker | ⬜ Belum |
| M2-FE-06 | Halaman Edit Listing | M | 🟠 Tinggi | ⬜ Belum |
| M2-FE-07 | Form CRO optimization | M | 🟠 Tinggi | ⬜ Belum |
| M2-FE-08 | Field "rekomendasi tinggi pengendara" di form listing sepeda utuh (auto-populate dari sizing chart, bisa di-override) | M | 🟠 Tinggi | ⬜ Belum |

## B.3 Bike Recommendation (KILLER FEATURE — MVP)

> 🌟 **Differentiator utama** — tidak ada di marketplace sepeda manapun di dunia.

### Database
| ID | Item | Effort | Prioritas | Status |
|----|------|--------|-----------|--------|
| M3R-DB-01 | Tabel `sizing_charts` — referensi ukuran per merek/tipe sepeda | S | 🟠 Tinggi | ⬜ Belum |
| M3R-DB-02 | Seed sizing chart untuk top 20 merek (Specialized, Trek, Giant, Cervelo, Polygon, dll) | L | 🟠 Tinggi | ⬜ Belum |

### Backend API
| ID | Item | Effort | Prioritas | Status |
|----|------|--------|-----------|--------|
| M3R-API-01 | `POST /api/recommendation/bikes` — input body profile, output filtered listings + match score | M | 🟠 Tinggi | ⬜ Belum |
| M3R-API-02 | Algoritma matching: `(user.inseam BETWEEN listing.recommended_inseam_min AND max)` | M | 🟠 Tinggi | ⬜ Belum |
| M3R-API-03 | Cross-link dari Bike Fitting Tool: pass body measurement via query param ke marketplace | S | 🟠 Tinggi | ⬜ Belum |
| M3R-API-04 | Track event "recommendation_used" untuk analytics | S | 🟡 Menengah | ⬜ Belum |

### Frontend
| ID | Item | Effort | Prioritas | Status |
|----|------|--------|-----------|--------|
| M3R-FE-01 | Landing page "Cari sepeda yang fit untukmu" — hero CTA di homepage marketplace | M | 🟠 Tinggi | ⬜ Belum |
| M3R-FE-02 | Form input body profile (tinggi, inseam, opsional: arm reach) | M | 🟠 Tinggi | ⬜ Belum |
| M3R-FE-03 | Halaman hasil rekomendasi dengan badge "Match 92%" / "Fit untukmu" | M | 🟠 Tinggi | ⬜ Belum |
| M3R-FE-04 | Filter "hanya sepeda yang fit untukku" toggle di halaman kategori | S | 🟠 Tinggi | ⬜ Belum |
| M3R-FE-05 | CTA dari Bike Fitting Tool: "Lihat sepeda yang cocok di Marketplace →" | S | 🟠 Tinggi | ⬜ Belum |
| M3R-FE-06 | Edukasi user kalau body profile belum diisi: "Lengkapi profil untuk rekomendasi yang akurat" | S | 🟡 Menengah | ⬜ Belum |

## B.4 Discovery & Browse

| ID | Item | Effort | Prioritas | Status |
|----|------|--------|-----------|--------|
| M3-API-01 | Filter: kategori, harga, kondisi, frame_size, groupset, material, kota, COD | L | 🔴 Blocker | ⬜ Belum |
| M3-API-02 | Sort: terbaru, termurah, termahal, paling dilihat | S | 🟠 Tinggi | ⬜ Belum |
| M3-API-03 | Cursor-based pagination | M | 🟠 Tinggi | ⬜ Belum |
| M3-FE-01 | Homepage marketplace: hero + kategori + listing terbaru + populer | L | 🔴 Blocker | ⬜ Belum |
| M3-FE-02 | Halaman kategori + filter sidebar (mobile drawer) | L | 🔴 Blocker | ⬜ Belum |
| M3-FE-03 | Halaman hasil pencarian | M | 🔴 Blocker | ⬜ Belum |
| M3-FE-04 | Listing card (foto, harga, kondisi, kota, badge) | M | 🔴 Blocker | ⬜ Belum |
| M3-FE-05 | Listing detail page: gallery, specs, info penjual, CTA | L | 🔴 Blocker | ⬜ Belum |
| M3-FE-06 | Mask nomor HP seller (full hanya setelah order) — TRUST-01 | M | 🟠 Tinggi | ⬜ Belum |
| M3-FE-07 | Profil publik penjual + rating + transaksi sukses | M | 🟠 Tinggi | ⬜ Belum |
| M3-FE-08 | Buyer Protection Messaging — TRUST-02 | S | 🟠 Tinggi | ⬜ Belum |
| M3-FE-09 | Listing detail CRO | M | 🟠 Tinggi | ⬜ Belum |

## B.5 Chat System

| ID | Item | Effort | Prioritas | Status |
|----|------|--------|-----------|--------|
| M4-DB-01 | Tabel `conversations` (unique per listing+buyer+seller) | S | 🔴 Blocker | ✅ Selesai |
| M4-DB-02 | Tabel `messages` (flagged_reason, read_at) | S | 🔴 Blocker | ✅ Selesai |
| M4-API-01 | `POST /api/conversations` (idempotent) | S | 🔴 Blocker | ⬜ Belum |
| M4-API-02 | `GET /api/conversations` (inbox) | S | 🔴 Blocker | ⬜ Belum |
| M4-API-03 | `GET /api/conversations/:id/messages` | S | 🔴 Blocker | ⬜ Belum |
| M4-API-04 | `POST /api/conversations/:id/messages` (teks + gambar) | M | 🔴 Blocker | ⬜ Belum |
| M4-API-05 | Real-time via Supabase Realtime | L | 🔴 Blocker | ⬜ Belum |
| M4-API-06 | Auto-detect nomor rekening di pesan | M | 🟠 Tinggi | ⬜ Belum |
| M4-API-07 | Read receipts + unread count | S | 🟠 Tinggi | ⬜ Belum |
| M4-API-08 | Notif email via Resend saat pesan masuk | M | 🟠 Tinggi | ⬜ Belum |
| M4-FE-01 | Inbox conversations | M | 🔴 Blocker | ⬜ Belum |
| M4-FE-02 | Thread chat real-time | L | 🔴 Blocker | ⬜ Belum |
| M4-FE-03 | Listing card di atas thread | S | 🟠 Tinggi | ⬜ Belum |
| M4-FE-04 | Warning banner pesan flagged | S | 🟠 Tinggi | ⬜ Belum |
| M4-FE-05 | Notification bell + badge unread | M | 🟠 Tinggi | ⬜ Belum |

## B.6 Wishlist & Notifikasi

| ID | Item | Effort | Prioritas | Status |
|----|------|--------|-----------|--------|
| M5-DB-01 | Tabel `wishlists` (unique user+listing) | S | 🟡 Menengah | ✅ Selesai |
| M5-DB-02 | Tabel `notifications` (type, data JSONB, read_at) | S | 🟠 Tinggi | ✅ Selesai |
| M5-01 | Toggle save/unsave + update wishlist_count | S | 🟡 Menengah | ⬜ Belum |
| M5-02 | Halaman wishlist saya | S | 🟡 Menengah | ⬜ Belum |
| M5-03 | Halaman daftar notifikasi + mark all read | S | 🟠 Tinggi | ⬜ Belum |

## B.7 Transaksi & Payment (INTI — Paling Kritikal)

> ⚠️ Bugs di sini = uang hilang. Jangan rush.

### Database
| ID | Item | Effort | Prioritas | Status |
|----|------|--------|-----------|--------|
| M6-DB-01 | Tabel `orders` (snapshot alamat+harga, state machine) | M | 🔴 Blocker | ✅ Selesai |
| M6-DB-02 | Tabel `order_status_history` (audit trail) | S | 🔴 Blocker | ✅ Selesai |
| M6-DB-03 | Tabel `payments` (raw_response JSONB) | M | 🔴 Blocker | ✅ Selesai |
| M6-DB-04 | Tabel `shipments` | S | 🔴 Blocker | ✅ Selesai |
| M6-DB-05 | Tabel `payouts` (net_amount setelah fee) | M | 🔴 Blocker | ✅ Selesai |

### Payment Integration
| ID | Item | Effort | Prioritas | Status |
|----|------|--------|-----------|--------|
| M6-PAY-01 | Setup Midtrans Snap + Core API (sandbox dulu) | L | 🔴 Blocker | ⬜ Belum |
| M6-PAY-02 | `POST /api/orders` + hitung fee + Midtrans payment intent | L | 🔴 Blocker | ⬜ Belum |
| M6-PAY-03 | Webhook handler — verify HMAC SHA512 signature | L | 🔴 Blocker | ⬜ Belum |
| M6-PAY-04 | Handle `payment.success` → `paid` → notify seller | M | 🔴 Blocker | ⬜ Belum |
| M6-PAY-05 | Handle `payment.expire` → `cancelled` | S | 🔴 Blocker | ⬜ Belum |
| M6-PAY-06 | Handle `payment.failed` → notify buyer | S | 🟠 Tinggi | ⬜ Belum |
| M6-PAY-07 | **Idempotency** — webhook double-fire safe | M | 🔴 Blocker | ⬜ Belum |
| M6-PAY-08 | **Race condition guard** — `SELECT FOR UPDATE` di balance | M | 🔴 Blocker | ⬜ Belum |

### Shipping
| ID | Item | Effort | Prioritas | Status |
|----|------|--------|-----------|--------|
| M6-SHIP-01 | Pilihan metode di listing: Meetup/COD, GoSend, Kargo, Nego | S | 🟠 Tinggi | ⬜ Belum |
| M6-SHIP-02 | `POST /api/orders/:id/ship` (input resi + foto bukti) | M | 🔴 Blocker | ⬜ Belum |
| M6-SHIP-03 | Cron auto-confirm 3 hari setelah shipped | M | 🔴 Blocker | ⬜ Belum |
| M6-SHIP-04 | Vercel Cron Jobs | M | 🔴 Blocker | ⬜ Belum |
| M6-SHIP-05 | Integrasi Biteship API (cek ongkir untuk aksesoris) | L | 🟡 Menengah | ⬜ Belum |

### Payout
| ID | Item | Effort | Prioritas | Status |
|----|------|--------|-----------|--------|
| M6-PAYOUT-01 | `POST /api/orders/:id/complete` (SERIALIZABLE transaction) | M | 🔴 Blocker | ⬜ Belum |
| M6-PAYOUT-02 | `POST /api/payouts` via Midtrans Iris | L | 🔴 Blocker | ⬜ Belum |
| M6-PAYOUT-03 | Webhook payout status | M | 🟠 Tinggi | ⬜ Belum |
| M6-PAYOUT-04 | Validasi nama rekening (Midtrans name validation) | M | 🟠 Tinggi | ⬜ Belum |

### Seller & Buyer Flow
| ID | Item | Effort | Prioritas | Status |
|----|------|--------|-----------|--------|
| M6-SELLER-01 | Dashboard pesanan masuk | M | 🔴 Blocker | ⬜ Belum |
| M6-SELLER-02 | Form input resi + foto bukti | M | 🔴 Blocker | ⬜ Belum |
| M6-SELLER-03 | Halaman saldo + riwayat + tambah rekening | L | 🔴 Blocker | ⬜ Belum |
| M6-SELLER-04 | Notif seller "Pesanan baru — kirim 2×24 jam" | S | 🟠 Tinggi | ⬜ Belum |
| M6-BUYER-01 | Checkout Step 1: alamat | M | 🔴 Blocker | ⬜ Belum |
| M6-BUYER-02 | Checkout Step 2: metode pengiriman + ongkir | M | 🔴 Blocker | ⬜ Belum |
| M6-BUYER-03 | Checkout Step 3: metode bayar (VA/e-wallet/QRIS) + total | M | 🔴 Blocker | ⬜ Belum |
| M6-BUYER-04 | Halaman instruksi pembayaran (VA/QR Snap) | M | 🔴 Blocker | ⬜ Belum |
| M6-BUYER-05 | Halaman status order — timeline visual | L | 🟠 Tinggi | ⬜ Belum |
| M6-BUYER-06 | `POST /api/orders/:id/confirm-received` | S | 🔴 Blocker | ⬜ Belum |
| M6-BUYER-07 | Dashboard pesanan saya | M | 🔴 Blocker | ⬜ Belum |

## B.8 Reviews, Disputes & Trust

| ID | Item | Effort | Prioritas | Status |
|----|------|--------|-----------|--------|
| M7-DB-01 | Tabel `reviews` (rating 1–5, seller_reply) | S | 🟠 Tinggi | ✅ Selesai |
| M7-DB-02 | Tabel `disputes` (reason, status, resolution) | S | 🟠 Tinggi | ✅ Selesai |
| M7-DB-03 | Tabel `dispute_evidence` | S | 🟠 Tinggi | ✅ Selesai |
| M7-DB-04 | Tabel `reports` (target_type polymorphic) | S | 🟡 Menengah | ✅ Selesai |
| M7-01 | `POST /api/orders/:id/review` | M | 🟠 Tinggi | ⬜ Belum |
| M7-02 | Update rating_avg di users saat review masuk | S | 🟠 Tinggi | ⬜ Belum |
| M7-03 | `POST /api/orders/:id/dispute` | M | 🟠 Tinggi | ⬜ Belum |
| M7-04 | `POST /api/disputes/:id/evidence` | M | 🟠 Tinggi | ⬜ Belum |
| M7-05 | `POST /api/reports` | S | 🟡 Menengah | ⬜ Belum |
| M7-06 | Form review + rating bintang | M | 🟠 Tinggi | ⬜ Belum |
| M7-07 | Form buka dispute + upload bukti | M | 🟠 Tinggi | ⬜ Belum |
| M7-08 | Rating + review list di profil seller | M | 🟠 Tinggi | ⬜ Belum |
| M7-09 | Badge "X transaksi sukses" — TRUST-03 | S | 🟠 Tinggi | ⬜ Belum |
| M7-10 | Internal admin tool (resolve disputes, manage reports) | L | 🟠 Tinggi | ⬜ Belum |

## B.9 Analytics & QA

| ID | Item | Effort | Prioritas | Status |
|----|------|--------|-----------|--------|
| M8-ANA-01 | Setup Posthog Free Tier — events + session replay | M | 🟠 Tinggi | ⬜ Belum |
| M8-ANA-02 | Track seller funnel: signup → OTP → bank → listing → order | M | 🟠 Tinggi | ⬜ Belum |
| M8-ANA-03 | Track buyer funnel: signup → browse → wishlist → checkout → completed | M | 🟠 Tinggi | ⬜ Belum |
| M8-ANA-04 | Track Bike Recommendation conversion (KEY METRIC) | S | 🟠 Tinggi | ⬜ Belum |
| M8-ANA-05 | Track revenue: GMV, avg ticket, conversion rate | M | 🟠 Tinggi | ⬜ Belum |
| M8-QA-01 | Load test endpoint kritikal (100+ concurrent) | L | 🟠 Tinggi | ⬜ Belum |
| M8-QA-02 | Security audit: HTTPS, rate limit, CSRF, SQL injection, IDOR | L | 🔴 Blocker | ⬜ Belum |
| M8-QA-03 | Mobile responsiveness (Android low-end + iPhone mid) | M | 🟠 Tinggi | ⬜ Belum |
| M8-QA-04 | TTI < 3 detik di 4G | M | 🟠 Tinggi | ⬜ Belum |
| M8-QA-05 | E2E test full flow: listing → order → bayar → kirim → konfirmasi → cair | L | 🔴 Blocker | ⬜ Belum |
| M8-QA-06 | Test Bike Recommendation accuracy (manual sample) | M | 🟠 Tinggi | ⬜ Belum |
| M8-QA-07 | Test dispute flow E2E | L | 🟠 Tinggi | ⬜ Belum |

---

# BAGIAN C — Non-Functional Requirements

| ID | Item | Target | Prioritas | Status |
|----|------|--------|-----------|--------|
| NFR-01 | Mobile-first responsive | Semua layar | 🔴 Blocker | ⬜ Belum |
| NFR-02 | TTI < 3 detik di 4G | Semua halaman | 🟠 Tinggi | ⬜ Belum |
| NFR-03 | HTTPS wajib semua environment | All | 🔴 Blocker | ⬜ Belum |
| NFR-04 | Password hashing bcrypt/argon2 | Auth | 🔴 Blocker | ⬜ Belum |
| NFR-05 | Rate limiting auth + OTP | Auth | 🟠 Tinggi | ⬜ Belum |
| NFR-06 | UU PDP: nomor HP & alamat tidak publik | Listing & profil | 🔴 Blocker | ⬜ Belum |
| NFR-07 | CSRF protection semua form | All | 🟠 Tinggi | ⬜ Belum |
| NFR-08 | Webhook Midtrans verify HMAC SHA512 | Payment | 🔴 Blocker | ⬜ Belum |
| NFR-09 | SERIALIZABLE transaction untuk saldo | Payment | 🔴 Blocker | ⬜ Belum |
| NFR-10 | Idempotency webhook | Payment | 🔴 Blocker | ⬜ Belum |
| NFR-11 | Image compression: client-side (browser-image-compression) + server-side WebP (sharp) | Upload | 🟠 Tinggi | ⬜ Belum |
| NFR-12 | Backup database otomatis (cron ke S3/B2 jika Supabase Free) | DB | 🟠 Tinggi | ⬜ Belum |

---

# BAGIAN D — Out of Scope (Tidak Dibangun di MVP)

❌ **Fitur:**
- Pelelangan / bidding
- Bike Fitting Tool integration **Level 2** (pose-based) — Phase 2
- Bike Fitting Tool integration **Level 3** (ML-based) — Phase 3
- Seller subscription / toko premium — Phase 2
- Social feed / komunitas / forum
- Mobile native app
- Promo codes / vouchers
- Auto-tracking resi dari ekspedisi
- Bike Passport, Bike Inspector, Price Valuation Tool — Phase 3

❌ **Teknis:**
- Balance ledger table terpisah
- Jaringan kurir sendiri per kota
- Integrasi GoSend/GrabExpress API native
- Meilisearch / Algolia (PostgreSQL FTS cukup)
- Admin dashboard lengkap (pakai internal tool dulu)

---

# BAGIAN E — Soft Launch & Public Launch

## E.1 Soft Launch (Invite-Only Beta)

| ID | Item | Effort | Prioritas | Status |
|----|------|--------|-----------|--------|
| LAUNCH-01 | Onboarding 50 seller awal — manual guide | L | 🔴 Blocker | ⬜ Belum |
| LAUNCH-02 | Monitor metrics: signup rate, listing rate, first transaction | M | 🟠 Tinggi | ⬜ Belum |
| LAUNCH-03 | Bug fixing cepat dari feedback beta | L | 🔴 Blocker | ⬜ Belum |
| LAUNCH-04 | Privacy Policy + ToS live sebelum user nyata | M | 🔴 Blocker | ⬜ Belum |
| LAUNCH-05 | Flow dispute manual via WhatsApp admin | S | 🟠 Tinggi | ⬜ Belum |

## E.2 Public Launch

| ID | Item | Effort | Prioritas | Status |
|----|------|--------|-----------|--------|
| LAUNCH-06 | Buka registrasi publik | S | 🟠 Tinggi | ⬜ Belum |
| LAUNCH-07 | Email sequence onboarding | L | 🟡 Menengah | ⬜ Belum |
| LAUNCH-08 | A/B test fee structure & CTA | L | 🟡 Menengah | ⬜ Belum |
| LAUNCH-09 | Churn prevention seller tidak aktif 30 hari | M | 🟡 Menengah | ⬜ Belum |
| LAUNCH-10 | Aktifkan Featured Listing / Boost (MON-02) | L | 🟠 Tinggi | ⬜ Belum |
| LAUNCH-11 | Review & iterate berdasarkan data minggu pertama | M | 🟠 Tinggi | ⬜ Belum |

---

# Ringkasan Timeline

| Milestone | Fokus Utama | Estimasi | Kumulatif |
|-----------|-------------|----------|-----------|
| Pre-Dev | PRE-01 s/d PRE-08 (legal, kontrak, modal) | 2–4 minggu (paralel) | — |
| M0 | Research + Infrastruktur | 1 minggu | Minggu 1 |
| M1 | Auth & User | 1.5 minggu | Minggu 2–3 |
| M2 | Listing System | 2 minggu | Minggu 4–5 |
| M3 | Discovery & Browse + **Bike Recommendation** | 2 minggu | Minggu 6–7 |
| M4 | Chat Real-time | 1.5 minggu | Minggu 8–9 |
| M5 | Wishlist & Notifikasi | 0.5 minggu | Minggu 9 |
| **M6** | **Transaksi & Payment** | **3 minggu** | Minggu 10–12 |
| M7 | Reviews & Disputes | 1 minggu | Minggu 13 |
| M8 | Analytics & QA | 1.5 minggu | Minggu 14–15 |
| M9 | Soft Launch Beta | 1 minggu | Minggu 16 |
| M10 | Public Launch | Ongoing | Minggu 17+ |

**Total: ~16–18 minggu (~4–4.5 bulan)** — sedikit lebih panjang dari estimasi awal karena tambahan Bike Recommendation feature di MVP.

---

# Modal & ROI Summary

| Aspek | Angka |
|-------|-------|
| **Modal awal minimum** | Rp 7.200.000 (bootstrap, co-owner coding sendiri) |
| **Modal realistis** | Rp 24.500.000 (dengan buffer + marketing) |
| **Modal vendor dev** | Rp 134.000.000 |
| **Operasional bulanan (bulan 1–3)** | ~Rp 250.000 |
| **Operasional bulanan (bulan 4–6)** | ~Rp 850.000 |
| **Revenue 6 bulan (realistis, fee 1%)** | Rp 47.200.000 |
| **Net 6 bulan (fee 1%)** | -Rp 8.500.000 (rugi) |
| **Break-even point** | Bulan 9–12 (jika fee dinaikkan 2% atau push featured listing) |
| **Featured Listing margin** | 84% — driver profit utama |
| **Subscription margin** | 92% — recurring revenue (Phase 2) |

> 🔴 **Critical insight:** Fee 1% rugi karena cost Midtrans makan margin. **Wajib naik ke 2% atau bebankan biaya admin transparan ke buyer (Rp 10–15rb).**

---

# Killer Pitch

> "Tokopedia jual sepeda dengan harga termurah. OLX jual sepeda paling banyak. **GowesFit jual sepeda yang FIT untukmu — dengan trust dari komunitas dan keamanan rekber.**"

**3 moat yang tidak bisa ditiru:**
1. 🎯 **Bike Recommendation + Fitting Tool integration** (technical moat — sudah punya ML pose detection)
2. 🤝 **Komunitas goweser sebagai founding sellers** (social moat)
3. 📊 **Data transaksi sepeda Indonesia** (data moat — compound seiring waktu)
