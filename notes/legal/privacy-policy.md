# Kebijakan Privasi GowesFit

**Berlaku efektif:** [TANGGAL BERLAKU]
**Versi:** 1.0
**Pengendali Data:** [NAMA ENTITAS / PT] ("**GowesFit**", "**Kami**"), beralamat di [ALAMAT LENGKAP].
**Email DPO/Privasi:** [EMAIL DPO]

Kebijakan ini menjelaskan bagaimana Kami mengumpulkan, menggunakan, menyimpan, membagikan, dan melindungi **Data Pribadi** Anda saat menggunakan Platform GowesFit, sesuai **UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)** dan peraturan turunannya.

Dokumen ini merupakan bagian tak terpisahkan dari [Syarat & Ketentuan](terms-of-use.md).

---

## 1. Data yang Kami Kumpulkan

### 1.1 Data yang Anda Berikan Langsung

| Kategori | Contoh Data | Saat Dikumpulkan |
|----------|-------------|------------------|
| **Identitas Akun** | Nama, alamat email, kata sandi (di-hash), foto profil | Saat pendaftaran & edit profil |
| **Kontak & Verifikasi** | Nomor telepon (untuk OTP), kode OTP | Saat verifikasi nomor telepon |
| **Alamat Pengiriman** | Nama penerima, alamat lengkap, kota, kode pos, no. telepon penerima | Saat menambah alamat / checkout |
| **Data Rekening Bank Penjual** | Nama bank, nomor rekening, nama pemilik rekening | Saat mendaftarkan rekening untuk pencairan |
| **Konten Listing** | Foto barang, deskripsi, spesifikasi, harga, lokasi (kota) | Saat membuat / mengedit Listing |
| **Komunikasi** | Isi chat antar Pengguna, lampiran gambar pada chat, pesan ke support, isi sengketa, review/rating | Saat menggunakan fitur chat, dispute, atau menghubungi Kami |

### 1.2 Data yang Kami Kumpulkan Otomatis

- **Data Teknis & Penggunaan**: alamat IP, jenis perangkat, sistem operasi, browser, halaman yang dikunjungi, waktu akses, referrer URL.
- **Cookies & teknologi sejenis**: untuk sesi login, preferensi tampilan, dan analitik (lihat Pasal 8).
- **Log keamanan**: percobaan login, perubahan password, deteksi anomali.

### 1.3 Data dari Pihak Ketiga

- **Penyedia OAuth** (misalnya Google) — jika Anda mendaftar via Google, Kami menerima nama, email, dan foto profil dari Google sesuai izin yang Anda berikan.
- **Midtrans** — status transaksi, status payout, dan referensi transaksi.

### 1.4 Data Fitting Tool

> ⚠️ **REVIEW LAWYER — DATA BIOMETRIK.** UU PDP Pasal 4 mengkategorikan **data biometrik** (termasuk data pose/gerakan tubuh tertentu) sebagai **Data Pribadi Spesifik** yang butuh perlindungan & persetujuan eksplisit lebih ketat. Pastikan posisi hukum kami: jika pemrosesan benar-benar 100% di browser tanpa transmisi, klaim "tidak menyimpan" perlu dibuktikan secara teknis. Saat fitur simpan riwayat fitting ditambahkan, persetujuan eksplisit (granular, dapat dicabut) wajib.

Fitting Tool memproses gambar/video pose Anda **di sisi perangkat (browser) Anda** menggunakan MediaPipe. Secara default, **Kami tidak menyimpan** video maupun foto yang Anda gunakan untuk fitting di server Kami. Jika di kemudian hari kami menambahkan fitur penyimpanan riwayat fitting ke akun, Anda akan diminta persetujuan terpisah.

### 1.5 Data Anak

Layanan ini ditujukan untuk pengguna berusia minimal **18 tahun** atau telah menikah secara sah. Kami tidak secara sengaja mengumpulkan data anak di bawah usia tersebut. Jika Anda meyakini anak Anda telah memberikan data tanpa izin, mohon hubungi Kami untuk penghapusan.

## 2. Dasar Hukum & Tujuan Pemrosesan

Berdasarkan Pasal 20 UU PDP, Kami memproses Data Pribadi Anda dengan dasar dan tujuan sebagai berikut:

| Tujuan | Dasar Hukum (UU PDP) |
|--------|----------------------|
| Membuat & mengelola akun Anda | Pelaksanaan kontrak |
| Memverifikasi identitas via OTP & mencegah penipuan | Kewajiban hukum & kepentingan sah Kami |
| Menampilkan Listing kepada Pengguna lain | Pelaksanaan kontrak |
| Memproses pembayaran & pencairan dana via Midtrans | Pelaksanaan kontrak |
| Mengirim notifikasi transaksional (email, in-app) | Pelaksanaan kontrak |
| Menyelesaikan sengketa antar-Pengguna | Kepentingan sah & pelaksanaan kontrak |
| Menjaga keamanan Platform (anti-fraud, log keamanan) | Kepentingan sah Kami |
| Mengirim newsletter / materi marketing | **Persetujuan** Anda (opt-in, dapat dicabut) |
| Memenuhi kewajiban hukum (pajak, permintaan otoritas, AML/KYC) | Kewajiban hukum |
| Analitik produk & peningkatan layanan | Kepentingan sah (dalam bentuk teragregasi/teranonimisasi sedapat mungkin) |

