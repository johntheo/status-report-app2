angular.module('app', ['ngAnimate', 'ui.bootstrap','firebase']);

angular.module('app').controller("MainController", function($scope, $firebase) {

    var vm = this;
    $scope.title = 'Status Reports';
    $scope.searchInput = '';
    $scope.descriptionInput = '';

    var statusResportsRef = new Firebase("https://statusreportapp.firebaseio.com/reports/");
    $scope.statusReports = $firebase(statusResportsRef);

    $scope.viewSearch = true;
    $scope.viewReport = false;
    $scope.viewBackButton = false;
    $scope.typeInput = 'Informação';
    $scope.editorEnabled = false;

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
        reportActivitiesRef = new Firebase("https://statusreportapp.firebaseio.com/reports/" + value.$id + "/activities");
        $scope.activities = $firebase(reportActivitiesRef);

        $scope.viewSearch = false;
        $scope.viewReport = true;
        $scope.viewBackButton = true;
    }

    $scope.createActivity = function(){
        reportActivitiesRef.push({description: $scope.descriptionInput, type: $scope.typeInput, done: false, createDate: new Date().valueOf()});
        $scope.descriptionInput = '';
    }

    $scope.enableEditor = function() {
        $scope.editorEnabled = true;
    };

    $scope.disableEditor = function() {
        $scope.editorEnabled = false;
    };

    $scope.save = function() {
        //$scope.statusReports.$child($scope.report.$id).$save($scope.report);
        $scope.disableEditor();
    };

});

app.filter('orderObjectBy', function(){
  return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
      array.push(input[objectKey]);
    }

    function compare(a,b) {
      if (a[attribute] < b[attribute])
        return -1;
      if (a[attribute] > b[attribute])
        return 1;
      return 0;
    }

    array.sort(compare);
    return array;
  }
});

