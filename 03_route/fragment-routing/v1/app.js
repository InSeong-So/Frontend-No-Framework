import createRouter from './src/routes/index.js';
import createPages from './src/pages.js';

const container = document.querySelector('main');

const pages = createPages(container);

const router = createRouter();

router
  .addRoute('#/', pages.home)
  .addRoute('#/list', pages.list)
  .setNotFound(pages.notFound)
  .start();
