import api from 'global/api/api.provider';

export default {
    me: () => api.get('/me'),
    token: credentials => api.post('/token', credentials)
};
