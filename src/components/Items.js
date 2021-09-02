import Component from "../core/Component.js";

export default class Items extends Component {
  template() {
    const { filteredItems } = this.$props;
    return `
        <ul>
          ${filteredItems.map(({ seq, contents, active }) => `
            <li data-seq='${seq}'>
              ${contents}
              <button class='toggleBtn' style='color: ${active ? "#09F" : "#F09"}'>
                ${active ? '활성' : '비활성'}
              </button>
              <button class='delBtn'>삭제</button>
            </li>
          `).join('')}
        </ul>
    `
  }
  setEvent() {
    const { deleteItem, toggleItem } = this.$props;

    this.addEvent('click', '.delBtn', ({ target }) => {
      deleteItem(Number(target.closest('[data-seq]').dataset.seq));
    });

    this.addEvent('click', '.toggleBtn', ({ target }) => {
      toggleItem(Number(target.closest('[data-seq]').dataset.seq));
    });
  }
}