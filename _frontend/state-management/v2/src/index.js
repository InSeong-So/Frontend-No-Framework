import { observable } from './core/Store.js';

const calculator = observable({
  state: { user: { id: 'a', password: '1234' }, b: 2 },
});

calculator.user = { id: 'b', password: '1234' };
setTimeout(() => {
  calculator.b = 20;
}, 1000);

// let a = 10;
// const state = {};
// Object.defineProperty(state, 'a', {
//   get() {
//     console.log(`현재 a의 값은 ${a} 입니다.`);
//     return a;
//   },
//   set(value) {
//     a = value;
//     console.log(`변경된 a의 값은 ${a} 입니다.`);
//   },
// });

// state.a = 100;
