# Simulasi Keuntungan & ROI — GowesFit Marketplace MVP

**Dibuat:** 2026-04-27
**Periode simulasi:** 6 bulan pertama setelah launch
**Mata uang:** IDR
**Disclaimer:** Semua angka adalah estimasi berdasarkan target PRD dan benchmark marketplace C2C Indonesia. Validasi via customer research wajib.

---

## 1. Asumsi Dasar

### Profil Transaksi

| Kategori | % dari Total Listing | Avg Harga | Catatan |
|----------|---------------------|-----------|---------|
| Sepeda utuh (roadbike, MTB, gravel) | 40% | Rp 12.000.000 | Harga rata-rata komunitas hobi |
| Frame, groupset, wheelset | 20% | Rp 4.500.000 | Komponen high-value |
| Cockpit & seatpost | 10% | Rp 1.200.000 | |
| Aksesoris (helm, lampu, pompa) | 20% | Rp 600.000 | |
| Apparel (jersey, sepatu, bibshort) | 10% | Rp 800.000 | |
| **Weighted Avg Ticket** | 100% | **Rp 6.300.000** | Untuk perhitungan fee |

### Konversi Funnel (Benchmark Marketplace C2C)

| Tahap | Conversion Rate |
|-------|-----------------|
| Listing aktif → ada chat masuk | 60% |
| Chat → transaksi (untuk listing yang ada chat) | 15% |
| Listing aktif → sold (overall) | **9–12%** (target PRD: ≥10%) |
| Listing → boost/featured | 5–10% |

---

## 2. Skenario Volume — 6 Bulan

### Skenario Pesimis (60% dari target PRD)

| Bulan | Listing Aktif | Transaksi Selesai | Listing Boosted |
|-------|---------------|-------------------|-----------------|
| 1 | 100 | 0 (gratis, belum aktivasi rekber) | 0 |
| 2 | 200 | 8 | 5 |
| 3 | 300 | 15 | 12 |
| 4 | 400 | 25 | 20 |
| 5 | 500 | 35 | 30 |
| 6 | 600 | 45 | 40 |
| **Total** | | **128** | **107** |

### Skenario Realistis (target PRD)

| Bulan | Listing Aktif | Transaksi Selesai | Listing Boosted |
|-------|---------------|-------------------|-----------------|
| 1 | 150 | 0 | 0 |
| 2 | 350 | 15 | 10 |
| 3 | 500 | 50 | 30 |
| 4 | 700 | 75 | 50 |
| 5 | 900 | 100 | 75 |
| 6 | 1.100 | 130 | 100 |
| **Total** | | **370** | **265** |

### Skenario Optimis (1.5× target PRD)

| Bulan | Listing Aktif | Transaksi Selesai | Listing Boosted |
|-------|---------------|-------------------|-----------------|
| 1 | 250 | 0 | 0 |
| 2 | 600 | 30 | 25 |
| 3 | 900 | 90 | 70 |
| 4 | 1.300 | 150 | 110 |
| 5 | 1.700 | 200 | 160 |
| 6 | 2.000 | 260 | 200 |
| **Total** | | **730** | **565** |

---

## 3. Revenue per Layanan

### 3.1 Transaction Fee (Rekber 1%)

**Formula:** `1% × harga barang` dengan minimum Rp 5.000 per transaksi

**Avg fee per transaksi:** 1% × Rp 6.300.000 = **Rp 63.000**

| Bulan | Pesimis | Realistis | Optimis |
|-------|---------|-----------|---------|
| 1 | Rp 0 | Rp 0 | Rp 0 |
| 2 | Rp 504.000 | Rp 945.000 | Rp 1.890.000 |
| 3 | Rp 945.000 | Rp 3.150.000 | Rp 5.670.000 |
| 4 | Rp 1.575.000 | Rp 4.725.000 | Rp 9.450.000 |
| 5 | Rp 2.205.000 | Rp 6.300.000 | Rp 12.600.000 |
| 6 | Rp 2.835.000 | Rp 8.190.000 | Rp 16.380.000 |
| **Total 6 bulan** | **Rp 8.064.000** | **Rp 23.310.000** | **Rp 45.990.000** |

