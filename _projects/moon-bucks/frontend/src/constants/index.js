// ROUTE
export const FRONT_SERVER_URL = 'http://localhost:5510';
export const BACK_SERVER_URL = 'http://localhost:3000';
export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const PATCH = 'PATCH';
export const DELETE = 'DELETE';

// ACTIONS
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'; // 카테고리 변경 이벤트(Only View)
// Component to Dispatch
export const LOAD_MENU_REQUEST = 'LOAD_MENU_REQUEST';
export const CREATE_MENU_REQUEST = 'CREATE_MENU_REQUEST';
export const UPDATE_MENU_REQUEST = 'UPDATE_MENU_REQUEST';
export const DELETE_MENU_REQUEST = 'DELETE_MENU_REQUEST';
export const SOLDOUT_MENU_REQUEST = 'SOLDOUT_MENU_REQUEST';
// Catch Action and transport database (ASAP)
export const LOAD_MENU_SUCCESS = 'LOAD_MENU_SUCCESS';
export const CREATE_MENU_SUCCESS = 'CREATE_MENU_SUCCESS';
export const UPDATE_MENU_SUCCESS = 'UPDATE_MENU_SUCCESS';
export const DELETE_MENU_SUCCESS = 'DELETE_MENU_SUCCESS';
export const SOLDOUT_MENU_SUCCESS = 'SOLDOUT_MENU_SUCCESS';
// Catch Error
export const CREATE_MENU_FAILURE = 'CREATE_MENU_FAILURE';
export const LOAD_MENU_FAILURE = 'LOAD_MENU_FAILURE';
export const UPDATE_MENU_FAILURE = 'UPDATE_MENU_FAILURE';
export const DELETE_MENU_FAILURE = 'DELETE_MENU_FAILURE';
export const SOLDOUT_MENU_FAILURE = 'SOLDOUT_MENU_FAILURE';

// MIDDLEWARE
export const WORKING_MIDDLEWARE = true;

// UTIL
export const LOCALSTORAGE_KEY = Object.freeze([
  'espresso',
  'frappuccino',
  'blended',
  'teavana',
  'desert',
]);
export const ENTER_KEYCODE = 'Enter';
export const ESC_KEYCODE = 'Escape';
export const LIMIT_DELAY_TWO_SECOND = 2000;
