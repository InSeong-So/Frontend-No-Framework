import { dispatchChangedDOM } from '../core/Render.js';

export const DEFAULT_SIZE = '12';
export const DEFAULT_COLOR = 'black';
export const COLOR_GREEN = 'green';

export class WriteForm extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['size', 'color'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.hasChildNodes()) {
      return;
    }
    const newState = { ...this._state };
    newState[name] = newValue;
    dispatchChangedDOM(
      this,
      this.firstElementChild,
      this.createComponent(newState),
    );
  }

  get size() {
    return this.getAttribute('size') || DEFAULT_SIZE;
  }

  set size(value) {
    this.setAttribute('size', value || DEFAULT_SIZE);
  }

  get color() {
    return this.getAttribute('color') || DEFAULT_COLOR;
  }

  set color(value) {
    this.setAttribute('color', value || DEFAULT_COLOR);
  }

  connectedCallback() {
    console.log('Custom element added to page.');
    requestAnimationFrame(() => {
      this._state = { size: this.size, color: this.color };
      this.appendChild(this.createComponent(this._state));
    });
  }
  disconnectedCallback() {
    console.log('Custom element removed from page.');
  }

  createComponent({ size, color }) {
    const $el = document.createElement('p');
    $el.style.fontSize = `${size}px`;
    $el.style.color = color;
    $el.textContent = '글자 크기와 색을 바꿔주세요!';

    return $el;
  }
}
