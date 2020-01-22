angular.module('app').controller('CalculaRotaController', function ($scope, RestangularRoute) {

  $scope.isLoading = false;
  $scope.hasContentDistance = false;
  $scope.hasContentError = false;
  RestangularRoute.one('all-distances').one('0').one('10').get().then(function (data) {
    $scope.distancesCalculated = data.content;
    $scope.pageNumber = data.number;
    $scope.totalPage = data.totalPages;
  })
  RestangularRoute.all('uf').getList().then(function (estados) {
    $scope.estados = estados;
  })
  // errorDestination
  $scope.validateOrigin = function () {
    if ($scope.origin === undefined) {
      $scope.errorOrigin = "Preencha os campos de origem.";
      return false;
    }

    if ($scope.origin.logradouro === undefined) {
      $scope.origin.logradouro = '';
    }

    if ($scope.origin.bairro === undefined || $scope.origin.bairro === null || $scope.origin.bairro === '') {
      $scope.errorOrigin = "Favor digitar um bairro de origem.";
      return false;
    }

    if ($scope.origin.estado === undefined || $scope.origin.estado === null || $scope.origin.estado === '' || $scope.origin.estado === 'Selecione um estado') {
      $scope.errorOrigin = "Selecione um estado de origem.";
      return false;
    }

    if ($scope.origin.cidade === undefined || $scope.origin.cidade === null || $scope.origin.cidade === '') {
      $scope.errorOrigin = "Informe uma cidade de origem.";
      return false;
    }

    $scope.errorOrigin = ''
    return true;
  }

  $scope.validateDestination = function () {
    if ($scope.destination === undefined) {
      $scope.errorDestination = "Preencha os campos de destino.";
      return false;
    }

    if ($scope.destination.logradouro === undefined) {
      $scope.destination.logradouro = '';
    }

    if ($scope.destination.bairro === undefined || $scope.destination.bairro === null || $scope.destination.bairro === '') {
      $scope.errorDestination = "Favor digitar um bairro de destino.";
      return false;
    }

    if ($scope.destination.estado === undefined || $scope.destination.estado === null || $scope.destination.estado === '' || $scope.destination.estado === 'Selecione um estado') {
      $scope.errorDestination = "Selecione um estado de destino.";
      return false;
    }

    if ($scope.destination.cidade === undefined || $scope.destination.cidade === null || $scope.destination.cidade === '') {
      $scope.errorDestination = "Informe uma cidade de destino.";
      return false;
    }

    $scope.errorDestination = '';
    return true;
  }

  $scope.calcularRota = function () {
    let originValid = $scope.validateOrigin();
    let destinationValid = $scope.validateDestination();

    if (!(originValid && destinationValid)) {
      return;
    }

    $scope.isLoading = true;
    let addresses = {
      origin: {
        rua: $scope.origin.logradouro,
        bairro: $scope.origin.bairro,
        estado: $scope.origin.estado,
        cidade: $scope.origin.cidade,
        pais: "Brasil"
      },
      destination: {
        rua: $scope.destination.logradouro,
        bairro: $scope.destination.bairro,
        estado: $scope.destination.estado,
        cidade: $scope.destination.cidade,
        pais: "Brasil"
      }
    }

    RestangularRoute.all('distance-between').post(addresses).then(function (distanceDTO) {
      $scope.isLoading = false;
      $scope.distanceDTO = distanceDTO;
      $scope.hasContentDistance = true;
      delete $scope.origin;
      delete $scope.destination;
    }, function (error) {
      $scope.isLoading = false;
      $scope.hasContentError = true;

      $scope.errorFromApi = {
        messageFromApi: error.data.message,
        status: error.data.status,
        title: '',
        time: error.data.timestamp,
      }

      switch (error.status) {
        case 500:
          $scope.errorFromApi.title = 'Ocorreu algum erro no servidor.'
          break;
        case 404:
          $scope.errorFromApi.title = 'Não encontrado.'
          break;
        case 401:
          $scope.errorFromApi.title = 'Sem permissão.'
          break;
      }
      $scope.errorOrigin = error.data.message;
    });
  }

  $scope.closeModalContent = function () {
    $scope.hasContentDistance = false;
  }

  $scope.closeModalErrorContent = function () {
    $scope.hasContentError = false;
  }

  window.onclick = function (event) {
    let modalCard = document.getElementById('modal-content-distance');

    if (event.target == modalCard) {
      $scope.hasContentDistance = false;
    }
  }
});