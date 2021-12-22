import { logEffect } from './logger.js';

export const take = actionType => ({ type: 'take', actionType });
export const select = selector => ({ type: 'select', selector });
export const call = (fn, ...args) => ({ type: 'call', fn, args });
export const put = action => ({ type: 'put', action });
export const fork = (saga, ...args) => ({ type: 'fork', saga, args });

export function* takeEvery(actionType, saga) {
  yield fork(function* newSaga() {
    while (true) {
      const action = yield take(actionType);
      yield* saga(action);
    }
  });
}

export async function runSaga(store, saga, ...args) {
  const waitNextAction = actionType =>
    new Promise(resolve => store.actionsEmitter.once(actionType, resolve));

  try {
    const it = saga(...args);
    let result = it.next();
    while (!result.done) {
      const effect = result.value;
      logEffect(effect);
      switch (effect.type) {
        case 'fork': {
          runSaga(store, effect.saga, ...effect.args);
          result = it.next();
          break;
        }
        case 'take': {
          const action = await waitNextAction(effect.actionType);
          result = it.next(action);
          break;
        }
        case 'select': {
          result = it.next(effect.selector(store.state));
          break;
        }
        case 'call': {
          result = it.next(await effect.fn(...effect.args));
          break;
        }
        case 'put': {
          store.dispatch(effect.action);
          result = it.next();
          break;
        }
        default:
          throw new Error(`Invalid effect type: ${effect.type}`);
      }
    }
  } catch (err) {
    console.error('Uncaught in runSaga', err);
  }
}
