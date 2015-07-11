//var app = angular.module('myApp', []);

app.controller("MainController", function(){
    var vm = this;
    vm.title = 'League of Legends - Professional Standings for All Leagues'
    vm.searchInput = '';

    vm.new = {};
	vm.addTeam = function() {
        vm.teams.push(vm.new);
        vm.new = {};
    };
});


app.controller('teamCtrl', function($scope, $http, $modal, $log) {
    $http.get("http://na.lolesports.com:80/api/standings.json?tournamentId=226")
    .success(function(response) {
        $scope.teams = response;
    });

    $scope.toShow = false;

    $scope.getTeamStats = function(teamID) {
        $http.get("http://na.lolesports.com:80/api/team/"+teamID+".json")
        .success(function(response) {
            $scope.players = response;
        });
    };
});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

  $scope.ok = function () {
    $modalInstance.close($);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

app.controller('playerCtrl', function($scope, $modal, $log) {
    $scope.open = function (size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/player.html',
          controller: 'ModalInstanceCtrl',
          size: size,
        });
    };    
});