# Modal Minimum untuk Launch — GowesFit Marketplace MVP

**Dibuat:** 2026-04-27
**Tujuan:** Hitung modal paling minimum untuk launch tanpa Vercel (self-hosted alternatives)
**Skenario:** Bootstrap mode — co-owner / no external funding
**Target:** Web bisa live, transaksi aman, beban biaya bulanan serendah mungkin

---

## 1. Filosofi: "Lean Launch"

Prinsip yang dipakai:
- **Pakai free tier semaksimal mungkin** sampai ada traction nyata
- **Hindari vendor lock-in** — pilih yang bisa di-migrate kalau scale
- **Pisahkan biaya wajib (legal, payment) dari opsional (premium tools)**
- **Defer biaya yang bisa ditunda** sampai revenue masuk

---

## 2. Breakdown Modal — One-Time Cost (Setup Awal)

### 2.1 Legal & Business — WAJIB

| Item | Estimasi Min | Catatan |
|------|--------------|---------|
| Pendirian CV (lebih murah dari PT) | Rp 3.000.000 | Notaris + NIB + SIUP. Bisa pakai jasa online (Hukumonline, Easybiz) |
| NPWP perusahaan | Rp 0 | Gratis di kantor pajak |
| Rekening bank perusahaan | Rp 100.000 | Setoran awal minimum |
| Konsultasi Privacy Policy + ToS (template + review lawyer) | Rp 1.500.000 | Bisa pakai template + 1 jam konsultasi |
| **Subtotal Legal** | **Rp 4.600.000** | |

> **Tips hemat:** PT bisa ditunda sampai funding/revenue terbukti. CV cukup untuk Midtrans merchant approval.

### 2.2 Domain — WAJIB (Lifetime Investment)

| Pilihan Domain | Harga 1 Tahun | Catatan |
|----------------|---------------|---------|
| `.com` via Niagahoster/Domainesia | Rp 150.000 – 200.000 | Paling profesional |
| `.id` | Rp 200.000 – 500.000 | Lokal Indonesia, lebih dipercaya |
| `.co.id` | Rp 250.000 – 500.000 | Butuh dokumen badan usaha |
| `.my.id` | Rp 50.000 – 100.000 | Hemat tapi kurang profesional |

**Rekomendasi:** Beli `.com` + `.id` sekaligus untuk perlindungan brand
- gowesfit.com: Rp 200.000
- gowesfit.id: Rp 300.000
- **Subtotal Domain: Rp 500.000/tahun**

### 2.3 Marketing Soft Launch — Minimal

| Item | Estimasi Min |
|------|--------------|
| Konten visual (Canva Pro 1 bulan) | Rp 75.000 |
| Outreach komunitas (transport, kopi meeting seller awal) | Rp 1.000.000 |
| Foto produk untuk listing template (DIY) | Rp 0 |
| **Subtotal Marketing** | **Rp 1.075.000** |

### **TOTAL ONE-TIME COST: Rp 6.175.000** (~Rp 6 juta)

---

## 3. Biaya Bulanan — Operasional Berjalan

### 3.1 Hosting & Backend (Tanpa Vercel)

#### Opsi A: Hostinger VPS Indonesia (Paling Murah, Server Dalam Negeri)

| Plan | Spesifikasi | Harga/bulan |
|------|-------------|-------------|
| KVM 1 | 1 vCPU, 4GB RAM, 50GB SSD | Rp 60.000 |
| KVM 2 | 2 vCPU, 8GB RAM, 100GB SSD | Rp 120.000 |

- Server lokasi Singapura (latency Indonesia bagus)
- Bisa install Next.js + PostgreSQL + Nginx semua di 1 VPS
- **Cocok untuk MVP awal**

#### Opsi B: DigitalOcean Droplet

| Plan | Spesifikasi | Harga/bulan |
|------|-------------|-------------|
| Basic 1GB | 1 vCPU, 1GB RAM, 25GB | $6 (~Rp 100.000) |
| Basic 2GB | 1 vCPU, 2GB RAM, 50GB | $12 (~Rp 200.000) |

- Region Singapore tersedia
- Lebih reliable dari hosting lokal
- Ada free $200 credit untuk 60 hari (untuk akun baru)

#### Opsi C: Railway / Render (PaaS, Lebih Mudah)

| Service | Free Tier | Bayar |
|---------|-----------|-------|
| Railway | $5 credit/bulan gratis | $5 minimum + usage |
| Render | Free tier dengan sleep | $7/service |

