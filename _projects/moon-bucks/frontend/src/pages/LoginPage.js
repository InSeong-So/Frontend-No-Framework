/**
 * ref >> https://codepen.io/danzawadzki/pen/EgqKRr
 */

import LoginForm from '../components/LoginForm.js';

export default target => {
  const template = () => {
    return `
    <div class="wrapper fadeInDown"></div>
    `;
  };

  const render = target => {
    target.innerHTML = template();
  };

  render(target);

  new LoginForm(document.querySelector('.wrapper'));
};
