export default function SymbolBreakdown({ symbols }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-400 mb-3">Dream Symbols</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {symbols.map((s, i) => (
          <div key={i} className="p-3 bg-dark-surface rounded-lg border border-dark-border">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-primary font-semibold capitalize">{s.symbol}</span>
            </div>
            <p className="text-xs text-gray-400 mb-1"><strong>Meaning:</strong> {s.meaning}</p>
            {s.personal_relevance && (
              <p className="text-xs text-gray-300"><strong>For you:</strong> {s.personal_relevance}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
