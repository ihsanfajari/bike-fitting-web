import { NormalizedLandmark } from "@mediapipe/tasks-vision";

export type BodySide = "left" | "right";

// MediaPipe Pose landmark indices (https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker)
export const LM = {
  leftShoulder: 11,
  rightShoulder: 12,
  leftElbow: 13,
  rightElbow: 14,
  leftWrist: 15,
  rightWrist: 16,
  leftHip: 23,
  rightHip: 24,
  leftKnee: 25,
  rightKnee: 26,
  leftAnkle: 27,
  rightAnkle: 28,
} as const;

export interface JointAngles {
  knee: number;
  torso: number;
  elbow: number;
}

export interface JointAnchors {
  knee: NormalizedLandmark;
  torso: NormalizedLandmark;
  elbow: NormalizedLandmark;
}

// Included angle at vertex b (derajat). Koordinat landmark ternormalisasi terhadap
// dimensi gambar, jadi wajib dikalikan w/h dulu — tanpa itu sudut terdistorsi
// oleh aspect ratio gambar.
export function calcAngle(
  a: NormalizedLandmark,
  b: NormalizedLandmark,
  c: NormalizedLandmark,
  w: number,
  h: number
): number {
  const ax = (a.x - b.x) * w, ay = (a.y - b.y) * h;
  const cx = (c.x - b.x) * w, cy = (c.y - b.y) * h;
  const dot = ax * cx + ay * cy;
  const mag = Math.sqrt(ax * ax + ay * ay) * Math.sqrt(cx * cx + cy * cy);
  if (mag === 0) return 0;
  return Math.round(Math.acos(Math.min(1, Math.max(-1, dot / mag))) * (180 / Math.PI));
}

// Sudut torso terhadap horizontal (0° = telungkup datar, 90° = duduk tegak).
// Standar industri (road 40–50°) memakai definisi ini, bukan sudut pinggul.
export function torsoAngleFromHorizontal(
  shoulder: NormalizedLandmark,
  hip: NormalizedLandmark,
  w: number,
  h: number
): number {
  const dx = Math.abs(shoulder.x - hip.x) * w;
  const dy = Math.abs(hip.y - shoulder.y) * h;
  return Math.round(Math.atan2(dy, dx) * (180 / Math.PI));
}

export const MIN_SIDE_VISIBILITY = 0.2;

const SIDE_KEY_LM: Record<BodySide, readonly number[]> = {
  left:  [LM.leftShoulder, LM.leftElbow, LM.leftHip, LM.leftKnee, LM.leftAnkle],
  right: [LM.rightShoulder, LM.rightElbow, LM.rightHip, LM.rightKnee, LM.rightAnkle],
};

// Average visibility of the key landmarks on one body side.
export function sideVisibility(lm: NormalizedLandmark[], side: BodySide): number {
  if (lm.length < 29) return 0;
  const idx = SIDE_KEY_LM[side];
  return idx.reduce((s, i) => s + (lm[i].visibility ?? 0), 0) / idx.length;
}

// Picks the side whose key pose landmarks have higher average visibility.
// Returns null only if neither side is detectable (avg visibility < MIN_SIDE_VISIBILITY).
export function selectBestSide(lm: NormalizedLandmark[]): BodySide | null {
  const avgL = sideVisibility(lm, "left");
  const avgR = sideVisibility(lm, "right");
  if (avgL < MIN_SIDE_VISIBILITY && avgR < MIN_SIDE_VISIBILITY) return null;
  return avgL >= avgR ? "left" : "right";
}

// Sudut lutut & siku = included angle di sendi; torso = sudut terhadap horizontal.
export function computeJointAngles(
  lm: NormalizedLandmark[],
  side: BodySide,
  w: number,
  h: number
): { angles: JointAngles; anchors: JointAnchors } {
  const s = side === "left"
    ? { shoulder: LM.leftShoulder, elbow: LM.leftElbow, wrist: LM.leftWrist, hip: LM.leftHip, knee: LM.leftKnee, ankle: LM.leftAnkle }
    : { shoulder: LM.rightShoulder, elbow: LM.rightElbow, wrist: LM.rightWrist, hip: LM.rightHip, knee: LM.rightKnee, ankle: LM.rightAnkle };

  return {
    angles: {
      knee:  calcAngle(lm[s.hip], lm[s.knee], lm[s.ankle], w, h),
      elbow: calcAngle(lm[s.shoulder], lm[s.elbow], lm[s.wrist], w, h),
      torso: torsoAngleFromHorizontal(lm[s.shoulder], lm[s.hip], w, h),
    },
    anchors: {
      knee:  lm[s.knee],
      elbow: lm[s.elbow],
      torso: lm[s.hip],
    },
  };
}

export function drawAngleLabel(
  ctx: CanvasRenderingContext2D,
  lm: NormalizedLandmark,
  label: string,
  angle: number,
  w: number,
  h: number
) {
  const x = lm.x * w;
  const y = lm.y * h;
  ctx.font = "bold 18px monospace";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 3;
  ctx.fillStyle = "#FACC15";
  const text = `${label}: ${angle}°`;
  ctx.strokeText(text, x + 10, y);
  ctx.fillText(text, x + 10, y);
}
