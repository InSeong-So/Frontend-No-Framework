import debounce from './src/debounce/index.js';
import throttle from './src/throttle/index.js';

(() => {
  const $container = document.querySelector('.container');
  const $normalCount = document.querySelector('.normal-count');
  const $throttleCount = document.querySelector('.throttle-count');
  const $debounceCount = document.querySelector('.debounce-count');

  let normalCount = 0;
  $container.addEventListener('scroll', () => {
    $normalCount.textContent = ++normalCount;
  });

  let throttleCount = 0;
  // throttle 함수가 반환하는 클로저가 이벤트 핸들러로 등록.
  $container.addEventListener(
    'scroll',
    throttle(() => {
      $throttleCount.textContent = ++throttleCount;
    }, 100),
  );

  let debounceCount = 0;
  // debounce 함수가 반환하는 클로저가 이벤트 핸들러로 등록.
  $container.addEventListener(
    'scroll',
    debounce(() => {
      $debounceCount.textContent = ++debounceCount;
    }, 100),
  );
})();
