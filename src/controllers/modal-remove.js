(function(){

angular
  .module('contableio')
  .controller('ModalRemoveInstanceCtrl', function ($scope, $uibModalInstance, items, valor, extra, $filter) {
      $scope.items = items;
      $scope.valor = valor;
      $scope.extra = extra;

      $scope.ok = function () {
        $uibModalInstance.close($scope.items);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
  });

})();
