import Component from './root/Component.js';

export default class MenuListComponent extends Component {
  constructor(element, props) {
    super(element, props);
  }

  template() {
    return `
    <div class="table-wrapper">
      <table class="menu-table">
        <thead>
          <tr>
            <th scope="col">카테고리</th>
            <th scope="col">메뉴명</th>
            <th scope="col">Tall(355ml)</th>
            <th scope="col">Grande(473ml)</th>
            <th scope="col">Venti(591ml)</th>
            <th scope="col">재고</th>
            <th scope="col">수정</th>
            <th scope="col">삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row" data-label="카테고리">콜드브루</td>
            <td data-label="메뉴명">콜드 폼 콜드브루</td>
            <td data-label="Tall(355ml)">5.8</td>
            <td data-label="Grande(473ml)">6.3</td>
            <td data-label="Venti(591ml)">6.5</td>
            <td data-label="재고">입고 | 품절 | 현보유</td>
            <td data-label="수정"><i class="fas fa-pen"></i></td>
            <td data-label="삭제"><i class="fas fa-eraser"></i></td>
          </tr>
          <tr>
            <td scope="row" data-label="카테고리">콜드브루</td>
            <td data-label="메뉴명">바닐라 크림 콜드 브루</td>
            <td data-label="Tall(355ml)">5.5</td>
            <td data-label="Grande(473ml)">6.0</td>
            <td data-label="Venti(591ml)">6.5</td>
            <td data-label="재고">입고 | 품절 | 현보유</td>
            <td data-label="수정"><i class="fas fa-pen"></i></td>
            <td data-label="삭제"><i class="fas fa-eraser"></i></td>
          </tr>
          <tr>
            <td scope="row" data-label="카테고리">콜드브루</td>
            <td data-label="메뉴명">콜드 브루</td>
            <td data-label="Tall(355ml)">4.5</td>
            <td data-label="Grande(473ml)">5.0</td>
            <td data-label="Venti(591ml)">5.5</td>
            <td data-label="재고">입고 | 품절 | 현보유</td>
            <td data-label="수정"><i class="fas fa-pen"></i></td>
            <td data-label="삭제"><i class="fas fa-eraser"></i></td>
          </tr>
          <tr>
            <td scope="row" data-label="카테고리">콜드브루</td>
            <td data-label="메뉴명">돌체 콜드브루</td>
            <td data-label="Tall(355ml)">5.8</td>
            <td data-label="Grande(473ml)">6.3</td>
            <td data-label="Venti(591ml)">6.8</td>
            <td data-label="재고">입고 | 품절 | 현보유</td>
            <td data-label="수정"><i class="fas fa-pen"></i></td>
            <td data-label="삭제"><i class="fas fa-eraser"></i></td>
          </tr>
        </tbody>
      </table>
    </div>
    `;
  }
}
