export default class Component {
  $target;
  $state;
  constructor($target) {
    this.$target = $target;
    this.setup();
    this.render();
  }
  // 최초로 데이터 선언
  setup() { };
  // 화면에 보여질 태그를 정의
  template() { return ''; }
  // 화면에 그린다
  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }
  // 이벤트를 정의
  setEvent() { }
  // 상태를 변경하고 화면을 다시 그린다.
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}