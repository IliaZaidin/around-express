const express = require('express');

const cardRouter = express.Router();
const {
  getCards, deleteCard, createCard, likeCard, unlikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.post('/', createCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', unlikeCard);

module.exports = cardRouter;
