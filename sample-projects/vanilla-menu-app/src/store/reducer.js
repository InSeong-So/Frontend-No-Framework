import {
  CHANGE_CATEGORY,
  CREATE_MENU_SUCCESS,
  LOAD_MENU_SUCCESS,
  UPDATE_MENU_SUCCESS,
  DELETE_MENU_SUCCESS,
  SOLDOUT_MENU_SUCCESS,
  LOAD_MENU_FAILURE,
  CREATE_MENU_FAILURE,
  UPDATE_MENU_FAILURE,
  DELETE_MENU_FAILURE,
  SOLDOUT_MENU_FAILURE,
} from '../constants/index.js';

const initialState = {
  espresso: [],
  frappuccino: [],
  blended: [],
  teavana: [],
  desert: [],
  currentCategory: 'espresso',
  currentCategoryText: '☕ 에스프레소',
  menuCount: 0,
  isLoading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
        currentCategoryText: action.currentCategoryText,
        isLoading: true,
      };
    case LOAD_MENU_SUCCESS:
      return {
        ...state,
        [action.category]: action.data,
        menuCount: action.data.length,
        isLoading: false,
      };
    case CREATE_MENU_SUCCESS:
      return {
        ...state,
        [action.category]: [...state[action.category], action.data],
        menuCount: ++state.menuCount,
      };
    case UPDATE_MENU_SUCCESS:
    case SOLDOUT_MENU_SUCCESS:
      return {
        ...state,
        [action.category]: state[action.category].map(item => {
          if (item.id === action.data.id) {
            return action.data;
          }
          return item;
        }),
      };
    case DELETE_MENU_SUCCESS:
      return {
        ...state,
        [action.category]: action.data,
        menuCount: --state.menuCount,
      };
    case LOAD_MENU_FAILURE:
    case CREATE_MENU_FAILURE:
    case UPDATE_MENU_FAILURE:
    case SOLDOUT_MENU_FAILURE:
    case DELETE_MENU_FAILURE:
    default:
      return state;
  }
};

export default reducer;
