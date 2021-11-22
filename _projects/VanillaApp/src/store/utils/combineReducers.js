import { checkForInvariant } from '../../utils/index.js';

/**
 * 객체 내의 모든 키-값 쌍에 함수를 적용합니다.
 *
 * @param {Object} target
 * @param {Function} callback
 * @returns {Object}
 */
const setCallback = (target, callback) => {
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
  const filteredReducers = Object.keys(reducers).reduce((filtered, key) => {
    if (typeof reducers[key] === 'function') {
      filtered[key] = reducers[key];
    }
    return filtered;
  }, {});

  // 불변성 체크하기 : 이상이 있다면 아래 로직은 실행되지 않습니다.
  Object.keys(filteredReducers).forEach(key => {
    const reducer = filteredReducers[key];
    const type = `@@SIS/INIT`;
    checkForInvariant(
      typeof reducer(undefined, { type }) !== 'undefined',
      `임의 형식으로 조사한 결과 Reducer ${key}가 undefined를 반환하였습니다. ` +
        `정의되지 않았다면 [초기 상태]를, 알 수 없는 작업은 [현재 상태]를 반환해야 합니다. `,
    );
  });

  // 객체 내의 모든 키-값 쌍을 초기화
  const defaultState = Object.keys(filteredReducers).reduce((result, key) => {
    result[key] = undefined;
    return result;
  }, {});

  // 클로저 활용
  return (state = defaultState, action) => {
    const callback = (reducer, key) => {
      const newState = reducer(state[key], action);
      checkForInvariant(
        typeof newState !== 'undefined',
        getErrorMessage(key, action),
      );
      return newState;
    };
    const finalState = setCallback(filteredReducers, callback);

    return finalState;
  };
};

export default combineReducers;
