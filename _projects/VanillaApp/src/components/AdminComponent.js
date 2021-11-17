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
    </section>
    <section data-child-component></section>
    <modal-popup title="Important!" items="" index=""></modal-popup>
    `;
  }

  mount() {
    new MenuListComponent('[data-child-component]');
    const $button = this.utils.$('[data-onoff]');
    $button.addEventListener('change', ({ target }) => {
      if (target.checked) {
        new UserListComponent('[data-child-component]');
      } else {
        new MenuListComponent('[data-child-component]');
      }
    });
  }
}
