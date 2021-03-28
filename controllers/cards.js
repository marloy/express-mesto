const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
