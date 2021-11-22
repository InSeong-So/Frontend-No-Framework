import utils from '../utils/index.js';

const createStore = async (reducer, middleware) => {
  const state = await observable(reducer()());

  const dispatch = async action => {
    const newState = await reducer(state)(action);
    // 미들웨어
    if (typeof middleware === 'function') await middleware(action, newState);
    for (const [key, value] of await Object.entries(newState)) {
      if (state[key] === value) continue;
      state[key] = value;
    }
  };

  const publish = callback => {
    state.publish(callback);
  };

  const getState = () => {
    return utils.deepClone(state);
  };

  return await { dispatch, publish, getState };
};

export default createStore;

const observable = async state => {
  let handlers = {};

  const watchState = new Proxy(utils.deepClone(await state), {
    set: (target, name, value) => {
      if (target[name] && utils.isEqualsObject(target[name], value))
        return true;
      target[name] = value;
      if (utils.isCorrectType(value, 'function')) return true;
      Object.keys(handlers).forEach(_key => {
        handlers[_key](utils.deepCloneAndFreeze(watchState));
      });
      return true;
    },
  });

  watchState.publish = callback => {
    Object.keys(callback).forEach(_key => {
      handlers[_key] = utils.debounce(callback[_key]);
      callback[_key](utils.deepCloneAndFreeze(watchState));
    });
  };

  watchState.clear = () => {
    handlers = {};
  };

  return watchState;
};
