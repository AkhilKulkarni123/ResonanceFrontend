import api from './api';

export const dreamService = {
  upload: (formData) => api.post('/dreams/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  create: (data) => api.post('/dreams', data),
  getAll: (params) => api.get('/dreams', { params }),
  getOne: (id) => api.get(`/dreams/${id}`),
  update: (id, data) => api.put(`/dreams/${id}`, data),
  delete: (id) => api.delete(`/dreams/${id}`),
  getFeatured: () => api.get('/dreams/featured'),
};
