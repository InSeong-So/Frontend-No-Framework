import { globalEvents } from './src/events/index.js';
import Router from './src/routes/index.js';
import app from './src/App.js';

const router = new Router();

router
  .addRoute('#/', app.Intro)
  .addRoute('#/login', app.Login)
  .addRoute('#/menu', app.Menu)
  .addRoute('#/store', app.Store)
  .addRoute('#/admin', app.Admin)
  .setNotFound(app.NotFound)
  .start();

globalEvents.init();
