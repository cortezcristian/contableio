(function(){

angular
  .module('contableio')
  .controller('EmpresasCtrl', function($scope, $timeout, $location, $log,
		$q, toastr, $uibModal, EmpresasServ){
	  // unselect checked
	  $scope.multipleSelected=0;

		// Grid Configuration
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
        { field: 'id' },
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

    // Get the Info
    EmpresasServ.findAll().then(function(list){
      console.log(list);
      $scope.gridOptions.data = list;
    });

    // Redirect Edition Form
    $scope.editRow = function (grid, row) {
      // Redirect to edit
      $timeout(function(){
        $location.path('/empresas-edit/'+row.entity.id);
      }, 1000);
    };

		// Api Starts
   $scope.gridOptions.onRegisterApi = function(gridApi){
      //set gridApi on scope
      $scope.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope,function(row){
        var msg = 'row selected ' + row.isSelected;
        $log.log(msg);
        if(row.isSelected) {
            $scope.multipleSelected++;
        } else {
            $scope.multipleSelected--;
        }
      });

      gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
        var msg = 'rows changed ' + rows.length;
        $log.log(msg);
        if(rows[0].isSelected){
            $scope.multipleSelected += rows.length;
        } else {
            $scope.multipleSelected -= rows.length;
        }
      });

      // External Filtering
      // http://ui-grid.info/docs/#/tutorial/308_external_filtering
      $scope.gridApi.core.on.filterChanged( $scope, function() {
        var grid = this.grid;

        // Go to 1st page
        grid.options.paginationCurrentPage = 1;
        // Sort Global Config

        $scope.getPage(
            grid.options.paginationPageSize,
            grid.options.paginationCurrentPage,
            $scope.sortConfig,
            grid.columns);
      });

      // External Sort
      // http://ui-grid.info/docs/#/tutorial/307_external_sorting
      $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
        var grid = this.grid;
        var sortOpts;
        if (sortColumns && sortColumns.length > 0) {
          sortOpts = sortColumns[0];
        } else {
          sortOpts = null;
        }
        // Go to 1st page
        grid.options.paginationCurrentPage = 1;
        // Sort Global Config
        $scope.sortConfig = sortOpts;

        $scope.getPage(
            grid.options.paginationPageSize,
            grid.options.paginationCurrentPage,
            sortOpts,
            grid.columns);
      });

      // External Pagination
      // http://ui-grid.info/docs/#/tutorial/314_external_pagination
      gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
        var grid = this.grid;
        $scope.gridOptions.pageNumber = newPage;
        $scope.gridOptions.pageSize = pageSize;

        $scope.getPage(pageSize, newPage,
            $scope.sortConfig, grid.columns);

      });
    };
		// Api Ends

		// Remove
		$scope.confirmRemove = function (size) {

			var modalInstance = $uibModal.open({
				//animation: $scope.animationsEnabled,
				templateUrl: './views/modal-remove.html',
				controller: 'ModalRemoveInstanceCtrl',
				size: size,
				resolve: {
					valor: function(){ return 'nombre'; },
					extra: function(){ return '';},
					items: function () {
						return $scope.gridApi.selection.getSelectedRows();
					}
				}
			});

			modalInstance.result.then(function (docs) {
				var n = 0;
				var prom = [];

				angular.forEach(docs, function(doc){
					prom.push(
						EmpresasServ.remove(doc.id).then(function() {
							var index = $scope.gridOptions.data.indexOf(doc);
							$log.log("Removed", index);
							if (index !== -1) {
									$scope.gridOptions.data.splice(index, 1);
									n++;
							}
						}));
				});

				$q.all(prom).then(function () {
						$scope.multipleSelected -= n;
						var msg = (n>1) ? 'documentos borrados' : 'documento borrado';
						toastr.info(' '+n+' '+msg, 'Operación Exitosa');
				});

			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};

   });

})();
