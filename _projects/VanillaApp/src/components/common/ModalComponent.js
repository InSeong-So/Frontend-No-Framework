export default class ModalComponent extends HTMLElement {
  get visible() {
    return this.hasAttribute('visible');
  }

  set visible(value) {
    if (value) {
      this.setAttribute('visible', '');
    } else {
      this.removeAttribute('visible');
    }
  }

  get title() {
    return this.getAttribute('title');
  }

  set title(value) {
    this.setAttribute('title', value);
  }

  get items() {
    return this.getAttribute('items');
  }

  set items(value) {
    this.setAttribute('items', value);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this._render();
    this._attachEventHandlers();
  }

  static get observedAttributes() {
    return ['visible', 'title', 'items'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'title' && this.shadowRoot) {
      this.shadowRoot.querySelector('.title').textContent = newValue;
    }
    if (name === 'items' && this.shadowRoot) {
      const items = JSON.parse(decodeURIComponent(newValue));
      this.shadowRoot.querySelector('.content').innerHTML =
        this._getContentForm(items);
    }
    if (name === 'visible' && this.shadowRoot) {
      if (newValue === null) {
        this.shadowRoot.querySelector('.wrapper').classList.remove('visible');
        this.dispatchEvent(new CustomEvent('close'));
      } else {
        this.shadowRoot.querySelector('.wrapper').classList.add('visible');
        this.dispatchEvent(new CustomEvent('open'));
      }
    }
  }

  _render() {
    const wrapperClass = this.visible ? 'wrapper visible' : 'wrapper';
    const container = document.createElement('div');
    container.innerHTML = `
        <style>
          .wrapper {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.9);
            opacity: 0;
            visibility: hidden;
            transform: scale(1.1);
            transition: visibility 0s linear .25s, opacity .25s 0s, transform .25s;
            z-index: 1;
          }
          
          .visible {
            opacity: 1;
            visibility: visible;
            transform: scale(1);
            transition: visibility 0s linear 0s, opacity .25s 0s, transform .25s;
          }
          
          .modal {
            font-family: Helvetica;
            font-size: 14px;
            padding: 10px 10px 5px 10px;
            background-color: #82b0f5;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 20px;
            min-width: 300px;
          }
          
          .title {
            font-size: 18px;
          }
          
          .button-container {
            text-align: right;
          }
          
          button {
            min-width: 80px;
            background-color: #848e97;
            border-color: #848e97;
            border-style: solid;
            border-radius: 2px;
            padding: 3px;
            color: white;
            cursor: pointer;
          }
          
          button:hover {
            background-color: #6c757d;
            border-color: #6c757d;
          }

          .content {
            margin-top:30px;
            font-family:'Roboto';
            display:block; 
          }

          /* form starting stylings ------------------------------- */

          .group {
            position: relative;
            margin-bottom: 45px;
          }

          input {
            background-color: #82b0f5;
            font-size: 18px;
            padding: 10px 0;
            display: block;
            width: 100%;
            border: none;
            border-bottom: 1px solid #757575;
          }

          input:focus {
            outline: none;
          }

          /* LABEL ======================================= */

          label {
            color: white;
            font-size: 18px;
            font-weight: normal;
            position: absolute;
            pointer-events: none;
            left: 5px;
            top: 10px;
            transition: 0.2s ease all;
            -moz-transition: 0.2s ease all;
            -webkit-transition: 0.2s ease all;
          }

          /* active state */

          input:focus~label, input:valid~label {
            top: -20px;
            font-size: 14px;
          }

          /* BOTTOM BARS ================================= */

          .bar {
            position: relative;
            display: block;
            width: 100%;
          }

          .bar:before, .bar:after {
            content: '';
            height: 2px;
            width: 0;
            bottom: 0px;
            position: absolute;
            background: #5264AE;
            transition: 0.2s ease all;
            -moz-transition: 0.2s ease all;
            -webkit-transition: 0.2s ease all;
          }

          .bar:before {
            left: 50%;
          }

          .bar:after {
            right: 50%;
          }

          /* active state */

          input:focus~.bar:before, input:focus~.bar:after {
            width: 50%;
          }

          /* HIGHLIGHTER ================================== */

          .highlight {
            position: absolute;
            height: 60%;
            width: 100px;
            top: 25%;
            left: 0;
            pointer-events: none;
            opacity: 0.5;
          }

          /* active state */

          input:focus~.highlight {
            -webkit-animation: inputHighlighter 0.3s ease;
            -moz-animation: inputHighlighter 0.3s ease;
            animation: inputHighlighter 0.3s ease;
          }

          /* ANIMATIONS ================ */

          @-webkit-keyframes inputHighlighter {
            from {
              background: #5264AE;
            }
            to {
              width: 0;
              background: transparent;
            }
          }

          @-moz-keyframes inputHighlighter {
            from {
              background: #5264AE;
            }
            to {
              width: 0;
              background: transparent;
            }
          }

          @keyframes inputHighlighter {
            from {
              background: #5264AE;
            }
            to {
              width: 0;
              background: transparent;
            }
          }

          /* ANIMATIONS ================ */

          .table {
            margin: 30px 0;
            width: 100%;
          }
          
          .table thead th {
            padding: 10px;
            background: #00adee;
            text-transform: uppercase;
            vertical-align: top;
            color: #1D4A5A;
            font-weight: normal;
            text-align: left;
          }
          
          .table tbody tr td {
            padding: 10px;
            background: #f2f2f2;
            font-size: 14px;
            text-align: center;
          }
        </style>
        <div class='${wrapperClass}'>
          <div class='modal'>
            <span class='title'>${this.title}</span>
            <div class='content'>
            </div>
            <div class='button-container'>
              <button class='cancel'>Cancel</button>
              <button class='ok'>Okay</button>
            </div>
          </div>
        </div>`;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(container);
  }

  _getContentForm({ name, stock, prices, purpose }) {
    const priceTag = prices.map(({ size }) => size);
    if (purpose === 'menu') {
      return `
      <form>
        <div class="group">
          <input type="text" required>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>메뉴명</label>
        </div>
        <div class="group">
          <input type="text" required>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>재고</label>
        </div>
      </form>
      <table class="table data">
        <thead>
          <tr>
            ${priceTag.map(tag => `<th>${tag}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            ${prices
              .map(({ price }) => `<td class="data">${price}</td>`)
              .join('')}
          </tr>
        </tbody>
      </table>
      `;
    }

    return `

    `;
  }

  _attachEventHandlers() {
    const $cancelButton = this.shadowRoot.querySelector('.cancel');
    const $okButton = this.shadowRoot.querySelector('.ok');
    const _modalCloseEvent = action => {
      this.dispatchEvent(new CustomEvent(action));
      this.removeAttribute('visible');
    };

    window.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      if (!this.visible) return;
      _modalCloseEvent('cancel');
    });

    $cancelButton.addEventListener('click', () => {
      _modalCloseEvent('cancel');
    });

    $okButton.addEventListener('click', () => {
      _modalCloseEvent('ok');
    });
  }
}
