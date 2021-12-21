const initialState = {
  userId: 1,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'getUserSuccess':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
