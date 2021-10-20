import { Component } from './core/Component.js';

export default class App extends Component {
  setup() {
    this.$state = {};
  }

  template() {
    return `
      <main data-component='printed-form'></main>
    `;
  }

  mounted() {
    const $printedForm = this.$target.querySelector(
      "[data-component='printed-form']",
    );
  }
}
