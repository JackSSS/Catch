module.exports = function(app) {

  app.controller('PanicCtrl', function($scope, $ionicPopup) {

    $scope.showAlert = function() {
      $ionicPopup.alert({
        title: 'Catch',
        template: 'The panic button has been pushed!',
        okType: 'button-dark'
      });
    };
  });
};
