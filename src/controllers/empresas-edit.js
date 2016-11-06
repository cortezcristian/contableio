(function(){

angular
  .module('contableio')
  .controller('EmpresasEditCtrl', function($scope, $state, $timeout, $location,
		$stateParams, $log, toastr, EmpresasServ){

		$scope.empresa = {};
		$scope.operatoria = "Editar";
		$scope.editing = false;

		// Find
		EmpresasServ.findById($stateParams.id).then(function(doc){
			$scope.empresa = doc;
		});

		// Edit
		$scope.save = function(formData) {
			if(!$scope.editing) {
				$scope.editing = true;

				EmpresasServ.update($scope.empresa).then(function(){
					toastr.info('Modificación de Empresas Satisfactoria', 'Operación Exitosa');
					$scope.editing = false;
					$timeout(function(){
						$state.go('empresas');
					}, 400);
				});
			}
		};


   });

})();
