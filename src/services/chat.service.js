import api from './api';

export const chatService = {
  getConversations: () => api.get('/chat/conversations'),
  getDirectMessages: (userId, params) => api.get(`/chat/dm/${userId}`, { params }),
  getGroupMessages: (groupId, params) => api.get(`/chat/group/${groupId}`, { params }),
};
