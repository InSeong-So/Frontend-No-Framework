import { CHANGE_CATEGORY } from '../constants/index.js';
import Component from './root/Component.js';

export default class Navigator extends Component {
  initialized() {
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
    ${this.navItem
      .map(category => {
        return `
        <button data-category-name="${category['category-name']}" class="cafe-category-name btn bg-white shadow mx-1">
        ${category.text}
        </button>
        `;
      })
      .join('')}
    `;
  }

  mount() {
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
