import { takeEvery } from 'redux-saga/effects';
import { takeOnce } from 'redux/sagas/effects';
import { requestConstants, requestSaga } from 'redux/helpers';
import _ from 'lodash';

import timerApi from 'timer/timer.api';

const GET_ALL = requestConstants('timer/time_entries/GET_ALL');
const START = requestConstants('timer/time_entries/START');
const STOP = requestConstants('timer/time_entries/STOP');
const INSERT = 'timer/time_entries/INSERT';
const UPDATE = 'timer/time_entries/UPDATE';

const initialTimeEntry = {
    description: '',
    ended_at: null,
    id: 'unsaved-time-entry',
    started_at: null,
    user: { id: 1, name: 'testuser', email: 'testing@test.com' }
};

const initialState = {
    data: [initialTimeEntry],
    isFetching: false,
    hasFetched: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        // TODO: Seems super inefficient to be mapping through all the entries, find a better way to do this.
        // Maybe we can put the time entries into a map to find them by ID instead of having them in an array.
        // "key by ID" could then be turned into a helper function and reused across all redux states
        case UPDATE:
            return { ...state, data: state.data.map(entry => entry.id === action.time_entry.id ? action.time_entry : entry) };
        case GET_ALL.start:
            return { ...state, isFetching: true };
        case GET_ALL.success:
            return { ...state, isFetching: false, data: [initialTimeEntry, ...action.data] };
        case GET_ALL.failed:
            return { ...state, isFetching: false };
        case INSERT:
            return { ...state, data: _.uniqBy([action.time_entry, ...state.data], 'id') };
        case START.success:
            return { ...state, data: [...state.data.filter(entry => entry.id !== 'unsaved-time-entry'), action.data] };
        case STOP.success:
            return { ...state, data: [...state.data.map(timeEntry => timeEntry.id === action.data.id ? action.data : timeEntry), initialTimeEntry] };
        default:
            return state;
    }
}

export const sagas = {
    getAll: requestSaga(GET_ALL, timerApi.find),
    start: requestSaga(START, timerApi.start, action => [action.time_entry]),
    stop: requestSaga(STOP, timerApi.stop, action => [action.id])
};

export const actions = {
    getAll: () => ({ type: GET_ALL.start }),
    insert: time_entry => ({ type: INSERT, time_entry }),
    start: time_entry => ({ type: START.start, time_entry }),
    stop: id => ({ type: STOP.start, id }),
    update: time_entry => ({ type: UPDATE, time_entry })
};

export function* saga() {
    yield takeOnce(GET_ALL.start, sagas.getAll);
    yield takeEvery(START.start, sagas.start);
    yield takeEvery(STOP.start, sagas.stop);
}

export const selectors = {
    getActiveTimeEntry: entries => {
        const activeEntries = entries.filter(entry => entry.started_at && !entry.ended_at);

        return activeEntries.length ? activeEntries[0] : (entries.find(entry => entry.id === 'unsaved-time-entry') || initialTimeEntry);
    },
    finishedTimeEntries: entries => {
        return entries.filter(entry => (entry.id !== 'unsaved-time-entry') && entry.ended_at);
    }
};
