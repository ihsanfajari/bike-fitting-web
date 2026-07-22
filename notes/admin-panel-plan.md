# Admin Panel — Plan & Roadmap

**Dibuat:** 2026-05-16
**Status:** Plan — menunggu approval sebelum implementasi
**Acuan ERD:** `ERD-marketplace-sepeda.md` (kolom `users.is_admin`, `account_status`, dst)

---

## 1. Tujuan & Lingkup

Admin panel adalah **internal tool** untuk tim GowesFit menjalankan operasi marketplace:
- Verifikasi user (HP & KYC manual untuk fase awal)
- Moderasi listing & user
- Resolusi sengketa (dispute)
- Pemantauan kesehatan platform (analytics, GMV, funnel)
- Pengelolaan transaksi & payout (nanti)

**Bukan tujuan:**
- Tool untuk seller mengelola tokonya — itu sudah ada di `/marketplace/me/*` (user-facing)
- CMS marketing/CRM — pakai tool eksternal (Notion, Sheets) sampai volume justifies
- Mobile app — desktop-only sudah cukup untuk tim kecil

## 2. Persona Pengguna

| Persona | Akses | Tugas Utama |
|---|---|---|
| **Owner / Super Admin** | Semua | Set fee, ban user, lihat semua statistik, akses audit log |
| **Moderator** (post-MVP) | Listing, user, report, dispute | Verifikasi HP, review listing high-value, tangani report |
| **Customer Support** (post-MVP) | Read-only sebagian besar + tindakan terbatas | Bantu user via WA/email, lihat order detail |

**MVP**: cukup 1 role `is_admin = true` (super admin). Role granular ditambah kalau timnya bertambah.

## 3. Permission Model

**MVP — boolean flag:**
- Kolom `users.is_admin` sudah ada di schema. `true` = bisa akses semua route `/admin/*`.
- Middleware (`proxy.ts`) blokir non-admin di prefix `/admin`.

**Post-MVP — role-based:**
- Tambah kolom `users.admin_role` ENUM (`super_admin`, `moderator`, `support`)
- Setiap server action cek role
- Catatan: semua action yang ubah state penting **wajib** dicatat di `admin_action_log` (tabel baru, lihat §5)

## 4. Struktur Halaman

```
/admin
├── /admin                          # Dashboard summary
├── /admin/users                    # User management
│   ├── /admin/users?status=pending # Filter user yang menunggu verifikasi HP
│   └── /admin/users/[id]           # Detail user + actions (verify HP, suspend, ban)
├── /admin/listings                 # Listing management
│   ├── /admin/listings?status=...
│   └── /admin/listings/[id]        # Detail + actions (approve, hide, remove)
├── /admin/orders                   # Transaction tracker (Fase B)
│   └── /admin/orders/[id]          # Detail + intervensi (refund, force complete)
├── /admin/disputes                 # Sengketa (Fase B)
│   └── /admin/disputes/[id]        # Investigasi + putusan
├── /admin/reports                  # Trust & safety reports (Fase B)
│   └── /admin/reports/[id]
├── /admin/payouts                  # Pencairan dana (Fase B)
├── /admin/analytics                # GMV, funnel, top sellers (Fase C)
└── /admin/settings                 # Konfig fee, banner, dll (Fase C)
```

## 5. Implementasi Bertahap

Implementasi dibagi 3 fase, **prioritas berdasarkan kebutuhan soft launch**:

### Fase A — MVP (urgent, untuk soft launch dengan 50 seller manual)

| ID | Fitur | Effort | Why now |
|---|---|---|---|
| ADM-A1 | Layout admin + middleware proteksi `is_admin` | S | Foundation |
| ADM-A2 | Dashboard ringkas: jumlah user, listing aktif, pending verify | S | Quick health check |
| ADM-A3 | `/admin/users` list + filter (HP belum verified / suspended / dll) + search | M | **Kritikal untuk verify HP** |
| ADM-A4 | `/admin/users/[id]` detail + tombol "Verify HP" (set `phone_verified_at`) | S | Inti masalah saat ini |
| ADM-A5 | `/admin/users/[id]` action: suspend / unsuspend / ban (`account_status`) | S | Trust & safety dasar |
| ADM-A6 | `/admin/listings` list semua + filter status | M | Lihat apa yg di-post komunitas |
| ADM-A7 | `/admin/listings/[id]` detail + action: pause, remove, soft delete | S | Moderasi listing nakal |
| ADM-A8 | Manual review flag untuk listing > Rp 20jt (PRD §5.8 / DIFF-05) | S | Anti-fraud high-value |

