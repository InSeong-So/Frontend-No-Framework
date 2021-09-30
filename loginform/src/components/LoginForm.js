import Component from '../core/Component.js';
import { welcome, signupForm } from '../static/viewForm.js';
import { userLogin } from '../api/index.js';
import { requiredInput } from '../validation/loginValidation.js';

export default class LoginForm extends Component {
  template() {
    return `
    <div>
      <div>
        <h2>환영합니다!</h2>
      </div>
      <div class="toggle">
        <form>
          <div>
            <label for="user-id">아이디</label>
            <input type="text" class="user-id"/>
          </div>
          <div>
            <label for="user-password">비밀번호</label>
            <input type="password" class="user-password"/>
          </div>
          <br>
          <div class="button-group">
            <button class="userLogin">로그인</button>
            <button class="userSignup">가입하기</button>
          </div>
        </form>
      </div>
    </div>
  `;
  }

  setEvent() {
    this.$target
      .querySelector('.user-id')
      .addEventListener('onchange', event => {
        event.preventDefault();
      });
    if (this.$target.querySelector('.userLogin')) {
      this.$target
        .querySelector('.userLogin')
        .addEventListener('click', event => {
          event.preventDefault();
          const userId = requiredInput('.user-id') ?? '';
          const password = requiredInput('.user-password') ?? '';
          if (userId === '' || !password === '') return;
          userLogin(userId, password)
            .then(response => {
              response.json().then(data => {
                this.setState({
                  viewPage: welcome(data.userId),
                });
              });
            })
            .catch(error => {
              console.log(error);
            });
        });
    }

    if (this.$target.querySelector('.userSignup')) {
      this.$target
        .querySelector('.userSignup')
        .addEventListener('click', event => {
          event.preventDefault();
          this.setState({
            viewPage: signupForm,
          });
        });
    }
  }
}
