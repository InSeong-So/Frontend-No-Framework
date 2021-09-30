import '../assets/scss/index.scss';

const openButton = document.querySelector('button');
const modal = document.querySelector('.modal');
const closeButton = modal.querySelector('button');
const modalBackground = modal.querySelector('.background');

function displayModal() {
  modal.classList.toggle('hidden');
}

openButton.addEventListener('click', displayModal);
closeButton.addEventListener('click', displayModal);
modalBackground.addEventListener('click', displayModal);
