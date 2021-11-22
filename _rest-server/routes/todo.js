const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid').v4;

let todos = [];

router.get('/', (req, res) => {
  res.send([...todos]);
});

router.post('/', (req, res) => {
  const newTodo = {
    completed: false,
    ...req.body,
    id: uuidv4(),
  };

  todos.push(newTodo);

  res.status(201);
  res.send(newTodo);
});

router.patch('/:id', (req, res) => {
  const updateIndex = todos.findIndex(t => t.id === req.params.id);
  const oldTodo = todos[updateIndex];

  const newTodo = {
    ...oldTodo,
    ...req.body,
  };

  todos[updateIndex] = newTodo;

  res.send(newTodo);
});

router.delete('/:id', (req, res) => {
  todos = todos.filter(t => t.id !== req.params.id);

  res.status(204);
  res.send();
});

module.exports = router;
