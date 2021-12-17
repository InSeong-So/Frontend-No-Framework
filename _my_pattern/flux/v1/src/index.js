import Component from './core/Component.js';
import List from './components/List.js';
import Header from './components/Header.js';

export default class App extends Component {}

new Header(document.querySelector('header'));
new List(document.querySelector('main'));
