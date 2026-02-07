import api from './api';

export const contextService = {
  create: (data) => api.post('/contexts', data),
  getQuestions: () => api.get('/contexts/questions'),
};
