import util from './utils.js';

const createStore = reducer => {
  const state = observable(reducer());

  const dispatch = action => {
    const newState = reducer(state, action);
    for (const [key, value] of Object.entries(newState)) {
      if (state[key] === value) continue;
      state[key] = value;
    }
  };

  const subscribe = listener => {
    state.subscribe(listener);
  };

  const getState = () => {
    return util.deepClone(state);
  };

  return { dispatch, subscribe, getState };
};

export default createStore;

const observable = (initialState, applyDebounce = true) => {
  let observers = [];
  const state = new Proxy(util.deepClone(initialState), {
    set: (target, name, value) => {
      if (target[name] && util.isEqualsObject(target[name], value)) return true;
      target[name] = value;
      if (util.isCorrectType(value, 'function')) return true;
      state.notifyAll();
      return true;
    },
  });
  state.subscribe = listener => {
    observers.push(applyDebounce ? util.debounce(listener) : listener);
    return () => {
      observers = observers.filter(observer => observer !== listener);
    };
  };
  state.notifyAll = () => {
    observers.forEach(observer => {
      observer(util.deepClone(state));
    });
  };
  return state;
};
