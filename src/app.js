angular
  .module('contableio', [
    'toastr',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'toggle-switch',
    'cfp.hotkeys',
    'ui.grid',
    'ui.grid.expandable',
    'ui.grid.selection',
    'ui.grid.pinning',
    'ui.grid.pagination',
    'ui.grid.edit',
    'ui.grid.cellNav',
    'ui.grid.exporter',
    'ui.select',
    'datetimepicker',
    'ui.bootstrap'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, uiSelectConfig, datetimepickerProvider, hotkeysProvider, toastrConfig) {
		$stateProvider
			.state({
				name: 'empresas',
				url: '/empresas',
				controller: 'EmpresasCtrl',
				templateUrl: 'views/empresas.html'
			})
			.state({
				name: 'empresas-new',
				url: '/empresas-new',
				controller: 'EmpresasNewCtrl',
				templateUrl: 'views/empresas-new.html'
			})
			.state({
				name: 'empresas-edit',
				url: '/empresas-edit',
				controller: 'EmpresasEditCtrl',
				templateUrl: 'views/empresas-edit.html'
			});
		$urlRouterProvider.otherwise('/empresas');
	})
	.run(function($rootScope){

		$rootScope.main_app = "Sample";
	});

