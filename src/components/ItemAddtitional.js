import Component from "../core/Component.js";

export default class ItemAppender extends Component {

  template() {
    return `<input type='text' class='addItems' placeholder='추가할 아이템 내용을 입력해주세요.' />`;
  }

  setEvent() {
    const { addItem } = this.$props;
    this.addEvent('keyup', '.addItems', ({ key, target }) => {
      if (key !== 'Enter') return;
      addItem(target.value);
    });
  }
}