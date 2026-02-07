import { useState, useEffect } from 'react';
import { socialService } from '../../services/social.service';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Loader from '../common/Loader';

export default function DreamGroupList() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', theme: '', description: '' });

  useEffect(() => {
    socialService.getGroups()
      .then((res) => setGroups(res.data.groups))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const createGroup = async () => {
    try {
      await socialService.createGroup(newGroup);
      setShowCreate(false);
      setNewGroup({ name: '', theme: '', description: '' });
      const res = await socialService.getGroups();
      setGroups(res.data.groups);
    } catch (err) {
      console.error(err);
    }
  };

  const joinGroup = async (id) => {
    try {
      await socialService.joinGroup(id, {});
      const res = await socialService.getGroups();
      setGroups(res.data.groups);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-200">Dream Groups</h3>
        <Button onClick={() => setShowCreate(true)} className="text-sm">Create Group</Button>
      </div>

      {groups.length === 0 ? (
        <p className="text-gray-400 text-center py-6">No groups yet. Create the first one!</p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {groups.map((g) => (
            <div key={g.id} className="p-4 bg-dark-card border border-dark-border rounded-xl">
              <h4 className="font-semibold mb-1">{g.name}</h4>
              {g.theme && <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded-full">{g.theme}</span>}
              {g.description && <p className="text-sm text-gray-400 mt-2">{g.description}</p>}
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-gray-500">{g.member_count} members</span>
                <Button variant="secondary" onClick={() => joinGroup(g.id)} className="text-xs">Join</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Dream Group">
        <div className="space-y-3">
          <input value={newGroup.name} onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })} placeholder="Group name" className="w-full px-3 py-2 bg-dark-surface border border-dark-border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary" />
          <input value={newGroup.theme} onChange={(e) => setNewGroup({ ...newGroup, theme: e.target.value })} placeholder="Theme (e.g., water dreams, flying)" className="w-full px-3 py-2 bg-dark-surface border border-dark-border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary" />
          <textarea value={newGroup.description} onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })} placeholder="Description" rows={3} className="w-full px-3 py-2 bg-dark-surface border border-dark-border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
          <Button onClick={createGroup} disabled={!newGroup.name} className="w-full">Create Group</Button>
        </div>
      </Modal>
    </div>
  );
}
