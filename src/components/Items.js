import Component from "../core/Component.js";

export default class Items extends Component {
  setup() {
    this.$state = { items: ['item1', 'item2'], maxId: 2 };
  }
  template() {
    const { items } = this.$state;
    return `
    <button class='addBtn'>추가</button>
      <ul>
        ${items.map((item, index) => `
          <li>
            ${item}
            <button class='delBtn' data-index=${index + 1}>삭제</button>
          </li>
        `).join('')}
      </ul>
    `
  }
  /*
  // 이벤트 버블링 처리 전
  setEvent() {
    // 추가 버튼은 한개니까
    this.$target.querySelector('.addBtn').addEventListener('click', () => {
      const { items, maxId } = this.$state;
      this.setState({ items: [...items, `item${maxId + 1}`], maxId: maxId + 1 });
    });

    // 삭제 버튼은 여러개니까
    this.$target.querySelectorAll('.delBtn').forEach(deleteButton => {
      // 이벤트 객체가 넘어오므로 구조 분해 할당 문법을 쓰면 target만 가져올 수 있다.
      deleteButton.addEventListener('click', ({ target }) => {
        // const { items } = this.$state;
        const items = [...this.$state.items];
        items.splice(target.dataset.index - 1, 1);
        this.setState({ items });
      });

    })
  }
  */
  // 이벤트 버블링 처리 후
  setEvent() {
    // 모든 이벤트를 this.$target에 등록하고, 조건문으로 분기시킨다.
    this.$target.addEventListener('click', ({target}) => {
      const items = [...this.$state.items];

      if(target.classList.contains('addBtn')){
        this.setState({ items: [...items, `item${maxId + 1}`], maxId: maxId + 1 });
      }

      if(target.classList.contains('delBtn')){
        items.splice(target.dataset.index - 1, 1);
        this.setState({ items });
      }
    });
  }
}