import { useState, useEffect } from 'react';
import { dreamService } from '../../services/dream.service';
import { getMoodEmoji } from '../../utils/formatters';
import Loader from '../common/Loader';

export default function DreamOfTheDay() {
  const [dream, setDream] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dreamService.getFeatured()
      .then((res) => setDream(res.data.dream))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader text="Loading featured dream..." />;
  if (!dream) return (
    <div className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border border-dark-border rounded-xl text-center">
      <p className="text-3xl mb-2">🌟</p>
      <p className="text-gray-400">No featured dream today. Check back later!</p>
    </div>
  );

  return (
    <div className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-xl">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">🌟</span>
        <h3 className="font-semibold text-primary">Dream of the Day</h3>
      </div>
      <h4 className="text-lg font-semibold mb-2">{dream.title || 'Untitled Dream'} {dream.mood && getMoodEmoji(dream.mood)}</h4>
      {dream.analysis?.summary && <p className="text-sm text-gray-300 mb-3">{dream.analysis.summary}</p>}
      {dream.analysis?.themes && (
        <div className="flex gap-1 flex-wrap mb-3">
          {dream.analysis.themes.map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded-full">{t}</span>
          ))}
        </div>
      )}
      {dream.DreamArts?.[0] && (
        <img src={dream.DreamArts[0].image_url} alt="Dream Art" className="w-full rounded-lg mt-3 max-h-64 object-cover" />
      )}
      <p className="text-xs text-gray-500 mt-2">
        Shared by {dream.User?.is_anonymous ? 'Anonymous Dreamer' : dream.User?.display_name || dream.User?.username}
      </p>
    </div>
  );
}
