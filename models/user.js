const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    required: true,
    type: String,
    validate: {
      validator(v) {
        return /^https?:\/\/[^\s"]+$/.test(v);
      },
    },
  },
});

module.exports = mongoose.model('user', userSchema);
