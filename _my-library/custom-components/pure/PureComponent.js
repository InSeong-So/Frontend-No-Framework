// Create a class for the element
class Pure extends HTMLElement {
  // Specify observed attributes so that
  // attributeChangedCallback will work
  static get observedAttributes() {
    return ['c', 'l'];
  }

  constructor() {
    // Always call super first in constructor
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const div = document.createElement('div');
    const style = document.createElement('style');
    shadow.appendChild(style);
    shadow.appendChild(div);
  }

  connectedCallback() {
    console.log('Custom Pure element added to page.');
    updateStyle(this);
  }

  disconnectedCallback() {
    console.log('Custom Pure element removed from page.');
  }

  adoptedCallback() {
    console.log('Custom Pure element moved to new page.');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom Pure element attributes changed.');
    updateStyle(this);
  }
}

customElements.define('custom-pure', Pure);

function updateStyle(elem) {
  const shadow = elem.shadowRoot;
  shadow.querySelector('style').textContent = `
    div {
      width: ${elem.getAttribute('l')}px;
      height: ${elem.getAttribute('l')}px;
      background-color: ${elem.getAttribute('c')};
    }
  `;
}

const add = document.querySelector('.add');
const update = document.querySelector('.update');
const remove = document.querySelector('.remove');
let pure;

update.disabled = true;
remove.disabled = true;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

add.onclick = function () {
  // Create a custom pure element
  pure = document.createElement('custom-pure');
  pure.setAttribute('l', '100');
  pure.setAttribute('c', 'red');
  document.body.appendChild(pure);

  update.disabled = false;
  remove.disabled = false;
  add.disabled = true;
};

update.onclick = function () {
  // Randomly update pure's attributes
  pure.setAttribute('l', random(50, 200));
  pure.setAttribute(
    'c',
    `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`,
  );
};

remove.onclick = function () {
  // Remove the pure
  document.body.removeChild(pure);

  update.disabled = true;
  remove.disabled = true;
  add.disabled = false;
};
