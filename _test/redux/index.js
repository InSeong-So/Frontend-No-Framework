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

const reducer1 = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_MENU_SUCCESS':
    case 'SOLDOUT_MENU_SUCCESS':
      return {
        ...state,
        [action.category]: state[action.category].map(item => {
          if (item.id === action.data.id) {
            return action.data;
          }
          return item;
        }),
      };
    case 'DELETE_MENU_SUCCESS':
      return {
        ...state,
        [action.category]: action.data,
        menuCount: --state.menuCount,
      };
    case 'LOAD_MENU_FAILURE':
    case 'CREATE_MENU_FAILURE':
    case 'UPDATE_MENU_FAILURE':
    case 'SOLDOUT_MENU_FAILURE':
    default:
      return state;
  }
};
const reducer2 = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_CATEGORY':
      return {
        ...state,
        currentCategory: action.currentCategory,
        currentCategoryText: action.currentCategoryText,
        isLoading: true,
      };
    case 'LOAD_MENU_SUCCESS':
      return {
        ...state,
        [action.category]: action.data,
        menuCount: action.data.length,
        isLoading: false,
      };
    case 'CREATE_MENU_SUCCESS':
      return {
        ...state,
        [action.category]: [...state[action.category], action.data],
        menuCount: ++state.menuCount,
      };
    case 'DELETE_MENU_FAILURE':
    default:
      return state;
  }
};

function pick(obj, fn) {
  return Object.keys(obj).reduce((result, key) => {
    if (fn(obj[key])) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}

const checkForInvariant = (isValid, message, ...args) => {
  if (isValid) return;
  let argIndex = 0;
  const error = new Error(message.replace(/%s/g, () => args[argIndex++]));
  error.name = '불변성을 위반하셨습니다.';
  throw error;
};

/**
 * 객체 내의 모든 키-값 쌍에 함수를 적용합니다.
 *
 * @param {Object} target
 * @param {Function} callback
 * @returns {Object}
 */
const mapValues = (target, callback) => {
  return Object.keys(target).reduce((result, key) => {
    result[key] = callback(target[key], key);
    return result;
  }, {});
};

/**
 * 리듀서 에러 메세지를 가져옵니다.
 *
 * @param {*} key
 * @param {*} action
 * @returns
 */
const getErrorMessage = (key, action) => {
  const actionType = action && action.type;
  const actionName =
    (actionType && `"${actionType.toString()}"`) || 'an action';

  return (
    `Reducer ${key}가 ${actionName}을 처리하여 undefined를 반환했습니다. ` +
    `이 action을 무시하려면 이전 상태를 명시적으로 반환해야 합니다.`
  );
};

const combineReducers = reducers => {
  // 메서드만 선택하기 : 그 외의 것은 추가하지 않습니다.
  const finalReducers = Object.keys(reducers).reduce((result, key) => {
    if (typeof reducers[key] === 'function') {
      result[key] = reducers[key];
    }
    return result;
  }, {});

  // 불변성 체크하기 : 이상이 있다면 아래 로직은 실행되지 않습니다.
  Object.keys(finalReducers).forEach(key => {
    const reducer = finalReducers[key];
    const type = Math.random().toString(36).substring(7).split('').join('.');
    checkForInvariant(
      typeof reducer(undefined, { type }) !== 'undefined',
      `임의 형식으로 조사한 결과 Reducer ${key}가 정의되지 않은 상태로 반환되었습니다. ` +
        `정의되지 않았다면 [초기 상태]를, 알 수 없는 작업은 [현재 상태]를 반환해야 합니다. `,
    );
  });

  // 객체 내의 모든 키-값 쌍을 초기화
  const defaultState = Object.keys(finalReducers).reduce((result, key) => {
    result[key] = undefined;
    return result;
  }, {});

  // 클로저 활용
  return (state = defaultState, action) => {
    console.log(state, action);
    const finalState = mapValues(finalReducers, (reducer, key) => {
      const newState = reducer(state[key], action);
      checkForInvariant(
        typeof newState !== 'undefined',
        getErrorMessage(key, action),
      );
      return newState;
    });

    return finalState;
  };
};

const test2 = { a: 11 };
const rootReducer = combineReducers({
  reducer1,
  reducer2,
  test2,
});
