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

  get index() {
    return this.getAttribute('index');
  }

  set index(value) {
    this.setAttribute('index', value);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this._render();
    this._attachEventHandlers();
  }

  static get observedAttributes() {
    return ['visible', 'title', 'items', 'index'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'visible' && this.shadowRoot) {
      if (newValue === null) {
        this.shadowRoot.querySelector('.wrapper').classList.remove('visible');
        this.dispatchEvent(new CustomEvent('close'));
      } else {
        this.shadowRoot.querySelector('.wrapper').classList.add('visible');
        this.dispatchEvent(new CustomEvent('open'));
      }
    }
    if (name === 'title' && this.shadowRoot) {
      this.shadowRoot.querySelector('.title').textContent = newValue;
    }
    if (name === 'items' && this.shadowRoot) {
      const items = JSON.parse(decodeURIComponent(newValue));
      this.shadowRoot.querySelector('.content').innerHTML =
        this._getContentForm(items);
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
            padding: 15px;
            background-color: #82b0f5;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 20px;
            min-width: 400px;
          }
          
          .title {
            font-size: 18px;
            text-align: center;
            font-weight: bold;
          }
          
          .button-container {
            text-align: right;
          }
          
          /* Chrome, Safari, Edge, Opera */
          .step-none input::-webkit-outer-spin-button,
          .step-none input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          
          /* Firefox */
          .step-none input[type=number] {
            -moz-appearance: textfield;
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
            color: cornsilk;
            font-weight: bold;
            background-color: #82b0f5;
            font-size: 18px;
            padding: 10px 0;
            display: block;
            width: 100%;
            border: none;
            border-bottom: 1px solid white;
            text-indent: 1em;
            letter-spacing : 1px;
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
          .table-wrapper span {
            color: white;
            font-size: 18px;
            font-weight: normal;
          }

          .table {
            margin-top: 10px;
            width: 100%;
          }
          
          .table thead th {
            padding: 10px;
            background: #00adee;
            text-transform: uppercase;
            vertical-align: top;
            color: #1D4A5A;
            font-weight: normal;
            text-align: center;
          }
          
          .table tbody tr td {
            padding: 10px;
            background: lightsteelblue;
            font-size: 14px;
            text-align: center;
          }
          
          .table tr input{
            background: none;
            font-size: 15px;
            border: none;
            border-bottom: 1px solid #757575;
          }
        </style>
        <div class='${wrapperClass}'>
          <div class='modal'>
            <p class='title'>${this.title}</p>
            <div class='content'>
            </div>
            <div class='button-container'>
              <button class='cancel'>취소</button>
              <button class='ok'>저장</button>
            </div>
          </div>
        </div>`;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(container);
  }

  _getContentForm(items) {
    if (items.purpose === 'menu') {
      const { name, prices, stock } = items;
      const priceTag = prices.map(({ size }) => size);
      return `
      <form>
        <div class="group">
          <input type="text" required name="name" value="${name}">
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>메뉴명</label>
        </div>
        <div class="group table-wrapper">
          <span>사이즈/가격</span>
          <table class="table data">
          <thead>
            <tr>
              ${priceTag
                .map(
                  tag => `
                  <th>
                    <input type="text" required name="size" value="${tag}">
                  </th>`,
                )
                .join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              ${prices
                .map(
                  ({ price }) => `
                  <td>
                    <input type="number" required step="0.1" name="price" value="${price}">
                  </td>`,
                )
                .join('')}
            </tr>
          </tbody>
        </table>
        </div>
        <div class="group step-none">
          <input type="number" required name="stock" value=${stock}>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>재고</label>
        </div>
      </form>
      `;
    }

    const { username, id, authority } = items;
    return `
    <form>
      <div class="group">
        <input type="text" required name="username" value="${username}">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>이름</label>
      </div>
      <div class="group step-none">
        <input type="text" required name="id" value="${id}">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>아이디</label>
      </div>
      <div class="group step-none">
        <input type="text" required name="authority" value="${authority}">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>권한</label>
      </div>
    </form>
    `;
  }

  _isNull(value) {
    return value === '' || value === undefined || value === null ? true : false;
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
      const updatedItem = {};
      const prices = [];
      let index = 0;
      try {
        this.shadowRoot
          .querySelectorAll('[required]')
          .forEach(({ name, value }) => {
            if (this._isNull(value)) throw new Error('값이 입력되어야 합니다.');

            if (name === 'size') prices.push({ size: value });
            else if (name === 'price')
              prices[index] = { ...prices[index++], [name]: +value };
            else if (name === 'stock') updatedItem[name] = +value;
            else updatedItem[name] = value;
          });
      } catch ({ message }) {
        return alert(message);
      }
      this.items = encodeURIComponent(
        JSON.stringify({ ...updatedItem, prices }),
      );
      _modalCloseEvent('ok');
    });
  }
}
