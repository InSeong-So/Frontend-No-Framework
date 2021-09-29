import { Component } from '../core/Component.js';

export class LoginForm extends Component {
  setup() {
    this._state = {
      id: null,
      password: null,
    };
  }

  template() {
    return `
      <div>
        <label for="user-id">아이디 입력</label>
        <input type="text" name="user-id" size="6"/>
      </div>
      <div>
        <label for="user-password">비밀번호</label>
        <input type="password" name="user-password" size="6"/>
      </div>
      <button class="loginButton">로그인</button>
      <button class="signupButton">회원가입</button>
    `;
  }

  setEvent() {
    const { login } = this._props;
    this.addEvent('click', '.loginButton', () => {
      const id = this.$target.querySelector("[name='user-id']").value;
      const password = this.$target.querySelector(
        "[name='user-password']",
      ).value;
      login(id, password);
    });
  }
}
