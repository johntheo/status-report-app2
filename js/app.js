angular.module('app', ['ngAnimate', 'ui.bootstrap','firebase']);

angular.module('app').controller("MainController", function($scope, $firebase) {
  var vm = this;
  $scope.title = 'Status Reports';
  $scope.searchInput = '';
  var statusResportsRef = new Firebase("https://statusreportapp.firebaseio.com/reports/");
  $scope.statusReports = $firebase(statusResportsRef);

  $scope.createReport = function() {
    statusResportsRef.push({title: $scope.searchInput, createDate: new Date().valueOf()});
  };

});

