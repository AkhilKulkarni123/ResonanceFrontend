import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(new Set());

  useEffect(() => {
    if (!isAuthenticated) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const token = localStorage.getItem('resonance_token');
    const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001', {
      auth: { token },
    });

    newSocket.on('connect', () => {
      console.log('Socket connected');
    });

    newSocket.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [isAuthenticated]);

  const sendDM = useCallback((receiverId, content) => {
    if (socket) socket.emit('dm', { receiverId, content });
  }, [socket]);

  const sendGroupMessage = useCallback((groupId, content) => {
    if (socket) socket.emit('group_message', { groupId, content });
  }, [socket]);

  const joinGroup = useCallback((groupId) => {
    if (socket) socket.emit('join_group', groupId);
  }, [socket]);

  const leaveGroup = useCallback((groupId) => {
    if (socket) socket.emit('leave_group', groupId);
  }, [socket]);

  const emitTyping = useCallback((data) => {
    if (socket) socket.emit('typing', data);
  }, [socket]);

  return (
    <SocketContext.Provider value={{
      socket,
      onlineUsers,
      sendDM,
      sendGroupMessage,
      joinGroup,
      leaveGroup,
      emitTyping,
    }}>
      {children}
    </SocketContext.Provider>
  );
}
