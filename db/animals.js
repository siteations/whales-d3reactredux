const Sequelize = require('sequelize');
const db = require('./db.js');

const animals = db.define('animals', {
    LogId: {type: Sequelize.STRING, notNull: true },
    Type: {type: Sequelize.STRING, notNull: true },
    Seen: {type: Sequelize.INTEGER, notNull: true },
    Captured: {type: Sequelize.INTEGER},
    BarrelsRendered: {type: Sequelize.INTEGER},
    //for individual encounters, below...
    // Page: {type: Sequelize.STRING},
    // Year: {type: Sequelize.STRING},
    // Month: {type: Sequelize.STRING},
    // Day: {type: Sequelize.STRING},
});

module.exports = animals;
