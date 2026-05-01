# Development Checklist & Milestones — GowesFit Marketplace

**Last updated:** 2026-04-25
**Referensi:** PRD v1.0 | ERD v1.0
**Status:** Pre-development

---

## Prasyarat Sebelum Mulai Development

- [ ] Perjanjian co-ownership / vendor contract sudah ditandatangani
- [ ] Tech stack final dikonfirmasi (Next.js + PostgreSQL + Midtrans)
- [ ] Akun Midtrans merchant sudah didaftarkan dan diapprove
- [ ] Domain dan hosting sudah disiapkan
- [ ] Repository Git terstruktur (monorepo atau split)
- [ ] Environment: dev / staging / production sudah dipisah

---

## MILESTONE 0 — Foundation & Market Research
**Durasi: 1 minggu | Target: sebelum coding dimulai**

### Market Research (gunakan skill `.agents/skills/customer-research/`)
- [ ] Buat interview script untuk 15 goweser (5 seller, 5 buyer, 5 keduanya)
- [ ] Lakukan 15 interview — fokus: pain point, willingness to pay 1% fee, fitur prioritas
- [ ] Analisis kompetitor OLX, Tokopedia bike section, FB Groups (gunakan `competitor-profiling`)
- [ ] Validasi fee 1% — apakah acceptable? (gunakan `pricing-strategy`)
- [ ] Dokumentasikan findings di `notes/customer-research-findings.md`
- [ ] Update `.agents/product-marketing-context.md` berdasarkan findings nyata

### Infrastruktur Dasar
- [ ] Setup PostgreSQL database (local dev + staging)
- [ ] Setup project struktur Next.js (App Router, API Routes)
- [ ] Setup Prisma ORM + schema awal dari ERD
- [ ] Setup environment variables management (.env.local, .env.staging)
- [ ] Setup CI/CD dasar (GitHub Actions atau Vercel auto-deploy)

**✅ Milestone 0 selesai jika:** Research findings terdokumentasi, infrastruktur berjalan, team aligned

---

## MILESTONE 1 — Auth & User Foundation
**Durasi: 1.5 minggu | Target: Minggu 2–3**

### Database
- [ ] Migrasi tabel: `users`, `otp_verifications`, `addresses`, `bank_accounts`
- [ ] Seed data: admin user

### Backend API
- [ ] `POST /api/auth/register` — email + password
- [ ] `POST /api/auth/login` — email/password, return JWT/session
- [ ] `POST /api/auth/google` — Google OAuth via NextAuth
- [ ] `POST /api/auth/otp/send` — kirim OTP via SMS/WhatsApp
- [ ] `POST /api/auth/otp/verify` — verifikasi OTP, set `phone_verified_at`
- [ ] `GET /api/users/me` — profil saya
- [ ] `PUT /api/users/me` — update profil
- [ ] `POST /api/users/me/addresses` — tambah alamat
- [ ] `PUT /api/users/me/addresses/:id` — edit alamat
- [ ] `POST /api/users/me/bank-accounts` — tambah rekening bank
- [ ] Rate limiting di login endpoint (brute force protection)
- [ ] Password hashing bcrypt/argon2

### Frontend
- [ ] Halaman Sign Up (email + Google OAuth)
- [ ] Halaman Sign In
- [ ] Halaman Verifikasi OTP (nomor HP)
- [ ] Halaman Edit Profil & Alamat
- [ ] Middleware auth (protected routes)
- [ ] Optimize signup flow — gunakan skill `.agents/skills/signup-flow-cro/`

**✅ Milestone 1 selesai jika:** User bisa register, verifikasi HP, login, dan manage profil/alamat

---

## MILESTONE 2 — Categories & Listing System
**Durasi: 2 minggu | Target: Minggu 4–5**

### Database
- [ ] Migrasi tabel: `categories`, `listings`, `listing_photos`
- [ ] Seed data: 7 root category + sub-kategori (sesuai PRD §5.2)
- [ ] Seed `spec_schema` per kategori (field spesifik helm, sepeda utuh, dll)
- [ ] Setup PostgreSQL Full-Text Search index di tabel `listings`

