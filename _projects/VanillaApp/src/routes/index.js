export default class Router {
  constructor() {
    this.targetGlobal = globalThis;
    this.routes = [];
    this.router = {};
  }

  pageNotFound = () => {};

  checkRoutes = () => {
    const currentRoute = this.routes.find(
      route => route.path === this.targetGlobal.location.hash,
    );

    if (!currentRoute) {
      this.pageNotFound();
      return;
    }

    currentRoute.targetComponent();
  };

  addRoute = (path, targetComponent) => {
    this.routes.push({ path, targetComponent });
    return this;
  };

  setNotFound = callback => {
    this.pageNotFound = callback;
    return this;
  };

  start = () => {
    this.targetGlobal.addEventListener('hashchange', this.checkRoutes);
    if (!this.targetGlobal.location.hash)
      this.targetGlobal.location.hash = '#/';
    this.checkRoutes();
  };
}
