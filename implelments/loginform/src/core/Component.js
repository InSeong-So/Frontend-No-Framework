import { updateElement } from './UpdateElement.js';

export class Component {
  constructor($target) {
    this.$target = $target;
    this.$state = null;
    this.setup();
    this.render();
  }
  setup() {}
  template() {
    return '';
  }

  render() {
    const { $target } = this;

    const newNode = $target.cloneNode(true);
    newNode.innerHTML = this.template();

    const oldChildNodes = [...$target.childNodes];
    const newChildNodes = [...newNode.childNodes];
    const max = Math.max(oldChildNodes.length, newChildNodes.length);
    for (let i = 0; i < max; i++) {
      updateElement($target, newChildNodes[i], oldChildNodes[i]);
    }

    this.setEvent();
  }

  setEvent() {}
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
