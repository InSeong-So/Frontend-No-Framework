import setGlobalEventHandler from './src/events/index.js';
import App from './src/app.js';

new App(document.querySelector('#app'));

setGlobalEventHandler();
