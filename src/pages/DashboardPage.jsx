import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { dreamService } from '../services/dream.service';
import { analyticsService } from '../services/analytics.service';
import DreamList from '../components/dream/DreamList';
import StreakCounter from '../components/creative/StreakCounter';
import DreamOfTheDay from '../components/creative/DreamOfTheDay';
import Button from '../components/common/Button';

export default function DashboardPage() {
  const { user } = useAuth();
  const [recentDreams, setRecentDreams] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      dreamService.getAll({ limit: 6 }),
      analyticsService.getDashboard(),
    ]).then(([dreamsRes, statsRes]) => {
      setRecentDreams(dreamsRes.data.dreams);
      setStats(statsRes.data);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.display_name || user?.username}</h1>
          <p className="text-gray-400">Ready to explore your dream world?</p>
        </div>
        <Link to="/record">
          <Button className="text-lg px-6 py-3">Record Dream</Button>
        </Link>
      </div>

      {/* Quick stats */}
      {stats && (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mb-8">
          <div className="p-4 bg-dark-card border border-dark-border rounded-xl text-center">
            <p className="text-2xl font-bold text-primary">{stats.dream_count}</p>
            <p className="text-xs text-gray-400">Total Dreams</p>
          </div>
          <div className="p-4 bg-dark-card border border-dark-border rounded-xl text-center">
            <p className="text-2xl font-bold text-secondary">{stats.dreams_this_month}</p>
            <p className="text-xs text-gray-400">This Month</p>
          </div>
          <StreakCounter streak={stats.current_streak} />
          <div className="p-4 bg-dark-card border border-dark-border rounded-xl text-center">
            <p className="text-2xl font-bold text-accent">{stats.badges_earned}</p>
            <p className="text-xs text-gray-400">Badges Earned</p>
          </div>
        </div>
      )}

      {/* Recent dreams */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Dreams</h2>
          <Link to="/journal" className="text-sm text-primary hover:text-primary-light">View all</Link>
        </div>
        <DreamList dreams={recentDreams} loading={loading} />
      </div>

      {/* Dream of the Day */}
      <div className="max-w-2xl">
        <DreamOfTheDay />
      </div>
    </div>
  );
}
