angular.module('app').config(function ($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: './app/view/home/home.html',
      controller: 'HomeController',
    })

    .when('/calcula-rota', {
      templateUrl: './app/view/calcularota/index.html',
      controller: 'CalculaRotaController',
    })

    .otherwise({ redirectTo: '/' });
});