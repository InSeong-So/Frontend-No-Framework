export default class Container {
  constructor(value) {
    this.value = value;
  }

  static of(value) {
    return new Container(value);
  }

  map(fn) {
    return Container.of(fn(this.value));
  }
}
