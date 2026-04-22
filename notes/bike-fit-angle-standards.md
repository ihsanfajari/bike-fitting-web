# Bike Fit Angle Standards

Referensi sudut ideal yang digunakan dalam sistem scoring bike fitting.
Semua nilai tersimpan di `app/config/bikeFitStandards.ts`.

---

## Road Bike

| Sendi | Ideal | Acceptable | Di luar range |
|---|---|---|---|
| Lutut (BDC) | 140° – 150° | 135° – 155° | < 135° atau > 155° |
| Torso | 40° – 50° | 35° – 60° | < 35° atau > 60° |
| Siku | 150° – 165° | 145° – 170° | < 145° atau > 170° |

**Bobot scoring:** Lutut 40% · Torso 35% · Siku 25%

---

## Mountain Bike

| Sendi | Ideal | Acceptable | Di luar range |
|---|---|---|---|
| Lutut (BDC) | 140° – 150° | 135° – 155° | < 135° atau > 155° |
| Torso | 55° – 70° | 50° – 75° | < 50° atau > 75° |
| Siku | 120° – 150° | 115° – 155° | < 115° atau > 155° |

**Bobot scoring:** Lutut 40% · Torso 35% · Siku 25%

---

## Gravel Bike

| Sendi | Ideal | Acceptable | Di luar range |
|---|---|---|---|
| Lutut (BDC) | 140° – 150° | 135° – 155° | < 135° atau > 155° |
| Torso | 45° – 55° | 40° – 65° | < 40° atau > 65° |
| Siku | 145° – 160° | 140° – 165° | < 140° atau > 165° |

**Bobot scoring:** Lutut 40% · Torso 35% · Siku 25%

---

## Catatan Metodologi

- **Lutut** dinilai dari nilai **minimum** selama sesi rekam (posisi Bottom Dead Center / kaki terbawah) — sesuai standar bike fit internasional
- **Torso & Siku** dinilai dari **rata-rata** selama sesi rekam
- Satu sesi rekam = 5 detik · ±150 data point per sendi

---

## Status Scoring per Sendi

| Status | Range | Skor | Warna |
|---|---|---|---|
| Ideal | Masuk range ideal | 100 | Hijau |
| Acceptable | Masuk range acceptable | 50–99 (linear) | Kuning |
| Low / High | Di luar acceptable | 0 | Merah |

---

## Catatan

- Nilai-nilai ini bersifat **sementara** dan dapat diupdate berdasarkan referensi ebook atau panduan profesional
- Untuk update, cukup edit file `app/config/bikeFitStandards.ts` — logika scoring tidak perlu diubah
