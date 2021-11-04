// node-fetch는 node.js 환경에서 window.fetch 함수를 사용하기 위한 패키지다.
// 브라우저 환경에서 이 예제를 실행한다면 아래 코드는 필요 없다.
// https://github.com/node-fetch/node-fetch
import fetch from 'node-fetch';
import co from './lib/index.js';

console.log(co);

// 제너레이터 실행기
const async = generatorFunc => {
  const generator = generatorFunc(); // ②

  const onResolved = arg => {
    const result = generator.next(arg); // ⑤

    return result.done
      ? result.value // ⑨
      : result.value.then(res => onResolved(res)); // ⑦
  };

  return onResolved; // ③
};

async(function* fetchTodo() {
  // ①
  const url = 'https://jsonplaceholder.typicode.com/todos/1';

  const response = yield fetch(url); // ⑥
  const todo = yield response.json(); // ⑧
  console.log(todo);
  // {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
})(); // ④