- Lebih mudah dari VPS (auto-deploy dari GitHub)
- Tapi free tier ada batasan (sleep, slow cold start)

#### Opsi D: Cloudflare Pages + Workers (Gratis Banyak)

- Cloudflare Pages: **gratis unlimited bandwidth**
- Cloudflare Workers: 100k req/day gratis
- Cocok untuk Next.js statis + edge functions
- **Tapi:** butuh adaptasi karena bukan node runtime full

**Rekomendasi MVP:** **Hostinger VPS KVM 1 (Rp 60.000/bulan)** atau **DigitalOcean $6 dengan free credit 60 hari**

### 3.2 Database — Supabase Free vs Subscription

#### Supabase Free Tier (Cukup Banget untuk MVP)

| Resource | Free Tier | Cukup untuk... |
|----------|-----------|----------------|
| Database | 500MB | ~50.000 listings + 200.000 messages |
| File storage | 1GB | ~500 listing × 2 foto compressed |
| Bandwidth | 5GB/bulan | ~10.000 unique visitors |
| Realtime | 200 concurrent | Lebih dari cukup |
| Auth users | Unlimited | ✅ |
| Edge functions | 500.000 invokasi/bulan | ✅ |

**⚠️ Catatan: Free tier project di-pause kalau tidak ada aktivitas 1 minggu.** Tidak masalah saat development, tapi setelah live harus jaga ada traffic minimal.

#### Supabase Pro ($25/bulan ~ Rp 400.000)

Upgrade kalau:
- DB > 500MB (sekitar bulan 4–6 di skenario realistis)
- Storage > 1GB (sekitar bulan 3 dengan banyak foto)
- Butuh daily backup
- Butuh > 5GB bandwidth/bulan

**Rekomendasi:** **Mulai dengan Free Tier**, upgrade ke Pro saat butuh.

#### Alternatif Self-Hosted PostgreSQL di VPS

- Install di VPS yang sama dengan app — gratis (sudah include di harga VPS)
- Trade-off: harus manage backup, scaling, security sendiri
- **Cocok kalau benar-benar bootstrap dan tim teknis siap maintenance**

### 3.3 File Storage (Foto Listing)

| Service | Free Tier | Bayar |
|---------|-----------|-------|
| **Cloudinary** | 25GB storage, 25GB bandwidth/bulan | $89/bulan jika exceed |
| **Supabase Storage** | 1GB (include di free tier) | Pro plan |
| **Cloudflare R2** | 10GB storage, no egress fee | $0.015/GB/bulan |
| **Backblaze B2** | 10GB storage | $0.005/GB/bulan |
| **VPS sendiri** | Sebatas disk VPS | Gratis (include) |

**Rekomendasi:** **Cloudinary Free Tier** — sudah include image transformation (resize, compress, format conversion). Hemat banyak coding effort.

### 3.4 OTP / SMS (Per-Use Cost)

| Vendor | Harga/SMS | Free Trial |
|--------|-----------|------------|
| Zenziva | Rp 300 | Trial Rp 5.000 |
| Twilio | Rp 1.500 | $15 credit free trial |
| WhatsApp Business API (via Wati/MessageBird) | Rp 400 | Trial bervariasi |

**Estimasi cost MVP:**
- Bulan 1: 200 OTP × Rp 300 = Rp 60.000
- Bulan 6: 1.000 OTP × Rp 300 = Rp 300.000

**Rekomendasi:** **Zenziva** untuk SMS, atau **WhatsApp via WABA** kalau mau UX lebih baik.

### 3.5 Email Transactional

| Service | Free Tier | Bayar |
|---------|-----------|-------|
| **Resend** | 3.000 email/bulan, 100/hari | $20/bulan untuk 50k |
| **SendGrid** | 100/hari forever | $19.95/bulan |
| **Brevo (Sendinblue)** | 300/hari | €25/bulan |
| **AWS SES** | 62k/bulan (dari EC2) | $0.10/1.000 email |

**Rekomendasi:** **Resend Free Tier** cukup untuk MVP.

### 3.6 Real-time Chat

- **Pakai Supabase Realtime** (sudah include di Supabase Free Tier) → biaya tambahan: Rp 0
- Alternatif: Pusher Free Tier (200k msg/hari) — lebih dari cukup untuk MVP

### 3.7 Error Tracking & Analytics

