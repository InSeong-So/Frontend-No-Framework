export default class EventEmitter {
  constructor() {
    this.events = {};

  }
  on(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  };

  emit(type) {
    if (this.events[type]) {
      this.events[type].forEach(function (listener) {
        listener();
      });
    }
  }
  once(type, listener) {
    if (typeof listener !== 'function')
      throw new TypeError(`The "listener" argument must be of type Function. Received type ${typeof listener}`);

    this.on(type, _onceWrap(this, type, listener));
    return this;
  };
}

function _onceWrap(target, type, listener) {
  const state = { fired: false, wrapFn: undefined, target, type, listener };
  const wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0) return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}
