/* eslint-disable no-console */
const path = require('path');
const { getJsonFromFile } = require('../utils/files');

const cardsFilePath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = async (req, res) => {
  try {
    const cards = await getJsonFromFile(cardsFilePath);
    res.send(cards);
  } catch (error) {
    console.log('Error in getCards: ', error);
    res.status(500).send({ message: 'An error has occurred on the server' });
  }
};

const getCardById = async (req, res) => {
  try {
    const cards = await getJsonFromFile(cardsFilePath);
    const currentCard = cards.find((card) => card._id === req.params._id);
    if (!currentCard) {
      res.status(404).send({ message: 'Card ID not found' });
    }
    res.send(currentCard);
  } catch (error) {
    console.log('Error in getCardById: ', error);
    res.status(500).send({ message: 'An error has occurred on the server' });
  }
};

module.exports = { getCards, getCardById };
