import Component from '../core/Component.js';

export default class List extends Component {
  view() {
    const { items } = this.$store.state;
    if (items.length === 0) {
      return `
        <div>조회된 데이터가 없습니다.</div>
      `;
    }
    return `
    <ul>
      ${items
        .map((item, index) => {
          return `
          <div>
            <li>${item.type}</li>
            <li>${item.todo}</li>
            <li>${item.status}</li>
            <button>완료</button>
            <button data-index=${index}>삭제</button>
          </div>
        `;
        })
        .join('')}
    </ul>
  `;
  }

  registEvent() {
    this.$element.addEventListener('click', ({ target }) => {
      if (!target.matches('button')) return;
      const index = target.dataset.index;
      switch (target.textContent) {
        case '완료':
          this.$store.dispatch('completeItem', { index });
          break;
        case '삭제':
          this.$store.dispatch('clearItem', { index });
          break;
      }
    });
  }
}
