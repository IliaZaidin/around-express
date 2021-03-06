const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return /(https?:\/\/)[a-zA-Z0-9-._~:?%#[\]@!$&'()*+,;=]*(\.com)(\/[a-zA-Z0-9-._~:?%#[\]@!$&'()*+,;=]*)*/gi.test(v);
        },
        message: 'not a valid URL',
      },
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('user', userSchema);
