import { observable } from './core/observer.js';

export const store = {
  state: observable({
    a: 10,
    b: 20,
  }),

  setState(newState) {
    for (const [key, value] of Object.entries(newState)) {
      if (!this.state[key]) continue;
      this.state[key] = value;
    }
  },
};
