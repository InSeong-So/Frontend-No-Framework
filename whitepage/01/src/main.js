class Component {
  constructor(target, props) {
    this._state = null;
    this._props = null;
    this.$target = null;
    this.setup();
  }

  // 초기 셋업을 위한 함수
  setup() {
    this.render();
    this.setEvent();
    this.mounted();
  }

  // state 변경하기
  setState(newState) {
    this._state = { ...this._state, newState };
    this.render();
  }

  // 화면을 그리는 함수
  render() {
    this.$target.innerHTML = this.template();
  }

  // 화면에 그려지는 요소
  template() {
    return '';
  }

  // 이벤트 설정하기
  setEvent() {}

  // 자식 컴포넌트 마운트하기
  mounted() {}
}

class App extends Component {}

new App(document.querySelector('.app'));
