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

// TODO: This is a WIP
// const requestAction = (...args) => (constants, callback) => dispatch => {
//     dispatch({ type: constants.send });

//     try {
//         const data = await callback(...args);
//         dispatch({ type: constants.success, data });
//         return data;
//     } catch (error) {
//         dispatch({ type: constants.failed, error });
//         throw error;
//     }
// };

export const actions = {
    getAll: () => async dispatch => {
        dispatch({ type: GET_ALL.start });

        try {
            const data = await clientApi.find(GET_ALL, clientApi.find);
            dispatch({ type: GET_ALL.success, data });
        } catch (error) {
            dispatch({ type: GET_ALL.failed, error });
            throw error;
        }
    },
    create: client => async dispatch => {
        dispatch({ type: CREATE.start });

        try {
            const createdClient = await clientApi.create(client);
            dispatch({ type: CREATE.success, data: createdClient });
        } catch (error) {
            dispatch({ type: CREATE.failed, error });
            throw error;
        }
    },
    update: client => async dispatch => {
        dispatch({ type: UPDATE.start });

        try {
            const updatedClient = await clientApi.update(client);
            dispatch({ type: UPDATE.success, data: updatedClient });
        } catch (error) {
            dispatch({ type: UPDATE.failed, error });
            throw error;
        }
    },
    delete: id => async dispatch => {
        dispatch({ type: DELETE.start });

        try {
            await clientApi.delete(id);
            dispatch({ type: DELETE.success, deleted_id: id });
        } catch (error) {
            dispatch({ type: DELETE.failed, error });
            throw error;
        }
    }
};
