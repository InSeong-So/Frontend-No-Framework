/**
 * @jest-environment jsdom
 */

// https://github.com/thawkin3/dom-testing-demo/blob/master/src/index.test.js
import List from '../src/components/List.js';

describe('test', () => {
  it('if List Component is mocked', () => {
    document.body.innerHTML = `
      <header></header>
      <main></main>`;

    new List(document.querySelector('main'));

    const username = document.querySelectorAll('.todo-type');
    console.dir(username);
    expect(username).not.toBeNull();
  });
});