> Catatan: Bulan 1 fee belum aktif (free transaksi untuk validasi traction).

### 3.2 Listing Fee

**Formula:** Rp 10.000 per listing (mid-range Rp 5–15rb)
**Aktivasi:** Bulan 2+, opsional (seller bisa skip dengan tunggu 24 jam moderasi manual)

**Asumsi:** 30% seller mau bayar untuk fast-track publish

| Bulan | Listing Berbayar (Pesimis) | Realistis | Optimis |
|-------|---------------------------|-----------|---------|
| 1 | 0 | 0 | 0 |
| 2 | 60 (30% × 200) | 105 | 180 |
| 3 | 90 | 150 | 270 |
| 4 | 120 | 210 | 390 |
| 5 | 150 | 270 | 510 |
| 6 | 180 | 330 | 600 |
| **Revenue (Rp 10.000/listing)** | **Rp 6.000.000** | **Rp 10.650.000** | **Rp 19.500.000** |

### 3.3 Featured Listing / Boost

**Harga:** Rp 25.000 per 7 hari
**Aktivasi:** Bulan 2+

| Bulan | Pesimis | Realistis | Optimis |
|-------|---------|-----------|---------|
| 1 | Rp 0 | Rp 0 | Rp 0 |
| 2 | Rp 125.000 | Rp 250.000 | Rp 625.000 |
| 3 | Rp 300.000 | Rp 750.000 | Rp 1.750.000 |
| 4 | Rp 500.000 | Rp 1.250.000 | Rp 2.750.000 |
| 5 | Rp 750.000 | Rp 1.875.000 | Rp 4.000.000 |
| 6 | Rp 1.000.000 | Rp 2.500.000 | Rp 5.000.000 |
| **Total** | **Rp 2.675.000** | **Rp 6.625.000** | **Rp 14.125.000** |

### 3.4 Seller Subscription (Post-MVP — Bulan 4+)

**Harga:** Rp 49.000/bulan
**Asumsi:** 5% seller aktif convert ke subscriber

| Bulan | Pesimis (Subscribers) | Realistis | Optimis |
|-------|----------------------|-----------|---------|
| 4 | 20 | 35 | 65 |
| 5 | 25 | 45 | 85 |
| 6 | 30 | 55 | 100 |
| **Revenue (Rp 49.000)** | **Rp 3.675.000** | **Rp 6.615.000** | **Rp 12.250.000** |

---

## 4. Total Revenue 6 Bulan

| Sumber Revenue | Pesimis | Realistis | Optimis |
|----------------|---------|-----------|---------|
| Transaction fee 1% | Rp 8.064.000 | Rp 23.310.000 | Rp 45.990.000 |
| Listing fee | Rp 6.000.000 | Rp 10.650.000 | Rp 19.500.000 |
| Featured listing | Rp 2.675.000 | Rp 6.625.000 | Rp 14.125.000 |
| Seller subscription | Rp 3.675.000 | Rp 6.615.000 | Rp 12.250.000 |
| **TOTAL REVENUE** | **Rp 20.414.000** | **Rp 47.200.000** | **Rp 91.865.000** |

### Komposisi Revenue (Realistis)

```
Transaction fee  ████████████████████████  49%   Rp 23.3 jt
Listing fee      ███████████               23%   Rp 10.6 jt
Featured listing ███████                   14%   Rp  6.6 jt
Subscription     ███████                   14%   Rp  6.6 jt
```

**Insight:** Transaction fee jadi backbone (49%), tapi listing fee + featured + subscription kontribusi 51% — diversifikasi penting.

---

## 5. Biaya Operasional (Cost Side)

### 5.1 Biaya Variable per Transaksi

