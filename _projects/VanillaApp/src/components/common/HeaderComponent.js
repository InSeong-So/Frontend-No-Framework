import Component from '../root/Component.js';

export default class HeaderComponent extends Component {
  constructor(selector, props) {
    super(selector, props);
  }

  template() {
    return `
    <nav>
      <div id="brand">
        <div id="logo"></div>
        <div id="word-mark">환영해요!</div>
        <div id="users">
        ${this.isLogin ? this.logoutIcons : this.loginIcons}
          </div>
      </div>
      <div id="menu">
        <div id="menu-toggle">
          <div id="menu-icon">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        </div>
        <ul class="pages">
          <!-- 메뉴 소개 -->
          <li>
            <div>
              <a data-navigation="menu">Menu</a>
            </div>
          </li>
          <!-- 매장 찾기 -->
          <li>
            <div>
              <a data-navigation="store">Store</a>
            </div>
          </li>
          <!-- 관리 페이지 -->
          ${this.isAdmin ? this.adminLink : null}
        </ul>
      </div>
    </nav>
    `;
  }

  get isLogin() {
    return false;
  }

  get loginIcons() {
    return `
    <i id="login" class="fas fa-sign-in-alt" title="login button"></i>
  `;
  }

  get logoutIcons() {
    return `
    <!--<i id="profile" class="fas fa-user-edit"></i>-->
    <i id="logout" class="fas fa-sign-out-alt" title="logout button"></i>
  `;
  }

  get isAdmin() {
    return true;
  }

  get adminLink() {
    return `
    <li>
      <div>
        <a data-navigation="admin">Admin</a>
      </div>
    </li>
    `;
  }

  mount() {
    this.utils.$('#logo').addEventListener('click', () => {
      location.href = '#/';
    });

    // 로그인
    if (!this.isLogin) {
      this.utils.$(`#login`).addEventListener('click', () => {
        location.href = `#/login`;
      });
    }
    // 로그아웃

    const $pages = this.utils.$('.pages');
    $pages.addEventListener('click', event => {
      event.preventDefault();
      const { target } = event;
      if (target.dataset.navigation) {
        location.href = `#/${target.dataset.navigation}`;
      }
    });

    const $menuToggle = this.utils.$('#menu-toggle');
    const $ul = this.utils.$('ul');
    const $li = this.utils.$('li');

    $menuToggle.addEventListener('click', () => {
      $menuToggle.classList.toggle('closeMenu');
      $ul.classList.toggle('showMenu');

      $li.addEventListener('click', () => {
        $ul.removeClass('showMenu');
        $menuToggle.removeClass('closeMenu');
      });
    });
  }
}
