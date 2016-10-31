var Sequelize = require('sequelize');

// Define your models
var database = new Sequelize('database', '', '', {
	 dialect: 'sqlite',
	 storage: 'db/database.sqlite'
});

// Export sequelize to be available when module loads
var sequelize = exports.sequelize = database;
var Empresa = require('./models/empresa.js');

// Create database and listen
database
  .sync({ force: true })
  .then(function() {
		console.log("Sync Ready");
  });
