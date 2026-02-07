import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import BadgeDisplay from '../components/creative/BadgeDisplay';
import SleepLogger from '../components/creative/SleepLogger';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    display_name: user?.display_name || '',
    bio: user?.bio || '',
    is_anonymous: user?.is_anonymous || false,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState('profile');

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="flex gap-2 mb-6">
        <Button variant={tab === 'profile' ? 'primary' : 'secondary'} onClick={() => setTab('profile')}>Profile</Button>
        <Button variant={tab === 'badges' ? 'primary' : 'secondary'} onClick={() => setTab('badges')}>Badges</Button>
        <Button variant={tab === 'sleep' ? 'primary' : 'secondary'} onClick={() => setTab('sleep')}>Sleep Log</Button>
      </div>

      {tab === 'profile' && (
        <div className="p-6 bg-dark-card border border-dark-border rounded-xl space-y-4 max-w-md">
          <div className="text-center mb-4">
            <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">
              {user?.display_name?.charAt(0)?.toUpperCase() || user?.username?.charAt(0)?.toUpperCase()}
            </div>
            <p className="text-gray-400 text-sm">@{user?.username}</p>
          </div>

          <Input label="Display Name" value={form.display_name} onChange={(e) => setForm({ ...form, display_name: e.target.value })} />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={3}
              placeholder="Tell others about yourself..."
              className="w-full px-3 py-2 bg-dark-surface border border-dark-border rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" checked={form.is_anonymous} onChange={(e) => setForm({ ...form, is_anonymous: e.target.checked })} className="accent-primary" />
            Stay anonymous in social features
          </label>

          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>
      )}

      {tab === 'badges' && <BadgeDisplay />}
      {tab === 'sleep' && <SleepLogger />}
    </div>
  );
}
