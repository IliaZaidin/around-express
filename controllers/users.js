/* eslint-disable no-console */
const User = require('../models/users');
const { ERROR_INVALID_DATA, ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../utils/consts');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(ERROR_NOT_FOUND).send({ message: 'No users found on server' });
    } else res.send(users);
  } catch (error) {
    res.status(ERROR_DEFAULT).send({ message: 'An error has occurred on the server' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(ERROR_NOT_FOUND).send({ message: 'User ID not found' });
    } else { res.send(user); }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(ERROR_INVALID_DATA).send({ message: 'Invalid user ID passed to the server' });
    } else {
      res.status(ERROR_DEFAULT).send({ message: 'An error has occurred on the server' });
    }
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(ERROR_INVALID_DATA).send({ message: 'Invalid user data passed to the server' });
    } else {
      res.status(ERROR_DEFAULT).send({ message: 'An error has occurred on the server' });
    }
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, about: req.body.about },
      { new: true },
    );
    if (!user) {
      res.status(ERROR_NOT_FOUND).send({ message: 'User ID not found' });
    } else { res.send(user); }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(ERROR_INVALID_DATA).send({ message: 'Invalid user ID passed to the server' });
    } else {
      res.status(ERROR_DEFAULT).send({ message: 'An error has occurred on the server' });
    }
  }
};

const updateAvatar = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: true },
    );
    if (!user) {
      res.status(ERROR_NOT_FOUND).send({ message: 'User ID not found' });
    } else { res.send(user); }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(ERROR_INVALID_DATA).send({ message: 'Invalid user ID passed to the server' });
    } else {
      res.status(ERROR_DEFAULT).send({ message: 'An error has occurred on the server' });
    }
  }
};

module.exports = {
  getUsers, getUserById, createUser, updateProfile, updateAvatar,
};
