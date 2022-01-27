/**
 * ref : https://github.com/fanerge/front-end-router/blob/master/h5router.js
 */
class CreateRouter {
  constructor(path) {
    this.routers = {};
    this.start();
    this.initialRoute(path);
  }

  initialRoute(path) {
    history.replaceState({ path: path }, null, path);
    this.routers[path] && this.routers[path]();
  }

  route(path, callback = function () {}) {
    this.routers[path] = callback;
  }

  go(path) {
    history.pushState({ path: path }, null, path);
    this.routers[path] && this.routers[path]();
  }

  forward() {
    history.forward();
  }

  back() {
    history.back();
  }

  start() {
    window.addEventListener('popstate', e => {
      const path = e.state && e.state.path;
      this.routers[path] && this.routers[path]();
    });
  }
}

const Router = new CreateRouter(location.pathname);
const content = document.querySelector('body');
const ul = document.querySelector('ul');
const forward = document.querySelector('#forward');
const back = document.querySelector('#back');
function changeBgColor(color) {
  content.style.backgroundColor = color;
}

Router.route('/front-end-router/', function () {
  changeBgColor('yellow');
});
Router.route('/front-end-router/blue', function () {
  changeBgColor('blue');
});
Router.route('/front-end-router/green', function () {
  changeBgColor('green');
});

ul.addEventListener('click', e => {
  if (e.target.tagName.toUpperCase() === 'A') {
    e.preventDefault();
    Router.go(e.target.getAttribute('href'));
  }
});

forward.addEventListener('click', Router.forward);
back.addEventListener('click', Router.back);
