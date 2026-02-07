export default function PredictionAccuracyChart({ accuracy, count }) {
  if (!accuracy) return null;

  const pct = (parseFloat(accuracy) / 5) * 100;

  return (
    <div className="p-4 bg-dark-card border border-dark-border rounded-xl">
      <h3 className="font-semibold mb-3">Prediction Accuracy</h3>
      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2d2640" strokeWidth="3" />
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray={`${pct}, 100`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">{accuracy}</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-300">out of 5.0</p>
          <p className="text-xs text-gray-500">{count} predictions rated</p>
        </div>
      </div>
    </div>
  );
}
