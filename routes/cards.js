const router = require('express').Router();
const { getCards, getOneCard } = require('../controllers/cards');

router.get('/cards', getCards);
router.get('/cards/:_id', getOneCard);

module.exports = router;
