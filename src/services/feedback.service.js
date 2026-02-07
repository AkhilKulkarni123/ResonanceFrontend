import api from './api';

export const feedbackService = {
  create: (data) => api.post('/feedback', data),
  getByDream: (dreamId) => api.get(`/feedback/dream/${dreamId}`),
  getHistory: () => api.get('/feedback/history'),
};
