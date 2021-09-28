class Publish {
  constructor(state) {
    this._state = state;
    this._observers = new Set();
    Object.keys(state).forEach(key =>
      Object.defineProperty(this, key, {
        get: () => this._state[key],
      }),
    );
  }

  setState(newState) {
    this._state = { ...this._state, ...newState };
    this.notification();
  }

  subscribe(newUser) {
    this._observers.add(newUser);
  }

  notification() {
    this._observers.forEach(fn => fn());
  }
}

class Subscriber {
  constructor(work) {
    this._fn = work;
  }

  subscribe(publisher) {
    publisher.subscribe(this._fn);
  }
}

export default (function () {
  const state = new Publish({
    a: 10,
    b: 20,
  });

  const 덧셈계산기 = new Subscriber(() =>
    console.log(`a + b = ${state.a + state.b}`),
  );
  const 곱셈계산기 = new Subscriber(() =>
    console.log(`a * b = ${state.a * state.b}`),
  );

  덧셈계산기.subscribe(state);
  곱셈계산기.subscribe(state);

  state.notification();
  // a + b = 30
  // a * b = 200

  state.setState({ a: 100, b: 200 });
})();
