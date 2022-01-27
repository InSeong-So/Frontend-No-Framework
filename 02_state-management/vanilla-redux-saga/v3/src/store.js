import EventEmitter from './lib/events.js';
import { logAction } from './logger.js';
import { reducer } from './reducer.js';

const createStore = reducer => ({
  state: reducer(undefined, 'redux-init'),
  stateEmitter: new EventEmitter(),
  actionsEmitter: new EventEmitter(),

  dispatch(action) {
    this.state = reducer(this.state, action);
    this.actionsEmitter.emit(action.type, action);
    this.stateEmitter.emit('new_state');
    logAction(action, this.state);
  },

  getState() {
    return this.state;
  },
});

export const store = createStore(reducer);

export const selectUserId = state => state.userId;
