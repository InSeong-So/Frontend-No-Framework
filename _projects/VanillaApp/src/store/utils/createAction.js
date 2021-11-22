const createAction = (type, payloadCreator) => {
  const isNull = value => value === null || value === undefined;

  const finalPayloadCreator = isNull(payloadCreator)
    ? value => value
    : (head, ...args) =>
        head instanceof Error ? head : payloadCreator(head, ...args);

  const actionCreator = (...args) => {
    const payload = finalPayloadCreator(...args);
    const action = { type, error: false, payload: null };

    if (payload instanceof Error) {
      action.error = true;
    }

    if (payload !== undefined) {
      action.payload = payload;
    }

    return action;
  };

  actionCreator.toString = () => type.toString();

  return actionCreator;
};

export default createAction;
