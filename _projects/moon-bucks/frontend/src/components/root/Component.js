import utils from '../../utils/index.js';
/**
 * @TODO : 이벤트 로직을 분리한 뒤 루트 컴포넌트에 의존성 주입
 */
// import events from '../../events/index.js';
import store from '../../store/index.js';
import changeToDiff from './index.js';

export default class Component {
  constructor(element, props) {
    this.$element = element;
    this._props = props;
    this._utils = utils;
    store.then(resolve => {
      this._store = resolve;
      this.initialized();
      this.render();
    });
  }

  initialized() {}

  template() {
    return '';
  }

  render() {
    changeToDiff(this.$element, this.template());
    this.mount();
  }

  mount() {}
}
