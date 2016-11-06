var Sequelize = require('sequelize');
var sequelize = module.parent.exports.sequelize;

if(typeof sequelize === 'undefined') {
	// Require connetion
	console.log("Require connection");
	var remote = require('electron').remote;
	sequelize = remote.getGlobal('sequelize');
}

var Empresa = sequelize.define('Empresa', {
	id				 : { type            : Sequelize.INTEGER, primaryKey : true, autoIncrement : true },
  nombre     : Sequelize.STRING,
  domicilio  : Sequelize.STRING,
  cod_postal : Sequelize.STRING,
  localidad  : Sequelize.STRING,
  provincia  : Sequelize.STRING,
  cuit       : Sequelize.STRING,
  nro_iibb   : Sequelize.STRING,
  cond_iva   : Sequelize.STRING
}, {
	timestamps: true
});

module.exports = Empresa;
