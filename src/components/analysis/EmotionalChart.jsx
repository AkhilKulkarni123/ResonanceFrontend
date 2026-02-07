export default function EmotionalChart({ emotional }) {
  if (!emotional) return null;

  return (
    <div className="p-4 bg-dark-surface rounded-xl border border-dark-border">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">Emotional Analysis</h3>
      {emotional.dominant_emotions && (
        <div className="flex gap-2 mb-3 flex-wrap">
          {emotional.dominant_emotions.map((e) => (
            <span key={e} className="text-xs px-3 py-1 bg-secondary/20 text-secondary rounded-full capitalize">{e}</span>
          ))}
        </div>
      )}
      {emotional.emotional_arc && (
        <div className="mb-2">
          <p className="text-xs font-medium text-gray-400">Emotional Arc</p>
          <p className="text-sm text-gray-300">{emotional.emotional_arc}</p>
        </div>
      )}
      {emotional.connection_to_waking_life && (
        <div>
          <p className="text-xs font-medium text-gray-400">Connection to Waking Life</p>
          <p className="text-sm text-gray-300">{emotional.connection_to_waking_life}</p>
        </div>
      )}
    </div>
  );
}
