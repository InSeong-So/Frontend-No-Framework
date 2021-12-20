function test(url, next) {
  return fetch(url).then(res => next(res));
}

function* fetcher(next, callback) {
  try {
    const response = yield test(
      'https://jsonplaceholder.typicode.com/todos/1',
      next,
    );
    const data = yield Promise.resolve(response)
      .then(data => data.json())
      .then(data => next(data));
    callback(data);
  } catch (err) {
    console.log(err);
  }
}

const execute = (generator, callback) => {
  const next = v => iter.next(v);
  const iter = generator(next, callback);
  iter.next();
};

document.querySelector('button').addEventListener('click', () => {
  execute(fetcher, console.log);
});
