const Sequelize = require('sequelize');
const db = require('./db.js');

const Allanimals = db.define('allanimals', {
    LogId: {type: Sequelize.STRING, notNull: true },
    Type: {type: Sequelize.STRING, notNull: true },
    Captured: {type: Sequelize.INTEGER},
    Dead: {type: Sequelize.INTEGER},
    BarrelsRendered: {type: Sequelize.INTEGER},
    //for individual encounters, below...
    Page: {type: Sequelize.STRING},
    Year: {type: Sequelize.STRING},
    Month: {type: Sequelize.STRING},
    Day: {type: Sequelize.STRING},
},{
    hooks: {
    beforeCreate: function (){
      this.destroy({
        where:{
          Type: ''
        },
      });
    }
  }, // hook done
});

module.exports = Allanimals;
