class Component extends HTMLElement {
  _component: ShadowRoot;
  _state: Record<string, any>;
  _props: Record<string, any>;
  messageView: HTMLElement;

  constructor(props) {
    super();
    // shadow root 자동으로 가져오기
    // this._component = this.attachShadow({ mode: 'open' }); // 개방
    this._component = this.attachShadow({ mode: 'closed' }); // 폐쇄

    // 기본 상태 설정
    this._state = {};
    // props 설정
    this._props = props;

    // 외부에서도 접근 가능한 onclick 함수와 this 바인딩
    if (this.onkeyup) {
      this.onkeyup = this.onkeyup.bind(this);
    }

    // 내부 method로 render 선언하고 this 바인딩
    this._doRender = this._doRender.bind(this);

    this.messageView = document.createElement('article');

    // 마지막으로 컴포넌트를 실제로 렌더링
    this._doRender();
  }

  // 컴포넌트가 생성되어 DOM에 연결됨
  connectedCallback() {}

  // 상태가 변경되면 자동으로 렌더링
  setState(newState: Record<string, any>) {
    this._state = { ...this._state, ...newState };
    this.setAttribute('value', 'test');
    this._doRender();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log('attribute 변경');
  }

  static get observedAttributes() {
    return ['type'];
  }

  _doRender() {
    this._component.innerHTML = this.render();

    if (this.onkeyup) {
      this._component.firstElementChild.onkeyup = this.onkeyup;
    }
  }

  render() {
    return '';
  }
}

class InputComponent extends Component {
  constructor(type) {
    super();
    this.type = type;
  }

  connectedCallback() {
    // this.setState(state);
    console.log(this._state);
  }

  onkeyup({ target }) {
    console.log(target);
    // const { currentClickCount } = this._state;
    // this.setState({ clickCount: currentClickCount + 1 });
  }

  // HTML을 문자열로 반환하는 렌더링 메서드 설정, 템플릿을 반환시키면 될듯
  render(): string {
    const type = this.getAttribute('type');
    return `<input type='${type}'/>`;
  }
}
customElements.define('input-component', InputComponent);
