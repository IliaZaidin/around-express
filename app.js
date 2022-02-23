/* eslint-disable no-console */
const express = require('express');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.get('/', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
