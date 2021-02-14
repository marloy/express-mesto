const path = require('path');
const getDataFromFile = require('../helpers/files');

const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => getDataFromFile(dataPath)
  .then((cards) => {
    res.status(200).send(cards);
  })
  .catch((err) => {
    res.status(500).send(err);
  });

const getOneCard = (req, res) => getDataFromFile(dataPath)
  .then((cards) => cards.find((card) => card._id === req.params._id))
  .then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Нет карточки с таким id' });
    }

    res.status(200).send(card);
  })
  .catch((err) => {
    res.status(500).send(err);
  });

module.exports = {
  getCards,
  getOneCard,
};
