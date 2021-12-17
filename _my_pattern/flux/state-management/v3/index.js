import { createStore, createAction } from './redux.js';

const ACTION_INIT = 'INIT';
const ACTION_INCR = 'INCREAMENT';
const ACTION_DECR = 'DECREAMENT';

function reducer(state = {}, { type, payload }) {
  switch (type) {
    case ACTION_INIT:
      return {
        ...state,
        count: payload.count || 0,
      };
    case ACTION_INCR:
      return {
        ...state,
        count: state.count + 1 || 0,
      };
    case ACTION_DECR:
      return {
        ...state,
        count: state.count - 1 || 0,
      };
    default:
      return { ...state };
  }
}

const store = createStore(reducer);
store.subscribe(() => {
  console.log(store.getState());
});

const reset = (count = 0) =>
  store.dispatch(createAction(ACTION_INIT, { count }));
const increament = () => store.dispatch(createAction(ACTION_INCR));
const decreament = () => store.dispatch(createAction(ACTION_DECR));

increament();
increament();
increament();
decreament();
reset();
reset(100);
increament();
decreament();
