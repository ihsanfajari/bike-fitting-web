# Roadmap — MVP Hosted (Bisa Di-share ke Komunitas)

**Dibuat:** 2026-05-15
**Tujuan:** Jalur terfokus dari "punya akun Supabase + Vercel" → aplikasi **live di internet** dengan auth + listing berfungsi di data nyata, sehingga 50 seller awal bisa mulai posting jualan.
**Bukan tujuan tahap ini:** chat, checkout, payment, orders, dispute, review — itu fase berikutnya (lihat `backlog/backlog-mvp.md` B.5–B.8).

> Dokumen ini subset terfokus dari `backlog/backlog-mvp.md`. Kolom "Backlog ID" merujuk ke sana.

---

## Prasyarat (di luar scope panduan ini — kamu yang siapkan)

- ✅ Akun + project **Supabase** dibuat
- ✅ Akun **Vercel** dibuat
- ⚠️ **Google Cloud Console** — OAuth credentials (untuk login Google). Bisa ditunda kalau awalnya email+password saja.
- ⚠️ **Provider OTP SMS/WhatsApp** (mis. Zenziva) — lihat catatan di Fase 1, langkah 1.4.

---

## FASE 0 — Database Hidup

| # | Aksi | Backlog ID | Catatan |
|---|------|-----------|---------|
| 0.1 | Isi 4 nilai Supabase di `web/.env.local` | M0-INF-04 | DATABASE_URL (pooled :6543), DIRECT_URL (:5432), NEXT_PUBLIC_SUPABASE_URL, ANON_KEY, SERVICE_ROLE_KEY |
| 0.2 | Jalankan `npx prisma migrate dev --name init` | M1-DB-*, M2-DB-* dst | Membuat 20 tabel + enum di Supabase sekaligus |
| 0.3 | Tulis `prisma/seed.ts` — kategori (hierarki) + admin user | M2-DB-05, M1-DB-05 | Root "Sepeda Utuh" + anak, lalu Frame/Groupset/Wheelset/Cockpit/Aksesoris/Apparel sebagai root. Daftarkan seed di `prisma.config.ts` |
| 0.4 | Jalankan seed, verifikasi data via `npx prisma studio` | — | Pastikan koneksi & data masuk |

**Selesai Fase 0 = database siap, terisi kategori.**

---

## FASE 1 — Autentikasi (NextAuth.js / Auth.js v5)

PRD: verifikasi HP **wajib** sebelum bisa listing — jadi auth adalah blocker untuk soft launch.

| # | Aksi | Backlog ID | Catatan |
|---|------|-----------|---------|
| 1.1 | Install & konfigurasi NextAuth.js v5 + Prisma adapter | M1-API-11 | Session strategy, `lib/auth.ts` |
| 1.2 | Credentials provider: register + login (hash bcrypt/argon2) | M1-API-01, M1-API-02 | NFR-04 |
| 1.3 | Google OAuth provider | M1-API-03 | Butuh credential Google Cloud — boleh ditunda |
| 1.4 | OTP HP: kirim + verifikasi, set `phone_verified_at` | M1-API-04, M1-API-05 | ⚠️ Butuh provider SMS/WA. **Alternatif soft launch:** verifikasi manual admin untuk 50 seller awal, tunda integrasi provider |
| 1.5 | Middleware proteksi route + rate limit auth/OTP | M1-API-11, M1-API-10 | NFR-05, NFR-07 |
| 1.6 | Wire UI sign-up / sign-in / verify-otp ke auth nyata | M1-FE-01,02,03 | Ganti mock |
| 1.7 | Wire `GET/PUT /api/users/me` + halaman edit profil | M1-API-06,07 / M1-FE-04 | — |
| 1.8 | Wire CRUD alamat (form sudah cocok dengan tabel `addresses`) | M1-API-08 / M1-FE-05 | — |

**Selesai Fase 1 = user bisa daftar, login, terverifikasi.**

---

## FASE 2 — Listing Bisa Dibuat (inti soft launch)

