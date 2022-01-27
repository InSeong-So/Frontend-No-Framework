export default class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  emit(type) {
    if (!this.events[type]) return;

    this.events[type].forEach(listener => listener());
  }

  once(type, listener) {
    if (typeof listener !== 'function')
      throw new TypeError(
        `The "listener" argument must be of type Function. Received type ${typeof listener}`,
      );

    this.on(type, this._onceWrap(listener));
    return this;
  }

  _onceWrap(listener) {
    return () => listener.apply(this);
  }
}
