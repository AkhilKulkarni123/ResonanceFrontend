import { Link } from 'react-router-dom';
import { formatDate, getMoodEmoji, truncate } from '../../utils/formatters';

export default function DreamTimeline({ dreams }) {
  if (!dreams || dreams.length === 0) return null;

  const grouped = {};
  dreams.forEach((dream) => {
    const date = formatDate(dream.created_at || dream.createdAt);
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(dream);
  });

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([date, dateDreams]) => (
        <div key={date}>
          <h3 className="text-sm font-semibold text-gray-400 mb-3 sticky top-16 bg-dark/80 backdrop-blur py-1">{date}</h3>
          <div className="space-y-3 ml-4 border-l-2 border-dark-border pl-4">
            {dateDreams.map((dream) => (
              <Link key={dream.id} to={`/dream/${dream.id}`} className="block p-3 bg-dark-card border border-dark-border rounded-lg hover:border-primary/50 transition-all">
                <div className="flex items-center gap-2 mb-1">
                  <span>{getMoodEmoji(dream.mood)}</span>
                  <span className="font-medium text-sm">{dream.title || 'Untitled Dream'}</span>
                </div>
                <p className="text-xs text-gray-400">{truncate(dream.transcript, 80)}</p>
                {dream.analysis && (
                  <div className="flex gap-1 mt-2">
                    {dream.analysis.themes?.slice(0, 3).map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{t}</span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