### Fase B — Saat transaksi mulai jalan (setelah Midtrans integrated)

| ID | Fitur | Effort |
|---|---|---|
| ADM-B1 | `/admin/orders` list + filter status + search by order_number | M |
| ADM-B2 | `/admin/orders/[id]` detail + intervensi manual (force cancel, refund) | M |
| ADM-B3 | `/admin/disputes` queue: open → investigating → resolved | M |
| ADM-B4 | `/admin/disputes/[id]` review bukti + putusan (resolved_buyer / seller) | M |
| ADM-B5 | `/admin/reports` queue + action (dismiss, action_taken) | M |
| ADM-B6 | `/admin/payouts` monitor disbursement + retry yang gagal | M |

### Fase C — Saat data sudah meaningful (3-6 bulan post-launch)

| ID | Fitur | Effort |
|---|---|---|
| ADM-C1 | Analytics dashboard: GMV harian/mingguan/bulanan | L |
| ADM-C2 | Funnel seller (signup → verify → first listing → first sale) | L |
| ADM-C3 | Top sellers leaderboard | M |
| ADM-C4 | Settings: fee structure, banner homepage, kategori spec_schema editor | L |

## 6. Audit Trail (Wajib Sejak Fase A)

Setiap aksi admin yang **mengubah data user/listing/order wajib dicatat**. Tabel baru perlu ditambah ke ERD:

```
admin_action_logs
├── id UUID
├── admin_id UUID FK users.id
├── action ENUM ('verify_hp', 'suspend_user', 'ban_user', 'remove_listing',
│                 'force_cancel_order', 'resolve_dispute_buyer', dst)
├── target_type ENUM ('user', 'listing', 'order', 'dispute', 'report')
├── target_id UUID
├── reason TEXT NULL
├── metadata JSONB NULL (snapshot of changes)
└── created_at TIMESTAMPTZ
```

**Why:** akuntabilitas siapa-yang-melakukan-apa, kebutuhan compliance & dispute follow-up. Cheap untuk ditambah sekarang, mahal untuk ditambah belakangan + backfill.

## 7. Tech Approach

- **Sama Next.js app**, route prefix `/admin` (tidak ada subdomain terpisah)
- **Layout terpisah** dari `/marketplace`: sidebar nav kiri, content area kanan (desktop-first, tidak mobile-friendly)
- **Server components** untuk semua list/detail page (consistent dengan main app)
- **Server actions** untuk semua mutasi (verify, suspend, dll)
- **Permission gate** di `proxy.ts`: `if path.startsWith("/admin") && !user.is_admin → redirect /marketplace`
- **No new dependencies** — pakai komponen `@/components/ui` yang sudah ada
- **No analytics library** di Fase A-B — query Prisma langsung untuk stats sederhana

## 8. Keputusan (Sudah Disepakati 2026-05-16)

1. ✅ **`admin_action_logs` ditambah sekarang** — migrate sekalian saat tabel masih kosong.
2. ✅ **Pakai `/admin` di domain utama** — simpler, tidak perlu DNS terpisah.
3. ✅ **Desktop sidebar nav** — productivity tool style, optimized untuk laptop.

## 9. Integrasi dengan Backlog

Backlog existing yang sebelumnya scatter:
- `M7-10` "Internal admin tool" → jadi superset Fase A+B di plan ini
- `LAUNCH-05` "Flow dispute manual via WhatsApp admin" → diganti `/admin/disputes` di Fase B
- `DIFF-05` "Manual review listing high-value" → ADM-A8

Plan ini akan ditambahkan sebagai **BAGIAN F** baru di `backlog/backlog-mvp.md` dengan IDs `ADM-A1..C4`.

---

## Estimasi Total

| Fase | Items | Estimasi |
|---|---|---|
| A (MVP) | 8 items | ~1 minggu |
| B (transaksi) | 6 items | ~1 minggu |
| C (analytics) | 4 items | ~1.5 minggu |
| **Total** | **18 items** | **~3.5 minggu** |

Fase A bisa dimulai **sekarang** karena kita perlu untuk soft launch. Fase B nunggu Midtrans terintegrasi. Fase C nunggu data terkumpul (minimal beberapa ratus transaksi).
