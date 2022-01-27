import { takeEvery, runSaga } from './src/index.js';
import createStore from './src/createStore.js';
import createRequestSaga from './src/createRequestSaga.js';
import counter from './src/lib/counter.js';
import { getUser } from './src/lib/api.js';

const store = createStore(counter);

const params = { id: 1 };

const increment = createRequestSaga('INCREMENT', getUser, params);
const decrement = createRequestSaga('DECREMENT', getUser, params);

function* mySaga() {
  yield* takeEvery('INCREMENT_REQUEST', increment);
  yield* takeEvery('DECREMENT_REQUEST', decrement);
}

function* useSaga() {
  yield* takeEvery('INCREMENT_REQUEST', increment);
  yield* takeEvery('DECREMENT_REQUEST', decrement);
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
