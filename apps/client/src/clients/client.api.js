import api from 'global/api/api.provider';

export default {
    create: client => api.post('/clients', { client }),
    delete: id => api.delete(`/clients/${id}`),
    find: () => api.get('/clients'),
    get: id => api.get(`/clients/${id}`),
    update: client => api.put(`/clients/${client.id}`, { client })
};
