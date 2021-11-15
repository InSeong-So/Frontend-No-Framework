import Component from './root/Component.js';
import { login } from '../events/index.js';

export default class LoginComponent extends Component {
  template() {
    return `
    <div class="login-page">
      <div class="container">
        <form class="register-form hidden">
          <div>
            <input class="register-id" type="text" placeholder="아이디" />
            <p class="error-text hidden">"cafe@cafe.com" 형식으로 입력해주세요.</p>
          </div>
          <div>
            <input class="register-password" type="password" placeholder="비밀번호" />
            <p class="error-text hidden">비밀번호는 "최소 8자" 이상이어야 합니다.</p>
          </div>
          <div>
            <input class="register-password-check" type="password" placeholder="비밀번호 확인" />
            <p class="error-text hidden">비밀번호가 다릅니다.</p>
          </div>
          <div>
            <button data-target="register" class="submit">회원가입</button>
            <p class="message">계정이 있으신가요? <a href="#">로그인하기</a></p>
            <p class="message"><a href="#">돌아가기</a></p>
          </div>
        </form>
        <form class="login-form">
          <div>
            <input class="login-id" type="text" placeholder="아이디" />
            <p class="error-text hidden">"cafe@cafe.com" 형식으로 입력해주세요.</p>
          </div>
          <div>
          <input class="login-password" type="password" placeholder="비밀번호" />
          <p class="error-text hidden">비밀번호는 "최소 8자" 이상이어야 합니다.</p>
          </div>
          <div>
            <button data-target="login" class="submit">로그인</button>
            <p class="message">계정이 없으신가요? <a href="#">회원가입하기</a></p>
            <p class="message"><a href="#">돌아가기</a></p>
          </div>
        </form>
      </div>
    </div>
    `;
  }

  mount() {
    this.utils.$('.container').addEventListener('click', event => {
      event.preventDefault();
      // 토글 폼
      if (event.target.matches('.message a')) login.toggleForm(event);
      // 로그인 액션
      if (event.target.matches('.submit')) login.submitAction(event);
    });
  }
}
