export default class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  emit(type) {
    if (this.events[type]) {
      this.events[type].forEach(function (listener) {
        listener();
      });
    }
  }
  once(type, listener) {
    checkListener(listener);

    this.on(type, _onceWrap(this, type, listener));
    return this;
  }
  addListener(type, listener, prepend = false) {
    let existing;
    checkListener(listener);
    let events = this._events;
    if (events === undefined) {
      events = this._events = Object.create(null);
      this._eventsCount = 0;
    } else {
      if (events.newListener !== undefined) {
        this.emit(
          'newListener',
          type,
          listener.listener ? listener.listener : listener,
        );
        events = this._events;
      }
      existing = events[type];
    }
    if (existing === undefined) {
      existing = events[type] = listener;
      ++this._eventsCount;
    } else {
      if (typeof existing === 'function')
        existing = events[type] = prepend
          ? [listener, existing]
          : [existing, listener];
      else if (prepend) existing.unshift(listener);
      else existing.push(listener);
    }
    return this;
  }

  removeListener(type, listener) {
    let originalListener;
    checkListener(listener);
    let events = this._events;
    if (events === undefined) return this;
    let list = events[type];
    if (list === undefined) return this;
    if (list === listener || list.listener === listener) {
      if (--this._eventsCount === 0) this._events = Object.create(null);
      else {
        delete events[type];
        if (events.removeListener)
          this.emit('removeListener', type, list.listener || listener);
      }
    } else if (typeof list !== 'function') {
      let position = -1;
      for (let i = list.length - 1; i >= 0; i--)
        if (list[i] === listener || list[i].listener === listener) {
          originalListener = list[i].listener;
          position = i;
          break;
        }
      if (position < 0) return this;
      if (position === 0) list.shift();
      else {
        for (let index = position; index < list.length - 1; index++) {
          list[index] = list[index + 1];
        }
        list.pop();
      }
      if (list.length === 1) events[type] = list[0];
      if (events.removeListener !== undefined)
        this.emit('removeListener', type, originalListener || listener);
    }
    return this;
  }
}

const _onceWrap = (target, type, listener) => {
  const state = { fired: false, wrapFn: undefined, target, type, listener };
  const wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
};

function onceWrapper() {
  if (this.fired) return;

  this.target.removeListener(this.type, this.wrapFn);
  this.fired = true;
  if (arguments.length === 0) return this.listener.call(this.target);
  return this.listener.apply(this.target, arguments);
}

function checkListener(listener) {
  if (typeof listener !== 'function')
    throw new TypeError(
      `The "listener" argument must be of type Function. Received type ${typeof listener}`,
    );
}
