import htmlParser from './src/parser/index.js';

const $app = document.querySelector('.app');
const realDOM = htmlParser($app.innerHTML);
const virtualDOM = htmlParser(`
<div class="d-flex justify-center mt-5 w-100">
  <div class="w-100">
    <header class="my-4">
      <a href="/" class="text-black">
        <h1 class="text-center font-bold">테스트앱</h1>
      </a>
      <nav class="d-flex justify-center flex-wrap"></nav>
    </header>
    <main class="mt-10 d-flex justify-center"></main>
  </div>
</div>
`);

const showValues = sports => {
  for (const type in sports) {
    const obj = sports[type];
    if (typeof obj === 'object') showValues(obj);
    else {
      if (type === 'tagName') document.createElement(obj);
      console.log(type + ' : ' + obj);
    }
  }
};

showValues(realDOM);
