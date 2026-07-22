# Rencana Implementasi: Analisis Bike Fitting via Upload Video

> Status: Fase 0–3 SELESAI (2026-07-14) · Fase 4 (validasi video nyata) menunggu video sampel · Dibuat: 2026-07-14
> Referensi kompetitor: MyVeloFit (video 15 detik, markerless pose estimation, hasil ±90 detik)
> Referensi standar sudut: BikeDynamics, Bike Fit Adviser, riset dynamic fitting (PubMed)

## Latar Belakang

Kompetitor AI bike fitting (MyVeloFit dkk.) memakai **upload video**, bukan live camera/foto. Alasannya fundamental: sudut lutut yang benar harus diukur pada **maximum knee extension** (dekat BDC — pedal di titik terbawah), dan hanya video multi-siklus kayuhan yang bisa menjamin momen itu tertangkap. Foto tunggal bergantung keberuntungan; live camera menyulitkan user (harus lihat layar sambil di atas sepeda).

Kabar baik: `calculateFitResult()` di `web/lib/bikeFitScoring.ts` sudah menerima array samples multi-frame, jadi fondasi arsitekturnya sudah benar.

---

## Fase 0 — Perbaikan Akurasi pada Logic yang Ada (PRASYARAT)

Dua bug ditemukan saat cross-check dengan standar fitting. Wajib diperbaiki dulu karena mode video akan mewarisi logic ini.

### Bug 1: Agregasi lutut memakai `min`, seharusnya `max`

`bikeFitScoring.ts:152` → `kneeAngle = min(samples.knee)`.

Konvensi sudut di project ini adalah **included angle** hip–knee–ankle (kaki lurus ≈ 180°, ditekuk ≈ mengecil). Standar 140–150° adalah sudut pada **ekstensi maksimum** (BDC). Selama mengayuh:
- BDC (kaki paling lurus) → included angle **terbesar** (~140–150°)
- TDC (kaki paling menekuk) → included angle **terkecil** (~65–75°)

`min()` justru mengambil frame TDC. Pada video/live dengan kayuhan aktif, lutut akan selalu dinilai "terlalu kecil" dan diagnosis "sadel terlalu rendah" — salah total.

**Fix**: agregasi lutut = `max` per siklus kayuhan, dirata-rata antar siklus (atau persentil-95 dari seluruh frame sebagai fallback anti-outlier).

### Bug 2: "Torso" mengukur hip angle, bukan torso-to-horizontal

`PoseLandmarker.tsx:185` / `PhotoAnalysis.tsx:181` → torso = `calcAngle(shoulder, hip, knee)` = **sudut pinggul** (shoulder–hip–knee).

Padahal range di `bikeFitStandards.ts` (road ideal 40–50°) adalah standar industri untuk **sudut torso terhadap horizontal** (BikeDynamics: 40–50° dari horizontal). Sudut shoulder–hip–knee saat BDC nilainya bisa 100–120°, jauh di luar range — angka konfigurasi dan angka pengukuran tidak nyambung.

**Fix**: torso = sudut vektor hip→shoulder terhadap horizontal:

```ts
// PENTING: landmark MediaPipe ternormalisasi terhadap dimensi gambar.
// Wajib dikali width/height dulu, kalau tidak sudut terdistorsi oleh aspect ratio.
const dx = (shoulder.x - hip.x) * imgW;
const dy = (hip.y - shoulder.y) * imgH; // y terbalik di koordinat gambar
const torsoAngle = Math.round(Math.atan2(Math.abs(dy), Math.abs(dx)) * 180 / Math.PI);
```

### Refactor pendukung

- Ekstrak `calcAngle`, `selectBestSide`, `drawAngleLabel` yang saat ini terduplikasi di `PoseLandmarker.tsx` dan `PhotoAnalysis.tsx` → `web/lib/poseAngles.ts`.
- `PhotoAnalysis` tetap jalan (single frame = max dari 1 sample), tapi tambahkan disclaimer di UI: "Analisis foto akurat hanya jika pedal di posisi terbawah (jam 6)".

---

## Fase 1 — Ekstraksi Frame dari Video Upload

Komponen baru: `web/components/VideoAnalysis.tsx`.

### Input & guard

- `<input type="file" accept="video/*">` (MP4/WebM/MOV — codec bergantung browser; deteksi via `video.onerror`).
- Guard: durasi 5–30 detik (tolak di luar itu dengan pesan jelas), ukuran ≤ 100 MB.
- Muat via `URL.createObjectURL(file)` ke elemen `<video muted playsinline>` tersembunyi.

### Strategi iterasi frame: seek-based (deterministik)

Bukan `requestVideoFrameCallback` saat playback (kecepatan proses terikat kecepatan putar & frame bisa terlewat saat CPU sibuk), melainkan **seek per timestamp tetap**:

```
step = 1/15 detik (15 fps efektif — cukup untuk kayuhan ~90 rpm)
for t = 0 → duration, step:
  video.currentTime = t
  await event "seeked"
  result = landmarker.detectForVideo(video, t * 1000)  // timestamp WAJIB naik monoton
  simpan { t, knee, torso, elbow, avgVisibility }
  update progress = t / duration
```

