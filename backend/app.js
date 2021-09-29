const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require('./routes/user');
const app = express();

app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRouter);

app.listen('3001', () => {
  console.log('서버 실행 완료:', 'http://localhost:3001');
});
