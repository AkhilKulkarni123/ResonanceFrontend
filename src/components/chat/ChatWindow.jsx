import { useState, useEffect, useRef } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { useAuth } from '../../hooks/useAuth';
import { chatService } from '../../services/chat.service';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import Loader from '../common/Loader';

export default function ChatWindow({ partnerId, groupId }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);
  const { socket, sendDM, sendGroupMessage, emitTyping } = useSocket();
  const { user } = useAuth();
  const bottomRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = partnerId
          ? await chatService.getDirectMessages(partnerId)
          : await chatService.getGroupMessages(groupId);
        setMessages(res.data.messages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [partnerId, groupId]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg) => {
      if (partnerId && (msg.sender_id === partnerId || msg.receiver_id === partnerId)) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    const handleGroupMessage = (msg) => {
      if (groupId && msg.dream_group_id === groupId) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    const handleTyping = ({ userId }) => {
      if (userId !== user?.id) {
        setTyping(true);
        setTimeout(() => setTyping(false), 2000);
      }
    };

    socket.on('new_message', handleNewMessage);
    socket.on('message_sent', handleNewMessage);
    socket.on('new_group_message', handleGroupMessage);
    socket.on('user_typing', handleTyping);

    return () => {
      socket.off('new_message', handleNewMessage);
      socket.off('message_sent', handleNewMessage);
      socket.off('new_group_message', handleGroupMessage);
      socket.off('user_typing', handleTyping);
    };
  }, [socket, partnerId, groupId, user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (content) => {
    if (partnerId) sendDM(partnerId, content);
    else if (groupId) sendGroupMessage(groupId, content);
  };

  const handleTypingEmit = () => {
    emitTyping(partnerId ? { receiverId: partnerId } : { groupId });
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && <p className="text-center text-gray-500 py-8">No messages yet. Say hello!</p>}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} isOwn={msg.sender_id === user?.id} />
        ))}
        {typing && <p className="text-xs text-gray-500 italic">typing...</p>}
        <div ref={bottomRef} />
      </div>
      <ChatInput onSend={handleSend} onTyping={handleTypingEmit} />
    </div>
  );
}
