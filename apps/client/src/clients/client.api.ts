import api from 'global/api/api.provider';

import Client from 'clients/client.interface';

export default {
    create: (client: Client) => api.post('/clients', { client }),
    delete: (id: number) => api.delete(`/clients/${id}`),
    find: () => api.get('/clients'),
    get: (id: number) => api.get(`/clients/${id}`),
    update: (client: Client) => api.put(`/clients/${client.id}`, { client })
};
