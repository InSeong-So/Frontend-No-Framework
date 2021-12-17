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
        authority: 'StoreManager',
        createdAt: '2021. 11. 2',
      },
      {
        username: '테스트2',
        id: 'Edward@example.com',
        authority: 'AssistantStoreManager',
        createdAt: '2021. 11. 2',
      },
      {
        username: '테스트3',
        id: 'william_86@example.com',
        authority: 'AssistantStoreManagerTraining',
        createdAt: '2021. 11. 2',
      },
      {
        username: '테스트4',
        id: 'Doris6@example.com',
        authority: 'AssistantStoreManagerWomen',
        createdAt: '2021. 11. 2',
      },
      {
        username: '테스트5',
        id: 'sharon_91@example.com',
        authority: 'ShiftSupervisor',
        createdAt: '2021. 11. 2',
      },
      {
        username: '테스트6',
        id: 'andrew84@example.com',
        authority: 'Barista',
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
            <th scope="col">권한</th>
            <th scope="col">생성일</th>
            <th scope="col">수정</th>
            <th scope="col">삭제</th>
          </tr>
        </thead>
        <tbody>
          ${this._users
            .map(({ username, id, createdAt, authority }, index) => {
              return `
            <tr>
              <td scope="row" data-label="이름">${username}</td>
              <td data-label="아이디">${id}</td>
              <td data-label="권한">${authority}</td>
              <td data-label="생성일">${createdAt}</td>
              <td data-label="수정"><i class="fas fa-pen" index=${index}></i></td>
              <td data-label="삭제"><i class="fas fa-eraser" index=${index}></i></td>
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

  mount() {
    const $modal = this.utils.$('modal-popup');

    this.utils.$('tbody').addEventListener('click', event => {
      if (event.target.matches('.fa-pen')) {
        const index = +event.target.getAttribute('index');
        const encodeItem = encodeURIComponent(
          JSON.stringify({
            ...this._users[index],
            purpose: 'user',
          }),
        );
        $modal.visible = true;
        $modal.title = '사용자 관리';
        $modal.index = index;
        $modal.items = encodeItem;
      }

      if (event.target.matches('.fa-eraser')) {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        const index = +event.target.getAttribute('index');
        this._users = this._users.filter((_, i) => i !== index);
        this.render();
      }
    });

    // $modal.addEventListener('cancel', () => {
    //   console.log('cancel event raised');
    // });

    $modal.addEventListener('ok', () => {
      const { items, index } = $modal.attributes;
      const updatedItem = JSON.parse(decodeURIComponent(items.value));
      this._users[+index.value] = {
        ...this._users[+index.value],
        ...updatedItem,
      };
      this.render();
    });
  }
}
