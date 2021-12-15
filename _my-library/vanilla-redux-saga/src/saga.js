// -------- declare sagas + watchers + workers --------  --------  --------  --------
import { mySecondAction, successAction } from './reducer.js';

export const createEffects = store => {
  const put = action => store.dispatch(action);

  const call = promise => {
    return promise().then(data => {
      console.log(data);
    });
  };

  return { put, call };
};

export const sagas = {};
export function* takeLatest(action, generator) {
  yield (sagas[action] = generator());
}

export async function makeRequest() {
  // return Promise.resolve('API Data');
  const response = await fetch(
    'http://localhost:3000/api/category/espresso/menu',
  );
  return await parse(response);
}

async function parse(response) {
  const { status } = response;
  try {
    const data = status !== 204 ? await response.json() : null;
    return { data, status };
  } catch (error) {
    return { status };
  }
}

export function* successWorker(effects) {
  yield effects.put(mySecondAction('via-saga-two'));
}

// workers: perform requested task
export function* firstWorker(effects) {
  const data = yield effects.call(makeRequest);

  yield effects.put(successAction(data));
}

//watchers, watch actions + coordinate workers
export function* watchRunFirstSaga(effects) {
  yield* takeLatest('FIRST_ACTION', firstWorker.bind(this, effects));
}

export function* watchFetchSuccess(effects) {
  yield* takeLatest('FETCH_SUCCESS', successWorker.bind(this, effects));
}

export function* root(effects) {
  yield [watchRunFirstSaga(effects), watchFetchSuccess(effects)];
}
