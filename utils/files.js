const fs = require('fs');

const getJsonFromFile = (filePath) => fs.promises.readFile(filePath)
  .then((file) => JSON.parse(file));

const postJsonToFile = (filePath) => fs.promises.writeFile(filePath)
  .then((file) => JSON.parse(file));

module.exports = { getJsonFromFile, postJsonToFile };
