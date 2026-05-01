# Important Decision Notes — GowesFit Marketplace

**Last updated:** 2026-04-25
**Purpose:** Catatan informasi dan keputusan kritikal yang mempengaruhi arah development dan bisnis. Selalu update file ini saat ada keputusan penting yang dibuat.

---

## 1. KEPUTUSAN YANG SUDAH DIAMBIL

### ✅ Tech Stack Utama
- **Framework**: Next.js 16 App Router (sudah ada di fitting tool)
- **Database**: PostgreSQL 15+ — dipilih karena kebutuhan relational data kompleks (20 tabel, state machine order), full-text search built-in, dan transaction isolation untuk operasi escrow
- **Payment**: Midtrans — dipilih karena coverage payment method Indonesia terluas (VA semua bank besar, e-wallet, QRIS), ada disbursement API (Midtrans Iris) untuk cair dana ke penjual
- **ORM**: Prisma — type-safe, migration tooling yang mature
- *Alasan tidak pilih Firebase/MongoDB*: Data marketplace sangat relational (orders → payments → shipments → payouts), butuh ACID transaction untuk operasi keuangan

### ✅ Model Monetisasi
- **Fee**: 1% dari harga barang (min Rp5.000), dibebankan ke pembeli sebagai biaya proteksi/rekber
- **Tidak ada listing fee** — friction terlalu tinggi untuk platform baru
- **Tidak ada subscription seller** — MVP dulu, uji daya terima pasar
- *Alasan*: Freemium model (free listing, bayar saat transaksi) adalah standar marketplace C2C yang terbukti (Tokopedia awal, Carousell)

### ✅ Database Design Decisions (dari ERD)
- **UUID primary keys** — aman untuk distributed, tidak bocorkan jumlah data
- **BIGINT untuk uang (IDR)** — tidak ada desimal di IDR, hindari floating point error
- **JSONB untuk `extra_specs`** — field spesifik sepeda per kategori fleksibel tanpa schema explosion
- **Soft delete** untuk `users`, `listings`, `orders` — data keuangan tidak boleh dihapus permanen
- **Snapshot di order** — `shipping_address_snapshot` dan `item_price` di tabel orders, bukan foreign key — karena alamat dan harga bisa berubah tapi order history harus immutable

### ✅ Scope MVP — Yang TIDAK dibangun dulu
Berdasarkan PRD Non-Goals:
- ❌ Pelelangan / bidding
- ❌ Bike fitting integration ke marketplace
- ❌ Subscription / toko premium
- ❌ Social feed / komunitas / forum
- ❌ Integrasi ekspedisi otomatis (tracking real-time)
- ❌ Mobile native app
- ❌ Balance ledger table (audit detail saldo)
- ❌ Promo codes / vouchers
- *Alasan*: Fokus pada validasi core loop dulu: listing → transaksi aman → dana cair

---

## 2. INFORMASI KRITIKAL YANG MEMPENGARUHI DEVELOPMENT

### 2.1 Midtrans Merchant Account — Butuh Badan Usaha
> **Impact: Blocker untuk development payment**

Untuk menggunakan Midtrans di production (bukan sandbox), dibutuhkan:
- Badan usaha terdaftar (PT atau CV) atau KTP perorangan dengan NPWP
- Dokumen: akta notaris, SIUP/NIB, rekening bank perusahaan
- Proses approval: **2–4 minggu** setelah submit dokumen
- Tanpa ini, development payment hanya bisa di sandbox (tidak bisa real transaction)

**Action**: Owner harus daftar Midtrans merchant **sejak awal** — jangan tunggu development selesai.

### 2.2 Escrow / Rekber Bukan Fitur Biasa — Ada Risiko Regulasi
> **Impact: Legal & compliance risk**

Menyimpan dana orang lain (escrow) di Indonesia secara teknis membutuhkan izin dari Bank Indonesia jika dianggap sebagai "penyelenggara transfer dana". Marketplace besar seperti Tokopedia, Shopee menggunakan lisensi fintech.

