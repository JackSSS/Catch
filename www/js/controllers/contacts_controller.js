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
      $scope.searchResults = [];
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

        var alert = $ionicPopup.alert({
          title: 'Catch',
          template: 'You are now connected with ' + data.requester.username,
          okType: 'button-dark'
        });
        // when pop closes, clear search results and call getAll
        alert.then(function(res) {
          $scope.searchResults = [];
          $scope.getAll();
        });
      });
    };

    $scope.search = function() {
      Contacts.search($scope.searchParam, function(err, data) {
        if (err) return err;

        if (Array.isArray(data)) {
          $scope.searchResults = data;
        } else {
          $scope.searchResults = [];
          $scope.searchResults[0] = {username: data.msg};
        }
      });
    };

    $scope.makeRequest = function(contact) {
      if (contact._id === $scope.currentUser.id)
        return $ionicPopup.alert({
          title: 'C A T C H',
          template: 'Sorry! You can\'t connect with yourself.',
          okType: 'button-dark'
        });

      if ($scope.currentUser.contacts.indexOf(contact._id) !== -1)
        return $ionicPopup.alert({
          title: 'C A T C H',
          template: 'You are already connected with ' + contact.username,
          okType: 'button-dark'
        });

      Contacts.makeRequest($scope.currentUser, contact, function(err, data) {
        if (err) return err;

        var alert = $ionicPopup.alert({
          title: 'C A T C H',
          template: 'Contact request sent to ' + data.contact.username,
          okType: 'button-dark'
        });
        // when pop closes, clear search results and call getAll
        alert.then(function(res) {
          $scope.searchResults = [];
          $scope.getAll();
        });
      });
    };

  }]);
};
