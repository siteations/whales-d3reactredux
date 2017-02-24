const Sequelize = require('sequelize');
const db = require('./db.js');
const Crews = require('./crews.js');
const Voyages = require('./voyages.js');
const Animals = require('./animals.js');
const AllAnimals = require('./allanimals.js');
const Places = require('./places.js');
const Contacts = require('./contacts.js');

module.exports = {
    db,
    Crews,
    Voyages,
    Animals,
    AllAnimals,
    Contacts,
    Places,
};
