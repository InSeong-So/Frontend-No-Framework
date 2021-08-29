import Component from "../core/Component.js";

export default class Items extends Component {
  get filteredItems() {
    const { isFilter, items } = this.$state;
    return items.filter(({ active }) => (isFilter === 1 && active) || (isFilter === 2 && !active) || isFilter === 0);
  }
  setup() {
    this.$state = {
      isFilter: 0,
      items: [
        { seq: 1, contents: 'item1', active: false },
        { seq: 2, contents: 'item2', active: true }
      ]
    };
  }
  template() {
    return `
      <header>
        <input type='text' class='addItems' placeholder='추가할 아이템 내용을 입력해주세요.' />
      </header>
      <main>
        <ul>
          ${this.filteredItems.map(({ seq, contents, active }) => `
            <li data-seq='${seq}'>
              ${contents}
              <button class='toggleBtn' style='color: ${active ? "#09F" : "#F09"}'>
                ${active ? '활성' : '비활성'}
              </button>
              <button class='delBtn'>삭제</button>
            </li>
          `).join('')}
        </ul>
      </main>
      <footer>
        <button class='filterBtn' data-is-filter='0'>전체 보기</button>
        <button class='filterBtn' data-is-filter='1'>활성 보기</button>
        <button class='filterBtn' data-is-filter='2'>비활성 보기</button>
      </footer>
    `
  }
  setEvent() {

    this.addEvent('keyup', '.addItems', ({ key, target }) => {
      if (key !== 'Enter') return;
      const items = [...this.$state.items];
      const seq = Math.max(...items.map(e => e.seq)) + 1;
      const contents = target.value;
      const active = false;
      this.setState({
        // items: items.concat({ seq, contents, active }),
        items: [
          ...items,
          { seq, contents, active }
        ]
      });
    });

    this.addEvent('click', '.delBtn', ({ target }) => {
      const items = [...this.$state.items];
      const seq = Number(target.closest('[data-seq]').dataset.seq);
      items.splice(target.dataset.index - 1, 1);
      this.setState({ items });
    });

    this.addEvent('click', '.toggleBtn', ({ target }) => {
      const items = [...this.$state.items];
      const seq = Number(target.closest('[data-seq]').dataset.seq);
      const index = items.findIndex(e => e.seq === seq);
      items[index].active = !items[index].active;
      this.setState({ items });
    });

    this.addEvent('click', '.filterBtn', ({ target }) => {
      this.setState({ isFilter: Number(target.dataset.isFilter) });
    });
  }
}