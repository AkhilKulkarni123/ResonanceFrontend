import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';

export default function ChatPage() {
  const [searchParams] = useSearchParams();
  const [activeType, setActiveType] = useState(null); // 'dm' or 'group'
  const [activeId, setActiveId] = useState(null);
  const { joinGroup } = useSocket();

  useEffect(() => {
    const userId = searchParams.get('user');
    if (userId) {
      setActiveType('dm');
      setActiveId(userId);
    }
  }, [searchParams]);

  const handleSelectDM = (userId) => {
    setActiveType('dm');
    setActiveId(userId);
  };

  const handleSelectGroup = (groupId) => {
    setActiveType('group');
    setActiveId(groupId);
    joinGroup(groupId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Chat</h1>
      <div className="flex gap-4 h-[calc(100vh-12rem)]">
        <div className="w-80 bg-dark-card border border-dark-border rounded-xl p-3 overflow-y-auto">
          <ChatList onSelectDM={handleSelectDM} onSelectGroup={handleSelectGroup} activeId={activeId} />
        </div>
        <div className="flex-1 bg-dark-card border border-dark-border rounded-xl overflow-hidden">
          {activeId ? (
            <ChatWindow
              partnerId={activeType === 'dm' ? activeId : null}
              groupId={activeType === 'group' ? activeId : null}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
