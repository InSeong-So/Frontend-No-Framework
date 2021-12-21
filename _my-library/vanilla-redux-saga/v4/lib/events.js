// export default function EventEmitter() {
//   this.events = {};
// }
// EventEmitter.prototype.addListener = function addListener(type, listener) {
//   return _addListener(this, type, listener, false);
// };

// EventEmitter.prototype.on = EventEmitter.prototype.addListener;
// EventEmitter.prototype.emit = function emit(type, ...args) {
//   let doError = type === 'error';

//   const events = this._events;
//   if (events !== undefined) doError = doError && events.error === undefined;
//   else if (!doError) return false;

//   const handler = events[type];

//   if (handler === undefined) return false;

//   if (typeof handler === 'function') {
//     Reflect.apply(handler, this, args);
//   } else {
//     const len = handler.length;
//     const listeners = arrayClone(handler, len);
//     for (let i = 0; i < len; ++i) Reflect.apply(listeners[i], this, args);
//   }

//   return true;
// };
// function arrayClone(arr, n) {
//   const copy = new Array(n);
//   for (let i = 0; i < n; ++i) copy[i] = arr[i];
//   return copy;
// }
// EventEmitter.prototype.once = function once(type, listener) {
//   // checkListener(listener);

//   this.on(type, _onceWrap(this, type, listener));
//   return this;
// };

// // function checkListener(listener) {
// //   if (typeof listener !== 'function') {
// //     throw new ERR_INVALID_ARG_TYPE('listener', 'Function', listener);
// //   }
// // }
// function _onceWrap(target, type, listener) {
//   const state = { fired: false, wrapFn: undefined, target, type, listener };
//   const wrapped = onceWrapper.bind(state);
//   wrapped.listener = listener;
//   state.wrapFn = wrapped;
//   return wrapped;
// }

// function onceWrapper() {
//   if (!this.fired) {
//     this.target.removeListener(this.type, this.wrapFn);
//     this.fired = true;
//     if (arguments.length === 0) return this.listener.call(this.target);
//     return this.listener.apply(this.target, arguments);
//   }
// }

// function _addListener(target, type, listener, prepend) {
//   let m;
//   let events;
//   let existing;

//   // checkListener(listener);

//   events = target._events;
//   if (events === undefined) {
//     events = target._events = Object.create(null);
//     target._eventsCount = 0;
//   } else {
//     // To avoid recursion in the case that type === "newListener"! Before
//     // adding it to the listeners, first emit "newListener".
//     if (events.newListener !== undefined) {
//       target.emit(
//         'newListener',
//         type,
//         listener.listener ? listener.listener : listener,
//       );

//       // Re-assign `events` because a newListener handler could have caused the
//       // this._events to be assigned to a new object
//       events = target._events;
//     }
//     existing = events[type];
//   }

//   if (existing === undefined) {
//     // Optimize the case of one listener. Don't need the extra array object.
//     events[type] = listener;
//     ++target._eventsCount;
//   } else {
//     if (typeof existing === 'function') {
//       // Adding the second element, need to change to array.
//       existing = events[type] = prepend
//         ? [listener, existing]
//         : [existing, listener];
//       // If we've already got an array, just append.
//     } else if (prepend) {
//       existing.unshift(listener);
//     } else {
//       existing.push(listener);
//     }

//     // Check for listener leak
//     m = _getMaxListeners(target);
//     if (m > 0 && existing.length > m && !existing.warned) {
//       existing.warned = true;
//       // No error code for this since it is a Warning
//       // eslint-disable-next-line no-restricted-syntax
//       const w = new Error(
//         'Possible EventEmitter memory leak detected. ' +
//           `${existing.length} ${String(type)} listeners ` +
//           // `added to ${inspect(target, { depth: -1 })}. Use ` +
//           'emitter.setMaxListeners() to increase limit',
//       );
//       w.name = 'MaxListenersExceededWarning';
//       w.emitter = target;
//       w.type = type;
//       w.count = existing.length;
//       process.emitWarning(w);
//     }
//   }

//   return target;
// }

// function _getMaxListeners(that) {
//   if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
//   return that._maxListeners;
// }

export default function EventEmitter() {
  this.events = {};
}

EventEmitter.prototype.on = function (type, listener) {
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
};
EventEmitter.prototype.emit = function (type) {
  if (this.events[type]) {
    this.events[type].forEach(function (listener) {
      listener();
    });
  }
};
EventEmitter.prototype.once = function once(type, listener) {
  // checkListener(listener);

  this.on(type, _onceWrap(this, type, listener));
  return this;
};

// function checkListener(listener) {
//   if (typeof listener !== 'function') {
//     throw new ERR_INVALID_ARG_TYPE('listener', 'Function', listener);
//   }
// }
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
