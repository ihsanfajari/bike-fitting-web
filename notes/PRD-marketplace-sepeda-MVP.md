# PRD — Marketplace Jual Beli Sepeda (MVP)

**Versi:** 1.0
**Tanggal:** 2026-04-24
**Status:** Draft — acuan untuk wireframe
**Pemilik Produk:** Ihsan Fajari

---

## 1. Ringkasan Eksekutif

Marketplace khusus untuk jual beli sepeda (baru maupun bekas) beserta aksesoris/komponennya, dengan sistem pembayaran aman melalui payment gateway dan/atau rekening bersama (rekber). Fokus MVP adalah memvalidasi alur transaksi end-to-end: daftar barang → temukan barang → beli → bayar aman → barang sampai → dana cair.

## 2. Latar Belakang & Masalah

**Masalah yang diselesaikan:**
- Jual beli sepeda bekas saat ini tersebar di grup Facebook, forum, Instagram, dan marketplace umum (Tokopedia/Shopee/OLX) yang tidak spesifik untuk sepeda — sulit mencari sesuai ukuran frame, groupset, atau tipe sepeda.
- Risiko penipuan tinggi pada transaksi antar-individu (COD tidak selalu memungkinkan untuk transaksi antar-kota).
- Penjual kesulitan menjangkau audiens yang benar-benar paham sepeda; pembeli kesulitan memverifikasi spesifikasi teknis dari listing umum.

**Peluang:**
- Komunitas sepeda di Indonesia sangat aktif (roadbike, MTB, gravel, folding, BMX) tetapi belum ada platform vertikal yang dominan.
- Kebutuhan rekber (escrow) sangat tinggi untuk sepeda second high-end (harga Rp10 juta – Rp100+ juta).

## 3. Tujuan & Sasaran

### Tujuan Bisnis
- Memvalidasi product-market fit dalam 3 bulan pertama setelah launch.
- Mencapai 500 listing aktif dan 50 transaksi sukses (GMV) di bulan ke-3.

### Tujuan Produk (MVP)
1. Pengguna bisa mendaftar, login, dan mengelola profil.
2. Penjual bisa mendaftarkan sepeda/aksesoris dengan detail spesifik (frame, groupset, ukuran, dll).
3. Pembeli bisa mencari & memfilter listing berdasarkan kategori, harga, lokasi, kondisi.
4. Pembeli bisa membeli barang dengan pembayaran aman (rekber/payment gateway).
5. Dana ditahan sampai pembeli konfirmasi barang diterima.
6. Pengguna bisa chat antar satu sama lain terkait listing.

### Non-Goals MVP
- Pelelangan/bidding
- Bike-fitting service integration
- Subscription / toko premium
- Social feed / komunitas / review panjang
- Integrasi ekspedisi otomatis (manual input resi dulu)
- Mobile native app (web responsive dulu)
- **Rekomendasi sepeda berbasis deskripsi** — user isi form teks mendeskripsikan kebutuhan (tipe sepeda, budget, postur, tujuan pakai), sistem mencocokkan & menyarankan listing yang relevan. Direncanakan post-MVP (lihat catatan di ERD §8). UI prototipe boleh dibuat lebih dulu, backend menyusul.

## 4. Target Pengguna

### Persona 1 — Penjual Individu (Budi, 32)
- Anggota komunitas roadbike, upgrade sepeda 1-2x setahun.
- Ingin menjual sepeda lama dengan harga wajar, butuh audiens yang paham nilai komponen.
- Pain point: capek jawab pertanyaan dasar di grup FB, takut ditipu pembeli.

### Persona 2 — Pembeli Hobi (Rama, 28)
- Mulai serius bersepeda, cari sepeda second berkualitas di bawah budget baru.
- Butuh kepastian barang sesuai deskripsi & transaksi aman.
- Pain point: takut kirim uang dulu ke penjual yang tidak kenal.

### Persona 3 — Toko/Dealer Kecil (Pak Adi, 45)
- Pemilik toko sepeda lokal, ingin menambah channel penjualan online.
- Punya stok beragam (aksesoris, spare part, sepeda baru entry-level).
- Pain point: tidak punya waktu/skill kelola toko online yang kompleks.

## 5. Lingkup Fitur MVP

### 5.1 Autentikasi & Profil
- **Sign up / Sign in**: email + password, atau Google OAuth.
- **Verifikasi nomor HP via OTP** (wajib untuk bisa listing atau bertransaksi — untuk anti-penipuan).
- **Profil pengguna**: nama, foto, bio singkat, kota, rating penjual/pembeli, jumlah transaksi sukses.
- **Alamat pengiriman**: minimal 1 alamat tersimpan (untuk pembeli).