| Komponen | Estimasi | Catatan |
|----------|----------|---------|
| Midtrans payment fee (VA) | Rp 4.000/trx | Flat fee VA |
| Midtrans payment fee (e-wallet/QRIS) | 0.7%–2% | Average ~1.5% |
| Midtrans Iris disbursement | Rp 5.000/trx | Untuk payout ke seller |
| **Avg cost per transaksi** | **~Rp 100.000** | (1.5% × Rp 6.3jt + Rp 9.000 fixed) |

> Catatan kritis: jika fee rekber kita 1% (= Rp 63rb avg) tapi cost Midtrans ~1.5%+ flat fee, **kita merugi per transaksi kecil!** Mitigasi:
> - Tetapkan minimum fee Rp 5.000 (untuk barang murah seperti aksesoris)
> - Naikkan fee ke 1.5–2% kalau perlu (validasi via pricing-strategy skill)
> - Atau bebankan biaya admin ke buyer (transparan: "biaya proteksi rekber Rp 10.000")

### 5.2 Biaya Tetap Bulanan (Infrastruktur)

| Service | Free Tier | Estimasi Bayar (saat scale) |
|---------|-----------|------------------------------|
| Vercel (hosting) | $0 (hobby) | $20 (Pro) saat traffic naik |
| Supabase (DB + Auth + Realtime) | $0 (500MB) | $25 (Pro, 8GB) |
| Cloudinary (image) | $0 (10GB, 20GB bw) | $89 (Plus) saat bandwidth tinggi |
| Resend (email) | $0 (3k/bln) | $20 (50k email/bln) |
| Zenziva SMS OTP | Pay per SMS | ~Rp 300 × 1.000 OTP = Rp 300k |
| WhatsApp Business OTP | Pay per msg | ~Rp 400 × 1.000 = Rp 400k |
| Sentry (error tracking) | $0 (5k events) | $26 (Team) |
| Posthog | $0 (1M events) | $0 (cukup di tier free utk MVP) |
| Domain | — | Rp 200k/tahun |
| **Total bulanan (estimasi)** | **~Rp 0–500k** | **~Rp 3–4 juta saat scale** |

### 5.3 Biaya Setup Awal (One-Time)

| Item | Estimasi |
|------|----------|
| Pendirian PT/CV (notaris + NIB + SIUP) | Rp 5.000.000 – Rp 8.000.000 |
| Konsultasi lawyer (ToS + Privacy Policy + draft kontrak) | Rp 3.000.000 – Rp 5.000.000 |
| Setup Midtrans merchant (deposit/jaminan jika ada) | Rp 0 – Rp 1.000.000 |
| Domain + 1 tahun hosting basic | Rp 500.000 |
| Marketing soft launch (komunitas outreach, konten) | Rp 5.000.000 |
| **Total Setup** | **Rp 13.500.000 – Rp 19.500.000** |

### 5.4 Biaya Development MVP

> Tergantung struktur kerja sama (lihat `notes/owner-discussion-followup.md` Topik A)

**Skenario A — Vendor / Outsource Development:**
- Estimasi 16 minggu × 1 full-stack senior = Rp 80.000.000 – Rp 150.000.000
- Atau lump sum Rp 60.000.000 – Rp 120.000.000

**Skenario B — Co-owner (Equity, no cash):**
- Cash cost: Rp 0
- Cost: dilusi equity 20–30%

**Skenario C — Hybrid (Retainer kecil + Equity):**
- Retainer Rp 5–10jt/bulan × 4 bulan = Rp 20–40jt
- Plus equity 10–20%

---

## 6. Profit/Loss 6 Bulan (Skenario Realistis)

**Asumsi:** Co-owner model (no dev cash cost), biaya operasional rata-rata Rp 2 juta/bulan.

### Bulan-by-Bulan P&L (Realistis)

