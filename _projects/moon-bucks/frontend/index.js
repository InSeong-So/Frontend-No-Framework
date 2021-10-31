import './asset/css/index.css';

import LoginPage from './src/pages/LoginPage.js';
import CreateRouter from './src/routes/index.js';
import MenuPage from './src/pages/MenuPage.js';
// import setGlobalEventHandler from './src/events/index.js';

new CreateRouter()
  .addRoute('/', MenuPage)
  .addRoute('/login', LoginPage)
  .start();

// setGlobalEventHandler();
