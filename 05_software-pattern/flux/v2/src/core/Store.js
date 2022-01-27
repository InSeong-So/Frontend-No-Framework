export default class Observer {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    return this.events[event].push(callback);
  }

  publish(event, data = {}) {
    if (!this.events[event]) {
      return [];
    }

    return this.events[event].map(callback => callback(data));
  }
}

export const observable = props => {
  return new Proxy(props.state, {
    construct: function (target, args) {
      var obj = {};
      this.apply(target, obj, args);
      return obj;
    },
    set(state, key, value) {
      if (state[key] === value) {
        return true;
      }
      state[key] = value;
      console.log(`stateChagnes: ${key} : ${value}`);
      return true;
    },
  });
};
