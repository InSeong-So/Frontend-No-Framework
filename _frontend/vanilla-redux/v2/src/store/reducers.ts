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
    case 'ADD_TODO': {
      const todo = action.payload;
      const data = [...state.data, todo];
      return {
        ...state,
        data,
      };
    }
  }
  return state;
};
