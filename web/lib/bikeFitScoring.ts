import { BikeStandard, JointStandard } from "@/config/bikeFitStandards";

export type JointStatus = "ideal" | "acceptable" | "low" | "high";

export interface JointResult {
  angle: number;
  status: JointStatus;
  score: number;
}

export interface FitResult {
  knee: JointResult;
  torso: JointResult;
  elbow: JointResult;
  totalScore: number;
  diagnosis: string;
  recommendations: string[];
}

function evalJoint(angle: number, std: JointStandard): JointResult {
  const [iMin, iMax] = std.ideal;
  const [aMin, aMax] = std.acceptable;

  let status: JointStatus;
  let score: number;

  if (angle >= iMin && angle <= iMax) {
    status = "ideal";
    score = 100;
  } else if (angle >= aMin && angle <= aMax) {
    status = "acceptable";
    // linear interpolation: closer to ideal = higher score
    const distToIdeal = angle < iMin ? iMin - angle : angle - iMax;
    const maxDist = angle < iMin ? iMin - aMin : aMax - iMax;
    score = Math.round(50 + 50 * (1 - distToIdeal / maxDist));
  } else {
    status = angle < aMin ? "low" : "high";
    score = 0;
  }

  return { angle, status, score };
}

function getCategory(s: JointStatus): "LOW" | "IDEAL" | "HIGH" {
  if (s === "low") return "LOW";
  if (s === "high") return "HIGH";
  return "IDEAL";
}

function buildRecommendations(
  knee: JointStatus,
  torso: JointStatus,
  elbow: JointStatus
): { diagnosis: string; recommendations: string[] } {
  const K = getCategory(knee);
  const T = getCategory(torso);
  const E = getCategory(elbow);

  // Lutut LOW
  if (K === "LOW" && T === "LOW") return {
    diagnosis: "Sadel terlalu rendah + Stem terlalu panjang",
    recommendations: ["Naikkan sadel ±1–2 cm", "Pertimbangkan stem lebih pendek"],
  };
  if (K === "LOW" && T === "IDEAL") return {
    diagnosis: "Sadel terlalu rendah",
    recommendations: ["Naikkan sadel ±1–2 cm"],
  };
  if (K === "LOW" && T === "HIGH" && E === "LOW") return {
    diagnosis: "Sadel terlalu rendah + Stem terlalu pendek",
    recommendations: ["Naikkan sadel ±1–2 cm", "Ganti stem lebih panjang"],
  };
  if (K === "LOW" && T === "HIGH" && E === "IDEAL") return {
    diagnosis: "Sadel terlalu rendah + Handlebar terlalu tinggi",
    recommendations: ["Naikkan sadel ±1–2 cm", "Kurangi spacer handlebar"],
  };
  if (K === "LOW" && T === "HIGH" && E === "HIGH") return {
    diagnosis: "Sadel terlalu rendah + Reach terlalu jauh",
    recommendations: ["Naikkan sadel ±1–2 cm", "Geser sadel ke depan"],
  };

  // Lutut HIGH
  if (K === "HIGH" && T === "LOW") return {
    diagnosis: "Sadel terlalu tinggi + Stem terlalu panjang",
    recommendations: ["Turunkan sadel ±1 cm", "Pertimbangkan stem lebih pendek"],
  };
  if (K === "HIGH" && T === "IDEAL") return {
    diagnosis: "Sadel terlalu tinggi",
    recommendations: ["Turunkan sadel ±1 cm"],
  };
  if (K === "HIGH" && T === "HIGH" && E === "LOW") return {
    diagnosis: "Sadel terlalu tinggi + Stem terlalu pendek",
    recommendations: ["Turunkan sadel ±1 cm", "Ganti stem lebih panjang"],
  };
  if (K === "HIGH" && T === "HIGH" && E === "IDEAL") return {
    diagnosis: "Sadel terlalu tinggi + Handlebar terlalu tinggi",
    recommendations: ["Turunkan sadel ±1 cm", "Kurangi spacer handlebar"],
  };
  if (K === "HIGH" && T === "HIGH" && E === "HIGH") return {
    diagnosis: "Sadel terlalu tinggi + Reach terlalu jauh",
    recommendations: ["Turunkan sadel ±1 cm", "Geser sadel ke depan"],
  };

  // Lutut IDEAL
  if (K === "IDEAL" && T === "LOW" && E === "LOW") return {
    diagnosis: "Stem terlalu panjang",
    recommendations: ["Ganti stem lebih pendek"],
  };
  if (K === "IDEAL" && T === "LOW" && E === "IDEAL") return {
    diagnosis: "Handlebar terlalu rendah",
    recommendations: ["Tambah spacer handlebar", "Atau naikkan sudut stem"],
  };
  if (K === "IDEAL" && T === "LOW" && E === "HIGH") return {
    diagnosis: "Reach terlalu panjang",
    recommendations: ["Ganti stem lebih pendek", "Geser sadel ke depan"],
  };
  if (K === "IDEAL" && T === "HIGH" && E === "LOW") return {
    diagnosis: "Stem terlalu pendek",
    recommendations: ["Ganti stem lebih panjang"],
  };
  if (K === "IDEAL" && T === "HIGH" && E === "IDEAL") return {
    diagnosis: "Handlebar terlalu tinggi",
    recommendations: ["Kurangi spacer handlebar", "Atau turunkan sudut stem"],
  };
  if (K === "IDEAL" && T === "HIGH" && E === "HIGH") return {
    diagnosis: "Posisi terlalu tegak, reach terlalu pendek",
    recommendations: ["Ganti stem lebih panjang", "Geser sadel ke belakang"],
  };
  if (K === "IDEAL" && T === "IDEAL" && E === "LOW") return {
    diagnosis: "Sadel terlalu maju",
    recommendations: ["Geser sadel ke belakang ±0.5–1 cm"],
  };
  if (K === "IDEAL" && T === "IDEAL" && E === "HIGH") return {
    diagnosis: "Sadel terlalu mundur",
    recommendations: ["Geser sadel ke depan ±0.5–1 cm"],
  };

  // All ideal
  return {
    diagnosis: "Posisi sempurna",
    recommendations: ["Tidak ada penyesuaian diperlukan"],
  };
}

export function calculateFitResult(
  samples: { knee: number; torso: number; elbow: number }[],
  standard: BikeStandard
): FitResult {
  const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const min = (arr: number[]) => Math.min(...arr);

  // Lutut dinilai dari minimum (BDC), torso & siku dari rata-rata
  const kneeAngle  = Math.round(min(samples.map((s) => s.knee)));
  const torsoAngle = Math.round(avg(samples.map((s) => s.torso)));
  const elbowAngle = Math.round(avg(samples.map((s) => s.elbow)));

  const knee  = evalJoint(kneeAngle,  standard.knee);
  const torso = evalJoint(torsoAngle, standard.torso);
  const elbow = evalJoint(elbowAngle, standard.elbow);

  const { weights } = standard;
  const totalScore = Math.round(
    knee.score  * weights.knee +
    torso.score * weights.torso +
    elbow.score * weights.elbow
  );

  const { diagnosis, recommendations } = buildRecommendations(
    knee.status, torso.status, elbow.status
  );

  return { knee, torso, elbow, totalScore, diagnosis, recommendations };
}
