import { EMPTY, ERROR_MESSAGES } from '../constants';

/**
 * DOM 객체를 하나 선택합니다.
 *
 * @param {string} selector
 * @param {HTMLElement | Document} target
 * @returns {Node}
 */
export const $ = (selector, target = document) => target.querySelector(selector);

/**
 * DOM 객체를 여러 개 선택합니다.
 *
 * @param {string} selector
 * @param {HTMLElement | Document} target
 * @returns {NodeList}
 */
export const $all = (selector, target = document) => target.querySelectorAll(selector);

/**
 * 타겟의 형제 DOM 객체를 선택합니다.
 *
 * @param {string} selector
 * @param {HTMLElement | Document} target
 * @returns {Node}
 */
export const $closest = (element, selector) => {
  let $element = element;
  if ($element.nodeType === 9) return false;
  while ($element) {
    if (typeof $element.matches === 'function' && $element.matches(selector)) return $element;
    $element = $element.parentNode;
  }
  return false;
};

/**
 * 이벤트 등록
 *
 * @param {HTMLElement} $element
 * @param {string} eventType
 * @param {function} listenser
 */
export const $addEvent = ($element, eventType, listenser) =>
  $element.addEventListener(eventType, listenser);

/**
 * alert에 출력할 에러 메세지를 설정합니다.
 *
 * @param {string} type
 * @param {string} description
 * @returns {string}
 */
export const $showAlert = (type, description = '') => {
  alert(`${description}${ERROR_MESSAGES[type]}`);
  return EMPTY;
};

/**
 * 자식 HTMLInputElement 태그를 모두 반환합니다.
 *
 * @param {string} selector
 * @returns
 */
export const $inputChildrens = $element =>
  Array.from($element.childNodes).reduce((result, node) => {
    if (node instanceof HTMLInputElement) return [...result, node];
    return result;
  }, []);

/**
 * 인자로 넘겨받은 HTMLInputElement[]을 비웁니다.
 *
 * @param {HTMLInputElement[]} targets
 */
/* eslint-disable no-param-reassign */
export const $inputClear = targets =>
  Array.from(targets).forEach(input => {
    input.value = EMPTY;
  });
