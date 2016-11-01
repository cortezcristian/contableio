(function(){

angular
  .module('contableio')
	.controller('EmpresasCtrl', function($scope, EmpresasServ){
		EmpresasServ.create("Sample Empresa");
	});

})();
