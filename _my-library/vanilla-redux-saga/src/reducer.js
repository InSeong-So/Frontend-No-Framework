// -------- reducers --------  --------  --------  --------
const defaultState = {};

export const reducers = {
  ['FIRST_ACTION']: (state = defaultState, action) => {
    const newState = Object.assign({}, state, action);
    return newState.payload;
  },
  ['SECOND_ACTION']: (state = defaultState, action) => {
    const newState = Object.assign({}, state, action);
    return newState.payload;
  },
  ['FETCH_SUCCESS']: (state = defaultState, action) => {
    const newState = Object.assign({}, state, action);
    return newState.payload;
  },
};

// -------- actions   --------  --------
export const myFirstAction = data => ({
  type: 'FIRST_ACTION',
  payload: data,
});

export const mySecondAction = data => ({
  type: 'SECOND_ACTION',
  payload: data,
});

export const successAction = data => ({
  type: 'FETCH_SUCCESS',
  payload: data,
});
