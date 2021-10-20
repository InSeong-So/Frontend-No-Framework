let currentState;
let listeners = new Map();

const applyMiddleware = (store, middlewares) => {
  const copiedMiddlewares = middlewares.slice();
  let dispatch = store.dispatch;
  copiedMiddlewares.forEach(
    middleware => (dispatch = middleware(store)(dispatch)),
  );
  return Object.assign({}, store, { dispatch });
};

const createStore = (reducer, initState) => {
  const self = this;
  currentState = initState;
  return {
    reset: () => {
      currentState = initState;
      listeners = new Map();
    },
    getState: () => {
      return currentState;
    },
    dispatch: action => {
      currentState = reducer(currentState, action);
      listeners.forEach(fn => fn());
      return action;
    },

    subscribe: listener => {
      const id = getUUID();
      listeners.set(id, listener);
      return () => {
        listeners.delete(id);
      };
    },
  };
};

const removeMenu = id => {
  return {
    type: menuActionType.REMOVE,
    payload: { id },
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case menuActionType.CAHNGE_TAB: {
      return {
        ...state,
        currentTab: action.payload.tab,
      };
    }
    case menuActionType.ADD: {
      return {
        ...state,
        menus: {
          ...state.menus,
          [state.currentTab]: state.menus[state.currentTab].concat([
            action.payload.menu,
          ]),
        },
      };
    }
    case menuActionType.SOLD_OUT:
    case menuActionType.NAME_EDIT: {
      const {
        payload: { targetId, menu },
      } = action;
      const newMenu = state.menus[state.currentTab].map(es =>
        es.id === targetId ? menu : es,
      );
      return {
        ...state,
        menus: { ...state.menus, [state.currentTab]: newMenu },
      };
    }
    case menuActionType.REMOVE: {
      const {
        payload: { id },
      } = action;
      const newMenu = state.menus[state.currentTab].filter(es => es.id !== id);
      return {
        ...state,
        menus: { ...state.menus, [state.currentTab]: newMenu },
      };
    }
    default:
      return state;
  }
};

const store = applyMiddleware(createStore(reducer, getInitState()), [
  logger,
  addLocalStorage,
]);