### 5.2 Listing / Daftar Barang
- **Kategori** (dropdown utama):
  - Sepeda Utuh → sub: Roadbike, MTB, Gravel, Folding, BMX, Listrik, Anak, Lainnya
  - Frame & Fork
  - Groupset & Drivetrain
  - Wheelset & Ban
  - Cockpit (handlebar, stem, seatpost, saddle)
  - Aksesoris (helm, lampu, tas, pompa, dll)
  - Apparel (jersey, bibshort, sepatu, dll)

- **Field listing (untuk sepeda utuh)**:
  - Judul (max 80 karakter)
  - Kategori & sub-kategori
  - Merek / Brand
  - Model
  - Tahun
  - Ukuran frame (S/M/L atau 48/50/52/...)
  - Groupset (Shimano 105, Ultegra, SRAM Rival, dll)
  - Material frame (aluminium, carbon, steel, titanium)
  - Kondisi (Baru, Seperti Baru, Bekas - Mulus, Bekas - Normal, Bekas - Butuh Servis)
  - Harga (IDR)
  - Nego / tidak
  - Lokasi (kota/kabupaten)
  - Foto (minimal 3, maksimal 10)
  - Deskripsi (rich text sederhana — bold, list, line break)
  - Toggle "Bisa COD" (opsional)

- **Status listing**: Aktif, Sold, Dijeda (paused), Draft, Ditolak (jika ada moderasi).
- **Edit listing & Hapus listing**.

### 5.3 Discovery — Cari & Telusur
- **Homepage**:
  - Hero banner (promo / highlight)
  - Kategori pintasan (grid/icon)
  - Listing terbaru
  - Listing populer / unggulan (kurasi manual di MVP)

- **Halaman kategori**: list listing dengan filter.

- **Pencarian**:
  - Search bar global (full-text pada judul, merek, model, deskripsi).
  - Filter: kategori, harga (min-max), kondisi, ukuran frame, groupset, material, kota, "bisa COD".
  - Sort: Terbaru, Harga termurah, Harga tertinggi, Paling dilihat.

- **Detail listing**:
  - Gallery foto (swipe/zoom)
  - Spesifikasi lengkap
  - Deskripsi penjual
  - Info penjual ringkas (nama, foto, kota, rating, jumlah transaksi, waktu aktif terakhir)
  - CTA: **Beli Sekarang**, **Chat Penjual**, **Tawar Harga** (jika penjual mengizinkan nego)
  - Tombol: Simpan (wishlist), Bagikan, Laporkan

### 5.4 Chat
- **Chat 1-on-1** antara pembeli & penjual, selalu terkait 1 listing (card listing muncul di atas thread chat).
- Dukung teks + kirim gambar.
- Indikator online/last seen, read receipt.
- Notifikasi in-app & email saat pesan masuk.
- **Larangan**: pesan yang mengandung nomor rekening di luar sistem akan diberi peringatan otomatis (anti-penipuan).

### 5.5 Transaksi & Pembayaran (Inti MVP)

**Alur pembelian:**
1. Pembeli klik **Beli Sekarang** di detail listing.
2. Halaman checkout:
   - Ringkasan barang
   - Pilih alamat pengiriman
   - Pilih ekspedisi (JNE, J&T, SiCepat, Anteraja, Ninja) — biaya diinput penjual setelah order atau estimasi ongkir dari kota penjual→pembeli (manual/flat di MVP).
   - Biaya admin/asuransi rekber (1% dari harga, min Rp5.000)
   - Total pembayaran
3. Pilih metode pembayaran:
   - **Virtual Account** (BCA, Mandiri, BNI, BRI)
   - **E-wallet** (GoPay, OVO, DANA, ShopeePay)
   - **QRIS**
   - **Kartu kredit/debit** (opsional di launch)
4. Pembeli bayar → dana masuk ke **rekening Midtrans** (bukan langsung ke penjual maupun GowesFit).
5. Penjual dapat notif: "Pesanan baru, silakan kirim dalam 2×24 jam".
6. Penjual input resi & foto bukti pengiriman.
7. Pembeli konfirmasi barang diterima (atau auto-confirm setelah 3 hari sejak status "terkirim").
8. Backend GowesFit trigger **Midtrans Payouts API** → dana ditransfer ke rekening bank seller yang terdaftar.

**State order:**
`Menunggu Pembayaran` → `Dibayar / Menunggu Dikirim` → `Dikirim` → `Diterima` → `Selesai`
Jalur alternatif: `Dibatalkan`, `Sengketa / Disputed`, `Refund`.

