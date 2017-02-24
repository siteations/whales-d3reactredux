const Sequelize = require('sequelize');
const db = require('./db.js');

const Voyages = db.define('voyages', {
    LogId: {type: Sequelize.STRING, notNull: true },
    Vessel: {type: Sequelize.STRING, notNull: true },
    Rig: {type: Sequelize.STRING, notNull: true },
    Start: {type: Sequelize.INTEGER, notNull: true },
    End: {type: Sequelize.INTEGER, notNull: true },
},{
	instanceMethods: {
		logToId:(log)=>{
			if (log === this.LogId){
				return this;
			}
		},
		nameToId:(name)=>{
			if (name === this.Vessel){
				return this;
			}
		},
	},
});


module.exports = Voyages;
