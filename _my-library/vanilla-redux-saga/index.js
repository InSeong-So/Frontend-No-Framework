import { myFirstAction, reducers } from './src/reducer.js';
import { root, sagas, createEffects } from './src/saga.js';
import { createStore } from './src/store.js';

// -------- create component  --------  --------  --------  --------
const MyComponent = props => console.log('component, prop:', props);

// -------- create store, subscribe + dispatch --------  --------  --------
const store = createStore(reducers, sagas);
const effects = createEffects(store);
store.subscribe(MyComponent);

// Redux via sagas
const iterator = root(effects);
const items = iterator.next().value;
items.map(item => item.next()); // setup all workers;

store.dispatch(myFirstAction('via-one-action'));
