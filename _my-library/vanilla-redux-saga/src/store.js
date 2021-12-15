// -------- declaration of Store   --------  --------

export const runUntilDone = iterator => {
  if (!iterator.next().done) {
    runUntilDone(iterator);
  }
};

export function createStore(reducers, sagas) {
  let currentSubscribers = [];

  const dispatch = action => {
    if (sagas[action.type]) runUntilDone(sagas[action.type]);

    currentSubscribers.forEach(listener =>
      listener(reducers[action.type]({}, action)),
    );
  };

  const subscribe = subscriber =>
    (currentSubscribers = [...currentSubscribers, subscriber]);

  return { dispatch, subscribe };
}
