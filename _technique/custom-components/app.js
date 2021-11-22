import WriteForm from './components/WriteForm.js';
import IntroduceForm from './components/IntroduceForm.js';

customElements.define('write-form', WriteForm);
customElements.define('introduce-form', IntroduceForm);

const items = [
  ['24', 'red'],
  ['18', 'blue'],
  ['', ''],
];
const changeText = event => {
  event.preventDefault();
  const $$writeForm = document.querySelectorAll('write-form');
  $$writeForm[0].size = '18';
  $$writeForm[1].size = null;
  $$writeForm[2].size = '24';
};

const changeColor = event => {
  event.preventDefault();
  const $$writeForm = document.querySelectorAll('write-form');
  $$writeForm.forEach(writeForm => {
    writeForm.color = 'green';
  });
};

const init = event => {
  event.preventDefault();
  const $$writeForm = document.querySelectorAll('write-form');
  $$writeForm.forEach((writeForm, index) => {
    [writeForm.size, writeForm.color] = items[index];
  });
};

document.querySelector('.changeText').addEventListener('click', changeText);
document.querySelector('.changeColor').addEventListener('click', changeColor);
document.querySelector('.init').addEventListener('click', init);

setTimeout(() => {
  const introduceForm = document.querySelector('introduce-form');
  introduceForm.setAttribute('lang', 'jp');
  console.log(introduceForm._greeting.textContent);
  // introduceForm.remove();
  introduceForm._greeting.style.border = '3px solid black';
}, 2000);
