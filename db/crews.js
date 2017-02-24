const Sequelize = require('sequelize');
const db = require('./db.js');

const Crews = db.define('crews', {
    LastName: {type: Sequelize.STRING, notNull: true},
    FirstName: {type: Sequelize.STRING, notNull: true},
    Vessel: {type: Sequelize.STRING, notNull: true},
    LogId: {type: Sequelize.STRING },
    Rig: {type: Sequelize.STRING },
    Departure: {type: Sequelize.STRING},
    Dyear: {type: Sequelize.INTEGER },
    Fstart: {type: Sequelize.INTEGER },
    Rank: {type: Sequelize.STRING},
}, {
  hooks : {
    beforeValidate: (crews) => {
        let dates=crews.getDataValue('Departure');
        if (dates) { var date = dates.split('/');
            console.log(18+date[2]);
            crews.setDataValue('Dyear', 18+date[2]);
            };
        },
  }
});

module.exports = Crews;
