const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    required: true,
    type: String,
    validate: {
      validator(v) {
        return /^https?:\/\/[^\s"]+$/.test(v);
      },
      message: 'Некорректная ссылка',
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAd: {
    type: Date,
    deafault: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
