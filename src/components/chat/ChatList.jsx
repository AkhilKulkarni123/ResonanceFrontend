import { useState, useEffect } from 'react';
import { chatService } from '../../services/chat.service';
import Avatar from '../common/Avatar';
import Loader from '../common/Loader';
import { truncate, formatRelative } from '../../utils/formatters';

export default function ChatList({ onSelectDM, onSelectGroup, activeId }) {
  const [conversations, setConversations] = useState({ direct: [], groups: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chatService.getConversations()
      .then((res) => setConversations(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      {conversations.direct.length > 0 && (
        <div>
          <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2 px-2">Direct Messages</h4>
          {conversations.direct.map((conv) => (
            <button
              key={conv.partner.id}
              onClick={() => onSelectDM(conv.partner.id)}
              className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${activeId === conv.partner.id ? 'bg-primary/10' : 'hover:bg-dark-surface'}`}
            >
              <Avatar name={conv.partner.username} src={conv.partner.avatar_url} isAnonymous={conv.partner.is_anonymous} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{conv.partner.is_anonymous ? 'Anonymous' : conv.partner.display_name || conv.partner.username}</p>
                <p className="text-xs text-gray-500 truncate">{truncate(conv.last_message?.content, 40)}</p>
              </div>
              {conv.unread && <span className="w-2 h-2 bg-primary rounded-full" />}
            </button>
          ))}
        </div>
      )}

      {conversations.groups.length > 0 && (
        <div>
          <h4 className="text-xs uppercase text-gray-500 font-semibold mb-2 px-2">Groups</h4>
          {conversations.groups.map((conv) => (
            <button
              key={conv.group.id}
              onClick={() => onSelectGroup(conv.group.id)}
              className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${activeId === conv.group.id ? 'bg-primary/10' : 'hover:bg-dark-surface'}`}
            >
              <div className="w-8 h-8 bg-secondary/20 text-secondary rounded-lg flex items-center justify-center text-xs font-bold">
                {conv.group.name?.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{conv.group.name}</p>
                <p className="text-xs text-gray-500 truncate">{conv.last_message ? truncate(conv.last_message.content, 40) : 'No messages yet'}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {conversations.direct.length === 0 && conversations.groups.length === 0 && (
        <p className="text-gray-400 text-sm text-center py-6">No conversations yet. Connect with dream friends to start chatting!</p>
      )}
    </div>
  );
}
