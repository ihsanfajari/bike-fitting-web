export type BikeType = "road" | "mtb" | "gravel";

export interface JointStandard {
  ideal: [number, number];
  acceptable: [number, number];
}

export interface BikeStandard {
  label: string;
  knee: JointStandard;
  torso: JointStandard;
  elbow: JointStandard;
  weights: { knee: number; torso: number; elbow: number };
}

export const BIKE_STANDARDS: Record<BikeType, BikeStandard> = {
  road: {
    label: "Road Bike",
    knee:  { ideal: [140, 150], acceptable: [135, 155] },
    torso: { ideal: [40, 50],  acceptable: [35, 60]   },
    elbow: { ideal: [150, 165], acceptable: [145, 170] },
    weights: { knee: 0.4, torso: 0.35, elbow: 0.25 },
  },
  mtb: {
    label: "Mountain Bike",
    knee:  { ideal: [140, 150], acceptable: [135, 155] },
    torso: { ideal: [55, 70],  acceptable: [50, 75]   },
    elbow: { ideal: [120, 150], acceptable: [115, 155] },
    weights: { knee: 0.4, torso: 0.35, elbow: 0.25 },
  },
  gravel: {
    label: "Gravel Bike",
    knee:  { ideal: [140, 150], acceptable: [135, 155] },
    torso: { ideal: [45, 55],  acceptable: [40, 65]   },
    elbow: { ideal: [145, 160], acceptable: [140, 165] },
    weights: { knee: 0.4, torso: 0.35, elbow: 0.25 },
  },
};
