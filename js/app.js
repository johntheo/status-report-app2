angular.module('app', ['ngAnimate', 'ui.bootstrap','firebase']);

angular.module('app').controller("MainController", function($scope, $firebase) {

    var vm = this;
    $scope.title = 'Status Reports';
    $scope.searchInput = '';
    var statusResportsRef = new Firebase("https://statusreportapp.firebaseio.com/reports/");
    $scope.statusReports = $firebase(statusResportsRef);
    $scope.viewSearch = true;
    $scope.viewReport = false;
    $scope.viewBackButton = false;

    $scope.init = function(){
        $scope.viewSearch = true;
        $scope.viewReport = false;
        $scope.viewBackButton = false;
    };

    $scope.createReport = function() {
        statusResportsRef.push({title: $scope.searchInput, createDate: new Date().valueOf()});
    };

    $scope.showReport = function(value){
        $scope.searchInput = '';
        $scope.report = value;
        $scope.reportId = value.$id;

        $scope.viewSearch = false;
        $scope.viewReport = true;
        $scope.viewBackButton = true;
    }

});

angular.module('app').controller("ReportController", function($scope, $firebase) {
  var statusResportsRef = new Firebase("https://statusreportapp.firebaseio.com/reports/");
  $scope.statusReports = $firebase(statusResportsRef);

  $scope.searchReport = function() {
    var statusResportsRef = new Firebase("https://statusreportapp.firebaseio.com/reports/" + $scope.reportIdInput);
    $scope.report = $firebase(statusResportsRef);
    $scope.reportId = statusResportsRef.name();
  };

});

