angular.module('app').factory('RestangularRoute', ["Restangular", function (Restangular) {
  return Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('https://infinite-garden-63209.herokuapp.com/api');
  });
}]);