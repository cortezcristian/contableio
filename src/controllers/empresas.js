(function(){

angular
  .module('contableio')
	.controller('EmpresasCtrl', function($scope, EmprensasServ){
		EmprensasServ.create("Sample Empresa");
	});

})();
