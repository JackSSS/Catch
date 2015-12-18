module.exports = function(app) {
  app.controller('ContactsController', ['$scope', '$http', 'Contacts',
    function($scope, $http, Contacts) {

    $scope.contacts = [];
    $scope.receivedRequests = [];

    $scope.$on('$ionicView.enter', function(e) {
      $scope.getAll();
    });

    $scope.getAll = function() {
      Contacts.getAll($scope.currentUser.id, function(err, data) {
        if (err) return err;

        $scope.contacts = data.contacts;
        $scope.receivedRequests = data.receivedRequests;
      });
    };

    $scope.acceptRequest = function(requester) {
      Contacts.acceptRequest($scope.currentUser, requester, function(err, data) {
        if (err) return err;

        $scope.getAll();
      });
    };

  }]);
};
