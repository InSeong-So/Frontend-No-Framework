import * as fromActions from './actions.js';

export const initialState = {
  loaded: false,
  loading: false,
  data: [{ label: '저녁 먹기', complete: false }],
};

export const reducer = (
  state = initialState,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case fromActions.ADD_TODO: {
      const todo = action.payload;
      const data = [...state.data, todo];
      return {
        ...state,
        data,
      };
    }
    case fromActions.REMOVE_TODO: {
      const data = state.data.filter(
        todo => todo.label !== action.payload.label,
      );

      return {
        ...state,
        data,
      };
    }
  }
  return state;
};
