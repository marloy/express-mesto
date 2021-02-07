const router = require('express').Router();

router.get('/users', (req, res) => {
  res.send('Пользователи');
});

router.get('/users/:_id', (req, res) => {
  res.send(`Пользователь с id ${req.params._id}`);
});

module.exports = router;
