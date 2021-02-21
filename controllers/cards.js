const path = require('path');
const getDataFromFile = require('../helpers/files');

const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => getDataFromFile(dataPath)
  .then((cards) => {
    res.status(200).send(cards);
  })
  .catch(() => {
    res.status(500).send({ message: 'Ошибка на сервере' });
  });

const getOneCard = (req, res) => getDataFromFile(dataPath)
  .then((cards) => cards.find((card) => card._id === req.params._id))
  .then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Нет карточки с таким id' });
    }

    res.status(200).send(card);
  })
  .catch(() => {
    res.status(500).send({ message: 'Ошибка на сервере' });
  });

module.exports = {
  getCards,
  getOneCard,
};
