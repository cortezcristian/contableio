(function(){

angular
  .module('contableio')
	.controller('EmpresasCtrl', function($scope, EmpresasServ){

		EmpresasServ.findAll().then(function(list){
			console.log(list);
		});
	});

})();
