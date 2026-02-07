import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { socialService } from '../../services/social.service';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import Loader from '../common/Loader';

export default function FriendList() {
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [friendsRes, requestsRes] = await Promise.all([
        socialService.getFriends(),
        socialService.getRequests(),
      ]);
      setFriends(friendsRes.data.friends);
      setRequests(requestsRes.data.requests);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const acceptRequest = async (id) => {
    await socialService.acceptRequest(id);
    loadData();
  };

  const rejectRequest = async (id) => {
    await socialService.rejectRequest(id);
    loadData();
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      {requests.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-200 mb-3">Pending Requests ({requests.length})</h3>
          <div className="space-y-2">
            {requests.map((req) => (
              <div key={req.id} className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar name={req.requester?.username} isAnonymous={req.requester?.is_anonymous} size="sm" />
                  <span className="text-sm">{req.requester?.is_anonymous ? 'Anonymous' : req.requester?.username}</span>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => acceptRequest(req.id)} className="text-xs">Accept</Button>
                  <Button variant="secondary" onClick={() => rejectRequest(req.id)} className="text-xs">Decline</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold text-gray-200 mb-3">Friends ({friends.length})</h3>
        {friends.length === 0 ? (
          <p className="text-gray-400 text-sm">No friends yet. Check out Dream Matches to connect!</p>
        ) : (
          <div className="space-y-2">
            {friends.map((f) => (
              <div key={f.friendship_id} className="flex items-center justify-between p-3 bg-dark-card border border-dark-border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar name={f.user.username} src={f.user.avatar_url} isAnonymous={f.is_anonymous} />
                  <div>
                    <p className="text-sm font-medium">{f.is_anonymous ? 'Anonymous Dreamer' : f.user.display_name || f.user.username}</p>
                    {f.match_reason && <p className="text-xs text-gray-500">{f.match_reason}</p>}
                  </div>
                </div>
                <Link to={`/chat?user=${f.user.id}`}>
                  <Button variant="secondary" className="text-xs">Chat</Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
