import { useState } from 'react';
import MatchSuggestions from '../components/social/MatchSuggestions';
import FriendList from '../components/social/FriendList';
import DreamGroupList from '../components/social/DreamGroupList';
import Button from '../components/common/Button';

export default function SocialPage() {
  const [tab, setTab] = useState('friends');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dream Community</h1>

      <div className="flex gap-2 mb-6">
        <Button variant={tab === 'friends' ? 'primary' : 'secondary'} onClick={() => setTab('friends')}>Friends</Button>
        <Button variant={tab === 'matches' ? 'primary' : 'secondary'} onClick={() => setTab('matches')}>Dream Matches</Button>
        <Button variant={tab === 'groups' ? 'primary' : 'secondary'} onClick={() => setTab('groups')}>Groups</Button>
      </div>

      {tab === 'friends' && <FriendList />}
      {tab === 'matches' && <MatchSuggestions />}
      {tab === 'groups' && <DreamGroupList />}
    </div>
  );
}
