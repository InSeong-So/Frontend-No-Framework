export default class IntroduceForm extends HTMLElement {
  static get observedAttributes() {
    return ['lang'];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>div { background-color: skyblue; }</style>
      <div>greeting</div>
    `;
    this._greeting = shadowRoot.querySelector('div');
    this._state = {
      a: 10,
      b: 20,
    };
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    console.log('state값이 변경됨');
    if (attr == 'lang') {
      let greeting;
      switch (newValue) {
        case 'ko':
          greeting = '안녕하세요!';
          break;
        case 'es':
          greeting = 'hi!';
          break;
        case 'jp':
          greeting = '你好!';
          break;
        default:
          greeting = 'HEHEHEHE!';
      }

      this._greeting.innerText = greeting;
    }
  }

  disconnectedCallback() {
    console.log('Custom element removed from page.');
  }

  accessInnerText() {
    alert(this._greeting.innerText);
  }
}
