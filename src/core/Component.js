export default class Component {
  $target;
  $state;
  constructor($target) {
    this.$target = $target;
    this.setup();
    // 여기에 이벤트를 등록한다.
    this.setEvent();
    this.render();
  }
  // 최초로 데이터 선언
  setup() { };
  // 화면에 보여질 태그를 정의
  template() { return ''; }
  // 화면에 그린다
  render() {
    this.$target.innerHTML = this.template();
    /*
    // 이벤트 버블링으로 동일한 컴포넌트에 클래스별 이벤트를 달리 줄 것이므로
    // render마다 실행하는 것은 메모리, 시간 낭비이다. constructor에 추가해준다.
    this.setEvent();
    */
  }
  // 이벤트를 정의
  setEvent() { }
  // 상태를 변경하고 화면을 다시 그린다.
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}