export default class CoffeeComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    const container = document.createElement('div');
    container.innerHTML = `
      <style>
        :host {
          width: 70%;
        }
        img {
          margin-top: 3rem;
          width: 100%;
        }
      </style>
      <img src="./assets/images/Leisurely afternoon tea.gif" >
    `;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(container);
  }
}
