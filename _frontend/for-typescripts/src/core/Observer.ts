interface EventObject {
  [key: string]: Array<Event>;
}

interface EventArray {
  [index: number]: ;
}

export default class Observer {
  private events: EventObject;
  constructor() {
    this.events = {};
  }

  subscribe(event: string, callback: Function): object {
    if (!this.events.hasOwnProperty(event)) {
      this.events[event] = [];
    }

    return this.events[event].push(callback);
  }

  publish(event: string, data: object = {}) {
    if (!this.events.hasOwnProperty(event)) {
      return [];
    }

    return this.events[event].map(callback => callback(data));
  }
}
