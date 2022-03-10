/* eslint-disable no-console */
const Card = require('../models/cards');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    if (cards.length === 0) {
      res.status(404).send({ message: 'No cards found on server' });
    } else res.send(cards);
  } catch (error) {
    console.log('Error in getCards: ', error.name);
    res.status(500).send({ message: 'An error has occurred on the server' });
  }
};

const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      res.status(404).send({ message: 'Card ID not found' });
    } else { res.send(card); }
  } catch (error) {
    console.log('Error in getCardById: ', error.name);
    if (error.name === 'CastError') {
      res.status(400).send({ message: 'Invalid card ID passed to the server' });
    } else {
      res.status(500).send({ message: 'An error has occurred on the server' });
    }
  }
};

const createCard = async (req, res) => {
  try {
    req.body.owner = req.user;
    const card = await Card.create(req.body);
    res.status(201).send(card);
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      res.status(400).send({ message: 'Invalid card data passed to the server' });
    } else {
      res.status(500).send({ message: 'An error has occurred on the server' });
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
      res.status(404).send({ message: 'Card ID not found' });
    } else { res.send(card); }
  } catch (error) {
    console.log('Error in likeCard: ', error.name);
    if (error.name === 'CastError') {
      res.status(400).send({ message: 'Invalid card ID passed to the server' });
    } else {
      res.status(500).send({ message: 'An error has occurred on the server' });
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
      res.status(404).send({ message: 'Card ID not found' });
    } else { res.send(card); }
  } catch (error) {
    console.log('Error in likeCard: ', error.name);
    if (error.name === 'CastError') {
      res.status(400).send({ message: 'Invalid card ID passed to the server' });
    } else {
      res.status(500).send({ message: 'An error has occurred on the server' });
    }
  }
};

module.exports = {
  getCards, getCardById, createCard, likeCard, unlikeCard,
};
