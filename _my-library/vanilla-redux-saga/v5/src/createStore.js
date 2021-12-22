// import { EventEmitter } from 'events'
import EventEmitter from './lib/events.js';
import { logAction } from './logger.js';

const createStore = reducer => ({
  state: reducer(undefined, 'redux-init'),
  stateEmitter: new EventEmitter(),
  actionsEmitter: new EventEmitter(),

  dispatch(action) {
    this.state = reducer(this.state, action);
    this.actionsEmitter.emit(action.type, action);
    this.stateEmitter.emit('newState');
    logAction(action, this.state);
    var valueEl = document.getElementById('value');
    valueEl.innerHTML = this.state.number.toString();
  },
});

export default createStore;
