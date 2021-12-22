const initialState = {
  number: 0,
};

const counter = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
    case 'INCREMENT_SUCCESS':
      return { ...state, number: state.number + 1 };
    case 'DECREMENT':
    case 'DECREMENT_SUCCESS':
      return { ...state, number: state.number - 1 };
    default:
      return state;
  }
};

export default counter;
