import { useState, useEffect } from 'react';
import { socialService } from '../../services/social.service';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import Loader from '../common/Loader';

export default function MatchSuggestions() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socialService.getSuggestions()
      .then((res) => setMatches(res.data.matches))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSendRequest = async (userId, matchReason) => {
    try {
      await socialService.sendRequest({ friend_id: userId, match_reason: matchReason });
      setMatches((prev) => prev.filter((m) => m.user.id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loader text="Finding dream matches..." />;
  if (matches.length === 0) return <p className="text-gray-400 text-center py-6">No matches found yet. Record more dreams to find your dream friends!</p>;

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-200">Dream Matches</h3>
      {matches.map((match) => (
        <div key={match.user.id} className="flex items-center justify-between p-3 bg-dark-card border border-dark-border rounded-lg">
          <div className="flex items-center gap-3">
            <Avatar name={match.user.username} isAnonymous={match.user.is_anonymous} />
            <div>
              <p className="font-medium text-sm">{match.user.is_anonymous ? 'Anonymous Dreamer' : match.user.username}</p>
              <p className="text-xs text-primary">{match.match_reason}</p>
              <p className="text-xs text-gray-500">{Math.round(match.score * 100)}% match</p>
            </div>
          </div>
          <Button onClick={() => handleSendRequest(match.user.id, match.match_reason)} className="text-xs">
            Connect
          </Button>
        </div>
      ))}
    </div>
  );
}
