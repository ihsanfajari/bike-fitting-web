// Analisis deret sudut sendi hasil ekstraksi frame video kayuhan.
// Pure functions — tidak menyentuh DOM/MediaPipe supaya bisa di-unit-test.

export interface FrameSample {
  t: number; // detik, posisi frame di video
  knee: number;
  torso: number;
  elbow: number;
}

export interface CycleAnalysis {
  ok: true;
  cycles: number;
  peakIndices: number[]; // indeks frame ekstensi maksimum (BDC) tiap siklus
  // Satu sample agregat siap diumpankan ke calculateFitResult():
  // knee = rata-rata puncak ekstensi antar siklus, torso/siku = median seluruh frame.
  aggregate: { knee: number; torso: number; elbow: number };
}

export interface CycleAnalysisError {
  ok: false;
  reason: "no-frames" | "too-few-cycles";
  cycles: number;
}

export const MIN_FRAMES = 15;
export const MIN_CYCLES = 3;
// Puncak ekstensi harus menonjol >= 15° dari lembah sekitarnya — membedakan
// siklus kayuhan sungguhan (ayunan lutut ~60-80°) dari jitter deteksi pose.
export const MIN_PEAK_PROMINENCE = 15;
// Jarak antar puncak >= 0.3 dtk (batas ~200 rpm) agar noise tidak dihitung dua siklus.
export const MIN_PEAK_DISTANCE_SEC = 0.3;

export function medianFilter(values: number[], window = 5): number[] {
  if (values.length === 0) return [];
  const half = Math.floor(window / 2);
  return values.map((_, i) => {
    const lo = Math.max(0, i - half);
    const hi = Math.min(values.length - 1, i + half);
    return median(values.slice(lo, hi + 1));
  });
}

export function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

// Local maxima dengan syarat prominence & jarak minimum antar puncak.
export function findPeaks(
  values: number[],
  minProminence: number,
  minDistance: number
): number[] {
  const candidates: number[] = [];
  for (let i = 1; i < values.length - 1; i++) {
    // ">= kanan" agar tepi kiri plateau tetap terhitung satu puncak
    if (values[i] > values[i - 1] && values[i] >= values[i + 1]) {
      candidates.push(i);
    }
  }

  // Greedy dari puncak tertinggi, tolak yang terlalu dekat dengan yang sudah diterima
  candidates.sort((a, b) => values[b] - values[a]);
  const accepted: number[] = [];
  for (const idx of candidates) {
    if (accepted.every((a) => Math.abs(a - idx) >= minDistance)) {
      accepted.push(idx);
    }
  }

  // Prominence: tinggi puncak di atas lembah tertinggi di antara puncak ini
  // dan titik yang lebih tinggi berikutnya (kiri & kanan).
  const prominent = accepted.filter((idx) => {
    const peak = values[idx];
    let minLeft = peak;
    for (let i = idx - 1; i >= 0 && values[i] <= peak; i--) {
      minLeft = Math.min(minLeft, values[i]);
    }
    let minRight = peak;
    for (let i = idx + 1; i < values.length && values[i] <= peak; i++) {
      minRight = Math.min(minRight, values[i]);
    }
    return peak - Math.max(minLeft, minRight) >= minProminence;
  });

  return prominent.sort((a, b) => a - b);
}

export function analyzeFrames(frames: FrameSample[]): CycleAnalysis | CycleAnalysisError {
  if (frames.length < MIN_FRAMES) {
    return { ok: false, reason: "no-frames", cycles: 0 };
  }

  const kneeRaw = frames.map((f) => f.knee);
  const kneeSmooth = medianFilter(kneeRaw, 5);

  const duration = frames[frames.length - 1].t - frames[0].t;
  const dt = duration / (frames.length - 1);
  const minDistSamples = Math.max(1, Math.ceil(MIN_PEAK_DISTANCE_SEC / dt));

  // Puncak dideteksi dari sinyal halus (tahan noise), tapi nilai sudutnya
  // diambil dari sinyal mentah di sekitar puncak — median filter memangkas
  // puncak hingga ~10° saat sample per siklus sedikit (15 fps @ 90 rpm ≈ 10).
  const peakIndices = findPeaks(kneeSmooth, MIN_PEAK_PROMINENCE, minDistSamples);
  if (peakIndices.length < MIN_CYCLES) {
    return { ok: false, reason: "too-few-cycles", cycles: peakIndices.length };
  }

  const kneeAtPeaks = peakIndices.map((i) => {
    const lo = Math.max(0, i - 2);
    const hi = Math.min(kneeRaw.length - 1, i + 2);
    return Math.max(...kneeRaw.slice(lo, hi + 1));
  });

  return {
    ok: true,
    cycles: peakIndices.length,
    peakIndices,
    aggregate: {
      knee:  Math.round(kneeAtPeaks.reduce((a, b) => a + b, 0) / kneeAtPeaks.length),
      torso: Math.round(median(frames.map((f) => f.torso))),
      elbow: Math.round(median(frames.map((f) => f.elbow))),
    },
  };
}
