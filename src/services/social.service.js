import api from './api';

export const socialService = {
  getSuggestions: () => api.get('/social/suggestions'),
  sendRequest: (data) => api.post('/social/request', data),
  acceptRequest: (id) => api.put(`/social/request/${id}/accept`),
  rejectRequest: (id) => api.put(`/social/request/${id}/reject`),
  getFriends: () => api.get('/social/friends'),
  getRequests: () => api.get('/social/requests'),
  removeFriend: (id) => api.delete(`/social/friends/${id}`),
  createGroup: (data) => api.post('/social/groups', data),
  getGroups: (params) => api.get('/social/groups', { params }),
  getGroup: (id) => api.get(`/social/groups/${id}`),
  joinGroup: (id, data) => api.post(`/social/groups/${id}/join`, data),
  leaveGroup: (id) => api.delete(`/social/groups/${id}/leave`),
  updateGroup: (id, data) => api.put(`/social/groups/${id}`, data),
};
