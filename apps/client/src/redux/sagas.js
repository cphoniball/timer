import { all, fork } from 'redux-saga/effects';

import { saga as clientSaga } from 'clients/clients.redux';
import { saga as timeEntriesSaga } from 'timer/time_entries.redux';

export default function* rootSaga() {
    yield all([
        fork(clientSaga),
        fork(timeEntriesSaga)
    ]);
};
