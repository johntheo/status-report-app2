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

});

app.filter('toArray', function () {
    'use strict';

    return function (obj) {
        if (!(obj instanceof Object)) {
            return obj;
        }

        return Object.keys(obj).map(function (key) {
            return Object.defineProperty(obj[key], '$key', {__proto__: null, value: key});
        });
    }
});

