export default function ThemeTracker({ themes, recurring }) {
  return (
    <div className="p-4 bg-dark-surface rounded-xl border border-dark-border">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">Themes</h3>
      <div className="flex gap-2 flex-wrap mb-3">
        {themes.map((t) => (
          <span key={t} className="text-xs px-3 py-1 bg-accent/20 text-accent rounded-full capitalize">{t}</span>
        ))}
      </div>
      {recurring && recurring.length > 0 && (
        <div>
          <p className="text-xs font-medium text-gray-400 mb-2">Recurring Patterns</p>
          <div className="space-y-2">
            {recurring.map((r, i) => (
              <div key={i} className="text-sm">
                <span className="text-primary capitalize">{r.theme}</span>
                {r.frequency && <span className="text-gray-500 ml-2">({r.frequency}x)</span>}
                {r.evolution && <p className="text-xs text-gray-400 mt-0.5">{r.evolution}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