| # | Aksi | Backlog ID | Catatan |
|---|------|-----------|---------|
| 2.1 | Buat Supabase Storage bucket untuk foto listing + policy akses | M0-INF-01 | — |
| 2.2 | Upload foto + kompresi client-side (browser-image-compression) | M2-API-10, NFR-11 | Lihat memory: backlog kompresi gambar |
| 2.3 | Wire sell flow 3 langkah + preview → create draft / update / publish | M2-API-02,03,04 / M2-FE-01..04 | Publish: wajib phone-verified + min 3 foto |
| 2.4 | Wire dashboard "Listing Saya" (status, view count, pause) | M2-API-05 / M2-FE-05 | — |
| 2.5 | Wire halaman edit listing | M2-FE-06 | — |

**Selesai Fase 2 = seller bisa posting & kelola listing di data nyata.**

---

## FASE 3 — Listing Bisa Ditemukan

| # | Aksi | Backlog ID | Catatan |
|---|------|-----------|---------|
| 3.1 | Buat data layer nyata (server actions / `lib/queries`) menggantikan `lib/mock` | — | `lib/mock/api.ts` sudah didesain sebagai swap layer |
| 3.2 | Wire homepage marketplace (hero, kategori, listing terbaru/populer) | M3-FE-01 | — |
| 3.3 | Wire halaman kategori + filter + sort + pagination | M3-API-01,02,03 / M3-FE-02 | — |
| 3.4 | Wire listing detail page + atomic view increment | M2-API-08 / M3-FE-05 | — |
| 3.5 | Wire profil publik penjual (rating, tx_count) | M3-FE-07 | — |
| 3.6 | Pencarian dasar (boleh `ILIKE` dulu, FTS menyusul) | M2-API-09 | FTS = M2-DB-04, bisa ditunda |

**Selesai Fase 3 = pengunjung bisa browse & lihat listing.**

---

## FASE 4 — Deploy ke Vercel

| # | Aksi | Backlog ID | Catatan |
|---|------|-----------|---------|
| 4.1 | Connect repo GitHub ke project Vercel — set **Root Directory = `web`** | M0-INF-05 | — |
| 4.2 | Set semua env var di Vercel dashboard | M0-INF-04 | DATABASE_URL (pooled!), DIRECT_URL, NEXT_PUBLIC_*, SERVICE_ROLE_KEY, NEXTAUTH_SECRET, NEXTAUTH_URL, OAuth creds |
| 4.3 | Verifikasi build sukses | — | `postinstall: prisma generate` sudah ada di package.json |
| 4.4 | Jalankan `npx prisma migrate deploy` untuk DB production | — | Kalau pakai DB Supabase yang sama, ini no-op |
| 4.5 | Set spending limit + alert di Vercel | — | Cegah tagihan membengkak |
| 4.6 | Smoke test di URL production: daftar → verifikasi → buat listing → browse | M8-QA-03 | — |
| 4.7 | (Opsional) custom domain `.com`/`.id` | PRE-08 | — |

**Selesai Fase 4 = aplikasi live di internet.**

---

## FASE 5 — Siap Di-share

| # | Aksi | Backlog ID | Catatan |
|---|------|-----------|---------|
| 5.1 | Privacy Policy + Terms of Service live | PRE-05, LAUNCH-04 | Wajib sebelum user nyata (UU PDP) — halaman `/marketplace/terms` & `/privacy` sudah di-link di UI, tinggal diisi |
| 5.2 | Setup Sentry (error tracking) | M0-INF-07 | Supaya tahu kalau ada yang rusak di production |
| 5.3 | Buat akun seller percobaan, jalankan flow listing end-to-end | LAUNCH-02 | — |
| 5.4 | Share link ke 50 seller awal + dampingi onboarding manual | MKT-01, MKT-02, LAUNCH-01 | — |

---

## Catatan Penting

- **Yang sengaja ditunda dari milestone ini:** chat (B.5), wishlist/notifikasi (B.6), seluruh transaksi/payment/payout (B.7), review/dispute (B.8). UI-nya sudah ada (mock) tapi belum di-wire — itu fase berikutnya.
- **Ketergantungan akun eksternal di luar Supabase/Vercel:** Google OAuth (Google Cloud Console), provider OTP SMS/WA. Keduanya bisa di-*workaround* di awal (email-only login, verifikasi HP manual) supaya tidak memblokir hosting.
- **Estimasi kasar:** Fase 0 ≈ 1 hari · Fase 1 ≈ 1 minggu · Fase 2 ≈ 1 minggu · Fase 3 ≈ 4–5 hari · Fase 4 ≈ 1 hari · Fase 5 ≈ 2–3 hari. Total ≈ 3–4 minggu kerja terfokus.
