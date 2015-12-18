module.exports = function(app) {
  app.controller('ContactsController', ['$scope', '$http', function($scope, $http) {

    $scope.contacts = [];
    $scope.receivedRequests = [];

    $scope.$on('$ionicView.enter', function(e) {
      $scope.getAll();
    });

    $scope.getAll = function() {
      $http.get(SERVER_ADDRESS + '/api/contacts/' + $scope.currentUser.id)
        .then(function(res) {
          $scope.contacts = res.data.contacts;
          $scope.receivedRequests = res.data.receivedRequests;
        }, function(err) {
          console.log(err);
        });
    };

    $scope.acceptRequest = function(contact) {
      console.log(contact);
      $http.post(SERVER_ADDRESS + '/api/contacts/confirm', {
        userId: $scope.currentUser.id,
        requesterId: contact._id
      })
        .then(function(res) {
          $scope.getAll();
        }, function(err) {
          console.log(err);
        });
    };

  }]);
};
