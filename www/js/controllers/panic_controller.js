module.exports = function(app) {

  app.controller('PanicCtrl', ['$scope', '$http', '$ionicPopup',
    function($scope, $http, $ionicPopup) {

    $scope.showAlert = function() {
      $ionicPopup.alert({
        title: 'C A T C H',
        template: 'The panic button has been pushed!',
        okType: 'button-dark'
      });
    };

    $scope.startGeoWatch = function() {

    }
  }]);
};