### Backend API
- [ ] `GET /api/categories` — list semua kategori + sub
- [ ] `POST /api/listings` — buat listing baru (draft)
- [ ] `PUT /api/listings/:id` — edit listing
- [ ] `POST /api/listings/:id/publish` — publish listing (requires phone verified)
- [ ] `POST /api/listings/:id/pause` — pause listing
- [ ] `DELETE /api/listings/:id` — hapus listing (soft delete)
- [ ] `GET /api/listings` — list + filter + sort + pagination
- [ ] `GET /api/listings/:slug` — detail listing
- [ ] `GET /api/listings/search?q=` — full-text search
- [ ] Upload foto listing (Cloudinary / Supabase Storage)
- [ ] View count increment (atomic)

### Frontend
- [ ] Buat Listing — Step 1: Kategori + Foto upload
- [ ] Buat Listing — Step 2: Spesifikasi teknis (dynamic per kategori)
- [ ] Buat Listing — Step 3: Harga, lokasi, kondisi
- [ ] Preview listing sebelum publish
- [ ] Dashboard listing saya (status, view count)
- [ ] Halaman edit listing
- [ ] Optimize form listing — gunakan skill `.agents/skills/form-cro/`

**✅ Milestone 2 selesai jika:** Seller bisa buat, edit, publish, dan manage listing

---

## MILESTONE 3 — Discovery & Browse
**Durasi: 1.5 minggu | Target: Minggu 6–7**

### Backend API
- [ ] `GET /api/listings` dengan semua filter: kategori, harga min-max, kondisi, frame_size, groupset, material, kota, allow_cod
- [ ] Sort: terbaru, harga termurah, harga tertinggi, paling dilihat
- [ ] Pagination (cursor-based atau offset)
- [ ] `GET /api/users/:id/listings` — listing publik penjual

### Frontend
- [ ] Homepage marketplace: banner + kategori shortcut + listing terbaru + listing populer
- [ ] Halaman kategori + filter sidebar
- [ ] Halaman hasil pencarian
- [ ] Listing detail page — gallery, specs, penjual info, CTA
- [ ] Profil publik penjual
- [ ] Optimize listing detail page — gunakan skill `.agents/skills/page-cro/`

**✅ Milestone 3 selesai jika:** Buyer bisa browse, filter, dan lihat detail listing

---

## MILESTONE 4 — Chat System
**Durasi: 1.5 minggu | Target: Minggu 8–9**

### Database
- [ ] Migrasi tabel: `conversations`, `messages`

### Backend API
- [ ] `POST /api/conversations` — mulai conversation dari listing
- [ ] `GET /api/conversations` — inbox saya (buyer + seller view)
- [ ] `GET /api/conversations/:id/messages` — load thread
- [ ] `POST /api/conversations/:id/messages` — kirim pesan (teks + gambar)
- [ ] Real-time via WebSocket atau SSE (Next.js + Pusher/Ably)
- [ ] Auto-detect nomor rekening di pesan → set `flagged_reason`
- [ ] Read receipts (update `read_at`)
- [ ] Unread count per conversation

### Frontend
- [ ] Inbox — daftar conversations
- [ ] Thread chat — real-time messages
- [ ] Warning banner jika pesan flagged (nomor rekening eksternal terdeteksi)
- [ ] Notifikasi in-app saat pesan masuk
- [ ] Listing card di atas thread chat

**✅ Milestone 4 selesai jika:** Buyer dan seller bisa chat real-time terkait listing

---

## MILESTONE 5 — Wishlist & Notifications
**Durasi: 0.5 minggu | Target: Minggu 9 (paralel)**

### Database
- [ ] Migrasi tabel: `wishlists`, `notifications`

