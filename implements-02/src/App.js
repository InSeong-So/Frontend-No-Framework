import { Component } from './core/Component.js';
import { store } from './store.js';

const InputA = () => {
  return `
    <input id="stateA" value="${store.state.a}" size="5" />
`;
};

const InputB = () => {
  return `
    <input id="stateB" value="${store.state.b}" size="5" />
`;
};

const Calculator = () => {
  return `
    <p>a + b = ${+store.state.a + +store.state.b}</p>
`;
};

export class App extends Component {
  template() {
    return `
    ${InputA()}
    ${InputB()}
    ${Calculator()}
    `;
  }

  setEvent() {
    const { $el } = this;

    $el.querySelector('#stateA').addEventListener('change', ({ target }) => {
      store.setState({ a: Number(target.value) || 0 });
    });

    $el.querySelector('#stateB').addEventListener('change', ({ target }) => {
      store.setState({ b: Number(target.value) || 0 });
    });
  }
}
