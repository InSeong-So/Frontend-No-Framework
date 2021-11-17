import Component from './root/Component.js';

export default class UserListComponent extends Component {
  constructor(element, props) {
    super(element, props);
  }

  initialized() {
    this._users = [
      {
        username: '테스트1',
        id: 'hannah_west@example.com',
        createdAt: '2021. 11. 2',
      },
      {
        username: '테스트2',
        id: 'Edward@example.com',
        createdAt: '2021. 11. 2',
      },
      {
        username: '테스트3',
        id: 'william_86@example.com',
        createdAt: '2021. 11. 2',
      },
      {
        username: '테스트4',
        id: 'Doris6@example.com',
        createdAt: '2021. 11. 2',
      },
      {
        username: '테스트5',
        id: 'sharon_91@example.com',
        createdAt: '2021. 11. 2',
      },
      {
        username: '테스트6',
        id: 'andrew84@example.com',
        createdAt: '2021. 11. 2',
      },
    ];
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
          ${this._users
            .map((user, index) => {
              return `
            <tr key=${index}>
              <td scope="row" data-label="이름">${user.username}</td>
              <td data-label="아이디">${user.id}</td>
              <td data-label="생성일">${user.createdAt}</td>
              <td data-label="수정"><i class="fas fa-pen"></i></td>
              <td data-label="삭제"><i class="fas fa-eraser"></i></td>
              </td>
            </tr>
            `;
            })
            .join('')}
        </tbody>
      </table>
    </div>
    `;
  }
}
