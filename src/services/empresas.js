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
      findById : function(id){
        var p = $q.defer();
        EmpresaModel
          .findOne({
						where: { id: id },
						raw: true
					})
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
      update : function(data){
        var p = $q.defer();
        EmpresaModel
          .update(
						data,
						{	where : { id: data.id } }
					)
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
							id: id
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
