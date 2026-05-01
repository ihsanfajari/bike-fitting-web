# Backlog: Sistem Monetisasi & Rekber MVP

> Dibuat: 2026-04-27
> Konteks: Diskusi strategi monetisasi marketplace GowesFit

---

## Keputusan Arsitektur

### Rekber via Midtrans (bukan rekening sendiri)
- Dana buyer **tidak boleh** masuk ke rekening bank pemilik platform langsung — itu membutuhkan izin Penyelenggara Jasa Pembayaran (PJP) dari Bank Indonesia
- Solusi: gunakan **Midtrans sebagai escrow holder** (sudah punya lisensi PJP dari BI)
- Disbursement ke seller menggunakan **Midtrans Iris**
- Platform hanya jadi orchestrator (instruksikan kapan dana dilepas ke seller)
- **Tidak perlu izin BI / OJK selama Midtrans yang menampung dana**

### Status Flow Transaksi
```
PENDING → PAID → CONFIRMED (buyer terima barang) → DISBURSED (seller dapat dana)
```
- Hold period: 2–3 hari setelah buyer konfirmasi terima barang
- Fee dipotong saat disbursement, bukan saat checkout

---

## Backlog Item — Monetisasi

### [BACKLOG-MON-1] Listing Fee
- **Model**: Flat fee per listing aktif
- **Harga target**: Rp 5.000–15.000 per listing
- **Kapan aktif**: Bulan 2 (setelah 500 listing organik tercapai — bulan 1 gratis)
- **Kompleksitas**: Rendah — cukup Midtrans checkout biasa sebelum listing publish
- **Prioritas MVP**: Tinggi (revenue paling cepat)

### [BACKLOG-MON-2] Transaction Fee 1% via Rekber
- **Model**: 1% dari nilai transaksi, ditanggung seller, dipotong saat disbursement
- **Minimum fee**: Rp 5.000 per transaksi
- **Kapan aktif**: Bulan 2 setelah sistem rekber (Midtrans Iris) siap
- **Dependency**: Midtrans Iris onboarding selesai, status transaksi diimplementasi
- **Prioritas MVP**: Tinggi (revenue model utama jangka panjang)

### [BACKLOG-MON-3] Featured Listing / Boost
- **Model**: Seller bayar untuk posisi lebih tinggi di hasil pencarian
- **Harga target**: Rp 25.000 / 7 hari
- **Kapan aktif**: Bulan 2–3
- **Kompleksitas**: Rendah-menengah (butuh kolom `boosted_until` di tabel listings + query sort logic)
- **Prioritas MVP**: Menengah (upsell natural begitu ada 100+ listing)

### [BACKLOG-MON-4] Seller Subscription (Post-MVP)
- **Model**: Rp 49.000/bulan — unlimited listing + prioritas search + badge "Verified Seller"
- **Kapan aktif**: Fase Growth (bulan 4+)
- **Prioritas MVP**: Rendah — jangan rush, validasi traction dulu

---

## Backlog Item — Anti-Bypass (Cegah Transaksi di Luar Platform)

### [BACKLOG-TRUST-1] Sembunyikan Nomor HP Seller
- Tampilkan nomor sebagian saja di listing (`+62 8xx-xxxx-xx64`)
- Nomor full hanya terbuka setelah buyer melakukan checkout / bayar deposit
- **Prioritas**: Tinggi — implementasi saat sistem user & listing selesai

### [BACKLOG-TRUST-2] Chat In-App
- Semua komunikasi buyer-seller lewat platform, bukan redirect ke WhatsApp langsung
- **Prioritas**: Menengah (boleh WA redirect dulu di MVP awal, tapi chat in-app jadi target)

### [BACKLOG-TRUST-3] Buyer Protection Messaging
- Tampilkan jelas di UI: proteksi/dispute resolution **hanya berlaku** untuk transaksi via platform
- Copy: *"Transaksi di luar GowesFit? Kami tidak bisa membantu jika ada masalah."*
- **Prioritas**: Tinggi — ini yang paling efektif secara psikologis, implementasi di listing detail page

### [BACKLOG-TRUST-4] Rating & Badge Akumulasi On-Platform Only
- Seller rating hanya terakumulasi dari transaksi yang selesai via rekber platform
- Badge "X transaksi sukses" jadi insentif seller untuk tidak bypass
- **Prioritas**: Menengah

---

## Roadmap Monetisasi per Bulan

| Bulan | Fokus | Revenue Action |
|-------|-------|----------------|
| 1 | Isi konten, rekrut 50 seller awal | **Listing gratis** — prioritas traction |
| 2 | Aktifkan rekber + fee | **Listing fee** + **Transaction fee 1%** |
| 2–3 | Upsell visibility | **Featured Listing** (Rp 25.000/7 hari) |
| 4+ | Recurring revenue | **Seller subscription** Rp 49.000/bulan |

---

## Catatan Regulasi

- **Bank Indonesia (BI)**: mengatur sistem pembayaran (PJP). Relevan jika menampung dana user.
- **OJK**: mengatur P2P lending, asuransi, sekuritas. *Tidak relevan* untuk marketplace rekber biasa.
- **Aman secara regulasi** selama dana ditampung oleh payment gateway berlisensi (Midtrans) — platform hanya orchestrator.
- Jika di kemudian hari ingin menampung dana sendiri (float), perlu mengurus izin PJP ke BI.
