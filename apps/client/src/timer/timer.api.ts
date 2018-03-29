import api from 'global/api/api.provider';

import TimeEntry from 'timer/time_entry/time_entry.interface';

export default {
    active: () => api.get('/time_entries/active'),
    start: (time_entry: TimeEntry) => api.post('/time_entries', { time_entry }),
    stop: (id: number) => api.put(`/time_entries/${id}/stop`)
};
