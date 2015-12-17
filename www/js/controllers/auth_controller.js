module.exports = function(app) {

  app.controller('AuthCtrl', function($scope, $timeout, $location, $ionicLoading, $http, $cookies, $base64) {

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
    $scope.token = '';
    $scope.currentUser = '';

    $scope.toggleSignup = function() {

      if ($scope.signup)
        $scope.signup = false;
      else
        $scope.signup = true;

      $scope.authErrors = [];
      $scope.user = {};
    };

    $scope.getUser = function() {
      $scope.token = $cookies.get('token');
      $http.defaults.headers.common.token = $scope.token;
      $http.get('/api/user')
        .then(function(res) {
          debugger;
          $scope.currentUser = res.data;
        }, function(err) {
          console.log(err);
        });
    };

    $scope.authenticate = function(user) {
      $scope.authErrors = [];

      if (!(user.auth.username && user.auth.password))
        return $scope.authErrors.push('Please enter username and password.');

      $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Authenticating...'
      });

      if($scope.signup) {
        $http.post('/api/signup', user)
          .then(function(res) {
            $cookies.put('token', res.data.token);
            $scope.getUser();
            $location.path('/home/panic');
            $ionicLoading.hide();
          }, function(err) {
            $scope.authErrors.push(err.data.msg);
            console.log(err.data);
            $ionicLoading.hide();
          });
      } else {
        $http({
          method: 'GET',
          url: '/api/signin',
          headers: {
            'Authorization': 'Basic ' + $base64.encode(user.auth.username + ':' + user.auth.password)
          }
        }).then(function(res) {
          console.log(res);
          $cookies.put('token', res.data.token);
          $scope.getUser();
          $location.path('/home/panic');
          $ionicLoading.hide();
        }, function(err) {
          $scope.authErrors.push(err.data.msg);
          console.log(err.data);
          $ionicLoading.hide();
        });

      }


      // $location.path('/home/panic');
      // $ionicLoading.hide();
    };

    $scope.logout = function() {
      $location.path('/auth');
      $cookies.remove('token');
    };

    if(!$cookies.get('token')) {
      $location.path('/auth');
    }
  });
};
