/**
 * Redux: 에러 메세지
 *
 * @param {*} key
 * @param {*} action
 * @returns
 */
export const getErrorMessage = (key, action) => {
  const actionType = action && action.type;
  const actionName =
    (actionType && `"${actionType.toString()}"`) || 'an action';
  return (
    `Reducer "${key}" returned undefined handling ${actionName}. ` +
    `To ignore an action, you must explicitly return the previous state.`
  );
};

/**
 * Redux: 객체 내의 모든 키-값 쌍에 콜백 함수 적용
 *
 * @param {Object} obj
 * @param {Function} callback
 * @returns
 */
export const mapValues = (obj, callback) => {
  return Object.keys(obj).reduce((result, key) => {
    result[key] = callback(obj[key], key);
    return result;
  }, {});
};

/**
 * Redux: 객체에서 콜백 함수의 조건에 충족하는 키-값 쌍 선택
 *
 * @param {Object} obj
 * @param {Function} callback
 * @returns
 */
export const pick = (obj, callback) => {
  return Object.keys(obj).reduce((result, key) => {
    if (callback(obj[key])) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};
