import { call, put } from 'redux-saga/effects';

export const requestConstants = constant => {
    return {
        start: `${constant}_START`,
        success: `${constant}_SUCCESS`,
        failed: `${constant}_FAILED`
    };
};

export const requestSaga = (actionSet, fn, getArgs) => {
    return function* (action) {
        try {
            const args = getArgs ? getArgs(action) : [];
            const data = yield call(fn, ...args);
            yield put({ type: actionSet.success, data });
        } catch (error) {
            yield put({ type: actionSet.failed, error });
        }
    }
}
