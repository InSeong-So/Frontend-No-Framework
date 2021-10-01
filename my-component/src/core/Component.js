export const createComponent = (name, layout, state) => {
  customElements.define(
    name,
    class extends HTMLElement {
      constructor() {
        super();

        this._state = state;

        const elem = document.createElement('div');
        elem.innerHTML = layout;

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(elem);
      }
    },
  );
};

export class Component extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.render();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }

  static get observedAttributes() {
    return ['title'];
  }

  disconnectedCallback() {
    alert('bye bye');
  }

  get title() {
    return this.getAttribute('title');
  }

  render() {
    this.shadowRoot.innerHTML = `<slot> <h1>${this.title}</h1> </slot> `;
  }
}
