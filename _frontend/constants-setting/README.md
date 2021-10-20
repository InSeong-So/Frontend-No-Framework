# 상수(Constant) 정의
> 이런 형태를 고수하도록 한다.

`.env`를 사용하지 못하는 상황이라면 상수 파일을 최대한 쪼개거나 적절한 암호 처리가 필요하다.

```js
// [API & ROUTE]
export const FRONT_SERVER_URL = 'http://localhost:5510';
export const BACK_SERVER_URL = 'http://localhost:3000';

// [ACTIONS]
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'; // 카테고리 변경 이벤트(Only View)
// 서버 요청
export const LOAD_MENU_REQUEST = 'LOAD_MENU_REQUEST';
export const CREATE_MENU_REQUEST = 'CREATE_MENU_REQUEST';
export const UPDATE_MENU_REQUEST = 'UPDATE_MENU_REQUEST';
export const DELETE_MENU_REQUEST = 'DELETE_MENU_REQUEST';
export const SOLDOUT_MENU_REQUEST = 'SOLDOUT_MENU_REQUEST';
// 서버 응답이 성공일 때
export const LOAD_MENU_SUCCESS = 'LOAD_MENU_SUCCESS';
export const CREATE_MENU_SUCCESS = 'CREATE_MENU_SUCCESS';
export const UPDATE_MENU_SUCCESS = 'UPDATE_MENU_SUCCESS';
export const DELETE_MENU_SUCCESS = 'DELETE_MENU_SUCCESS';
export const SOLDOUT_MENU_SUCCESS = 'SOLDOUT_MENU_SUCCESS';
// 서버 응답이 실패일 때
export const CREATE_MENU_FAILURE = 'CREATE_MENU_FAILURE';
export const LOAD_MENU_FAILURE = 'LOAD_MENU_FAILURE';
export const UPDATE_MENU_FAILURE = 'UPDATE_MENU_FAILURE';
export const DELETE_MENU_FAILURE = 'DELETE_MENU_FAILURE';
export const SOLDOUT_MENU_FAILURE = 'SOLDOUT_MENU_FAILURE';

// [MIDDLEWARE]
export const WORKING_MIDDLEWARE = true;

// [UTIL] : 객체는 반드시 동결시켜서 참조값이 변경될 수 없게 만든다.
export const LOCALSTORAGE_KEY = Object.freeze([
  'espresso',
  'frappuccino',
  'blended',
  'teavana',
  'desert',
]);

// [DOM, EVENTS]
export const ENTER_KEYCODE = 'Enter';
export const ESC_KEYCODE = 'Escape';

```