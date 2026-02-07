import { useState, useEffect } from 'react';
import { analyticsService } from '../../services/analytics.service';
import MoodChart from './MoodChart';
import SleepChart from './SleepChart';
import CategoryPieChart from './CategoryPieChart';
import PredictionAccuracyChart from './PredictionAccuracyChart';
import StreakCounter from '../creative/StreakCounter';
import MoodTracker from '../creative/MoodTracker';
import Loader from '../common/Loader';

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsService.getDashboard()
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader text="Loading analytics..." />;
  if (!data) return <p className="text-gray-400 text-center py-8">Failed to load analytics.</p>;

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <div className="p-4 bg-dark-card border border-dark-border rounded-xl text-center">
          <p className="text-2xl font-bold text-primary">{data.dream_count}</p>
          <p className="text-xs text-gray-400">Total Dreams</p>
        </div>
        <div className="p-4 bg-dark-card border border-dark-border rounded-xl text-center">
          <p className="text-2xl font-bold text-secondary">{data.dreams_this_month}</p>
          <p className="text-xs text-gray-400">This Month</p>
        </div>
        <StreakCounter streak={data.current_streak} />
        <div className="p-4 bg-dark-card border border-dark-border rounded-xl text-center">
          <p className="text-2xl font-bold text-accent">{data.badges_earned}/{data.badges_total}</p>
          <p className="text-xs text-gray-400">Badges</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <MoodChart moodOverTime={data.mood_over_time} />
        <MoodTracker moodDistribution={data.mood_distribution} />
        {data.sleep_over_time?.length > 0 && <SleepChart sleepData={data.sleep_over_time} />}
        {data.top_categories?.length > 0 && <CategoryPieChart categories={data.top_categories} />}
      </div>

      {/* Top themes */}
      {data.top_themes?.length > 0 && (
        <div className="p-4 bg-dark-card border border-dark-border rounded-xl">
          <h3 className="font-semibold mb-3">Top Dream Themes</h3>
          <div className="flex flex-wrap gap-2">
            {data.top_themes.map((t) => (
              <span key={t.theme} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm capitalize">
                {t.theme} <span className="text-xs opacity-70">({t.count})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Prediction accuracy */}
      {data.prediction_accuracy_avg && (
        <div className="p-4 bg-dark-card border border-dark-border rounded-xl">
          <h3 className="font-semibold mb-2">Prediction Accuracy</h3>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-primary">{data.prediction_accuracy_avg}</span>
            <span className="text-gray-400">/5 average across {data.feedback_count} reviews</span>
          </div>
        </div>
      )}
    </div>
  );
}
