import Component from './root/Component.js';
import MenuListComponent from './MenuListComponent.js';
import UserListComponent from './UserListComponent.js';

export default class AdminComponent extends Component {
  constructor(element, props) {
    super(element, props);
  }

  template() {
    return `
    <section>
      <div class="management-onoff">
        <label class="button-onoff">
          <input type="checkbox" name="toggle-button" data-onoff><span></span>
        </label>
      </div>
      <div class='management-onoff'>
        <div class="button-container">
          <div class='button blue center' data-add-item>추가</div>
        </div>
      </div>
    </section>
    <section data-child-component></section>
    <modal-popup title="Important!" items="" index=""></modal-popup>
    `;
  }

  mount() {
    new MenuListComponent('[data-child-component]');
    const $onOffButton = this.utils.$('[data-onoff]');
    $onOffButton.addEventListener('change', ({ target }) => {
      if (target.checked) {
        new MenuListComponent('[data-child-component]');
      } else {
        new UserListComponent('[data-child-component]');
      }
    });
    const $modal = this.utils.$('modal-popup');
    const $addButton = this.utils.$('[data-add-item]');
    $addButton.addEventListener('click', () => {
      const purpose = $onOffButton.checked ? 'user' : 'menu';
      // 체크되면 유저
      const encodeItem = encodeURIComponent(
        JSON.stringify({
          purpose,
        }),
      );
      $modal.visible = true;
      $modal.title = `${purpose === 'menu' ? '메뉴' : '사용자'} 관리`;
      $modal.index = 0;
      $modal.items = encodeItem;
    });
  }
}
