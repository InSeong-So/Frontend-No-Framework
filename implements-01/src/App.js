import Component from './core/Component.js';
import Items from './components/Items.js';
import ItemAddtitional from './components/ItemAddtitional.js';
import ItemFilter from './components/ItemFilter.js';

export default class App extends Component {
  setup() {
    this.$state = {
      isFilter: 0,
      items: [
        { seq: 1, contents: 'item1', active: false },
        { seq: 2, contents: 'item2', active: true },
      ],
    };
  }
  template() {
    return `
      <header data-component='item-additional'></header>
      <main data-component='items'></main>
      <footer data-component='item-filter'></footer>
    `;
  }
  // 자식 컴포넌트 마운트하기
  mounted() {
    // 함수 호이스팅을 이용한 내부 함수 정의
    const { filteredItems, addItem, deleteItem, toggleItem, filterItem } = this;
    // 템플릿으로 렌더링할 컴포넌트를 변수로 선언
    const $itemAdditional = this.$target.querySelector(
      "[data-component='item-additional']",
    );
    const $items = this.$target.querySelector("[data-component='items']");
    const $itemFilter = this.$target.querySelector(
      "[data-component='item-filter']",
    );

    // 컴포넌트에 선언한 함수를 바인딩시킨다.
    new ItemAddtitional($itemAdditional, {
      addItem: addItem.bind(this),
    });
    new Items($items, {
      filteredItems,
      deleteItem: deleteItem.bind(this),
      toggleItem: toggleItem.bind(this),
    });
    new ItemFilter($itemFilter, {
      filterItem: filterItem.bind(this),
    });
  }

  get filteredItems() {
    const { isFilter, items } = this.$state;
    return items.filter(
      ({ active }) =>
        (isFilter === 1 && active) ||
        (isFilter === 2 && !active) ||
        isFilter === 0,
    );
  }

  addItem(contents) {
    const items = [...this.$state.items];
    const seq = Math.max(...items.map(e => e.seq)) + 1;
    const active = false;
    this.setState({
      items: [...items, { seq, contents, active }],
    });
  }

  deleteItem(seq) {
    const items = [...this.$state.items];
    items.splice(
      items.findIndex(v => v.seq === seq),
      1,
    );
    this.setState({ items });
  }

  toggleItem(seq) {
    const items = [...this.$state.items];
    const index = items.findIndex(e => e.seq === seq);
    items[index].active = !items[index].active;
    this.setState({ items });
  }

  filterItem(isFilter) {
    this.setState({ isFilter });
  }
}
