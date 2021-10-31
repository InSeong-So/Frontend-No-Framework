import { getErrorMessage, mapValues, pick } from '../utils/index.js';

const combineReducers = reducers => {
  const finalReducers = pick(reducers, val => typeof val === 'function');
  const defaultState = mapValues(finalReducers, () => undefined);
  return (state = defaultState, action) => {
    return mapValues(finalReducers, (reducer, key) => {
      const newState = reducer(state[key], action);
      if (typeof newState === 'undefined') {
        throw new Error(getErrorMessage(key, action));
      }
      return newState;
    });
  };
};

export default combineReducers;
