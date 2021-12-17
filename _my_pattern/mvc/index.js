import Controller from './src/controllers/index.js';
import Service from './src/services/index.js';
import View from './src/views/index.js';

const app = new Controller(new Service(), new View());