### Backend API
- [ ] `POST /api/wishlists/:listingId` — save listing
- [ ] `DELETE /api/wishlists/:listingId` — unsave
- [ ] `GET /api/wishlists` — daftar wishlist saya
- [ ] `GET /api/notifications` — daftar notifikasi
- [ ] `PUT /api/notifications/read-all` — tandai semua sudah dibaca

### Frontend
- [ ] Tombol save/unsave di listing card dan detail
- [ ] Halaman wishlist
- [ ] Notification bell + dropdown
- [ ] Badge unread count

**✅ Milestone 5 selesai jika:** Buyer bisa simpan listing dan terima notifikasi

---

## MILESTONE 6 — Transaction & Payment (INTI)
**Durasi: 3 minggu | Target: Minggu 10–12**

> ⚠️ Milestone paling kritikal dan paling complex — jangan rush.

### Database
- [ ] Migrasi tabel: `orders`, `order_status_history`, `payments`, `shipments`, `payouts`

### Payment Integration (Midtrans)
- [ ] Setup Midtrans Snap (client-side) + Core API (server-side)
- [ ] `POST /api/orders` — buat order + payment intent
- [ ] Midtrans webhook handler — `POST /api/webhooks/midtrans`
  - [ ] Handle: `payment.success` → update order status ke `paid`
  - [ ] Handle: `payment.expire` → update ke `cancelled`
  - [ ] Handle: `payment.failed` → notify user
- [ ] Verify webhook signature (HMAC SHA512)
- [ ] Order state machine implementasi (sesuai ERD §4.2)

### Seller Flow
- [ ] `POST /api/orders/:id/ship` — input nomor resi + foto bukti kirim
- [ ] Auto-confirm delivered setelah 3 hari (cron job)
- [ ] `POST /api/orders/:id/complete` → transfer balance ke `users.balance`

### Buyer Flow
- [ ] Checkout page: ringkasan barang + pilih alamat + pilih ekspedisi + total
- [ ] Payment page: pilih metode (VA, e-wallet, QRIS)
- [ ] Payment instruction page (VA number / QR code)
- [ ] `POST /api/orders/:id/confirm-received` — buyer konfirmasi terima
- [ ] Status page: timeline order dengan semua state

### Payout (Midtrans Iris)
- [ ] `POST /api/payouts` — request pencairan saldo
- [ ] Midtrans Iris disbursement integration
- [ ] Halaman saldo + riwayat + form tambah rekening bank

**✅ Milestone 6 selesai jika:** End-to-end transaksi berjalan: listing → order → payment → ship → confirmed → saldo cair

---

## MILESTONE 7 — Reviews, Disputes & Trust
**Durasi: 1 minggu | Target: Minggu 13**

### Database
- [ ] Migrasi tabel: `reviews`, `disputes`, `dispute_evidence`, `reports`

### Backend API
- [ ] `POST /api/orders/:id/review` — tulis review setelah order selesai
- [ ] `POST /api/orders/:id/dispute` — buka dispute
- [ ] `POST /api/disputes/:id/evidence` — upload bukti
- [ ] `POST /api/reports` — report listing/user

### Frontend
- [ ] Form review + rating bintang setelah order selesai
- [ ] Form buka dispute + upload foto/video
- [ ] Rating agregat di profil penjual
- [ ] Review list di profil penjual

**✅ Milestone 7 selesai jika:** System review dan dispute berjalan, trust signals tampil di profil

---

## MILESTONE 8 — Analytics & QA
**Durasi: 1.5 minggu | Target: Minggu 14–15**

### Analytics Setup
- [ ] Pasang Posthog (atau Plausible) — gunakan skill `.agents/skills/analytics-tracking/`
- [ ] Track seller funnel: signup → OTP → bank → listing → order received
- [ ] Track buyer funnel: signup → browse → wishlist → checkout → completed
- [ ] Track revenue metrics: GMV, avg ticket, conversion rate
- [ ] Setup event tracking untuk key actions di form-form utama

