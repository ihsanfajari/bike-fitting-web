# Conversation Log — Bike Fitting Web App
**Date:** 2026-04-19

---

## Topik
Diskusi awal perencanaan project bike fitting berbasis web yang menggunakan webcam untuk mendeteksi posisi tubuh secara real-time.

---

## Pertanyaan Awal

**User:** Apakah MediaPipe dari Google AI Edge cukup untuk menangkap skeleton gerakan secara real-time di web browser?

**Kesimpulan:** Ya, sangat possible. MediaPipe Pose Landmarker mendeteksi 33 titik landmark tubuh langsung di browser via WebAssembly.

---

## Tech Stack yang Disepakati

- **Pose Detection:** `@mediapipe/tasks-vision` (MediaPipe Pose)
- **Rendering:** HTML5 Canvas
- **Framework:** Next.js (React)

---

## Parameter Bike Fitting yang Akan Diukur

| Parameter | Cara Ukur |
|-----------|-----------|
| Sudut lutut (knee angle) | Landmark pinggul-lutut-ankle |
| Sudut torso | Landmark bahu-pinggul |
| Reach (jangkauan tangan) | Landmark bahu-siku-pergelangan |
| Sudut siku | Landmark bahu-siku-tangan |

---

## Keterbatasan yang Disepakati

- Akurasi terbaik dengan kamera dari **samping (lateral view)**
- Pencahayaan ruangan harus cukup
- Pakaian ketat lebih akurat daripada pakaian longgar
- Untuk akurasi profesional, kamera 60fps lebih baik

---

## Framework Decision: Next.js vs Vanilla JS

### Vanilla JS
- **Good:** Setup cepat, langsung jalan, performa sedikit lebih ringan
- **Bad:** Sulit dikembangkan, tidak scalable, susah kelola komponen kompleks

### React / Next.js
- **Good:** Scalable, component-based, mudah integrasi ke marketplace, state management lebih baik
- **Bad:** Perlu setup project, sedikit lebih lambat untuk mulai

### Keputusan: **Next.js**
> Alasan utama: Aplikasi ini rencananya akan menjadi **salah satu fitur dalam marketplace** yang dibangun di kemudian hari. Next.js memungkinkan komponen bike fitting langsung di-embed tanpa perlu rewrite.

---

## Rencana Build (Roadmap)

```
Step 1: Webcam + skeleton overlay (Next.js)   ← PRIORITAS PERTAMA
Step 2: Hitung sudut sendi real-time
Step 3: Tampilkan angka sudut di UI
Step 4: Bike fit scoring (ideal vs tidak ideal)
Step 5: Integrasi ke marketplace
```

---

## Catatan Tambahan

- Step 1 (skeleton overlay) dijadikan **proof of concept** — jika skeleton muncul dan mengikuti gerakan, berarti seluruh pipeline berjalan dengan benar.
- Visi jangka panjang: fitur bike fitting ini adalah bagian dari marketplace yang lebih besar.
