import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import clientApi from './client.api';

const requestConstants = constant => {
    return {
        start: `${constant}_START`,
        success: `${constant}_SUCCESS`,
        failed: `${constant}_FAILED`
    };
};

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
            return { ...state, isFetching: false, data: state.data.filter(client => client.id !== action.deleted_id) };
        default:
            return state;
    }
}

export const sagas = {
    getAll: function* () {
        try {
            const clients = yield call(clientApi.find);
            yield put({ type: GET_ALL.success, data: clients });
        } catch (error) {
            yield put({ type: GET_ALL.failed, error });
        }
    },
    create: function* (action) {
        try {
            const createdClient = yield call(clientApi.create, action.client);
            yield put({ type: CREATE.success, data: createdClient });
        } catch (error) {
            yield put({ type: CREATE.failed, error });
        }
    },
    update: function* (action) {
        try {
            const updatedClient = yield call(clientApi.update, action.client);
            yield put({ type: UPDATE.success, data: updatedClient });
        } catch (error) {
            yield put({ type: UPDATE.failed, error });
        }
    },
    delete: function* (action) {
        try {
            yield call(clientApi.delete, action.id);
            yield put({ type: DELETE.success, deleted_id: action.id });
        } catch (error) {
            yield put({ type: DELETE.failed, error });
        }
    }
};

export const actions = {
    getAll: () => ({ type: GET_ALL.start }),
    create: client => ({ type: CREATE.start, client }),
    update: client => ({ type: UPDATE.start, client }),
    delete: id => ({ type: DELETE.start, id })
};

export function* saga() {
    yield takeEvery(GET_ALL.start, sagas.getAll);
    yield takeEvery(CREATE.start, sagas.create);
    yield takeEvery(UPDATE.start, sagas.update);
    yield takeEvery(DELETE.start, sagas.delete);
}
