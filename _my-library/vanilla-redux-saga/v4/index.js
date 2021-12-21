export const logEffect = effect => {
  let effectInfo;
  switch (effect.type) {
    case 'fork':
      effectInfo = effect.saga.name;
      break;
    case 'take':
      effectInfo = effect.actionType;
      break;
    case 'select':
      effectInfo = effect.selector.name;
      break;
    case 'call':
      effectInfo = effect.fn.name;
      break;
    case 'put':
      effectInfo = `${effect.action.type} ${JSON.stringify(
        effect.action.payload,
      )}`;
      break;
    default:
      break;
  }
  console.log(
    `%ceffect: %c${effect.type}%c ${effectInfo}`,
    'color: gray',
    'color: green; font-weight: bold',
    'color: salmon; font-weight: bold',
  );
};

export const logAction = (action, newState) => {
  console.log(
    `%caction: %c${action.type}%c ${
      action.payload ? JSON.stringify(action.payload) : ''
    }%c\nnew state:%c ${JSON.stringify(newState)}`,
    'color: gray',
    'color: orange; font-weight: bold',
    'color: salmon; font-weight: bold',
    'color: gray',
    'color: skyblue; font-weight: bold',
  );
};

const initialState = { userId: 1 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'getUserSuccess':
      return { ...state, name: action.payload };
    default:
      return state;
  }
};

export const createStore = reducer => ({
  state: reducer(undefined, 'redux-init'),
  dispatch(action) {
    this.state = reducer(this.state, action);
    logAction(action, this.state);
  },
});

export const take = actionType => ({ type: 'take', actionType });
export const select = selector => ({ type: 'select', selector });
export const call = (fn, ...args) => ({ type: 'call', fn, args });
export const put = action => ({ type: 'put', action });
export const fork = (saga, ...args) => ({ type: 'fork', saga, args });

const store = createStore(reducer);
export async function runSaga(store, saga, ...args) {
  try {
    const it = saga(...args);

    let result = it.next();
    while (!result.done) {
      const effect = result.value;
      // See `logEffect` function in src/logger.js
      // at https://codesandbox.io/embed/thirsty-glade-0g196.
      logEffect(effect);

      switch (effect.type) {
        case 'call':
          result = it.next(await effect.fn(...effect.args));
          break;
        case 'select':
          result = it.next(effect.selector(store.state));
          break;

        case 'put':
          store.dispatch(effect.action);
          result = it.next();
          break;
        default:
          throw new Error(`Invalid effect type: ${effect.type}`);
      }
    }
  } catch (err) {
    console.error('Uncaught in runSaga', err);
  }
}

export const getUser = async id => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const response = await res.json();
  return { id: response.id, name: response.name };
};

function* mySaga() {
  const userId = yield select(state => state.userId);
  const user = yield call(getUser, userId);
  yield put({ type: 'getUserSuccess', payload: user });
}

// I created a basic store, you can find it in src/samples/store.js
// at https://codesandbox.io/embed/thirsty-glade-0g196.
runSaga(store, mySaga);