**Opsi untuk MVP:**
- **Opsi A (Aman)**: Gunakan Midtrans sebagai pihak ketiga — dana tetap di ekosistem Midtrans, tidak pernah di rekening GowesFit secara langsung. Ini yang paling aman secara regulasi.
- **Opsi B (Risky)**: Dana masuk ke rekening GowesFit dulu, baru disbursed. Ini butuh izin BI.

**Rekomendasi**: Pilih Opsi A (Midtrans managed escrow) untuk MVP.

### 2.3 UU Perlindungan Data Pribadi (UU PDP) Indonesia
> **Impact: Wajib comply sejak hari pertama**

UU PDP berlaku sejak 2024. Implikasinya untuk GowesFit:
- Nomor HP dan alamat lengkap user tidak boleh ditampilkan publik
- Data hanya dibagikan ke pihak terkait transaksi (buyer melihat no HP seller hanya setelah order)
- Harus ada Privacy Policy dan Terms & Conditions sebelum launch
- User harus bisa request hapus data (right to erasure)
- Pelanggaran: denda hingga 2% dari annual revenue

**Action**: Buat Privacy Policy dan ToS sebelum soft launch. Konsultasi lawyer.

### 2.4 Verifikasi Nomor HP — Pilihan Vendor OTP
> **Impact: User experience & biaya operasional**

Verifikasi HP via OTP wajib sebelum user bisa listing/transaksi (anti-fraud). Pilihan vendor:

| Vendor | Harga/SMS | Coverage | Reliability | Catatan |
|--------|-----------|----------|-------------|---------|
| Twilio | ~Rp1.500/SMS | Global | Tinggi | Lebih mahal, mudah setup |
| Zenziva | ~Rp300/SMS | Indonesia | Tinggi | Lokal, lebih murah |
| Vonage | ~Rp1.200/SMS | Global | Tinggi | — |
| WhatsApp OTP (via WABA) | ~Rp400/WA | Indonesia | Sangat tinggi | User lebih familiar |

**Rekomendasi**: Zenziva untuk SMS + WhatsApp Business API untuk OTP via WA — familiar bagi user Indonesia, lebih murah.

### 2.5 Chicken-and-Egg Problem — Strategy Sudah Diputuskan di PRD
> **Impact: Launch strategy, bukan tech**

PRD sudah menetapkan: recruit 50 seller manual dari komunitas **sebelum** buka ke publik. Ini adalah dependency non-teknis yang 100% ada di tangan Owner.

**Implikasi untuk developer**: Soft launch bisa dilakukan tanpa traction organik — tapi Owner harus deliver 50 seller ini. Jika tidak, platform akan terlihat sepi dan buzz pertama akan negatif.

### 2.6 Foto Listing — Storage & Compression
> **Impact: Biaya infra & UX**

Setiap listing bisa punya 3–10 foto. Estimasi:
- 500 listing × 6 foto rata-rata × 2MB = **6GB storage di bulan ke-3**
- Tanpa compression, ini mahal dan lambat dimuat di mobile

**Keputusan**: Wajib pakai image transformation (Cloudinary atau imgix) — resize & compress otomatis sebelum simpan. Jangan simpan raw foto.

**Rekomendasi**: Cloudinary free tier cukup untuk 10GB storage dan 20GB bandwidth/bulan (cukup untuk awal).

### 2.7 Real-Time Chat — Pilihan Teknologi
> **Impact: Complexity vs cost**

Chat real-time memerlukan WebSocket. Opsi:

| Opsi | Biaya | Kompleksitas | Catatan |
|------|-------|-------------|---------|
| Pusher | Gratis s/d 200k msg/hari | Rendah | Managed, mudah setup |
| Ably | Gratis s/d 6M msg/bulan | Rendah | Lebih murah long-term |
| Supabase Realtime | Termasuk di Supabase plan | Rendah | Sudah terintegrasi jika pakai Supabase |
| Socket.io self-hosted | Server cost saja | Tinggi | Butuh maintain infra |

**Rekomendasi**: Supabase Realtime jika pakai Supabase untuk DB — zero extra cost, zero extra setup.

### 2.8 Auto-Confirm Delivered — Cron Job Critical
> **Impact: Business logic & dana penjual**

