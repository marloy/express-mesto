const router = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards');

router.get('/cards', getCards);
router.delete('/cards/:cardId', deleteCard);
router.post('/cards/', createCard);
router.put('/cards/:cardId/likes');
router.delete('/cards/:cardId/likes');

module.exports = router;
