/* eslint-disable no-console */
const Card = require('../models/cards');
const { ERROR_INVALID_DATA, ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../utils/consts');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    if (cards.length === 0) {
      res.status(ERROR_NOT_FOUND).send({ message: 'No cards found on server' });
    } else res.send(cards);
  } catch (error) {
    res.status(ERROR_DEFAULT).send({ message: 'An error has occurred on the server' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);
    if (!card) {
      res.status(ERROR_NOT_FOUND).send({ message: 'Card ID not found' });
    } else { res.send(card); }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(ERROR_INVALID_DATA).send({ message: 'Invalid card ID passed to the server' });
    } else {
      res.status(ERROR_DEFAULT).send({ message: 'An error has occurred on the server' });
    }
  }
};

const createCard = async (req, res) => {
  try {
    req.body.owner = req.user;
    const card = await Card.create(req.body);
    res.status(201).send(card);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(ERROR_INVALID_DATA).send({ message: 'Invalid card data passed to the server' });
    } else {
      res.status(ERROR_DEFAULT).send({ message: 'An error has occurred on the server' });
    }
  }
};

const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      res.status(ERROR_NOT_FOUND).send({ message: 'Card ID not found' });
    } else { res.send(card); }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(ERROR_INVALID_DATA).send({ message: 'Invalid card ID passed to the server' });
    } else {
      res.status(ERROR_DEFAULT).send({ message: 'An error has occurred on the server' });
    }
  }
};

const unlikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      res.status(ERROR_NOT_FOUND).send({ message: 'Card ID not found' });
    } else { res.send(card); }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(ERROR_INVALID_DATA).send({ message: 'Invalid card ID passed to the server' });
    } else {
      res.status(ERROR_DEFAULT).send({ message: 'An error has occurred on the server' });
    }
  }
};

module.exports = {
  getCards, deleteCard, createCard, likeCard, unlikeCard,
};
