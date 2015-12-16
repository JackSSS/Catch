module.exports = function(app) {
  app.controller('ContactsController', ['$scope', '$http', '$push' function($scope, $http, $push) {
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

    $scope.update = function(user) {
      user.editing = false;
      $http.post('/api/user' + user._id, user)
        .then(function(res) {
          $scope.users.push(res.data);
          $push: {contacts: res.data};
        }, function(err) {
          console.log(err.data)
        });
    };
  }]);
};
