import changeToDiff from './src/render.js';

const items = ['javascript', 'react', 'vue'];

const getTemplate = items => {
  return `
    <ul>
      ${items.map(item => `<li>${item}</li>`).join('')}
    </ul>
  `;
};

const app = document.querySelector('.app');

const input = document.querySelector('[name="item-input"]');
document.querySelector('button').addEventListener('click', () => {
  items.push(input.value);
  changeToDiff(app, getTemplate(items));
});

(function () {
  changeToDiff(app, getTemplate(items));
})();
