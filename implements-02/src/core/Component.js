import { observable, observe } from './observer.js';

export class Component {
  constructor(el, props) {
    this._props = props;
    this.$el = el;
    this.setup();
  }

  setup() {
    observe(() => {
      this.render();
      this.setEvent();
      this.mounted();
    });
  }

  initState() {
    return {};
  }

  template() {
    return '';
  }

  render() {
    this.$el.innerHTML = this.template();
  }

  setEvent() {}

  mounted() {}
}