**Sengketa (Dispute)**:
- Pembeli bisa buka dispute dalam 3 hari setelah status "Diterima" atau jika barang tidak sampai.
- Upload bukti (foto, chat screenshot).
- Tim admin review manual di MVP (belum otomatis).
- Jika dispute diterima → GowesFit tidak trigger payout ke seller, dana dikembalikan ke pembeli via refund Midtrans.

**Payment Gateway & Arsitektur Dana — Midtrans**

> Hasil riset dokumentasi Midtrans (Mei 2026):

**Di mana uang tersimpan selama masa tunggu?**
- Dana dari pembayaran pembeli masuk ke **rekening pool Midtrans**, bukan ke rekening GowesFit maupun seller.
- Midtrans meng-hold dana selama settlement period: **D+1 pukul 16.00** (settled), baru bisa di-request withdraw setelah **D+3 dari tanggal transaksi**.
- Holding period ini bersifat otomatis (risk/chargeback protection), **bukan** event-based escrow.

**Implementasi escrow di level aplikasi:**
- Midtrans **tidak punya produk escrow** yang bisa ditahan berdasarkan business event (misal "tunggu konfirmasi pembeli").
- Logika escrow sepenuhnya dihandle di backend GowesFit:
  1. Terima notifikasi `payment_success` dari Midtrans webhook.
  2. Set status order = `paid` di database, tandai sebagai "dana dalam masa tunggu".
  3. Saat pembeli klik "Konfirmasi Diterima" (atau auto-confirm D+3), set status = `completed`.
  4. **Trigger Midtrans Payouts API** untuk transfer ke rekening seller.
- Selama menunggu konfirmasi pembeli, GowesFit **tidak mentransfer apapun** ke seller — hanya menunggu.

**Midtrans Payouts (formerly Iris Disbursement):**
- Produk untuk transfer dana ke rekening bank Indonesia.
- Bank yang didukung: BCA, BNI, BRI, Mandiri, CIMB, Permata, Danamon + bank lain via SKN/RTGS.
- Dua model: **Aggregator** (Midtrans pegang deposit, onboarding cepat) atau **Facilitator** (GowesFit pakai rekening sendiri sebagai sumber dana).
- API: register beneficiary (seller), create payout, approve payout, cek status, batch payout.
- **Rekomendasi MVP**: model Aggregator — lebih cepat onboarding, Midtrans yang urus deposit.

