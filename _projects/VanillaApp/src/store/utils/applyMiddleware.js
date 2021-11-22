const compose = (...funcs) => {
  return funcs.reduceRight((composed, f) => f(composed));
};

const applyMiddleware = (...middlewares) => {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    const { getState: storeGetState, dispatch: storeDispatch } = store;
    const middlewareAPI = {
      getState: storeGetState,
      dispatch: action => storeDispatch(action),
    };
    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    const dispatch = compose(...chain, store.dispatch);

    return {
      ...store,
      dispatch,
    };
  };
};

export default applyMiddleware;
