const applyMiddleware = (targetFunc, middlewares) => {
  const copiedMiddlewares = middlewares.slice();
  const reversedCopiedMiddlewares = copiedMiddlewares.reverse();
  let dispatch = store.dispatch;
  reversedCopiedMiddlewares.forEach(
    middleware => (dispatch = middleware(store)(dispatch)),
  );
  return Object.assign({}, store, { dispatch });
};

const store = applyMiddleware(createStore(reducer, getInitState()), [
  logger,
  addLocalStorage,
]);

const addLocalStorage = store => next => action => {
  next(action);
  localStorage.setItem('storeState', JSON.stringify(store.getState()));
};

const logger = store => next => action => {
  console.log('dipatching: ', action);
  next(action);
  console.log('next State: ', store.getState());
};

// http://daplus.net/javascript-%EC%9E%90%EB%B0%94-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C-%EC%97%AC%EB%9F%AC-%EA%B0%9C%EC%9D%98-%ED%99%94%EC%82%B4%ED%91%9C-%EA%B8%B0%EB%8A%A5%EC%9D%80-%EB%AC%B4%EC%97%87/
