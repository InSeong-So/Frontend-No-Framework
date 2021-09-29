import { observe, observable } from './core/observer.js';

const state = observable({
  a: 10,
  b: 20,
});

const $app = document.querySelector('.app');

const render = () => {
  $app.innerHTML = `
    <p>a + b = ${state.a + state.b}</p>
    <input id="stateA" value="${state.a}" />
    <input id="stateB" value="${state.b}" />
  `;

  $app.querySelector('#stateA').addEventListener('change', ({ target }) => {
    state.a = +target.value;
  });

  $app.querySelector('#stateB').addEventListener('change', ({ target }) => {
    state.b = +target.value;
  });
};

observe(render);
