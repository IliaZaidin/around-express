/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

const workAroundUserId = (req, res, next) => {
  req.user = { _id: '6229cb28a028131ac64c395c' };
  next();
};

app.use(express.json());
app.use(helmet());
app.use('/users', workAroundUserId, userRouter);
app.use('/cards', workAroundUserId, cardRouter);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`\u001b[1;33m\n********************************\nApp is listening at port ${PORT}\u001b[0m`);
});
