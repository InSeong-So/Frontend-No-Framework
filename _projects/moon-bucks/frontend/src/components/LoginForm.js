import Component from './root/Component.js';
import http from '../client/index.js';

export default class LoginForm extends Component {
  initialized() {
    this.isLoginTab = true;
  }

  template() {
    return `
      <div class="formContent">
        <h2 class="active" data-tab-login> 로그인 </h2>
        <h2 class="underlineHover" data-tab-signup> 회원가입 </h2>
        <form>
          <input type="text" class="fadeIn second" id="userId" name="login" placeholder="아이디">
          <input type="password" class="fadeIn third" id="password" name="login" placeholder="비밀번호">
          <input type="password" id="pwcheck" class="hidden" name="login" placeholder="비밀번호 확인">
          <input type="submit" id="submitButton" "class="fadeIn fourth" value="로그인">
        </form>
        <div class="formFooter">
          <a class="underlineHover" href="#">비밀번호를 잊어버리셨나요?</a>
        </div>
      </div>
    `;
  }

  mount() {
    console.log(this._store.getState());
    const clickActive = ({ target }) => {
      const $target = this._utils.$('[data-tab-login]');
      $target.classList.toggle('active');
      $target.classList.toggle('underlineHover');
      const $target2 = this._utils.$('[data-tab-signup]');
      $target2.classList.toggle('active');
      $target2.classList.toggle('underlineHover');
      this._utils.$('#submitButton').value = target.textContent;
      this._utils.$('#pwcheck').classList.toggle('hidden');
    };

    const isValidationForm = async ({ userId, password }, validType) => {
      if (validType === 'SIGNUP') {
        const { msg, status } = await http.checkId({ userId });
        if (status !== 201) return alert(msg);
        const passwordCheck = this._utils.$('#pwcheck').value.trim();
        if (password !== passwordCheck)
          return alert('비밀번호를 확인해주세요.');
      }
      return true;
    };

    const forgetPassword = event => {
      event.preventDefault();
      alert('저런!');
    };

    const loginRequest = async userInfo => {
      const { data, status } = await http.login(userInfo);
      if (status !== 201)
        return alert(`로그인에 실패했습니다.\n사유: ${data.msg}`);
      return data?.userId ? true : false;
    };

    const signupRequest = async userInfo => {
      const { data, status } = await http.signup(userInfo);
      if (status !== 201)
        return alert(`회원가입에 실패했습니다.\n사유: ${data.msg}`);
      return data?.userId ? true : false;
    };

    this._utils.$('.wrapper').addEventListener('click', async event => {
      if (event.target.matches('h2')) clickActive(event);
      if (event.target.matches('#submitButton')) {
        event.preventDefault();
        const userInfo = {
          userId: this._utils.$('#userId').value.trim(),
          password: this._utils.$('#password').value.trim(),
        };
        if (await isValidationForm(userInfo)) {
          if (event.target.value.trim() === '회원가입') {
            signupRequest(userInfo);
          } else {
            loginRequest(userInfo);
          }
        }
      }
      if (event.target.matches('a')) forgetPassword(event);
    });
  }
}
