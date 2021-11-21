export class Store {
  private subscribers: (...args: any[]) => void[];
  private reducers: {
    [key: string]: (...args: any[]) => void;
  };
  private state: { [key: string]: any };

  constructor(reducers = {}, initialState = {}) {
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
  }

  get value() {
    return this.state;
  }

  dispatch(action: any) {
    this.state = this.reduce(this.state, action);
  }

  private reduce(state: any, action: any) {
    const newState: any = {};
    for (const prop in this.reducers) {
      newState[prop] = this.reducers[prop](state[prop], action);
    }
    return newState;
  }
}
