const router = require('express').Router();

router.get('/cards', (req, res) => {
  res.send('Карточки');
});

router.get('/cards/:_id', (req, res) => {
  res.send(`Карточка с id ${req.params._id}`);
});

module.exports = router;