## 3. Pembagian Data ke Pihak Ketiga

> ⚠️ **REVIEW LAWYER — DPA & SHARING DATA.** Setiap mitra (Midtrans, Supabase, penyedia email, hosting) wajib punya **Data Processing Agreement (DPA)** dengan kami sebelum produksi (UU PDP Pasal 51). Sharing alamat & no. HP Pembeli ke Penjual perlu basis hukum yang kuat ("pelaksanaan kontrak") — pastikan flow UI menampilkan info ini ke Pembeli **sebelum** mereka checkout, bukan setelahnya.

Kami **tidak menjual** Data Pribadi Anda. Kami membagikan data secara terbatas kepada:

1. **Midtrans (PT Midtrans)** — untuk memproses pembayaran (VA, e-wallet, QRIS, kartu) dan pencairan ke Penjual (Midtrans Payouts). Data yang dibagikan: nama, email, nomor telepon, nilai transaksi, ID transaksi; untuk Penjual: data rekening bank.
2. **Penyedia infrastruktur**:
   - **Supabase** — penyimpanan database & autentikasi.
   - **[Penyedia Hosting]** — hosting aplikasi.
   - **Penyedia layanan email transaksional** — pengiriman email notifikasi.
3. **Pengguna lain di Platform** — saat Anda bertransaksi:
   - **Pembeli & Penjual** akan saling melihat: nama yang ditampilkan, foto profil, kota, rating, dan nomor pesanan.
   - **Saat transaksi berjalan**: alamat lengkap & nomor telepon Pembeli dibagikan ke Penjual untuk keperluan pengiriman. Sebaliknya, Pembeli melihat informasi pengirim secukupnya untuk pelacakan.
4. **Otoritas yang berwenang** — apabila ada permintaan resmi yang sah berdasarkan peraturan perundang-undangan (kepolisian, PPATK, otoritas pajak, pengadilan).
5. **Konsultan profesional** (auditor, advokat) — dengan kewajiban kerahasiaan, sebatas yang diperlukan.

Setiap mitra di atas terikat kewajiban kerahasiaan dan keamanan data yang setara dengan kebijakan ini.

## 4. Transfer Data ke Luar Wilayah Indonesia

> ⚠️ **REVIEW LAWYER — TRANSFER LINTAS NEGARA.** UU PDP Pasal 56 mensyaratkan negara penerima memiliki tingkat perlindungan setara atau ada SCC/binding corporate rules. Supabase (data bisa di Singapura/AS tergantung region) perlu dipastikan regionnya & ada DPA. Lawyer perlu cek apakah persetujuan eksplisit user untuk transfer lintas negara perlu ditambahkan di flow signup.

Beberapa penyedia layanan Kami (misalnya Supabase, penyedia email) dapat memproses data di luar wilayah Indonesia. Dalam hal demikian, Kami memastikan adanya **pelindungan yang memadai** sesuai Pasal 56 UU PDP, antara lain melalui kontrak pemrosesan data (Data Processing Agreement) dan/atau pemilihan penyedia dengan standar keamanan yang setara.

## 5. Penyimpanan & Retensi Data

> ⚠️ **REVIEW LAWYER — KONFLIK HAK HAPUS vs RETENSI.** Hak penghapusan user (Pasal 7) bisa berbenturan dengan kewajiban simpan 10 tahun untuk pajak/audit. Lawyer perlu memformulasikan: apa yang benar-benar dihapus vs apa yang dianonimisasi vs apa yang tetap disimpan dengan dasar hukum kewajiban. Periode 24 bulan log anti-fraud juga perlu justifikasi proporsionalitas.

| Kategori | Periode Retensi |
|----------|------------------|
| Data akun aktif | Selama akun aktif |
| Data transaksi (untuk pajak, audit, sengketa) | Minimal **10 tahun** setelah transaksi terakhir, sesuai UU KUP & UU Dokumen Perusahaan |
| Log keamanan & anti-fraud | Maksimal 24 bulan |
| Konten chat | Selama akun aktif + 12 bulan setelahnya |
| Data akun yang dihapus | Dihapus/dianonimisasi dalam **30 hari kalender** sejak permintaan, **kecuali** data yang wajib disimpan karena kewajiban hukum |
| Data Fitting Tool | Tidak disimpan di server (kecuali fitur penyimpanan diaktifkan dengan persetujuan terpisah) |

## 6. Keamanan Data

