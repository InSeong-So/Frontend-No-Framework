import { createStore } from 'redux';

const $ = selector => document.querySelector(selector);

const $toggle = $('.toggle');
const $counter = $('h1');
const $increase = $('#increase');
const $decrease = $('#decrease');

const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = difference => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

const initialState = {
  toggle: false,
  counter: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state,
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };
    case DECREASE:
      return {
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

const render = () => {
  const state = store.getState();
  if (state.toggle) {
    $toggle.classList.add('active');
  } else {
    $toggle.classList.remove('active');
  }

  $counter.innerText = state.counter;
};

render();

store.subscribe(render);

$toggle.addEventListener('click', () => store.dispatch(toggleSwitch()));
$increase.addEventListener('click', () => store.dispatch(increase(1)));
$decrease.addEventListener('click', () => store.dispatch(decrease()));
