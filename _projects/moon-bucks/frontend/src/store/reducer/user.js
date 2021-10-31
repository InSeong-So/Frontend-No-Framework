import { LOAD_MENU_SUCCESS, LOAD_USER_FAILURE } from '../../constants/index.js';

const initialState = {
  user: {},
  isLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MENU_SUCCESS:
      return {
        ...state,
        user: action.data,
        isLogin: true,
      };
    case LOAD_USER_FAILURE:
      return {
        ...state,
        user: {},
        isLogin: false,
      };
    default:
      return state;
  }
};
