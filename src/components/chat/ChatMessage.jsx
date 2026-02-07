import { formatRelative } from '../../utils/formatters';
import Avatar from '../common/Avatar';

export default function ChatMessage({ message, isOwn }) {
  const sender = message.sender;

  return (
    <div className={`flex gap-2 ${isOwn ? 'flex-row-reverse' : ''}`}>
      <Avatar name={sender?.username || sender?.display_name} src={sender?.avatar_url} isAnonymous={sender?.is_anonymous} size="sm" />
      <div className={`max-w-[70%] ${isOwn ? 'text-right' : ''}`}>
        <div className={`inline-block px-3 py-2 rounded-xl text-sm ${isOwn ? 'bg-primary text-white rounded-tr-sm' : 'bg-dark-surface text-gray-200 rounded-tl-sm'}`}>
          {message.content}
        </div>
        <p className="text-xs text-gray-600 mt-0.5">{formatRelative(message.created_at || message.createdAt)}</p>
      </div>
    </div>
  );
}
