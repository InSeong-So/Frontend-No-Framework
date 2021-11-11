export default {
  /**
   * 단일 요소 선택자
   *
   * @param {String} selector
   * @returns
   */
  $: selector => {
    return document.querySelector(selector);
  },

  /**
   * 현재 부모의 자식 선택자(형제)
   *
   * @param {Element} $element
   * @param {String} parent
   * @param {String} targetSelector
   * @returns
   */
  $sibling: ($element, parent, targetSelector) => {
    return $element.closest(parent).querySelector(targetSelector);
  },

  /**
   * 복수 요소 선택자
   *
   * @param {String} selector
   * @returns
   */
  $$: selector => {
    return document.querySelectorAll(selector);
  },

  /**
   * 깊은 복사
   *
   * @param {Object} state
   * @returns
   */
  deepClone: state => {
    return JSON.parse(JSON.stringify(state));
  },

  /**
   * 사본 복사 후 객체 동결
   *
   * @param {Object} state
   * @returns
   */
  deepCloneAndFreeze: state => {
    return Object.freeze(JSON.parse(JSON.stringify(state)));
  },

  /**
   * 원본 객체 동결
   *
   * @param {Object} target
   * @returns
   */
  objectFreeze: target => {
    return Object.freeze(target);
  },

  /**
   * options을 적용한 객체로 변환
   * - configurable: *false
   * - enumerable: *false
   * - value: *undefined
   * - writable: *false
   * - get: *undefined
   * - set: *undefined
   *
   * @param {Object} state
   * @returns
   */
  forbiddenState: (
    state,
    options = {
      writable: false,
    },
  ) => {
    Object.keys(state).forEach(key => {
      Object.defineProperty(state, key, options);
    });
    return state;
  },

  /**
   * 타입 비교
   *
   * @param {Any} target
   * @param {String} type
   * @returns
   */
  isCorrectType: (target, type) => {
    return typeof target === type;
  },

  /**
   * 객체 비교
   *
   * @param {Object} object1
   * @param {Object} object2
   * @returns
   */
  isEqualsObject: (object1, object2) => {
    if (typeof object1 === 'function' || typeof object2 === 'function')
      return object1.toString() === object2.toString();
    return JSON.stringify(object1) === JSON.stringify(object2);
  },

  /**
   * 원시값 비교
   *
   * @param {Primitive Value} target1
   * @param {Primitive Value} target2
   * @returns
   */
  isNotEquals: (target1, target2) => {
    return target1 !== target2;
  },

  /**
   * 유효성 검사 구문
   *
   * @param {String} value
   * @returns
   */
  isInvalidationValue: value => {
    if (!value) return true;
    if (value.length <= 1) {
      alert('메뉴 이름은 최소 2글자 이상이어야 합니다.');
      return true;
    }

    return false;
  },

  /**
   * 1프레임(16ms)당 1번만 실행되게 제어
   *
   * @param {Function} callback
   * @returns
   */
  debounce: callback => {
    let currentCallback = null;
    return () => {
      if (currentCallback) {
        cancelAnimationFrame(currentCallback);
        currentCallback = null;
      }
      currentCallback = requestAnimationFrame(() => callback());
    };
  },

  /**
   * MAX 반환
   *
   * @param {Number} target1
   * @param {Number} target2
   * @returns
   */
  getMaxLength: (target1 = 0, target2 = 1) => {
    return Math.max(target1, target2);
  },
};

/**
 * Generator 구성 후 실행
 *
 * @param {Generator} generator
 * @param  {...any} args
 * @returns
 */
export function run(generator, ...args) {
  const iter = generator(args);
  function fulfilledHandler(res) {
    const next = iter.next(res);
    if (next.done) return Promise.resolve(next.value);
    Promise.resolve(next.value).then(fulfilledHandler, rejectedHandler);
  }

  function rejectedHandler(err) {
    const next = iter.throw(err);
    if (next.done) return Promise.resolve(next.value);
    Promise.resolve(next.value).then(fulfilledHandler, rejectedHandler);
  }

  return fulfilledHandler();
}
