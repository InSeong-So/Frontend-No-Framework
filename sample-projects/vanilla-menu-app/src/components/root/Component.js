import utils from '../../utils/index.js';
// import store from '../../store/index.js';
import changeToDiff from './index.js';

export default class Component {
  constructor(selector, props) {
    this.$element = utils.$(selector);
    if (!this.$element) return;
    this.$props = props;
    this.utils = utils;
    // store.then(resolve => {
    // this._store = resolve;
    this.initialized();
    this.render();
    // });
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
