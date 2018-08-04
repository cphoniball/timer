import api from 'global/api/api.provider';

import { Credentials } from './credentials.interface';

export default {
    me: () => api.get('/me'),
    token: (credentials: Credentials) => api.post('/token', credentials)
};
