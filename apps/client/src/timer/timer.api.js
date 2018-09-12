import api from 'global/api/api.provider';

export default {
    active: () => api.get('/time_entries/active'),
    getAll: () => api.get('/time_entries'),
    start: time_entry => api.post('/time_entries', { time_entry }),
    stop: id => api.put(`/time_entries/${id}/stop`)
};
