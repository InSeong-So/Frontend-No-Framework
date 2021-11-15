import Component from './root/Component.js';

export default class UserListComponent extends Component {
  constructor(element, props) {
    super(element, props);
  }

  template() {
    return `
    <div class="table-wrapper">
      <table class="user-table">
        <thead>
          <tr id="user-table-top">
            <th scope="col">이름</th>
            <th scope="col">아이디</th>
            <th scope="col">생성일</th>
            <th scope="col">수정</th>
            <th scope="col">삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row" data-label="이름">테스트1</td>
            <td data-label="아이디">hannah_west@example.com</td>
            <td data-label="생성일">2021. 11. 2</td>
            <td data-label="수정"><i class="fas fa-pen"></i></td>
            <td data-label="삭제"><i class="fas fa-eraser"></i></td>
            </td>
          </tr>
          <tr>
            <td scope="row" data-label="이름">테스트2</td>
            <td data-label="아이디">Edward@example.com</td>
            <td data-label="생성일">2021. 11. 2</td>
            <td data-label="수정"><i class="fas fa-pen"></i></td>
            <td data-label="삭제"><i class="fas fa-eraser"></i></td>
            </td>
          </tr>
          <tr>
            <td scope="row" data-label="이름">테스트3</td>
            <td data-label="아이디">william_86@example.com</td>
            <td data-label="생성일">2021. 11. 2</td>
            <td data-label="수정"><i class="fas fa-pen"></i></td>
            <td data-label="삭제"><i class="fas fa-eraser"></i></td>
            </td>
          </tr>
          <tr>
            <td scope="row" data-label="이름">테스트4</td>
            <td data-label="아이디">Doris6@example.com</td>
            <td data-label="생성일">2021. 11. 2</td>
            <td data-label="수정"><i class="fas fa-pen"></i></td>
            <td data-label="삭제"><i class="fas fa-eraser"></i></td>
            </td>
          </tr>
          <tr>
            <td scope="row" data-label="이름">테스트5</td>
            <td data-label="아이디">sharon_91@example.com</td>
            <td data-label="생성일">2021. 11. 2</td>
            <td data-label="수정"><i class="fas fa-pen"></i></td>
            <td data-label="삭제"><i class="fas fa-eraser"></i></td>
            </td>
          </tr>
          <tr>
            <td scope="row" data-label="이름">테스트6</td>
            <td data-label="아이디">andrew84@example.com</td>
            <td data-label="생성일">2021. 11. 2</td>
            <td data-label="수정"><i class="fas fa-pen"></i></td>
            <td data-label="삭제"><i class="fas fa-eraser"></i></td>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    `;
  }
}
