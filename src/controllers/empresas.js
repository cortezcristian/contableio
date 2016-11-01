(function(){

angular
  .module('contableio')
	.controller('EmpresasCtrl', function($scope, EmpresasServ){

		$scope.gridOptions = {
			paginationPageSizes: [25, 50, 75, 2000],
			paginationPageSize: 25,
			// External
			useExternalPagination: true,
			useExternalSorting: true,
			useExternalFiltering: true,
			exporterMenuCsv: true,
			enableGridMenu: true,
			enableSorting: true,
			enableFiltering: true,
			columnDefs: [
				/* fields start */
				{ field: 'nombre' },
				{ field: 'domicilio' },
				{ field: 'cod_postal' },
				{ field: 'localidad' },
				{ field: 'provincia' },
				{ field: 'cuit' },
				{ field: 'nro_iibb' },
				{ field: 'cond_iva' },
				/* fields end */
				{ field: 'edit', name: '',
					enableFiltering: false,
					enableSorting: false,
					enableColumnMenu: false,
					width: 134,
					enableCellEdit: false,
					enableHiding: false, cellTemplate:'./views/ui-grid-edit-btn.html' }
			]
		};
		EmpresasServ.findAll().then(function(list){
			console.log(list);
			$scope.gridOptions.data = list;
		});
	});

})();
