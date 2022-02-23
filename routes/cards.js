const express = require('express');

const cardRouter = express.Router();
const { getCards, getCardById } = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.get('/:_id', getCardById);

module.exports = cardRouter;
