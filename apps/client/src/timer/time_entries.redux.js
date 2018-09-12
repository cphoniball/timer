import { takeLatest } from 'redux-saga/effects';
import { takeOnce } from 'redux/sagas/effects';
import { requestConstants, requestSaga } from 'redux/helpers';

import timerApi from 'timer/timer.api';

const GET_ALL = requestConstants('timer/time_entries/GET_ALL');

// TODO: Create selectors so that we can just 'get all time entries' at the start
// and not have to maintain separate state for the active time entry
const initialState = {
    data: [],
    isFetching: false,
    hasFetched: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ALL.start:
            return { ...state, isFetching: true };
        case GET_ALL.success:
            return { ...state, isFetching: false, data: action.data };
        case GET_ALL.failed:
            return { ...state, isFetching: false };
        default:
            return state;
    }
}

export const sagas = {
    getAll: requestSaga(GET_ALL, timerApi.find)
};

export const actions = {
    getAll: () => ({ type: GET_ALL.start })
};

export function* saga() {
    yield takeOnce(GET_ALL.start, sagas.getAll);
}
