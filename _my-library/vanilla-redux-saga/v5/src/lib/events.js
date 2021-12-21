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

    this.on(type, _onceWrap(this, listener));
    return this;
  }
}

const _onceWrap = (target, listener) => {
  const state = { fired: false, target, listener };
  const wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  return wrapped;
};

function onceWrapper(...args) {
  if (this.fired) return;

  this.fired = true;
  return args.length === 0
    ? this.listener.call(this.target)
    : this.listener.apply(this.target, args);
}
