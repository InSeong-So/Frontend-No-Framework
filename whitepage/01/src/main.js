import { Component } from './core/Component.js';
import { COOKIE_NAME } from './utils/constants.js';
import { setCookie, getCookie } from './utils/auth.js';
import { LoginForm } from './components/LoginForm.js';
import { SignupForm } from './components/SignupForm.js';

(function () {
  setCookie(COOKIE_NAME, 'loginUser0000', 1);
})();

class App extends Component {
  setup() {
    this._state = {
      // 쿠키 취득
      cookie: getCookie(COOKIE_NAME),
    };
  }

  template() {
    return `
    <header>
      <h2>환영합니다!</h2>
    </header>
    <main data-component="view-form">
    </main>
    `;
  }

  mounted() {
    const $viewForm = this.$target.querySelector(
      "[data-component='view-form']",
    );
    const { cookie } = this._state;
    cookie
      ? new LoginForm($viewForm, {
          login: this.login.bind(this),
        })
      : new SignupForm($viewForm);
  }

  login(id, password) {
    this.setState({
      id,
      password,
    });
    alert(`아이디 : ${id}\n비밀번호 : ${password}`);
    setCookie(COOKIE_NAME, `${id}${password}`);
    console.log(getCookie(COOKIE_NAME));
  }
}

new App(document.querySelector('.app'));
