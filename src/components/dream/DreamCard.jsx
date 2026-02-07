import { Link } from 'react-router-dom';
import { formatRelative, truncate, getMoodEmoji } from '../../utils/formatters';

export default function DreamCard({ dream }) {
  return (
    <Link to={`/dream/${dream.id}`} className="block p-4 bg-dark-card border border-dark-border rounded-xl hover:border-primary/50 transition-all">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-200 flex-1">{dream.title || 'Untitled Dream'}</h3>
        {dream.mood && <span className="text-xl ml-2">{getMoodEmoji(dream.mood)}</span>}
      </div>
      <p className="text-sm text-gray-400 mb-3">{truncate(dream.transcript, 120)}</p>
      <div className="flex items-center justify-between">
        <div className="flex gap-1 flex-wrap">
          {dream.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 bg-dark-surface rounded-full text-gray-400">{tag}</span>
          ))}
        </div>
        <span className="text-xs text-gray-500">{formatRelative(dream.created_at || dream.createdAt)}</span>
      </div>
      {dream.analysis && (
        <div className="mt-2 pt-2 border-t border-dark-border">
          <span className="text-xs text-primary">Analysis available</span>
        </div>
      )}
    </Link>
  );
}