**Implikasi untuk fitur tambah rekening bank (layar #29):**
- Form tambah rekening seller perlu menyimpan: nama bank, nomor rekening, nama pemilik rekening.
- Data ini dikirim ke Midtrans Payouts API untuk mendaftarkan seller sebagai **beneficiary**.
- Verifikasi rekening (nama pemilik match) perlu dilakukan sebelum payout pertama.

**Referensi dokumentasi:**
- Payment settlement: https://docs.midtrans.com/docs/transaction-status-cycle
- Payouts API: https://docs.midtrans.com/reference/payout-api-overview
- Withdrawal timing: https://docs.midtrans.com/docs/when-can-i-withdraw-my-transaction-funds-from-midtrans

### 5.6 Dashboard Pengguna

**Untuk Penjual:**
- Daftar listing saya (status, jumlah view, chat masuk)
- Pesanan masuk (perlu dikirim, dalam proses, selesai, sengketa)
- Saldo & riwayat withdraw
- Rekening bank untuk pencairan

**Untuk Pembeli:**
- Pesanan saya (status)
- Wishlist / listing disimpan
- Riwayat transaksi

### 5.7 Rating & Review
- Setelah order `Selesai`, pembeli bisa kasih rating 1-5 bintang + komentar ke penjual.
- Penjual bisa reply review.
- Rating agregat tampil di profil penjual & card listing.

### 5.8 Moderasi & Kepercayaan
- **Report listing** (palsu, penipuan, tidak pantas).
- **Report user**.
- Tim admin dashboard sederhana (di luar scope MVP user-facing, tapi perlu internal tool basic).
- Badge: "Terverifikasi HP", "Terverifikasi KTP" (KTP opsional di MVP, bisa skip).

## 6. Inventaris Layar (untuk Wireframe)

Daftar layar yang perlu dibuat wireframe:

### Public / Pre-login
1. Landing / Homepage
2. Halaman kategori
3. Hasil pencarian
4. Detail listing
5. Profil publik penjual
6. Sign up
7. Sign in
8. Verifikasi OTP

### Authenticated — Buyer
9. Checkout — pilih alamat & ekspedisi
10. Checkout — pilih metode pembayaran
11. Halaman instruksi pembayaran (VA/QRIS)
12. Halaman sukses bayar / menunggu konfirmasi
13. Daftar pesanan saya
14. Detail pesanan (dengan timeline status)
15. Form konfirmasi barang diterima
16. Form buka dispute
17. Form review penjual
18. Wishlist
19. Edit profil & alamat

### Authenticated — Seller
20. Dashboard penjual (ringkasan)
21. Daftar listing saya
22. Buat listing — step 1 (kategori & foto)
23. Buat listing — step 2 (spesifikasi)
24. Buat listing — step 3 (harga & lokasi)
25. Preview listing sebelum publish
26. Daftar pesanan masuk
27. Form input resi pengiriman
28. Halaman saldo & withdraw
29. Form tambah rekening bank

### Shared
30. Inbox chat (daftar percakapan)
31. Thread chat
32. Notifikasi (daftar)
33. Pengaturan akun

## 7. Alur Pengguna Utama (User Flows)

### Flow A — Penjual mendaftarkan sepeda
Sign up → Verifikasi OTP → Homepage → **Jual Barang** → Pilih kategori → Upload foto → Isi spesifikasi → Set harga & lokasi → Preview → Publish → Listing aktif.

### Flow B — Pembeli beli sepeda dengan rekber
Browse / Search → Detail listing → Chat penjual (opsional) → Beli Sekarang → Pilih alamat → Pilih ekspedisi → Pilih metode bayar → Bayar → Status "Dibayar" → (Penjual kirim, input resi) → Status "Dikirim" → Barang diterima → Konfirmasi diterima → Review → Selesai.

### Flow C — Sengketa
Order "Dikirim" tapi barang tidak sesuai → Detail pesanan → Buka Dispute → Upload bukti → Admin review → Keputusan (refund / lanjut ke penjual) → Selesai.

## 8. Persyaratan Non-Fungsional

- **Responsif**: mobile-first, desktop tetap baik (diperkirakan 70% traffic mobile).
- **Performa**: TTI < 3 detik di 4G.
- **Keamanan**: HTTPS, hashing password (bcrypt/argon2), rate limit login, CSRF protection.
- **Privasi**: nomor HP & alamat lengkap tidak ditampilkan publik, hanya dibagi saat transaksi berjalan.
- **Kepatuhan**: mengikuti aturan UU PDP Indonesia; T&C + Privacy Policy wajib ada.

## 9. Metrik Keberhasilan (MVP)

| Metrik | Target 3 bulan |
|---|---|
| Pengguna terdaftar | 2.000 |
| Listing aktif | 500 |
| Transaksi sukses (GMV) | 50 transaksi |
| Rasio listing → sold | ≥ 10% |
| Rata-rata waktu jawab chat | < 6 jam |
| Tingkat sengketa | < 5% dari transaksi |
| NPS | ≥ 30 |

## 10. Asumsi & Risiko

**Asumsi:**
- Penjual mau melewati verifikasi OTP.
- Penjual dan pembeli bersedia menunggu 1-3 hari untuk pencairan dana rekber.
- Midtrans/Xendit menyetujui akun merchant untuk kategori marketplace.

**Risiko:**
- Chicken-and-egg problem (sedikit penjual → sedikit pembeli). **Mitigasi:** recruit 50 seller awal manual dari komunitas (roadbike.co.id, FB groups).
- Fraud / listing palsu. **Mitigasi:** verifikasi HP wajib, sistem report, manual review untuk listing high-value (> Rp20jt) di MVP.
- Biaya escrow dianggap mahal. **Mitigasi:** biaya kompetitif (1%), edukasi nilai proteksi.

## 11. Timeline Indikatif (Estimasi)

| Fase | Durasi | Output |
|---|---|---|
| Wireframe & desain UI | 3 minggu | Mockup high-fidelity 33 layar |
| Development backend | 6 minggu | API, DB, integrasi payment gateway |
| Development frontend | 6 minggu | Web app (paralel dengan backend sejak minggu 3) |
| QA & UAT | 2 minggu | Bug fixing |
| Soft launch | 1 minggu | Invite-only beta |
| **Total** | **~3 bulan** | Public launch MVP |

## 12. Terminologi

- **Rekber (Rekening Bersama)**: sistem escrow di mana uang pembeli ditahan platform sampai pembeli konfirmasi barang diterima.
- **GMV (Gross Merchandise Value)**: total nilai transaksi yang diproses.
- **Listing**: satu barang yang didaftarkan untuk dijual.
- **Dispute**: laporan sengketa transaksi.

---

**Catatan untuk tahap wireframe:**
Dokumen ini menjadi acuan pembuatan wireframe di Claude Design. Fokus wireframe adalah 33 layar di bagian §6, dengan prioritas layar yang berada di flow inti (A, B, C di §7) terlebih dahulu.
