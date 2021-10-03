import createRouter from './src/routes/router.js';
import createPages from './src/pages.js';

const NAV_BUTTON_SELECTOR = 'button[data-navigate]';

const buttonGroup = document.querySelector('header');
const container = document.querySelector('main');

const pages = createPages(container);

const router = createRouter();

router
  .addRoute('#/', pages.home)
  .addRoute('#/list', pages.list)
  .setNotFound(pages.notFound)
  .addRoute('#/list/:id', pages.detail)
  .addRoute('#/list/:id/:anotherId', pages.anotherDetail)
  .start();

buttonGroup.addEventListener('click', e => {
  const { target } = e;
  if (target.matches(NAV_BUTTON_SELECTOR)) {
    const { navigate } = target.dataset;
    router.navigate(navigate);
  }
});
