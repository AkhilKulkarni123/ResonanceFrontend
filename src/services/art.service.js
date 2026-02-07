import api from './api';

export const artService = {
  generate: (data) => api.post('/art/generate', data),
  getByDream: (dreamId) => api.get(`/art/dream/${dreamId}`),
  getGallery: () => api.get('/art/gallery'),
};
