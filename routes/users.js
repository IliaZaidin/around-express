const express = require('express');

const userRouter = express.Router();
const { getUsers, getUserById } = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:_id', getUserById);

module.exports = userRouter;
