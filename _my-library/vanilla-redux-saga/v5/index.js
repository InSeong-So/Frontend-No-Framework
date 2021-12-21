import { takeEvery, select, call, put, runSaga } from './src/mySagaImpl.js';
import { store, selectUserId } from './src/lib/store.js';
import { getUser } from './src/lib/api.js';

function* userSaga() {
  const userId = yield select(selectUserId);
  const user = yield call(getUser, userId);
  yield put({ type: 'getUserSuccess', payload: user });
}

function* mySaga() {
  yield* takeEvery('getUser', userSaga);
}

runSaga(store, mySaga);

store.dispatch({ type: 'getUser' });
