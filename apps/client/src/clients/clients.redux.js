import { takeLatest } from 'redux-saga/effects';
import { takeOnce } from 'redux/sagas/effects';
import { requestConstants, requestSaga } from 'redux/helpers';

import clientApi from './client.api';

const GET_ALL = requestConstants('timer/clients/GET_ALL');
const CREATE = requestConstants('timer/clients/CREATE');
const DELETE = requestConstants('timer/clients/DELETE');
const UPDATE = requestConstants('timer/clients/UPDATE');

const initialState = {
    data: [],
    isFetching: false,
    hasFetched: false
};

// TODO: Decompose array state updates into separate reducer
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ALL.start:
        case CREATE.start:
        case DELETE.start:
        case UPDATE.start:
            return { ...state, isFetching: true };
        case GET_ALL.failed:
        case CREATE.failed:
        case DELETE.failed:
        case UPDATE.failed:
                return { ...state, isFetching: false };
        case GET_ALL.success:
            return { ...state, isFetching: false, data: action.data };
        case CREATE.success:
            return { ...state, isFetching: false, data: [...state.data, action.data] };
        case UPDATE.success:
            return { ...state, isFetching: false, data: state.data.map(client => client.id === action.data.id ? action.data : client) };
        case DELETE.success:
            return { ...state, isFetching: false, data: state.data.filter(client => client.id !== action.data.id) };
        default:
            return state;
    }
}

export const sagas = {
    getAll: requestSaga(GET_ALL, clientApi.find),
    create: requestSaga(CREATE, clientApi.create, action => [action.client]),
    update: requestSaga(UPDATE, clientApi.update, action => [action.client]),
    delete: requestSaga(DELETE, clientApi.delete, action => [action.id])
};

export const actions = {
    getAll: () => ({ type: GET_ALL.start }),
    create: client => ({ type: CREATE.start, client }),
    update: client => ({ type: UPDATE.start, client }),
    delete: id => ({ type: DELETE.start, id })
};

export function* saga() {
    yield takeOnce(GET_ALL.start, sagas.getAll);
    yield takeLatest(CREATE.start, sagas.create);
    yield takeLatest(UPDATE.start, sagas.update);
    yield takeLatest(DELETE.start, sagas.delete);
}
