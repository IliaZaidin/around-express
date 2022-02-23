/* eslint-disable no-console */
const path = require('path');
const { getJsonFromFile } = require('../utils/files');

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = async (req, res) => {
  try {
    const users = await getJsonFromFile(usersFilePath);
    res.send(users);
  } catch (error) {
    console.log('Error in getUsers: ', error);
    res.status(500).send({ message: 'An error has occurred on the server' });
  }
};

const getUserById = async (req, res) => {
  try {
    const users = await getJsonFromFile(usersFilePath);
    const currentUser = users.find((user) => user._id === req.params._id);
    if (!currentUser) {
      res.status(404).send({ message: 'User ID not found' });
    }
    res.send(currentUser);
  } catch (error) {
    console.log('Error in getUserById: ', error);
    res.status(500).send({ message: 'An error has occurred on the server' });
  }
};

module.exports = { getUsers, getUserById };