| Bulan | Revenue | Cost Variable (trx) | Cost Tetap | Net Profit |
|-------|---------|---------------------|------------|------------|
| 1 | Rp 0 | Rp 0 | Rp 1.500.000 | **(Rp 1.500.000)** |
| 2 | Rp 2.245.000 | Rp 1.500.000 | Rp 1.500.000 | **(Rp 755.000)** |
| 3 | Rp 5.150.000 | Rp 5.000.000 | Rp 2.000.000 | **(Rp 1.850.000)** |
| 4 | Rp 8.610.000 | Rp 7.500.000 | Rp 2.500.000 | **(Rp 1.390.000)** |
| 5 | Rp 11.495.000 | Rp 10.000.000 | Rp 3.000.000 | **(Rp 1.505.000)** |
| 6 | Rp 14.985.000 | Rp 13.000.000 | Rp 3.500.000 | **(Rp 1.515.000)** |
| **6 bulan** | **Rp 47.200.000** | **Rp 37.000.000** | **Rp 14.000.000** | **(Rp 8.515.000)** |

> **Kesimpulan jujur:** Dengan fee 1% saja, MVP **belum profitable di 6 bulan pertama** karena biaya Midtrans makan habis margin. Ini bukan kegagalan — ini realita marketplace tahap awal.

---

## 7. Path to Profitability — Apa yang Harus Dilakukan

### Opsi 1: Naikkan Fee ke 2%

| | Fee 1% | Fee 2% |
|--|--------|--------|
| Avg revenue per trx | Rp 63.000 | Rp 126.000 |
| Avg cost Midtrans | Rp 100.000 | Rp 100.000 |
| Margin per trx | **(Rp 37.000)** | **Rp 26.000** |

**Trade-off:** Fee lebih tinggi mungkin menurunkan adoption. Validasi via customer research (skill `.agents/skills/pricing-strategy/`).

### Opsi 2: Bebankan Biaya Admin ke Buyer (Bukan Seller)

- Buyer melihat biaya admin transparan saat checkout: "Biaya proteksi rekber Rp 15.000"
- Seller tetap full ekstra → seller happy
- Buyer tidak komplain karena tahu untuk apa

### Opsi 3: Optimasi Cost Midtrans

- Negosiasi rate khusus dengan Midtrans saat volume > 100 trx/bulan
- Push buyer pakai QRIS (0.7%) bukan VA (Rp 4.000 flat) — QRIS lebih murah untuk transaksi besar

### Opsi 4: Diversifikasi Revenue (Boost + Subscription)

Berdasarkan simulasi, **Featured Listing** dan **Subscription** punya margin **>90%** karena tidak ada cost transaksi besar:

| Layanan | Revenue/unit | Cost/unit | Margin |
|---------|--------------|-----------|--------|
| Transaction fee | Rp 63.000 | Rp 100.000 | -59% (rugi) |
| Listing fee | Rp 10.000 | Rp 9.000 (Midtrans) | 10% |
| **Featured listing** | **Rp 25.000** | **Rp 4.000** | **84%** |
| **Subscription** | **Rp 49.000** | **Rp 4.000** | **92%** |

**Strategi:** Push Featured Listing dan Subscription sebagai revenue utama, transaction fee jadi "trust feature" (break-even atau slight loss diterima).

---

## 8. ROI — Kapan Balik Modal?

### Asumsi Total Investasi Awal

| Item | Pesimis | Realistis | Optimis |
|------|---------|-----------|---------|
| Setup legal & business | Rp 19.500.000 | Rp 15.000.000 | Rp 13.500.000 |
| Development (jika vendor) | Rp 150.000.000 | Rp 100.000.000 | Rp 0 (co-owner) |
| Operational 6 bulan | Rp 14.000.000 | Rp 14.000.000 | Rp 12.000.000 |
| Marketing soft launch | Rp 10.000.000 | Rp 5.000.000 | Rp 3.000.000 |
| **TOTAL INVESTASI** | **Rp 193.500.000** | **Rp 134.000.000** | **Rp 28.500.000** |

### Estimasi Break-Even Point

