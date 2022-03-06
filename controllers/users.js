/* eslint-disable no-console */
// const path = require('path');
// const { getJsonFromFile, postJsonToFile } = require('../utils/files');
const User = require('../models/users');

// const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log('Error in getUsers: ', error);
    res.status(500).send({ message: 'An error has occurred on the server' });
  }
};

const getUserById = async (req, res) => {
  try {
    // const users = await getJsonFromFile(usersFilePath);
    // const currentUser = users.find((user) => user._id === req.params._id);
    const user = await User.findOne({ _id: req.params._id });
    if (!user) {
      res.status(404).send({ message: 'User ID not found' });
    }
    res.send(user);
  } catch (error) {
    console.log('Error in getUserById: ', error);
    res.status(500).send({ message: 'An error has occurred on the server' });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req);
    if (!user) {
      res.status(400).send({ message: 'Failed to creat new user' });
    }
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'An error has occurred on the server' });
  }
};

module.exports = { getUsers, getUserById, createUser };
