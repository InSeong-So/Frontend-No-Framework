import { Component } from '../core/Component.js';

export class SignupForm extends Component {
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
      <div>
        <label for="user-password-check">비밀번호 확인</label>
        <input type="password" name="user-password-check" size="6"/>
      </div>
      <button class="signupButton">회원가입</button>
      <button class="cancleButton">취소</button>
    `;
  }
}
