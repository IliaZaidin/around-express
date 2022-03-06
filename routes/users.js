const express = require('express');

const userRouter = express.Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:_id', getUserById);
userRouter.post('/', createUser);

module.exports = userRouter;
