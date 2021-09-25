class Publish {
  _state;
  _observers = new Set();

  constructor(state) {
    this._state = state;
    Object.keys(state).forEach(key => Object.defineProperty(this, key, {
      get: () => this._state[key]
    }));
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