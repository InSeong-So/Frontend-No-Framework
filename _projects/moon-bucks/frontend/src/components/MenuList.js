import {
  CREATE_MENU_REQUEST,
  DELETE_MENU_REQUEST,
  SOLDOUT_MENU_REQUEST,
  UPDATE_MENU_REQUEST,
} from '../constants/index.js';
import Component from './root/Component.js';

export default class MenuList extends Component {
  initialized() {
    this._category = this._store.getState()['currentCategory'];
    this.items = this._store.getState()[this._category] || [];
  }

  template() {
    return `
    ${this.items
      .map((item, index) => {
        const { menuId, name, isSoldOut } = item;
        return `
        <li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name ${isSoldOut ? 'sold-out' : ''}"
                key=${menuId} index=${index}>${name}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
          >
          ${isSoldOut ? '입고' : '품절'}
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
            수정
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
            삭제
          </button>
        </li>
        `;
      })
      .join('')}
    `;
  }

  getItems() {
    return this.items;
  }

  get itemCount() {
    return this.items.length;
  }

  /**
   * @param {Array} item
   */
  addItem(name) {
    const isUnique = this.items.find(item => item.name === name);
    if (isUnique) return alert('이미 등록되어 있는 메뉴입니다.');
    if (this._utils.isInvalidationValue(name)) return;
    this._store.dispatch({
      type: CREATE_MENU_REQUEST,
      category: this._category,
      data: name,
    });
  }

  /**
   * @param {Number} index
   * @param {Text} text
   */
  updatedItem(index, text) {
    let updatedItemName = prompt('메뉴 이름을 수정하시겠어요?', text);
    if (this._utils.isInvalidationValue(updatedItemName)) return;
    const updatedItem = { ...this.items[index], name: updatedItemName };
    this._store.dispatch({
      type: UPDATE_MENU_REQUEST,
      category: this._category,
      menuId: updatedItem.id,
      data: updatedItemName,
    });
  }

  /**
   * @param {Number} index
   * @param {Boolean} received
   */
  soldOutItem(index, keyword) {
    if (!confirm(`해당 메뉴를 ${keyword} 처리 하시겠어요?`)) return;
    const target = this.items[index];
    const soldOutItem = {
      ...target,
      isSoldOut: !target.isSoldOut,
    };

    this._store.dispatch({
      type: SOLDOUT_MENU_REQUEST,
      category: this._category,
      menuId: soldOutItem.id,
      data: soldOutItem.name,
    });
  }

  /**
   * @param {Number} index
   */
  deletedItem(index) {
    if (!confirm('메뉴를 삭제하시겠어요?')) return;
    const { id } = this.items[index];
    this.items = this.items.filter((_, i) => i !== index);
    this._store.dispatch({
      type: DELETE_MENU_REQUEST,
      category: this._category,
      menuId: id,
      data: this.items,
    });
  }
}
