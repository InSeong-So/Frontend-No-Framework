import Container from './Container.js';

export default class MayBe extends Container {
  isNothing() {
    return this.value === null || this.value === undefined;
  }

  map(fn) {
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value));
  }
}