| Service | Free Tier |
|---------|-----------|
| **Sentry** | 5.000 errors/bulan, 10k performance | Cukup untuk MVP |
| **Posthog Cloud** | 1M events/bulan | ✅ Sangat cukup |
| **Plausible** (alternative) | Berbayar dari awal | $9/bulan |

**Rekomendasi:** **Sentry Free + Posthog Free** — total Rp 0/bulan.

### 3.8 Payment Gateway

- **Midtrans:** tidak ada biaya bulanan, hanya per-transaksi
- Setup fee: Rp 0 (sandbox), production approval gratis untuk akun standar
- Disbursement Iris: ada biaya per disbursement (~Rp 5.000)

---

## 4. Total Biaya Bulanan — Skenario Paling Hemat

### Bulan 1–3 (Pre-traction, Free Tier Maksimal)

| Item | Biaya/bulan |
|------|-------------|
| Hostinger VPS KVM 1 | Rp 60.000 |
| Supabase Free | Rp 0 |
| Cloudinary Free | Rp 0 |
| Resend Free | Rp 0 |
| Sentry Free | Rp 0 |
| Posthog Free | Rp 0 |
| Supabase Realtime (chat) | Rp 0 |
| Zenziva SMS (estimasi 200–500 OTP) | Rp 60.000 – 150.000 |
| Domain (amortisasi) | Rp 42.000 (Rp 500k / 12) |
| **Total bulanan minimum** | **Rp 162.000 – 252.000** |

### Bulan 4–6 (Mulai Scale, Beberapa Upgrade)

| Item | Biaya/bulan |
|------|-------------|
| Hostinger VPS KVM 2 (upgrade) | Rp 120.000 |
| Supabase Pro (upgrade saat data > 500MB) | Rp 400.000 |
| Cloudinary masih Free (cek bandwidth) | Rp 0 |
| Resend Free | Rp 0 |
| Sentry Free | Rp 0 |
| Zenziva SMS (estimasi 1.000 OTP) | Rp 300.000 |
| Domain | Rp 42.000 |
| **Total bulanan** | **Rp 862.000** |

---

## 5. Modal Minimum untuk Launch — Konsolidasi

### Skenario Ultra-Lean (Tanpa Cash untuk Development)

> Asumsi: Anda sebagai co-owner mengerjakan development sendiri, tidak hire developer

| Komponen | Total |
|----------|-------|
| **One-time setup (legal, domain, marketing)** | Rp 6.175.000 |
| **Operasional bulan 1** | Rp 252.000 |
| **Buffer 3 bulan operasional pre-revenue** | Rp 750.000 |
| **TOTAL MODAL AWAL MINIMUM** | **~Rp 7.200.000** |

**Artinya: Anda bisa launch GowesFit dengan modal Rp 7 juta** (asal development dikerjakan sendiri).

### Skenario Realistis (Ada Cash Buffer)

| Komponen | Total |
|----------|-------|
| Setup legal & business (PT bukan CV, lawyer proper) | Rp 12.000.000 |
| Domain + brand (.com + .id + logo) | Rp 1.500.000 |
| Marketing soft launch | Rp 5.000.000 |
| Operasional 6 bulan (avg Rp 500rb/bulan) | Rp 3.000.000 |
| Buffer untuk surprise (refund dispute, dll) | Rp 3.000.000 |
| **TOTAL** | **Rp 24.500.000** |

### Skenario dengan Vendor Development

| Komponen | Total |
|----------|-------|
| Development MVP (4 bulan × dev rate) | Rp 80.000.000 – 150.000.000 |
| Setup legal & business | Rp 12.000.000 |
| Domain + branding | Rp 1.500.000 |
| Marketing | Rp 5.000.000 |
| Operasional 6 bulan | Rp 5.000.000 |
| Buffer | Rp 5.000.000 |
| **TOTAL** | **Rp 108.500.000 – Rp 178.500.000** |

---

## 6. Roadmap Upgrade Biaya Berdasarkan Traction

```
Bulan 1–3 (Traction validation)
└─ Stack: VPS Rp 60k + Supabase Free + Cloudinary Free
   Total: ~Rp 200k/bulan

Bulan 4–6 (Early growth)
└─ Upgrade: Supabase Pro saat data > 500MB
   Total: ~Rp 800k/bulan

Bulan 7–12 (Scale)
└─ Upgrade: VPS lebih besar atau pindah ke managed
   └─ Cloudinary Plus saat bandwidth > 25GB
   Total: ~Rp 2–3 juta/bulan

Bulan 12+ (Profitable)
└─ Bisa migrasi balik ke managed PaaS (Vercel/Railway) untuk DX
   └─ Pakai dedicated team
   Total: ~Rp 5–10 juta/bulan (saat revenue > Rp 30 juta/bulan)
```

