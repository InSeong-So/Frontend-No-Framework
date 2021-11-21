export class Store {
  private subscribers: (...args: any[]) => void[];
  private reducers: {
    [key: string]: (...args: any[]) => void;
  };
  private state: { [key: string]: any };

  constructor(reducers = {}, initialState = {}) {
    this.state = initialState;
  }

  get value() {
    return this.state;
  }
}
