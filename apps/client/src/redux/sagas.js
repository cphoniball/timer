import { all, fork } from 'redux-saga/effects';

import { saga as clientSaga } from 'clients/clients.redux';

export default function* rootSaga() {
    yield all([
        fork(clientSaga)
    ]);
};
