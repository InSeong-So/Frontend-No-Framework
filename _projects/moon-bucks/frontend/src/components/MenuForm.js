import Component from './root/Component.js';
import Management from './Management.js';
import { CHANGE_CATEGORY } from '../constants/index.js';

export default class MenuForm extends Component {
  initialized() {
    this.title = this._props?.title || '🌝 문벅스 메뉴 관리';
    this.navItem = [
      { 'category-name': 'espresso', text: '☕ 에스프레소' },
      { 'category-name': 'frappuccino', text: '🥤 프라푸치노' },
      { 'category-name': 'blended', text: '🍹 블렌디드' },
      { 'category-name': 'teavana', text: '🫖 티바나' },
      { 'category-name': 'desert', text: '🍰 디저트' },
    ];
  }

  template() {
    return `
      <div class="d-flex justify-center mt-5 w-100">
        <div class="w-100">
          <header class="my-4">
            <a href="/" class="text-black">
              <h1 class="text-center font-bold">${this.title}</h1>
            </a>
            <nav class="d-flex justify-center flex-wrap">
            ${this.navItem
              .map(category => {
                return `
                <button data-category-name="${category['category-name']}" class="cafe-category-name btn bg-white shadow mx-1">
                ${category.text}
                </button>
                `;
              })
              .join('')}
            </nav>
          </header>
          <main class="mt-10 d-flex justify-center"></main>
        </div>
      </div>
    `;
  }

  mount() {
    this._store.publish({
      ['rerender']: () => {
        const $main = this._utils.$('main');
        new Management($main);
      },
    });
    const $$navButton = this._utils.$$('.cafe-category-name');
    $$navButton.forEach($button => {
      $button.addEventListener('click', event => {
        event.preventDefault();
        if (
          event.target.dataset['categoryName'] !==
          this._store.getState()['currentCategory']
        ) {
          this._store.dispatch({
            type: CHANGE_CATEGORY,
            currentCategory: event.target.dataset.categoryName,
            currentCategoryText: event.target.textContent.trim(),
          });
        }
      });
    });
  }
}
