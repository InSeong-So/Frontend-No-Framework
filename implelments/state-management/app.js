class Publisher {
  constructor(state) {
    this._event = null;
    this._callback = 0;

    this.eventsGroup = {};
    const $this = this;
    this.state = new Proxy(state, {
      get(state, prop) {
        $this.eventsGroup[prop] = $this.eventsGroup[prop] ?? new Set();
        if ($this.event) $this.eventsGroup[prop].add($this.event);
        return state[prop];
      },
      set(state, key, value) {
        state[key] = value;
        $this.publish(key, state);
        return true;
      },
    });
  }

  subscribe(callback) {
    this.event = callback;
    callback();
    this.event = null;
  }

  publish(event, data) {
    this.eventsGroup[event].forEach(callback => this.debounce(callback(data)));
  }

  debounce(callback) {
    let currentCallback = -1;
    return () => {
      cancelAnimationFrame(currentCallback);
      currentCallback = requestAnimationFrame(callback);
    };
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }

  clear() {
    this.eventsGroup = {};
    return true;
  }
}

const me = new Publisher({});
me.subscribe(() => {
  console.log(`a = ${me.state.a}`);
});
me.subscribe(() => {
  console.log(`b = ${me.state.b}`);
});
me.subscribe(() => {
  console.log(`a + b = ${me.state.a} + ${me.state.b}`);
});
me.subscribe(() => {
  console.log(`a * b = ${me.state.a} + ${me.state.b}`);
});
me.subscribe(() => {
  console.log(`a - b = ${me.state.a} + ${me.state.b}`);
});

me.state.a = 100;
me.state.b = 200;

console.log(me.getState());
