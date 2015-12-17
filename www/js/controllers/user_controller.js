module.exports = function(app) {
  app.controller('UsersController', ['$scope', '$http', function($scope, $http) {
    $scope.users = [];
    $scope.errors = [];
    $scope.newUser = null;

    $scope.getAll = function() {
      $http.get('/api/user')
        .then(function(res) {
          $scope.users = res.data;
        }, function(err) {
          console.log(err.data);
        });
    };

    $scope.create = function(user) {
      $http.post('/api/user', user)
        .then(function(res) {
          $scope.users.push(res.data);
          $scope.newUser = null;
        }, function(err) {
          console.log(err.data);
        });
    };

    $scope.update = function(user) {
      user.editing = false;
      $http.put('/api/user/' + user._id, user)
        .then(function(res) {
          console.log('this user has a been modified');
        }, function(err) {
          $scope.errors.push('could not get user: ' + user.name);
          console.log(err.data);
        });
    };

    $scope.remove = function(user) {
      $scope.users.splice($scope.users.indexOf(user), 1);
      $http.delete('/api/user/' + user._id)
        .then(function(res) {
          console.log('user deleted');
        }, function(err) {
          console.log(err.data);
          $scope.errors.push('could not delete user: ' + user.name);
          $scope.getAll();
        });
    };
  }]);
};
