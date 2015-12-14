angular.module('catch.controllers', [])

.controller('AppCtrl', function($scope, $timeout, $location, $ionicLoading) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.signupData = {};
  $scope.errors = [];

  // Perform the login action when the user submits the login form
  $scope.doLogin = function(isValid) {
    $scope.errors = [];

    if (!($scope.loginData.username && $scope.loginData.password))
      return $scope.errors.push('Please enter username and password');

    console.log('Doing login', $scope.loginData);
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Logging in...'
    });
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $ionicLoading.hide();
      $location.path('/home/panic');
    }, 1000);
  };

  $scope.doSignup = function() {
    $scope.errors = [];

    if (!($scope.signupData.username && $scope.signupData.password))
      return $scope.errors.push('Please enter username and passwords.');

    if ($scope.signupData.password !== $scope.signupData.confirmPassword)
      return $scope.errors.push('Passwords do not match.');

    console.log('Doing signup', $scope.loginData);
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Signing up...'
    });
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $ionicLoading.hide();
      $location.path('/home/panic');
    }, 1000);
  };
})
