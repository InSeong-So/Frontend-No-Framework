import { createComponent, Component } from './core/Component.js';

createComponent(
  'login-form',
  `
  <div>
    <h2>환영합니다!</h2>
  </div>
  <div class="toggle">
    <form>
      <div>
        <label for="user-id">아이디</label>
        <input type="text" class="user-id" value="test"/>
      </div>
      <div>
        <label for="user-password">비밀번호</label>
        <input type="password" class="user-password" value="1234"/>
      </div>
      <br>
      <div class="button-group">
        <button class="userLogin">로그인</button>
        <button class="userSignup">가입하기</button>
      </div>
    </form>
  </div>
  `,
  { id: '', password: '', isValid: false },
);

createComponent(
  'signup-form',
  `
  <div>
    <h2>환영합니다!</h2>
  </div>
  <div>
    <form>
      <div>
        <label for="user-id">아이디</label>
        <input type="text" name="user-id" />
      </div>
      <div>
        <label for="user-password">비밀번호</label>
        <input type="password" name="user-password" />
      </div>
      <div>
        <label for="user-password-check">비밀번호 확인</label>
        <input type="password" name="user-password-check" />
      </div>
      <div>
        <label for="user-name">이름</label>
        <input type="text" name="user-name" />
      </div>
      <div>
        <label for="user-resident-number">주민등록번호</label>
        <input type="text" name="user-resident-number" />
      </div>
      <div>
        <label for="user-email">이메일</label>
        <input type="email" name="user-email" />
      </div>
      <div>
        <button name="user-zipcode">인증번호 전송</button>
      </div>
      <div>
        <label for="user-email-check">인증번호</label>
        <input type="type" name="user-email-check" />
      </div>
      <div>
        <button name="user-email-check-button">인증번호 확인</button>
      </div>
      <div class="check-area">
        <span style="display:inline-block;">통신사</span>
        <label for="carrier-skt">SKT</label>
        <input type="checkbox" name="carrier-skt" />
        <label for="carrier-kt">KT</label>
        <input type="checkbox" name="carrier-kt" />
        <label for="carrier-lg">LG U+</label>
        <input type="checkbox" name="carrier-lg" />
      </div>
      <div>
        <label for="user-phone-number">휴대전화</label>
        <input type="text" name="user-home-number" />
      </div>
      <div>
        <label for="user-zipcode">우편 번호</label>
        <input type="text" name="user-zipcode" />
      </div>
      <div>
        <button name="user-zipcode">주소 검색</button>
      </div>
      <div>
        <label for="user-address">주소</label>
        <input type="text" name="user-address" />
      </div>
      <div>
        <label for="user-detail-address">상세주소</label>
        <input type="text" name="user-detail-address" />
      </div>
      <div>
        <label for="user-education">학력</label>
        <input type="text" name="user-education" />
      </div>
      <div class="check-area">
        <label for="user-personal">개인정보활용 동의</label>
        <input type="checkbox" name="user-personal" />
      </div>
      <div class="check-area">
        <label for="user-email-reception">이메일 수신 동의</label>
        <input type="checkbox" name="user-email-reception" />
      </div>
    </form>
  </div>
  `,
  { id: '', password: '', isValid: false },
);

const app = document.querySelector('.app');
app.innerHTML = '<login-form></login-form>';
customElements.define('custom-ele', Component);
setTimeout(() => {
  app.innerHTML = '<signup-form></signup-form>';
  console.log(document.querySelector('[name="user-id"]'));
  // document.querySelector('signup-form').addEventListener('click', event => {
  //   console.log(event);
  //   console.log(event.target.value);
  // });
}, 1000);
