import Component from './components/root/Component.js';
import LoginComponent from './components/LoginComponent.js';
import HeaderComponent from './components/common/HeaderComponent.js';
import IntroComponent from './components/IntroComponent.js';
import MenuComponent from './components/MenuComponent.js';
import StoreComponent from './components/StoreComponent.js';
import AdminComponent from './components/AdminComponent.js';
import ModalComponent from './components/common/ModalComponent.js';

class App extends Component {
  constructor(selector, props) {
    super(selector, props);
  }

  template() {
    const { route, pages } = this.$props;
    switch (route) {
      case '#/login':
        return `
        <div class="login-wrapper"></div>
        `;
      case '#/404':
        return `
        <section class="pageNotFound">
          <div title="404Page"></div>
          <span>404 NOT FOUND</span>
        </section>
        `;
      default:
        return `
        <header></header>
        <main data-component="${pages}"></main>
        `;
    }
  }

  mount() {
    const { components } = this.$props;
    if (components.length === 1) {
      new LoginComponent('.login-wrapper', this.$props);
      return;
    }
    const targets = ['header', 'main'];
    components.forEach((component, index) => {
      new component(targets[index], this.$props);
    });
  }
}

customElements.define('modal-popup', ModalComponent);

export default {
  Intro: () =>
    new App('.app', {
      route: '#/',
      pages: 'intro',
      components: [HeaderComponent, IntroComponent],
    }),
  Login: () =>
    new App('.app', {
      route: '#/login',
      pages: 'login',
      components: [LoginComponent],
    }),
  Menu: () =>
    new App('.app', {
      route: '#/menu',
      pages: 'menu',
      components: [HeaderComponent, MenuComponent],
    }),
  Store: () =>
    new App('.app', {
      route: '#/store',
      pages: 'store',
      components: [HeaderComponent, StoreComponent],
    }),
  Admin: () =>
    new App('.app', {
      route: '#/admin',
      pages: 'admin',
      components: [HeaderComponent, AdminComponent],
    }),
  NotFound: () => new App('.app', { route: '#/404' }),
};
