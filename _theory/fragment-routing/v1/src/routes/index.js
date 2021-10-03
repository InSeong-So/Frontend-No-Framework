export default () => {
  const routes = [];
  let notFound = () => {};

  const router = {};

  const checkRoutes = () => {
    const currentRoute = routes.find(route => {
      return route.fragment === location.hash;
    });

    if (!currentRoute) {
      notFound();
      return;
    }

    currentRoute.component();
  };

  router.addRoute = (fragment, component) => {
    routes.push({
      fragment,
      component,
    });

    return router;
  };

  router.setNotFound = callback => {
    notFound = callback;
    return router;
  };

  router.start = () => {
    window.addEventListener('hashchange', checkRoutes);

    if (!location.hash) {
      location.hash = '#/';
    }

    checkRoutes();
  };

  return router;
};
