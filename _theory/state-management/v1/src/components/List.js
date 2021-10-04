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
        .map(item => {
          return `
          <div>
            <li>${item.type}</li>
            <li>${item.todo}</li>
            <li>${item.status}</li>
            <button>완료</button>
            <button>삭제</button>
          </div>
        `;
        })
        .join('')}
    </ul>
  `;
  }

  registEvent() {
    this.$element.querySelectorAll('button').forEach((button, index) => {
      button.addEventListener('click', ({ target }) => {
        switch (target.textContent) {
          case '완료':
            this.$store.dispatch('clearItem', { index });
            break;
          case '삭제':
            this.$store.dispatch('clearItem', { index });
            break;
        }
      });
    });
  }
}
