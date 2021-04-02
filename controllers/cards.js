const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.status(200).send(cards))
    .catch(() => {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Введены некорректные данные' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const err = new Error('Карточка с таким id не найдена');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.kind === 'ObjectId') {
        return res.status(ERROR_CODE).send({ message: 'Невалидный id карточки' });
      }
      if (err.statusCode === 404) {
        return res.status(err.statusCode).send({ message: err.message });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      const err = new Error('Карточка с таким id не найдена');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.kind === 'ObjectId') {
        return res.status(ERROR_CODE).send({ message: 'Невалидный id карточки' });
      }
      if (err.statusCode === 404) {
        return res.status(err.statusCode).send({ message: err.message });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => {
      const err = new Error('Карточка с таким id не найдена');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.kind === 'ObjectId') {
        return res.status(ERROR_CODE).send({ message: 'Невалидный id карточки' });
      }
      if (err.statusCode === 404) {
        return res.status(err.statusCode).send({ message: err.message });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
