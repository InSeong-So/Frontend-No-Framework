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

export const func_00 = (function () {
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

// Object.defineProperty 백지복습
export const func_01 = () => {
  const state = { a: 10, b: 100 };

  const stateKeys = Object.keys(state);

  const observer = () => console.log(`state a + b : ${state.a + state.b}`);

  for (let _key of stateKeys) {
    let _value = state[_key];
    Object.defineProperty(state, _key, {
      get() {
        return _value;
      },
      set(value) {
        _value = value;
        observer();
      },
    });
  }

  state.a = 20;
  state.b = 200;

  setTimeout(() => {
    state.a = 1000;
    state.b = 20000;
  }, 1000);
};

// Object.definePropery 함수 확장하기
export const func_02 = () => {
  const state = { a: 10, b: 20 };
  const stateKeys = Object.keys(state);
  let currentObserver = null;
  for (const _key of stateKeys) {
    let _value = state[_key];
    const observers = new Set();
    Object.defineProperty(state, _key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        console.log(observers);
        return _value;
      },
      set(value) {
        _value = value;
        observers.forEach(observer => observer());
      },
    });
  }

  const plusCalculator = () => {
    currentObserver = plusCalculator;
    console.log(`state a + b : ${state.a + state.b}`);
  };

  const subtractCalculator = () => {
    currentObserver = subtractCalculator;
    console.log(`state a - b : ${state.a - state.b}`);
  };

  plusCalculator();
  subtractCalculator();

  state.a = 1000;
  state.b = 50000;
};

// observe, observable 분리
export const func_03 = () => {
  let currentObserver = null;

  const observe = fn => {
    currentObserver = fn;
    fn();
    currentObserver = null;
  };

  const observable = obj => {
    const keys = Object.keys(obj);

    keys.forEach(key => {
      let _value = obj[key];
      let observers = new Set();
      Object.defineProperty(obj, key, {
        get() {
          if (currentObserver) observers.add(currentObserver);
          return _value;
        },
        set(value) {
          _value = value;
          observers.forEach(fn => fn());
        },
      });
    });

    return obj;
  };

  const state = observable({ a: 10, b: 20 });
  observe(() => console.log(`a = ${state.a}`));
  observe(() => console.log(`b = ${state.b}`));
  observe(() => console.log(`a + b = ${state.a} + ${state.b}`));
  observe(() => console.log(`a * b = ${state.a} + ${state.b}`));
  observe(() => console.log(`a - b = ${state.a} + ${state.b}`));

  state.a = 100;
  state.b = 200;
};
