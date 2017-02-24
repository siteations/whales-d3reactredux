const Sequelize = require('sequelize');
const db = require('./db.js');

const Places = db.define('places', {
    LogId: {type: Sequelize.STRING, notNull: true },
    Place: {type: Sequelize.STRING, notNull: true },
    Page: {type: Sequelize.STRING},
    Year: {type: Sequelize.STRING},
    Month: {type: Sequelize.STRING},
    Day: {type: Sequelize.STRING},
    Location: {type: Sequelize.ARRAY(Sequelize.STRING)},
});
//location via google api later???

module.exports = Places;
