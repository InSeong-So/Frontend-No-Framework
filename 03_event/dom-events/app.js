document.querySelector('.eventBubbling').addEventListener('click', event => {
  console.log('div clicked');
});

document.querySelector('.bubblingButton').addEventListener('click', event => {
  console.log('button clicked');
});

document.querySelector('.eventCapturing').addEventListener(
  'click',
  () => {
    console.log('div clicked');
  },
  true,
);

document.querySelector('.capturingButton').addEventListener(
  'click',
  () => {
    console.log('button clicked');
  },
  true,
);

document.querySelector('.delegationLi').addEventListener('click', event => {
  if (event.target.matches('li.print')) {
    console.log('li clicked', event.target.dataset);
  }
});
