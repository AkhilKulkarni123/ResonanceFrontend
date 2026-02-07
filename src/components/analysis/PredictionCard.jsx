export default function PredictionCard({ prediction }) {
  if (!prediction) return null;
  const confidence = Math.round((prediction.confidence || 0.5) * 100);

  return (
    <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border border-primary/30">
      <h3 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
        Predictions
        <span className="text-xs bg-primary/20 px-2 py-0.5 rounded-full">{confidence}% confidence</span>
      </h3>
      <div className="space-y-3">
        {prediction.short_term && (
          <div>
            <p className="text-xs font-medium text-gray-400">Coming Days</p>
            <p className="text-sm text-gray-200">{prediction.short_term}</p>
          </div>
        )}
        {prediction.medium_term && (
          <div>
            <p className="text-xs font-medium text-gray-400">Coming Weeks</p>
            <p className="text-sm text-gray-200">{prediction.medium_term}</p>
          </div>
        )}
        {prediction.guidance && (
          <div className="pt-2 border-t border-primary/20">
            <p className="text-xs font-medium text-primary">Guidance</p>
            <p className="text-sm text-gray-200">{prediction.guidance}</p>
          </div>
        )}
      </div>
    </div>
  );
}
