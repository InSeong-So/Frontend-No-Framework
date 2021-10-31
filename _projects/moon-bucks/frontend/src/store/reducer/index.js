import combineReducers from '../combineReducers/index.js';
import menu from './menu.js';
import user from './user.js';

const rootReducer = combineReducers({
  menu,
  user,
});

export default rootReducer;
