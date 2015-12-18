module.exports = function(app) {
  app.controller('ContactsController', ['$scope', '$http', 'Contacts', '$ionicPopup',
    function($scope, $http, Contacts, $ionicPopup) {

    $scope.$on('$ionicView.enter', function(e) {
      $scope.contacts = [];
      $scope.receivedRequests = [];
      $scope.searchResults = [];
      $scope.searchParam = '';
      $scope.errors = [];

      $scope.getAll();
    });

    $scope.clearSearch = function() {
      $scope.searchParam = '';
    };

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

    $scope.search = function() {
      Contacts.search($scope.searchParam, function(err, data) {
        if (err) return err;

        if (Array.isArray(data))
          $scope.searchResults = data;
        else
          $scope.errors.push(data.msg);
      });
    };

    $scope.add = function(contact) {
      Contacts.makeRequest($scope.currentUser, contact, function(err, data) {
        if (err) return err;

        $ionicPopup.alert({
          title: 'Catch',
          template: 'Contact request sent to ' + data.contact.username,
          okType: 'button-dark'
        });
      });
    };

  }]);
};
