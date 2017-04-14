var Sequelize = require('sequelize');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/whales';
//var db = new Sequelize('postgres://localhost:5432/whales', {logging:false});
var db = new Sequelize( connectionString , {logging:false});

module.exports = db;
