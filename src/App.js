import Components from './core/Component.js'

export default class App extends Components {
  setup() {
    this.$state = { items: ['item1', 'item2'] };
  }
  template() {
    const { items } = this.$state;
    return `
    <button>추가</button>
      <ul>
        ${items.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `
  }

  setEvent() {
    this.$target.querySelector('button').addEventListener('click', () => {
      const { items } = this.$state;
      this.setState({ items: [...items, `item${items.length + 1}`] });
    });
  }
}