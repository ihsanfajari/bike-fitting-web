import { FitResult, JointStatus } from "@/lib/bikeFitScoring";

const STATUS_COLOR: Record<JointStatus, string> = {
  ideal:      "text-green-400",
  acceptable: "text-yellow-400",
  low:        "text-red-400",
  high:       "text-red-400",
};

const STATUS_LABEL: Record<JointStatus, string> = {
  ideal:      "Ideal ✅",
  acceptable: "Hampir ideal ⚠️",
  low:        "Terlalu kecil ❌",
  high:       "Terlalu besar ❌",
};

const JOINT_BG: Record<JointStatus, string> = {
  ideal:      "bg-green-900 border-green-500",
  acceptable: "bg-yellow-900 border-yellow-500",
  low:        "bg-red-900 border-red-500",
  high:       "bg-red-900 border-red-500",
};

function scoreColor(score: number) {
  if (score >= 80) return "text-green-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

export default function FitResultCard({ fitResult }: { fitResult: FitResult }) {
  return (
    <div className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Hasil Fitting</h2>
        <span className={`text-3xl font-bold ${scoreColor(fitResult.totalScore)}`}>
          {fitResult.totalScore}/100
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {(["knee", "torso", "elbow"] as const).map((joint) => {
          const r = fitResult[joint];
          const labels = { knee: "Lutut", torso: "Torso", elbow: "Siku" };
          return (
            <div key={joint} className={`rounded-lg p-3 border ${JOINT_BG[r.status]}`}>
              <p className="text-xs text-zinc-300">{labels[joint]}</p>
              <p className="text-xl font-bold text-white">{r.angle}°</p>
              <p className={`text-xs mt-1 ${STATUS_COLOR[r.status]}`}>{STATUS_LABEL[r.status]}</p>
            </div>
          );
        })}
      </div>

      <div className="border-t border-zinc-700 pt-4 flex flex-col gap-2">
        <p className="text-sm text-zinc-400">Diagnosis</p>
        <p className="font-semibold">{fitResult.diagnosis}</p>
        <p className="text-sm text-zinc-400 mt-2">Rekomendasi</p>
        <ul className="flex flex-col gap-1">
          {fitResult.recommendations.map((r, i) => (
            <li key={i} className="text-sm flex gap-2">
              <span className="text-yellow-400">→</span> {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
