import { ENTER_KEYCODE } from '../constants/index.js';

export default () => {
  window.addEventListener('keydown', event => {
    if (event.key === ENTER_KEYCODE) event.preventDefault();
  });
};
