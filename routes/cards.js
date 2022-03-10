const express = require('express');

const cardRouter = express.Router();
const {
  getCards, getCardById, createCard, likeCard, unlikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.get('/:cardId', getCardById);
cardRouter.post('/', createCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', unlikeCard);

module.exports = cardRouter;
