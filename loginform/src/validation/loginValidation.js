import { IS_REQUIRED } from '../constant/css.js';

const requiredInput = name => {
  const $target = document.querySelector(`${name}`);
  if ($target.value) {
    $target.classList.remove(IS_REQUIRED);
    return $target.value;
  }
  if (!$target.classList.contains(IS_REQUIRED)) {
    $target.classList.toggle(IS_REQUIRED);
  }
};

const origin = () => {};

export { requiredInput };
