angular.module('app').factory('RestangularRoute', ["Restangular", function (Restangular) {
  return Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('http://localhost:8080/api');
  });
}]);