### QA & Performance
- [ ] Load testing endpoint kritikal (checkout, payment webhook)
- [ ] Security audit: HTTPS, rate limiting, CSRF, SQL injection
- [ ] Mobile responsiveness — test di 3 device nyata
- [ ] TTI < 3 detik di 4G (per non-functional requirement PRD)
- [ ] Error tracking (Sentry atau Axiom)

**✅ Milestone 8 selesai jika:** Analytics berjalan, performance target tercapai, 0 critical security issues

---

## MILESTONE 9 — Soft Launch (Invite-Only Beta)
**Durasi: 1 minggu | Target: Minggu 16**

- [ ] Recruit 50 seller awal dari komunitas (roadbike.co.id, FB Groups MTB/roadbike)
- [ ] Onboarding session dengan seller awal (manual guide)
- [ ] Monitor: signup rate, listing creation rate, first transaction
- [ ] Bug fixing dari feedback beta users
- [ ] Optimize onboarding — gunakan skill `.agents/skills/onboarding-cro/`
- [ ] Siapkan admin moderation tool (basic — review report, manage users)

**✅ Milestone 9 selesai jika:** 50 listing aktif, minimal 5 transaksi sukses, 0 critical bugs

---

## MILESTONE 10 — Public Launch
**Durasi: ongoing | Target: Minggu 17+**

- [ ] Buka registrasi publik
- [ ] Setup email sequence onboarding — gunakan skill `.agents/skills/onboarding-cro/`
- [ ] A/B test halaman listing dan checkout — gunakan skill `.agents/skills/ab-test-setup/`
- [ ] Setup churn prevention untuk seller yang tidak aktif — gunakan skill `.agents/skills/churn-prevention/`
- [ ] Setup competitor monitoring — gunakan skill `.agents/skills/competitor-profiling/`
- [ ] Review & iterate berdasarkan data analytics minggu pertama

---

## Ringkasan Timeline

| Milestone | Fokus | Durasi | Kumulatif |
|-----------|-------|--------|-----------|
| M0 | Research + Infrastruktur | 1 minggu | Minggu 1 |
| M1 | Auth & User | 1.5 minggu | Minggu 2–3 |
| M2 | Listing System | 2 minggu | Minggu 4–5 |
| M3 | Discovery & Browse | 1.5 minggu | Minggu 6–7 |
| M4 | Chat | 1.5 minggu | Minggu 8–9 |
| M5 | Wishlist & Notif | 0.5 minggu | Minggu 9 |
| M6 | **Transaksi & Payment** | 3 minggu | Minggu 10–12 |
| M7 | Reviews & Disputes | 1 minggu | Minggu 13 |
| M8 | Analytics & QA | 1.5 minggu | Minggu 14–15 |
| M9 | Soft Launch (Beta) | 1 minggu | Minggu 16 |
| M10 | Public Launch | Ongoing | Minggu 17+ |

**Total development: ~16 minggu (~4 bulan)** — sedikit lebih panjang dari PRD estimate 3 bulan, karena research phase dan QA yang proper.

---

## Stack Rekomendasi Final

| Layer | Technology | Alasan |
|-------|-----------|--------|
| Frontend | Next.js 16 (sudah ada) | App Router, SSR, API Routes |
| Database | PostgreSQL 15+ via Supabase | Managed, gratis tier, realtime support |
| ORM | Prisma | Type-safe, migration tooling |
| Auth | NextAuth.js v5 | Google OAuth + credentials, session management |
| Payment | Midtrans Snap + Core API | Coverage Indonesia terluas, ada disbursement API |
| File Storage | Cloudinary atau Supabase Storage | Image transform + CDN |
| Real-time Chat | Pusher atau Ably | WebSocket managed, tidak perlu maintain server |
| Analytics | Posthog | Open source, session replay, A/B testing |
| Email | Resend + React Email | Modern, developer-friendly |
| OTP/SMS | Twilio atau Zenziva (lokal) | Zenziva lebih murah untuk Indonesia |
| Monitoring | Sentry | Error tracking |
| Deployment | Vercel (frontend) + Supabase (DB) | Simplest path for MVP |
