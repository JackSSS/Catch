module.exports = function(app) {
  app.controller('SearchController', ['$scope', '$http', function($scope, $http) {
    $scope.contacts = [];
    $scope.search = '';

    $scope.getAll = function() {
     $http.get('/api/users')
        .then(function(res) {
          $scope.contacts = res.data;
          }, function(err) {
            console.log(err.data);
          });
    };

    $scope.doSearch = function() {
      $http.post('/api/contacts/search', {search: $scope.search.trim()})
        .then(function(res) {
          $scope.contacts = res.data;
        }, function(err) {
          console.log(err.data);
        });

    };

    $scope.add = function(contact) {
      $http.post('/api/contacts/add', contact)
        .then(function(res) {
          $scope.contacts.send(userId, contactId);
        }, function(err) {
          console.log(err.data);
        });

    };

    $scope.confirm = function(contact) {
      $http.post('/api/contacts/request', contact)
        .then(function(res) {
          $scope.contacts.confirm(contactId, requesterId);
        }, function(err) {
          console.log(err.data);
        });

    };

  }]);
};
