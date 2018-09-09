import { take, fork } from 'redux-saga/effects';

export function* takeOnce(pattern, saga) {
    const action = yield take(pattern);
    yield fork(saga, action);
}
