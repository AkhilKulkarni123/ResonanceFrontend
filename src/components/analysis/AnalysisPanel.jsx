import SymbolBreakdown from './SymbolBreakdown';
import PredictionCard from './PredictionCard';
import EmotionalChart from './EmotionalChart';
import ThemeTracker from './ThemeTracker';

export default function AnalysisPanel({ analysis, prediction }) {
  if (!analysis) return <p className="text-gray-400 text-center py-8">No analysis available yet.</p>;

  return (
    <div className="space-y-6">
      {analysis.summary && (
        <div className="p-4 bg-dark-surface rounded-xl border border-dark-border">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">Summary</h3>
          <p className="text-gray-200">{analysis.summary}</p>
        </div>
      )}

      {analysis.overall_interpretation && (
        <div className="p-4 bg-dark-surface rounded-xl border border-dark-border">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">Interpretation</h3>
          <p className="text-gray-200 whitespace-pre-line">{analysis.overall_interpretation}</p>
        </div>
      )}

      {analysis.symbols && analysis.symbols.length > 0 && <SymbolBreakdown symbols={analysis.symbols} />}
      {analysis.emotional_analysis && <EmotionalChart emotional={analysis.emotional_analysis} />}
      {analysis.themes && analysis.themes.length > 0 && <ThemeTracker themes={analysis.themes} recurring={analysis.recurring_patterns} />}
      {prediction && <PredictionCard prediction={prediction} />}

      {analysis.cultural_references && analysis.cultural_references.length > 0 && (
        <div className="p-4 bg-dark-surface rounded-xl border border-dark-border">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">Cultural References</h3>
          <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
            {analysis.cultural_references.map((ref, i) => <li key={i}>{ref}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
