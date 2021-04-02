const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const getUserById = (req, res) => {
  User.findById(req.params._id)
    .orFail(() => {
      const err = new Error('Пользователь с таким id не найден');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.kind === 'ObjectId') {
        return res.status(ERROR_CODE).send({ message: 'Невалидный id пользователя' });
      }
      if (err.statusCode === 404) {
        return res.status(err.statusCode).send({ message: err.message });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Введены некорректные данные' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(() => {
      const err = new Error('Пользователь с таким id не найден');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Введены некорректные данные' });
      }
      if (err.statusCode === 404) {
        return res.status(err.statusCode).send({ message: err.message });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(() => {
      const err = new Error('Пользователь с таким id не найден');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Введены некорректные данные' });
      }
      if (err.statusCode === 404) {
        return res.status(err.statusCode).send({ message: err.message });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
