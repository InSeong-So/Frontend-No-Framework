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
 * @param {Object} obj The source object.
 * @param {Function} fn The mapper function taht receives the value and the key.
 * @returns {Object} A new object that contains the mapped values for the keys.
 */
function mapValues(obj, fn) {
  return Object.keys(obj).reduce((result, key) => {
    result[key] = fn(obj[key], key);
    return result;
  }, {});
}

function getErrorMessage(key, action) {
  const actionType = action && action.type;
  const actionName =
    (actionType && `"${actionType.toString()}"`) || 'an action';

  return (
    `Reducer "${key}" returned undefined handling ${actionName}. ` +
    `To ignore an action, you must explicitly return the previous state.`
  );
}

var printWarning = function printWarning(format, args) {
  var len = arguments.length;
  args = new Array(len > 1 ? len - 1 : 0);
  for (var key = 1; key < len; key++) {
    args[key - 1] = arguments[key];
  }
  var argIndex = 0;
  var message =
    'Warning: ' +
    format.replace(/%s/g, function () {
      return args[argIndex++];
    });
  if (typeof console !== 'undefined') {
    console.error(message);
  }
  try {
    // --- Welcome to debugging React ---
    // This error was thrown as a convenience so that you can use this stack
    // to find the callsite that caused this warning to fire.
    throw new Error(message);
  } catch (x) {
    console.log(x);
  }
};

function warning(condition, format, args) {
  var len = arguments.length;
  args = new Array(len > 2 ? len - 2 : 0);
  for (var key = 2; key < len; key++) {
    args[key - 2] = arguments[key];
  }
  if (format === undefined) {
    throw new Error(
      '`warning(condition, format, ...args)` requires a warning ' +
        'message argument',
    );
  }
  if (!condition) {
    printWarning.apply(null, [format].concat(args));
  }
}

var fnToString = fn => Function.prototype.toString.call(fn);

function isPlainObject(obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  var proto =
    typeof obj.constructor === 'function'
      ? Object.getPrototypeOf(obj)
      : Object.prototype;

  if (proto === null) {
    return true;
  }

  var constructor = proto.constructor;

  return (
    typeof constructor === 'function' &&
    constructor instanceof constructor &&
    fnToString(constructor) === fnToString(Object)
  );
}

function verifyStateShape(initialState, currentState) {
  var reducerKeys = Object.keys(currentState);

  if (reducerKeys.length === 0) {
    warning(
      false,
      'Store does not have a valid reducer. Make sure the argument passed ' +
        'to combineReducers is an object whose values are reducers.',
    );
    return;
  }

  if (!isPlainObject(initialState)) {
    warning(
      false,
      'initialState has unexpected type of "' +
        {}.toString.call(initialState).match(/\s([a-z|A-Z]+)/)[1] +
        '". Expected initialState to be an object with the following ' +
        `keys: "${reducerKeys.join('", "')}"`,
    );
    return;
  }

  var unexpectedKeys = Object.keys(initialState).filter(
    key => reducerKeys.indexOf(key) < 0,
  );

  warning(
    unexpectedKeys.length === 0,
    `Unexpected ${unexpectedKeys.length > 1 ? 'keys' : 'key'} ` +
      `"${unexpectedKeys.join('", "')}" in initialState will be ignored. ` +
      `Expected to find one of the known reducer keys instead: "${reducerKeys.join(
        '", "',
      )}"`,
  );
}

function combineReducers(reducers) {
  // 메서드만 선택하기 : 그 외의 것은 추가하지 않는다.
  const finalReducers = pick(reducers, val => typeof val === 'function');

  // 불변성 체크하기 : 이상이 있다면 아래 로직은 실행되지 않는다.
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
  return function combination(state = defaultState, action) {
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
}

const test2 = { a: 11 };
combineReducers({
  reducer1,
  reducer2,
  test2,
});
