import {
  DIVIDE_CHARGING,
  MINIMUN_CHARGING,
  ZERO,
  ADDITIONAL_CONDITION,
  EMPTY,
} from '../constants/index.js';
import { $showAlert } from './dom.js';

const { PRICE_INPUT, CHARGE_INPUT } = ADDITIONAL_CONDITION;

/**
 * 값이 null인지 검사합니다.
 *
 * @param {string|number} value
 * @returns {boolean}
 */
export const isNull = value => value === null || value === undefined;

/**
 * 첫 번째 인자와 두 번째 인자의 값이 같은지 검사합니다.
 *
 * @param {string|number} value
 * @param {string|number} target
 * @returns {boolean}
 */
export const isEquals = (value, target) => value === target;

/**
 * 값이 비어있는지 검사합니다.
 *
 * @param {Array|number|string} value
 * @returns {boolean}
 */
export const isEmpty = value => {
  if (isNull(value)) return true;
  if (value instanceof Array) return value.length < 1 || value === [];
  if (typeof value === 'number') return value === ZERO;
  return value === EMPTY;
};

/**
 * 배열에 값이 포함 되어 있는지 검사합니다.
 *
 * @param {number|string} value
 * @param {any[]} items
 * @returns {boolean}
 */
export const isIncludes = (value, items) => items.includes(value);

/**
 * 양의 정수인지 검사합니다.
 * 1. 값이 0일 수 없습니다.
 * 2. 값이 음수일 수 없습니다.
 * 3. 값이 소수일 수 없습니다.
 *
 * @param {number|string} target
 * @returns {number | ''}
 */
export const isPositiveInteger = (target, description) => {
  const parsed = +target;
  if (isEquals(parsed, ZERO)) return $showAlert('zeroError', description);
  if (parsed < ZERO) return $showAlert('negativeError', description);
  if (!isEquals(Number.isInteger(parsed), true)) return $showAlert('decimalError', description);
  return parsed;
};

/**
 * 중복 여부를 검사합니다.
 *
 * @param {string} value
 * @param {any[]} items
 * @returns {boolean}
 */
const isDuplicate = (value, items) => !isNull(items.find(({ name }) => name === value));

/**
 * 최소 값을 검사합니다.
 *
 * @param {number} number
 * @param {string} placeholder
 * @returns {number}
 */
const checkedMinimum = (number, placeholder) => {
  if (!isEquals(placeholder, PRICE_INPUT)) return number;
  if (number < MINIMUN_CHARGING) return $showAlert('minimumError', placeholder);

  return number;
};

/**
 * 나누기 값을 검사합니다.
 *
 * @param {number} number
 * @param {string} placeholder
 * @returns {number}
 */
const checkedDivisble = (number, placeholder) => {
  if (!isIncludes(placeholder, [PRICE_INPUT, CHARGE_INPUT])) return number;
  if (!isEquals(number % DIVIDE_CHARGING, ZERO)) return $showAlert('InDivisibleError', placeholder);

  return number;
};

/**
 * 숫자형에 대한 유효성을 검사합니다.
 *
 * @param {number} value
 * @param {string} placeholder
 * @returns {number}
 */
const numbersValidate = (value, placeholder) => {
  const parsed = isPositiveInteger(value, placeholder);
  if (isEmpty(parsed)) return EMPTY;
  if (isEmpty(checkedMinimum(parsed, placeholder))) return EMPTY;
  if (isEmpty(checkedDivisble(parsed, placeholder))) return EMPTY;
  return parsed;
};

/**
 * 모든 입력에 대한 유효성을 검사합니다.
 *
 * @param {object} param
 * @param {any[]} items
 * @returns {boolean}
 */
export const isValidate = ({ type, placeholder, value }, items = []) => {
  if (type === 'number') return numbersValidate(value, placeholder);
  const trimedValue = value.trim();
  if (isEmpty(trimedValue)) return $showAlert('notDefined', placeholder);
  if (isDuplicate(value, items)) return $showAlert('dupError', `${placeholder}: [${value}]`);
  return value;
};

/**
 * 상품 구매 시 유효성을 검사합니다.
 *
 * @param {object[]} values
 * @param {string} name
 * @returns
 */
export const purchaseValidate = (values, name) =>
  Object.keys(values).every(key => {
    if (key === 'quantity' && values[key] < 1) return $showAlert('isSoldOutError', name);
    if (key === 'changes' && values[key] < ZERO) return $showAlert('isExpensiveError', name);
    return true;
  });

/**
 * input에 대한 유효성을 검사하고, 옳은 input만 반환합니다.
 *
 * @param {HTMLInputElement[]} targets
 * @param {object} items
 * @returns {HTMLInputElement[]}
 */
export const isValidateInput = (targets, items) =>
  Array.from(targets).reduce((result, target, _, array) => {
    if (isValidate(target, items)) return [...result, target];
    array.splice(1);
    return result;
  }, []);

/**
 * 반환된 잔돈이 존재하는지 확인합니다.
 *
 * @param {object[]} changes
 * @returns
 */
export const hasChangesCoin = changes => {
  const result = [...new Set(changes.map(({ count }) => count))];
  if (isEquals(result.length, 1) && isEquals(result[ZERO], ZERO))
    return $showAlert('hasNoReturnCoin');
  return true;
};
