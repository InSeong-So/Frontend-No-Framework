import { takeEvery, call, put, runSaga } from './src/index.js';
import counter from './src/lib/counter.js';
import createStore from './src/createStore.js';
import { getUser } from './src/lib/api.js';

const store = createStore(counter);

function* incrementSaga() {
  const user = yield call(getUser, 1);
  yield put({ type: 'INCREMENT_SUCCESS', data: user });
}

function* decrementSaga() {
  const user = yield call(getUser, 1);
  yield put({ type: 'DECREMENT_SUCCESS', data: user });
}

function* mySaga() {
  yield* takeEvery('INCREMENT_REQUEST', incrementSaga);
  yield* takeEvery('DECREMENT_REQUEST', decrementSaga);
}

runSaga(store, mySaga);

document.getElementById('increment').addEventListener('click', function () {
  store.dispatch({ type: 'INCREMENT' });
});

document.getElementById('decrement').addEventListener('click', function () {
  store.dispatch({ type: 'DECREMENT' });
});

document
  .getElementById('incrementAsync')
  .addEventListener('click', function () {
    store.dispatch({ type: 'INCREMENT_REQUEST' });
  });

document
  .getElementById('decrementAsync')
  .addEventListener('click', function () {
    store.dispatch({ type: 'DECREMENT_REQUEST' });
  });
