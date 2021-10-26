import setGlobalEventHandler from './src/events/index.js';
import App from './src/app.js';

setGlobalEventHandler();
new App(document.querySelector('#app'));
