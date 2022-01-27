import counter from './src/reducer.js';
import createStore from './src/store.js';

var store = createStore(counter);
var valueEl = document.getElementById('value');

function render() {
  valueEl.innerHTML = store.getState().number.toString();
}

render();
store.subscribe(render);

document.getElementById('increment').addEventListener('click', function () {
  store.dispatch({ type: 'INCREMENT' });
});

document.getElementById('decrement').addEventListener('click', function () {
  store.dispatch({ type: 'DECREMENT' });
});

document
  .getElementById('incrementIfOdd')
  .addEventListener('click', function () {
    if (store.getState().number % 2 !== 0) {
      store.dispatch({ type: 'INCREMENT' });
    }
  });

document
  .getElementById('incrementAsync')
  .addEventListener('click', function () {
    execute(fetcher, { type: 'INCREMENT' });
  });

document
  .getElementById('decrementAsync')
  .addEventListener('click', function () {
    execute(fetcher, { type: 'DECREMENT' });
  });

function test(url, next) {
  return fetch(url).then(res => next(res));
}

function* fetcher(next, action) {
  try {
    const response = yield test(
      'https://jsonplaceholder.typicode.com/todos/1',
      next,
    );
    const data = yield Promise.resolve(response)
      .then(data => data.json())
      .then(data => next(data));
    store.dispatch({ ...action, data });
  } catch (err) {
    console.log(err);
  }
}

const execute = (generator, action) => {
  const next = v => iter.next(v);
  const iter = generator(next, action);
  iter.next();
};
