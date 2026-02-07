import { useState, useEffect } from 'react';
import api from '../../services/api';
import BadgeIcon from '../common/Badge';
import Loader from '../common/Loader';

export default function BadgeDisplay() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/badges')
      .then((res) => setBadges(res.data.badges))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const earned = badges.filter((b) => b.earned);
  const locked = badges.filter((b) => !b.earned);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Earned ({earned.length}/{badges.length})</h3>
        {earned.length === 0 ? (
          <p className="text-gray-400 text-sm">No badges earned yet. Keep dreaming!</p>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">{earned.map((b) => <BadgeIcon key={b.id} {...b} />)}</div>
        )}
      </div>
      {locked.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2 text-gray-500">Locked</h3>
          <div className="grid gap-2 sm:grid-cols-2">{locked.map((b) => <BadgeIcon key={b.id} {...b} />)}</div>
        </div>
      )}
    </div>
  );
}
