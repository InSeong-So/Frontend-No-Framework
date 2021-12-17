const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { swaggerUi, specs } = require('./config/swagger');
const userRouter = require('./routes/user'); // stroe from neDB
const todoRouter = require('./routes/todo'); // store from variable
const app = express();

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRouter);
app.use('/todos', todoRouter);

app.listen('3001', () => {
  console.log('서버 실행 완료:', 'http://localhost:3001');
});
