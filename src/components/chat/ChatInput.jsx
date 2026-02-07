import { useState, useCallback } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

export default function ChatInput({ onSend, onTyping }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message.trim());
    setMessage('');
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    onTyping?.();
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t border-dark-border flex gap-2">
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 bg-dark-surface border border-dark-border rounded-full text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button type="submit" disabled={!message.trim()} className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-medium disabled:opacity-50 transition-colors">
        Send
      </button>
    </form>
  );
}
