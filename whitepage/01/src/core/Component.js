export class Component {
  constructor(target, props) {
    this._state = null;
    this.$target = target;
    this._props = props;
    this.setup();
    this.setEvent();
    this.render();
  }

  setup() {}

  mounted() {}

  template() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  setState(newState) {
    this._state = { ...this._state, ...newState };
    this.render();
  }

  setEvent() {}

  addEvent(type, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = target =>
      children.includes(target) || target.closest(selector);
    this.$target.addEventListener(type, event => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  }
}
