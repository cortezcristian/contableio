(function(){

console.log("demo...");
var EmpresaModel = require('./models/empresa.js');

angular
  .module('contableio')
  .factory('EmpresasServ', function($q){
    return {
      findAll : function(){
        var p = $q.defer();
        EmpresaModel
          .findAll({raw: true})
          .then(function(list){
             p.resolve(list);
          })
          .catch(function (err) {
            p.reject(err);
          });

        return p.promise;
      },
      create : function(data){
        var p = $q.defer();
        EmpresaModel
          .create(data)
          .then(function(record){
             p.resolve(record);
          })
          .catch(function (err) {
            p.reject(err);
          });

        return p.promise;
      },
      remove : function(id){
        var p = $q.defer();
        EmpresaModel
          .destroy({
						where : {
							idEmpresa: id
						}
					})
          .then(function(record){
             p.resolve(record);
          })
          .catch(function (err) {
            p.reject(err);
          });

        return p.promise;
      }
    }
  });
})();
