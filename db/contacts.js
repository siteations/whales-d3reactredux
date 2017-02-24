const Sequelize = require('sequelize');
const db = require('./db.js');

const Contacts = db.define('contacts', {
    LogId: {type: Sequelize.STRING, notNull: true },
    Vessel: {type: Sequelize.STRING, notNull: true },
    Rig: {type: Sequelize.STRING},
    Port: {type: Sequelize.STRING},
}, {
	hooks: {
    beforeCreate: function (){
      this.destroy({
        where:{
          Vessel: ''
        },
      });
    }
  }, // hook done
});

module.exports = Contacts;
