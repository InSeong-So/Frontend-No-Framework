const express = require('express');
const router = express.Router();
const NeDB = require('nedb');
const path = require('path');

const db = new NeDB({
  filename: path.join(__dirname, '../models/user.db'),
  autoload: true,
});

router.post('/login', async (req, res, next) => {
  try {
    await db
      .find({
        $where: function () {
          return (
            this.userId === req.body.userId &&
            this.password === req.body.password
          );
        },
      })
      .exec((err, data) => {
        if (err) {
          res.status(403).json({ msg: err });
          return;
        }
        res.status(201).json({ ...data[0] });
      });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/check/:userId', (req, res, next) => {
  getExistUser(req.query.userId)
    .then(data => {
      if (data) {
        res.status(403).json({ msg: '이미 존재하는 아이디입니다.' });
      }
      res.status(201).json({ msg: '사용 가능한 아이디입니다.' });
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});

router.post('/signup', (req, res, next) => {
  const j = getExistUser(req.body.userId);
  j.then(data => {
    if (data) {
      res.status(403).json({ msg: '이미 존재하는 아이디입니다.' });
      return;
    }
    db.insert(
      {
        userId: req.body.userId,
        password: req.body.password,
        createdAt: new Date().getTime(),
      },
      (err, data) => {
        if (err) {
          res.status(403).json({ msg: err });
          return;
        }
        res.status(201).json({ ...data[0] });
      },
    );
  }).catch(error => {
    console.log(error);
    next(error);
  });
});

function getExistUser(id) {
  return new Promise((resolve, reject) => {
    db.findOne({ userId: id }, (err, doc) => {
      err ? reject(err) : resolve(doc);
    });
  });
}

function sendJSON(status, res, result, obj) {
  obj['result'] = result;
  res.status(status).json(obj);
}

module.exports = router;
