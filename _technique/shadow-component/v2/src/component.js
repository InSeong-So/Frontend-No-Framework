import Template from './template.js';

export class ADuke extends HTMLElement {
  constructor() {
    super();
    console.log('constructor ' + this.innerText);
    this.template = new Template();
    this.root = this.attachShadow({ mode: 'closed' });
    this.messageView = document.createElement('article');
    this.counter = 0;
  }

  connectedCallback() {
    console.log('connected');
    // this.scheduleID = setInterval(_ => this.onTimeout(), 1000);
    this.root.appendChild(this.template.style());
    this.root.appendChild(this.template.aduke());
    this.root.appendChild(this.messageView);
    this.counterButton = this.root.querySelector('#counter');
    this.counterButton.onclick = () => this.increaseCounter();
  }

  onTimeout() {
    console.log('on timeout');
    const timeoutEvent = new CustomEvent('timeout', {
      composed: true,
      detail: {
        counter: this.counter,
      },
    });
    this.root.dispatchEvent(timeoutEvent);
  }

  get message() {
    return this.getAttribute('message');
  }

  set message(msg) {
    this.setAttribute('message', msg);
    this.updateMessageView();
  }

  increaseCounter() {
    this.counter++;
    if (this.counter % 2 == 0) {
      this.setAttribute('even', 'true');
    } else {
      this.setAttribute('even', 'false');
    }
    this.updateMessageView();
  }

  updateMessageView() {
    this.messageView.innerHTML = `
           <code>Counter: ${this.counter}</code>
            <div>The message is: "${this.message}"</div>
            <p>Random number: ${Math.random()}</p>
        `;
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    console.log(`attribute listener: ${attributeName} ${oldValue} ${newValue}`);
  }

  static get observedAttributes() {
    return ['message'];
  }
}