Kami menerapkan langkah pengamanan yang wajar, mencakup namun tidak terbatas pada:
- Transmisi data dengan **HTTPS/TLS**.
- Penyimpanan kata sandi menggunakan algoritma hashing modern (bcrypt/argon2).
- Pembatasan akses ke database berdasarkan prinsip **least privilege**.
- Rate limiting & perlindungan terhadap brute-force, CSRF, dan injeksi.
- Backup berkala & disaster recovery.

Meski demikian, **tidak ada sistem yang 100% aman**. Anda juga bertanggung jawab menjaga kerahasiaan kata sandi dan perangkat Anda.

## 7. Hak Anda sebagai Subjek Data

Berdasarkan Pasal 5–13 UU PDP, Anda memiliki hak:

1. **Hak atas informasi** — mendapat penjelasan terkait pemrosesan data Anda.
2. **Hak akses** — meminta salinan data yang Kami simpan.
3. **Hak perbaikan** — meminta koreksi data yang tidak akurat.
4. **Hak penghapusan** — meminta penghapusan data, kecuali yang wajib disimpan secara hukum.
5. **Hak pembatasan pemrosesan** — meminta pembatasan dalam situasi tertentu.
6. **Hak portabilitas data** — menerima data Anda dalam format yang umum digunakan dan dapat dibaca mesin.
7. **Hak menarik persetujuan** — terutama untuk pemrosesan berbasis persetujuan (misalnya newsletter).
8. **Hak mengajukan keberatan** atas pemrosesan berbasis kepentingan sah.
9. **Hak terkait pengambilan keputusan otomatis** — meminta keterlibatan manusia jika ada keputusan yang berdampak hukum/signifikan.
10. **Hak mengajukan pengaduan** ke lembaga yang berwenang.

**Cara menggunakan hak Anda:** kirim permintaan ke **[EMAIL DPO]** dari alamat email yang terdaftar. Kami akan merespons dalam waktu maksimal **3×24 jam** untuk konfirmasi penerimaan dan **maksimal 14 hari kerja** untuk pemenuhan, sesuai ketentuan UU PDP.

## 8. Cookies & Teknologi Pelacakan

Kami menggunakan cookies untuk:
- **Cookies esensial**: menjaga sesi login, keranjang/checkout, preferensi bahasa. Tidak dapat dimatikan tanpa mempengaruhi fungsi inti.
- **Cookies analitik**: memahami penggunaan Platform (halaman terpopuler, error). Anda dapat menolak melalui pengaturan browser.
- **Cookies fungsional**: mengingat preferensi tampilan.

Daftar lengkap cookies dan opsi pengaturan tersedia pada [HALAMAN PENGATURAN COOKIES] (jika tersedia).

## 9. Pemberitahuan Insiden Data

> ⚠️ **REVIEW LAWYER — KEWAJIBAN HUKUM KETAT.** Window 3×24 jam adalah kewajiban UU PDP Pasal 46 — pelanggaran berpotensi sanksi administratif hingga 2% omzet tahunan. Lawyer & tim teknis perlu menyusun **incident response playbook** sebelum launch, bukan sekadar klausul di kebijakan. Tetapkan siapa DPO/PIC, alur eskalasi, dan template notifikasi.

Apabila terjadi kegagalan pelindungan Data Pribadi (kebocoran/peretasan), Kami akan:
1. Memberitahukan kepada subjek data yang terdampak dan Lembaga PDP **paling lambat 3×24 jam** sejak insiden disadari, sesuai Pasal 46 UU PDP.
2. Menjelaskan jenis data yang terdampak, dampak yang mungkin timbul, dan langkah penanganan yang sedang/akan dilakukan.

## 10. Tautan ke Situs Lain

Platform dapat memuat tautan ke situs pihak ketiga (mitra ekspedisi, Midtrans, dll). Kebijakan privasi situs tersebut berada di luar kendali Kami; mohon baca kebijakan mereka secara terpisah.

## 11. Perubahan Kebijakan

Kami dapat memperbarui Kebijakan Privasi ini sewaktu-waktu. Perubahan material akan diberitahukan melalui Platform dan/atau email minimal **7 (tujuh) hari kalender** sebelum berlaku. Versi terbaru selalu tersedia pada halaman ini, dengan tanggal "Berlaku efektif" diperbarui.

## 12. Kontak

Pertanyaan, keluhan, atau permintaan terkait Data Pribadi Anda dapat disampaikan ke:

- **Email DPO/Privasi:** [EMAIL DPO]
- **Email Support Umum:** [EMAIL SUPPORT]
- **Alamat:** [ALAMAT LENGKAP]

Jika Anda merasa hak Pelindungan Data Pribadi Anda dilanggar dan tidak terselesaikan oleh Kami, Anda dapat mengajukan pengaduan ke **Lembaga Pelindungan Data Pribadi** yang berwenang.

---

*Dokumen ini disusun sebagai draft kerja dan **belum** ditinjau oleh penasihat hukum. Sebelum publikasi, mohon direview oleh advokat yang memahami UU PDP & e-commerce Indonesia.*
