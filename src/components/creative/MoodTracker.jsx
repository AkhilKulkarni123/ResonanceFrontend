import { getMoodEmoji } from '../../utils/formatters';
import { MOODS } from '../../utils/constants';

export default function MoodTracker({ moodDistribution }) {
  if (!moodDistribution || Object.keys(moodDistribution).length === 0) {
    return <p className="text-gray-400 text-sm">No mood data yet.</p>;
  }

  const total = Object.values(moodDistribution).reduce((a, b) => a + b, 0);

  return (
    <div className="p-4 bg-dark-card border border-dark-border rounded-xl">
      <h3 className="font-semibold mb-3">Dream Moods</h3>
      <div className="space-y-2">
        {Object.entries(moodDistribution)
          .sort((a, b) => b[1] - a[1])
          .map(([mood, count]) => (
            <div key={mood} className="flex items-center gap-2">
              <span className="text-lg">{getMoodEmoji(mood)}</span>
              <span className="text-sm capitalize w-20">{mood}</span>
              <div className="flex-1 bg-dark-surface rounded-full h-2">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${(count / total) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 w-8 text-right">{count}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
