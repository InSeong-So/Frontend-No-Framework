export default class Component {
  constructor(props) {
    this._props = props;
    this.init();
    this.render();
  }

  // 최초 데이터 세팅
  init() {}

  // DOM 그리기
  render() {}

  // 화면에 그려질 DOM 정의
  view() {}
}
