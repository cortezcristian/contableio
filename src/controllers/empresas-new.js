(function(){

angular
  .module('contableio')
  .controller('EmpresasNewCtrl', function($scope, $state, $timeout, $location,
		$log, toastr, EmpresasServ){

		$scope.empresa = {};
		$scope.operatoria = "Alta";
		$scope.editing = false;

		$scope.save = function(formData) {
			if(!$scope.editing) {
				$scope.editing = true;

				EmpresasServ.create($scope.empresa).then(function(){
					toastr.info('Alta de Empresas Satisfactoria', 'Operación Exitosa');
					$scope.editing = false;
					$timeout(function(){
						$state.go('empresas');
					}, 400);
				});
			}
		};


   });

})();
