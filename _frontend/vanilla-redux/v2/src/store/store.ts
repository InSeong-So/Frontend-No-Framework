export class Store {
  private subscribers: Array<(...args: any[]) => void>;
  private reducers: {
    [key: string]: (...args: any[]) => void;
  };
  private state: { [key: string]: any };

  constructor(reducers = {}, initialState = {}) {
    this.subscribers = [];
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
  }

  get value() {
    return this.state;
  }

  subscribe(callback: (data: any) => void) {
    this.subscribers = [...this.subscribers, callback];
    this.notify();
    return () => {
      this.subscribers = this.subscribers.filter(
        subscribe => subscribe !== callback,
      );
    };
  }

  dispatch(action: any) {
    this.state = this.reduce(this.state, action);
    this.notify();
  }

  private notify() {
    this.subscribers.forEach(callback => callback(this.value));
  }

  private reduce(state: any, action: any) {
    const newState: any = {};
    for (const prop in this.reducers) {
      newState[prop] = this.reducers[prop](state[prop], action);
    }
    return newState;
  }
}
