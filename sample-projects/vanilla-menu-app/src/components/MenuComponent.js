import Component from './root/Component.js';

export default class MenuComponent extends Component {
  constructor(selector, props) {
    super(selector, props);
  }

  template() {
    return `
    <section>
      <div class="table-wrapper">
        <table>
          <caption>커피 & 에스프레소</caption>
          <thead>
            <tr>
              <th scope="col">메뉴</th>
              <th scope="col">Tall(355ml)</th>
              <th scope="col">Grande(473ml)</th>
              <th scope="col">Venti(591ml)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row" data-label="메뉴명">디카페인 돌체 라떼</td>
              <td data-label="Tall(355ml)">5.9</td>
              <td data-label="Grande(473ml)">6.4</td>
              <td data-label="Venti(591ml)">6.9</td>
            </tr>
            <tr>
              <td scope="row" data-label="메뉴명">디카페인 카라멜 마끼야또</td>
              <td data-label="Tall(355ml)">5.9</td>
              <td data-label="Grande(473ml)">6.4</td>
              <td data-label="Venti(591ml)">6.9</td>
            </tr>
            <tr>
              <td scope="row" data-label="메뉴명">돌체 라떼</td>
              <td data-label="Tall(355ml)">5.6</td>
              <td data-label="Grande(473ml)">6.1</td>
              <td data-label="Venti(591ml)">6.6</td>
            </tr>
            <tr>
              <td scope="row" data-label="메뉴명">화이트 초콜릿 모카</td>
              <td data-label="Tall(355ml)">5.6</td>
              <td data-label="Grande(473ml)">6.1</td>
              <td data-label="Venti(591ml)">6.6</td>
            </tr>
            <tr>
              <td scope="row" data-label="메뉴명">디카페인 카페 라떼</td>
              <td data-label="Tall(355ml)">4.9</td>
              <td data-label="Grande(473ml)">5.4</td>
              <td data-label="Venti(591ml)">5.9</td>
            </tr>
            <tr>
              <td scope="row" data-label="메뉴명">카페 라떼</td>
              <td data-label="Tall(355ml)">4.6</td>
              <td data-label="Grande(473ml)">5.1</td>
              <td data-label="Venti(591ml)">5.6</td>
            </tr>
            <tr>
              <td scope="row" data-label="메뉴명">카푸치노</td>
              <td data-label="Tall(355ml)">4.6</td>
              <td data-label="Grande(473ml)">5.1</td>
              <td data-label="Venti(591ml)">5.6</td>
            </tr>
            <tr>
              <td scope="row" data-label="메뉴명">디카페인 아메리카노</td>
              <td data-label="Tall(355ml)">4.4</td>
              <td data-label="Grande(473ml)">4.9</td>
              <td data-label="Venti(591ml)">5.4</td>
            </tr>
            <tr>
              <td scope="row" data-label="메뉴명">아메리카노</td>
              <td data-label="Tall(355ml)">4.1</td>
              <td data-label="Grande(473ml)">4.6</td>
              <td data-label="Venti(591ml)">5.1</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-wrapper">
        <table>
          <caption>콜드브루</caption>
          <thead>
            <tr>
              <th scope="col">메뉴명</th>
              <th scope="col">Tall(355ml)</th>
              <th scope="col">Grande(473ml)</th>
              <th scope="col">Venti(591ml)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row" data-label="메뉴명">콜드 폼 콜드브루</td>
              <td data-label="Tall(355ml)">5.8</td>
              <td data-label="Grande(473ml)">6.3</td>
              <td data-label="Venti(591ml)">6.5</td>
            </tr>
            <tr>
              <td scope="row" data-label="메뉴명">바닐라 크림 콜드 브루</td>
              <td data-label="Tall(355ml)">5.5</td>
              <td data-label="Grande(473ml)">6.0</td>
              <td data-label="Venti(591ml)">6.5</td>
            </tr>
            <tr>
              <td scope="row" data-label="메뉴명">콜드 브루</td>
              <td data-label="Tall(355ml)">4.5</td>
              <td data-label="Grande(473ml)">5.0</td>
              <td data-label="Venti(591ml)">5.5</td>
            </tr>
            <tr>
              <td scope="row" data-label="메뉴명">돌체 콜드브루</td>
              <td data-label="Tall(355ml)">5.8</td>
              <td data-label="Grande(473ml)">6.3</td>
              <td data-label="Venti(591ml)">6.8</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    `;
  }
}
