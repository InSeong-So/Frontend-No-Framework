import Component from './root/Component.js';

export default class MenuListComponent extends Component {
  constructor(element, props) {
    super(element, props);
  }

  initialized() {
    this._categoryText = '콜드브루';
    this._menus = [
      {
        name: '콜드 폼 콜드브루',
        prices: [
          {
            size: 'Tall(355ml)',
            price: 5.8,
          },
          {
            size: 'Grande(473ml)',
            price: 6.3,
          },
          {
            size: 'Venti(591ml)',
            price: 6.8,
          },
        ],
        stock: 9,
      },
      {
        name: '바닐라 크림 콜드 브루',
        prices: [
          {
            size: 'Tall(355ml)',
            price: 5.5,
          },
          {
            size: 'Grande(473ml)',
            price: 6.0,
          },
          {
            size: 'Venti(591ml)',
            price: 6.5,
          },
        ],
        stock: 9,
      },
      {
        name: '콜드 브루',
        prices: [
          {
            size: 'Tall(355ml)',
            price: 4.5,
          },
          {
            size: 'Grande(473ml)',
            price: 5.0,
          },
          {
            size: 'Venti(591ml)',
            price: 5.5,
          },
        ],
        stock: 0,
      },
      {
        name: '돌체 콜드브루',
        prices: [
          {
            size: 'Tall(355ml)',
            price: 5.8,
          },
          {
            size: 'Grande(473ml)',
            price: 6.3,
          },
          {
            size: 'Venti(591ml)',
            price: 6.8,
          },
        ],
        stock: 0,
      },
    ];
  }

  template() {
    return `
    <div class="table-wrapper">
      <table class="menu-table">
        <thead>
          <tr>
            <th scope="col">카테고리</th>
            <th scope="col">메뉴명</th>
            <th scope="col">사이즈/가격</th>
            <th scope="col">재고</th>
            <th scope="col">수정</th>
            <th scope="col">삭제</th>
          </tr>
        </thead>
        <tbody>
        ${this._menus
          .map(({ name, prices, stock }, index) => {
            return `
          <tr>
            <td scope="row" data-label="카테고리">${this._categoryText}</td>
            <td data-label="메뉴명">${name}</td>
            <td data-label="사이즈/가격">
              ${prices
                .map(({ size, price }) => {
                  return `
                  <div class="prices">
                    <p>${size}</p>
                    <p>${price}</p>
                  </div>
                  `;
                })
                .join('')}
            </td>
            <td data-label="재고">${stock || '품절'}</td>
            <td data-label="수정"><i class="fas fa-pen" index=${index}></i></td>
            <td data-label="삭제"><i class="fas fa-eraser" index=${index}></i></td>
          </tr>
          `;
          })
          .join('')}
        </tbody>
      </table>
    </div>
    `;
  }

  updatedItem(index, context) {
    return this._menus.map((menu, i) => {
      if (index === i) return context;
      return menu;
    });
  }

  removeItem(index) {
    return this._menus.filter((menu, i) => {
      if (index !== i) return true;
    });
  }

  mount() {
    const $modal = this.utils.$('modal-popup');

    this.utils.$('tbody').addEventListener('click', event => {
      if (event.target.matches('.fa-pen')) {
        const index = +event.target.getAttribute('index');
        const encodeItem = encodeURIComponent(
          JSON.stringify({
            ...this._menus[index],
            purpose: 'menu',
          }),
        );
        $modal.visible = true;
        $modal.title = `${this._categoryText} 관리`;
        $modal.index = index;
        $modal.items = encodeItem;
      }

      if (event.target.matches('.fa-eraser')) {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        const index = +event.target.getAttribute('index');
        this._menus = this._menus.filter((_, i) => i !== index);
        this.render();
      }
    });

    // $modal.addEventListener('cancel', () => {
    //   console.log('cancel event raised');
    // });

    $modal.addEventListener('ok', () => {
      const { items, index } = $modal.attributes;
      const updatedItem = JSON.parse(decodeURIComponent(items.value));
      this._menus[+index.value] = updatedItem;
      this.render();
    });
  }
}
