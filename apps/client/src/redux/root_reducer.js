import { combineReducers } from 'redux';

import clients from 'clients/clients.redux';
import time_entries from 'timer/time_entries.redux';

export default combineReducers({
    clients,
    time_entries
});
