import { ADuke } from './component.js';
import './style.scss';

customElements.define('a-duke', ADuke);

customElements.whenDefined('a-duke').then(() => {
  const aduke = document.querySelector('a-duke');
  console.log('message property', aduke.message);
  aduke.setAttribute('message', 'good bye');
  console.log('message property', aduke.message);
  aduke.message = 'have a nice day';
  aduke.addEventListener('timeout', e => console.log(e));
});
