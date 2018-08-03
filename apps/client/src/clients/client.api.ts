import api from 'global/api/api.provider';

import Client from 'clients/client.interface';

export default {
    create: (client: Client): Promise<Client> => api.post('/clients', { client }),
    delete: (id: number) => api.delete(`/clients/${id}`),
    find: (): Promise<Client[]> => api.get('/clients'),
    get: (id: number): Promise<Client> => api.get(`/clients/${id}`),
    update: (client: Client): Promise<Client> => api.put(`/clients/${client.id}`, { client })
};
