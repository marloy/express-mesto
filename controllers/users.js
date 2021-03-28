const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));
};

const getUserById = (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      res.status(200).send(user);
    })
    .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));
  res.status(200).send({ message: 'ok' });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
