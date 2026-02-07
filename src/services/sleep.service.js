import api from './api';

export const sleepService = {
  create: (data) => api.post('/sleep', data),
  getAll: (params) => api.get('/sleep', { params }),
  update: (id, data) => api.put(`/sleep/${id}`, data),
  delete: (id) => api.delete(`/sleep/${id}`),
};
