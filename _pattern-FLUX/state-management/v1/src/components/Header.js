import Component from '../core/Component.js';

export default class Header extends Component {
  view() {
    return `
    <div>
      <label for="item-input">
        <input type="text" name="item-input" id="item-input" />
        <button class="add-item">TODO 추가</button>
      </label>
    </div>
    <div>
      <span>
        <label>
          <input name="type" type="checkbox" />일간
        </label>
      </span>
      <span>
        <label>
          <input name="type" type="checkbox" />주간
        </label>
      </span>
      <span>
        <label>
          <input name="type" type="checkbox" />월간
        </label>
      </span>
    </div>
    `;
  }

  registEvent() {
    this.$element.addEventListener('click', ({ target }) => {
      if (!target.matches('.add-item')) return;
      this.$store.dispatch('addItem', {
        type: getCheckboxValue(),
        todo: document.querySelector('[name="item-input"]').value,
        status: false,
      });
    });
  }
}

function getCheckboxValue() {
  // 선택된 목록 가져오기
  const selectedEls = document.querySelectorAll('input[name="type"]:checked');

  // 선택된 목록에서 value 찾기
  let result = '';
  selectedEls.forEach((el, index) => {
    if (selectedEls.length === index) {
      result += el.value;
    } else {
      result += el.value + ', ';
    }
  });

  console.log(result);

  return result;
}
