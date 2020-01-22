angular.module('app').controller('IndexController', function ($scope, $interval, RestangularRoute) {
  var tick = function () {
    RestangularRoute.one('time').get().then(function (time) {
      $scope.time = new Date(time);
    }, function (error) {
      $scope.time = Date.now();
    })
  }
  $interval(tick, 1000);
});
