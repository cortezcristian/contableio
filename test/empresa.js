var assert = require('assert');
var sequelize = exports.sequelize = require('../conn.js');
var Empresa = require('../models/empresa.js');

describe('Empresas Tests', function() {

  it('Debe crear una empresa', function(done) {
    Empresa
      .create({nombre: 'none@none.com'})
      .then(function(record){
        assert.ok(record.get('nombre') === 'none@none.com', 'Nombre does not match');
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });
});
