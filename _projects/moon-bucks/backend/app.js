const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
//
const createError = require('http-errors');
const path = require('path');
const app = express();
const indexRouter = require('./routes');
//
const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
app.use('/api', indexRouter);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exPORTs = app;