**Skenario Co-owner (No Dev Cash):**
- Total investasi awal: ~Rp 28–30 juta
- Net cumulative loss 6 bulan (realistis fee 1%): ~Rp 8.5 juta
- **Break-even:** Bulan 9–12 (jika fee dinaikkan ke 2% atau push featured listing)

**Skenario Vendor Development:**
- Total investasi awal: ~Rp 134 juta
- Dengan growth realistis, monthly net positive ~Rp 3–5 juta dari bulan 8+
- **Break-even:** Bulan 24–36 (2–3 tahun)

### Target Volume untuk Profitable di Bulan 12

Untuk net profit Rp 5 juta/bulan di bulan 12:

| Source | Target |
|--------|--------|
| Transaksi/bulan | 200+ |
| Featured listing/bulan | 150+ |
| Active subscribers | 100+ |
| Total revenue/bulan | ~Rp 30 juta |
| Total cost/bulan | ~Rp 25 juta |

**GMV target bulan 12:** ~Rp 1.2 miliar/bulan (200 trx × Rp 6.3 juta avg)

---

## 9. Sensitivity Analysis — Variabel yang Paling Berpengaruh

| Variabel | Impact ke Revenue | Catatan |
|----------|-------------------|---------|
| **Avg ticket size** | 🔴 Sangat tinggi | Naik dari Rp 6.3jt → Rp 8jt = +27% revenue |
| **Conversion rate listing → sold** | 🔴 Sangat tinggi | Naik dari 10% → 15% = +50% transaksi |
| **Fee structure (1% vs 2%)** | 🔴 Sangat tinggi | Doubling fee = 2× transaction revenue |
| **Featured listing adoption** | 🟠 Tinggi | Margin 84% — driver profit utama |
| **Subscription conversion** | 🟠 Tinggi | Recurring revenue, predictable |
| **Listing fee adoption** | 🟡 Menengah | Rp 10rb tidak bergerak banyak |
| **OTP/SMS cost** | 🟢 Rendah | Cost relatif kecil |

---

## 10. Rekomendasi Strategis

1. **Jangan andalkan transaction fee 1% sebagai revenue utama** — math-nya tidak masuk dengan biaya Midtrans saat ini. Naikkan ke **1.5–2%** atau bebankan biaya admin Rp 10–15rb ke buyer secara transparan.

2. **Push Featured Listing sebagai produk hero** — margin 84%, mudah diadopsi seller aktif, tidak perlu infrastruktur baru. Aktivasi paling cepat di bulan 2.

3. **Subscription Rp 49rb/bulan jadi target conversion utama post-MVP** — predictable recurring revenue dengan margin 92%.

4. **Validasi pricing via customer research** sebelum aktivasi (skill `.agents/skills/pricing-strategy/`):
   - Apakah seller bersedia bayar 2% dibanding 1%?
   - Apakah buyer paham nilai biaya admin Rp 15rb?
   - Apakah subscription Rp 49rb worth it?

5. **Co-owner model jauh lebih masuk akal** dari sisi ROI vs vendor development. Vendor development hanya make sense kalau ada funding eksternal.

6. **Target realistis MVP 6 bulan = traction + product-market fit**, bukan profit. Profit datang di bulan 9–12 jika fee structure dioptimalkan.

---

## Catatan Asumsi yang Perlu Divalidasi

- ⚠️ **Avg ticket Rp 6.3 juta** — perlu validasi dari data komunitas. Bisa jadi lebih rendah jika dominan aksesoris.
- ⚠️ **Conversion rate 10% listing → sold** — benchmark generic marketplace, mungkin beda di niche sepeda.
- ⚠️ **30% seller mau bayar listing fee** — sangat speculatif, validasi dulu.
- ⚠️ **Cost Midtrans ~1.5% + flat fee** — cek rate aktual saat onboarding (bisa lebih rendah jika nego).
- ⚠️ **Belum termasuk biaya marketing growth** (paid ads, KOL, dll) yang mungkin diperlukan setelah MVP.
- ⚠️ **Belum termasuk biaya CS/dispute resolution** saat volume besar.
