import { http } from './client/AxiosClient.js';

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const BASE_URL = 'http://localhost:3001/todos';

const list = () => http.get(BASE_URL, HEADERS);

const create = text => {
  const todo = {
    text,
    completed: false,
  };

  return http.post(BASE_URL, todo, HEADERS);
};

const update = newTodo => {
  const url = `${BASE_URL}/${newTodo.id}`;
  return http.patch(url, newTodo, HEADERS);
};

const deleteTodo = id => {
  const url = `${BASE_URL}/${id}`;
  return http.delete(url, HEADERS);
};

export default {
  list,
  create,
  update,
  delete: deleteTodo,
};
