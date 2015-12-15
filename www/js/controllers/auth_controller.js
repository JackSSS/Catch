module.exports = function(app) {

  app.controller('AuthCtrl', function($scope, $timeout, $location, $ionicLoading) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.authErrors = [];
    $scope.user = {};
    $scope.signup = true;

    $scope.toggleSignup = function() {

      if ($scope.signup)
        $scope.signup = false;
      else
        $scope.signup = true;

      $scope.authErrors = [];
      $scope.user = {};
    };

    $scope.authenticate = function(user) {
      $scope.authErrors = [];

      if (!(user.username && user.password))
        return $scope.authErrors.push('Please enter username and password.');

      console.log('Authenticating', $scope.user);
      $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Signing up...'
      });
      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $location.path('/home/panic');
      $ionicLoading.hide();
    };

    $scope.logout = function() {

      $location.path('/auth');
    };
  });
};