- Downscale ke canvas ~720p sebelum deteksi jika resolusi video besar (hemat waktu inferensi).
- **Penguncian sisi tubuh**: jangan pilih kiri/kanan per frame (bisa flip-flop). Voting mayoritas `selectBestSide` dari 15 frame pertama, lalu kunci untuk seluruh video.
- Drop frame dengan avg visibility < 0.2; jika > 40% frame drop → tampilkan error kualitas video.
- Estimasi waktu proses: video 15 dtk @ 15 fps ≈ 225 frame ≈ 30–60 dtk di laptop biasa → progress bar wajib. (Pembanding: MyVeloFit ~90 dtk server-side; kita full client-side = privasi + gratis, jadikan selling point.)

## Fase 2 — Deteksi Siklus Kayuhan & Agregasi Metrik

Modul baru: `web/lib/videoFitAnalysis.ts` (pure function, unit-testable).

### Pipeline sinyal

1. **Smoothing**: median filter window 5 pada deret sudut lutut (bunuh jitter deteksi pose).
2. **Deteksi siklus**: cari local maxima sinyal lutut (= momen ekstensi/BDC tiap putaran) dengan syarat prominence ≥ 15° dan jarak antar puncak ≥ 0.3 dtk (batas ~200 rpm).
3. **Validasi**: minimal **3 puncak** (3 putaran kayuhan). Kurang dari itu → error "Kayuh pedal minimal 5 putaran selama perekaman", jangan keluarkan skor.

### Agregasi (masukan ke scoring)

| Metrik | Cara hitung | Target (road, included/horizontal) |
|---|---|---|
| Lutut — ekstensi (BDC) | rata-rata dari max tiap siklus | ideal 140–150°, acceptable 135–155° (config sudah benar) |
| Lutut — fleksi (TDC) *(metrik baru, v2 opsional)* | rata-rata dari min tiap siklus | ~65–75° included; terlalu kecil → crank kepanjangan / saddle terlalu maju |
| Torso (vs horizontal) | median seluruh frame valid | road 40–50°, gravel 45–55°, MTB 55–70° (config existing cocok setelah Bug 2 difix) |
| Siku | median seluruh frame valid | road 150–165° included (soft bend) |

Median (bukan mean) untuk torso/siku agar tahan outlier deteksi. Diagnosis & rekomendasi (`buildRecommendations`) dipakai ulang tanpa perubahan.

## Fase 3 — UI & Laporan

- `web/app/fitting/page.tsx`: tambah tab ketiga **"Upload Video"** di samping Live Camera & Foto.
- Sebelum upload, panduan perekaman (meniru instruksi MyVeloFit):
  - Rekam 10–15 detik dari **samping** (lateral), seluruh tubuh + sepeda masuk frame
  - Sepeda statis di trainer/roller, kayuh normal
  - Kamera sejajar tinggi pinggul, landscape, pencahayaan cukup
- Saat proses: progress bar % + preview frame beranotasi skeleton (canvas).
- Hasil: reuse kartu `FitResult` yang ada + info kualitas (jumlah siklus terdeteksi, % frame valid) + scrubber kecil untuk melihat frame BDC yang dipakai (nilai kepercayaan bagi user).

## Fase 4 — Validasi & QA

- Unit test `videoFitAnalysis.ts` dengan sinyal sintetis (sinus 90 rpm + noise): deteksi siklus, agregasi max/min, ketahanan terhadap frame drop.
- Uji dengan ≥ 5 video nyata (beda pencahayaan, jarak kamera, road vs MTB); bandingkan sudut hasil vs pengukuran manual screenshot (toleransi ±3°).
- Regression: mode Live Camera & Foto tetap berfungsi setelah refactor Fase 0.

---

## Ringkasan Perubahan File

| File | Aksi |
|---|---|
| `web/lib/poseAngles.ts` | **Baru** — util bersama (calcAngle, torso-horizontal, selectBestSide, drawing) |
| `web/lib/videoFitAnalysis.ts` | **Baru** — smoothing, deteksi siklus, agregasi |
| `web/components/VideoAnalysis.tsx` | **Baru** — upload, seek-loop, progress, hasil |
| `web/lib/bikeFitScoring.ts` | **Fix** — agregasi lutut `min` → `max`/per-siklus |
| `web/components/PoseLandmarker.tsx` | **Fix** — torso-to-horizontal, pakai util bersama |
| `web/components/PhotoAnalysis.tsx` | **Fix** — torso-to-horizontal, disclaimer BDC |
| `web/app/fitting/page.tsx` | **Ubah** — tab Upload Video |
| `web/config/bikeFitStandards.ts` | **Ubah (v2)** — tambah standar fleksi TDC opsional |

## Urutan Eksekusi

1. Fase 0 (fix akurasi + refactor) — bisa di-ship sendiri, memperbaiki mode yang sudah live
2. Fase 1 + 2 (pipeline video + analisis) — inti fitur
3. Fase 3 (UI) → Fase 4 (validasi)
