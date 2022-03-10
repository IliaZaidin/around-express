/* eslint-disable no-console */
const User = require('../models/users');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send({ message: 'No users found on server' });
    } else res.send(users);
  } catch (error) {
    console.log('Error in getUsers: ', error.name);
    res.status(500).send({ message: 'An error has occurred on the server' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).send({ message: 'User ID not found' });
    } else { res.send(user); }
  } catch (error) {
    console.log('Error in getUserById: ', error.name);
    if (error.name === 'CastError') {
      res.status(400).send({ message: 'Invalid user ID passed to the server' });
    } else {
      res.status(500).send({ message: 'An error has occurred on the server' });
    }
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    console.log('Error in createUser: ', error.name);
    if (error.name === 'ValidationError') {
      res.status(400).send({ message: 'Invalid user data passed to the server' });
    } else {
      res.status(500).send({ message: 'An error has occurred on the server' });
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
      res.status(404).send({ message: 'User ID not found' });
    } else { res.send(user); }
  } catch (error) {
    console.log('Error in updateProfile: ', error);
    if (error.name === 'CastError') {
      res.status(400).send({ message: 'Invalid user ID passed to the server' });
    } else {
      res.status(500).send({ message: 'An error has occurred on the server' });
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
      res.status(404).send({ message: 'User ID not found' });
    } else { res.send(user); }
  } catch (error) {
    console.log('Error in updateAvatar: ', error.name);
    if (error.name === 'CastError') {
      res.status(400).send({ message: 'Invalid user ID passed to the server' });
    } else {
      res.status(500).send({ message: 'An error has occurred on the server' });
    }
  }
};

module.exports = {
  getUsers, getUserById, createUser, updateProfile, updateAvatar,
};
