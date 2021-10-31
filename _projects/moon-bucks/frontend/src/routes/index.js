import {
  DYNAMIC_ROUTE_REGEXP,
  URL_REGEXP,
  AUTH_USER,
} from '../constants/index.js';

export default class CreateRouter {
  constructor() {
    this.routers = {};
    this.target = document.body;
  }

  initialRoute(path) {
    history.replaceState({ path: path }, null, path);
    if (path === '/' && !this.getAuth()) {
      path = '/login';
    }
    this.routers[path] && this.routers[path].callback(this.target);
  }

  addRoute(path, callback) {
    const params = [];

    const parsedPath = path
      .replace(DYNAMIC_ROUTE_REGEXP, (match, paramName) => {
        params.push(paramName);
        return URL_REGEXP;
      })
      .replace(/\//g, '\\/');

    this.routers[path] = {
      testRegExp: new RegExp(`^${parsedPath}$`),
      callback,
      params,
    };

    return this;
  }

  checkRoute() {}

  getAuth() {
    return JSON.parse(localStorage.getItem(AUTH_USER)) || null;
  }

  setAuth({ id, firstLoginTime }) {
    const user = JSON.stringify({
      user: { id, firstLoginTime, isLogout: false },
    });
    localStorage.setItem(AUTH_USER, user);
  }

  setNotFound(callback) {
    callback();
    return this;
  }

  go(path) {
    history.pushState({ path }, null, path);
    this.routers[path] && this.routers[path].callback(this.target);
  }

  forward() {
    history.forward();
  }

  back() {
    history.back();
  }

  start() {
    this.initialRoute(location.pathname);
    window.addEventListener('popstate', e => {
      const path = e.state && e.state.path;
      this.routers[path] && this.routers[path].callback(this.target);
    });
    // if (!this.getAuth()) {
    //   this.initialRoute('/login');
    // } else {
    //   this.initialRoute('/menu');
    // }
  }
}
