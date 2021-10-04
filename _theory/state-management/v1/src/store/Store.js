import Observer from '../core/Observer.js';

export default class Store {
  constructor(params) {
    this.actions = {};
    this.mutations = {};
    this.state = {};

    this.events = new Observer();

    if (Object.prototype.hasOwnProperty.call(params, 'actions')) {
      this.actions = params.actions;
    }

    if (Object.prototype.hasOwnProperty.call(params, 'mutations')) {
      this.mutations = params.mutations;
    }

    const store = this;
    this.state = new Proxy(params.state || {}, {
      set: function (state, key, value) {
        state[key] = value;
        console.log(`stateChagnes: ${key} : ${value}`);
        store.events.publish('stateChange', store.state);
        return true;
      },
    });
  }

  dispatch(actionKey, payload) {
    if (typeof this.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey} doesn't exist.`);
      return false;
    }

    console.groupCollapsed(`ACTION: ${actionKey}`);
    this.actions[actionKey](this, payload);
    console.groupEnd();

    return true;
  }

  commit(mutationKey, payload) {
    if (typeof this.mutations[mutationKey] !== 'function') {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
      return false;
    }

    let newState = this.mutations[mutationKey](this.state, payload);

    this.state = Object.assign(this.state, newState);

    return true;
  }
}
