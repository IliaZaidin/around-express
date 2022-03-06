/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.get('/', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.use(bodyParser.json());
app.use(helmet());
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.listen(PORT, () => {
  console.log(`\u001b[1;33m\n********************************\nApp is listening at port ${PORT}\u001b[0m`);
});