Per PRD: jika buyer tidak konfirmasi dalam 3 hari setelah status "terkirim", order otomatis complete dan dana cair ke penjual. Ini butuh cron job reliable.

**Opsi implementasi**:
- Vercel Cron Jobs (built-in, cocok untuk deployment di Vercel)
- Supabase pg_cron (jika butuh lebih granular)
- Upstash QStash (jika butuh delay queue)

**Keputusan**: Vercel Cron Jobs untuk simplicity. Jalankan setiap jam, check order yang shipped > 3 hari.

---

## 3. RISIKO TEKNIS YANG HARUS DIMONITOR

### 🔴 Risiko Tinggi

| Risiko | Dampak | Mitigasi |
|--------|--------|---------|
| Webhook Midtrans gagal/double-fire | Dana tidak cair / double cair ke penjual | Idempotency key per webhook event, lock di DB sebelum proses |
| Race condition di `users.balance` | Saldo tidak akurat saat banyak order selesai bersamaan | Gunakan PostgreSQL `SELECT FOR UPDATE` atau serializable transaction |
| Foto upload gagal midway | Listing dengan broken image | Transaction: save listing hanya jika semua foto berhasil upload |
| OTP brute force | Account takeover | Rate limit: max 5 attempt/jam per nomor HP |

### 🟡 Risiko Sedang

| Risiko | Dampak | Mitigasi |
|--------|--------|---------|
| Full-text search lambat saat data besar | UX buruk saat browse | Index GIN di `search_vector`, consider Meilisearch post-MVP |
| Session chat expired saat transaksi kritis | User frustasi | Refresh token otomatis, grace period 30 hari |
| Nomor rekening penjual salah | Disbursement gagal, konflik | Validasi nama rekening via bank API (Midtrans name validation) sebelum simpan |

---

## 4. KEPUTUSAN YANG MASIH OPEN (Belum Diputuskan)

| # | Keputusan | Opsi | Deadline Decide | Notes |
|---|-----------|------|----------------|-------|
| 1 | Co-owner vs vendor | Co-owner 25% / Vendor fee / Hybrid | **Sebelum coding** | Topik A di owner-discussion |
| 2 | Vendor OTP SMS | Zenziva vs Twilio vs WhatsApp | Milestone 1 | Pengaruhi budget |
| 3 | Storage foto | Cloudinary vs Supabase Storage | Milestone 2 | Pengaruhi cost |
| 4 | Real-time chat | Pusher vs Ably vs Supabase Realtime | Milestone 4 | Tergantung hosting choice |
| 5 | Hosting DB | Supabase vs Neon vs self-hosted | Milestone 0 | Pengaruhi semua development |
| 6 | Analytics tool | Posthog vs Plausible vs GA4 | Milestone 8 | Posthog recommended (A/B test support) |
| 7 | Admin tool | Custom build vs Retool vs AdminJS | Post-MVP | Low priority tapi penting untuk dispute handling |

---

## 5. LESSONS LEARNED & CATATAN LAPANGAN

*Isi saat ada insight dari customer research, testing, atau kejadian di development*

### [Tanggal] — [Topik]
```
Temuan:
Implikasi untuk development:
Keputusan yang diambil:
```

---

## 6. REFERENSI DOKUMEN TERKAIT

| Dokumen | Lokasi | Kapan Dibaca |
|---------|--------|-------------|
| PRD Marketplace MVP | `notes/PRD-marketplace-sepeda-MVP.md` | Saat implement fitur baru — check scope |
| ERD Database | `notes/ERD-marketplace-sepeda.md` | Saat membuat tabel atau API baru |
| Marketing Context | `.agents/product-marketing-context.md` | Saat menulis copy, design UI, atau research |
| Dev Checklist | `notes/dev-checklist-and-milestones.md` | Daily — track progress |
| Owner Discussion | `notes/owner-discussion-followup.md` | Sebelum meeting dengan owner |
| Customer Research Skills | `.agents/skills/customer-research/SKILL.md` | Saat butuh research framework |
| Pricing Strategy Skills | `.agents/skills/pricing-strategy/SKILL.md` | Saat evaluate model monetisasi |