---

## 7. Apa yang BISA Ditunda (Hemat)

| Item | Bisa Ditunda? | Kapan Aktivasi |
|------|---------------|----------------|
| PT (vs CV) | ✅ | Saat ada investor / revenue > Rp 50jt/bulan |
| Logo profesional (vs DIY Canva) | ✅ | Setelah product-market fit |
| Lawyer review komprehensif | ⚠️ Sebagian | Privacy Policy wajib, kontrak lengkap bisa pakai template |
| Vercel/managed PaaS | ✅ | Saat developer experience jadi bottleneck |
| Cloudinary Plus | ✅ | Saat bandwidth > 25GB |
| Supabase Pro | ✅ | Saat data > 500MB |
| Custom email domain | ❌ | Wajib dari hari pertama (untuk transactional email) |
| SSL Certificate | ❌ | Wajib (gratis dari Let's Encrypt / Cloudflare) |

---

## 8. Apa yang TIDAK BOLEH Hemat (Critical)

❌ **Jangan hemat di:**

1. **Privacy Policy & ToS** — pelanggaran UU PDP = denda 2% annual revenue. Minimum konsultasi 1–2 jam dengan lawyer.

2. **Backup database** — Supabase Free tidak ada daily backup. Setup manual backup script ke S3/B2.

3. **HTTPS / SSL** — wajib untuk payment dan login. Pakai Cloudflare gratis atau Let's Encrypt.

4. **Error tracking** — kalau ada bug di payment flow, harus tahu cepat. Sentry Free tier wajib aktif.

5. **Verifikasi rekening bank seller** — pakai Midtrans name validation (gratis kalau sudah merchant).

6. **Webhook signature verification** — Midtrans webhook wajib di-verify HMAC. Skip = celah serangan.

---

## 9. Bottom Line

### Modal Minimum Absolute (Bootstrap Mode)

```
🟢 Rp 7.200.000  — Co-owner kerjakan dev sendiri, all free tier
🟡 Rp 24.500.000 — Realistic dengan buffer & marketing proper
🔴 Rp 134.000.000 — Dengan vendor development outsource
```

### Rekomendasi Eksekusi

1. **Mulai dari Rp 7 juta** kalau bisa code sendiri / co-owner aktif coding
2. **Jangan bayar Vercel di awal** — VPS Hostinger Rp 60rb/bulan cukup
3. **Stay di Supabase Free Tier** sampai data nyata > 400MB
4. **Cloudinary Free 25GB** sudah lebih dari cukup untuk 1.000 listing pertama
5. **Investasi terbesar: legal compliance** (Rp 4–5 juta) — non-negotiable

### Cash Flow Projection (Skenario Bootstrap Realistis)

| Bulan | Modal Tersisa | Revenue | Net Cash |
|-------|--------------|---------|----------|
| 0 (Setup) | Rp 7.200.000 | — | Rp 7.200.000 |
| 1 | -Rp 252.000 | Rp 0 | Rp 6.948.000 |
| 2 | -Rp 252.000 | Rp 1.700.000 (listing fee + boost) | Rp 8.396.000 |
| 3 | -Rp 252.000 | Rp 4.000.000 | Rp 12.144.000 |
| 4 | -Rp 862.000 | Rp 7.500.000 | Rp 18.782.000 |
| 5 | -Rp 862.000 | Rp 10.500.000 | Rp 28.420.000 |
| 6 | -Rp 862.000 | Rp 14.000.000 | Rp 41.558.000 |

**Insight:** Dengan modal Rp 7 juta dan execution disiplin, business cash-positive bisa tercapai di bulan 2–3.

---

## Catatan Penting

- ⚠️ Semua harga adalah estimasi per April 2026, validasi ulang saat implementasi
- ⚠️ Belum termasuk biaya "tak terduga" — siapkan buffer 20%
- ⚠️ Belum termasuk gaji / kompensasi tim (asumsi co-owner unpaid sampai profitable)
- ⚠️ Belum termasuk pajak (PPh badan 22% dari profit, PPN 11% jika omset > Rp 4.8 miliar/tahun)
