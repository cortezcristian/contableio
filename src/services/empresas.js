(function(){
var EmpresaModel = require('./models/empresa.js');

angular
  .module('contableio')
	.factory('EmpresasServ', function($q){
		return {
			crear : function(data){
				var p = $q.defer();
				EmpresaModel
					.create({nombre: data || 'Sample Company'})
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
