module.exports = function(app) {
  app.controller('SearchController', ['$scope', '$http', function($scope, $http) {
    var data = [{ username: "jack"}, {username: "motley"}]
    var search = [{ username: "jack"}, {username: "motley"}]
    $scope.contacts = [];

    $scope.getAll = function() {
     $http.get('/api/contacts/:userId')
        .then(function(res){
          $scope.contacts = res.data
          }, function(err) {
            console.log(err.data)
          });
    };

    $scope.search = function(contact) {
      $http.post('/api/contacts/search', contact)
        .then(function(res) {
          $scope.contacts.search(res.data);
        }, function(err) {
          console.log(err.data)
        });

    };

    $scope.add = function(contact) {
      $http.post('/api/contacts/add', contact)
        .then(function(res) {
          $scope.contacts.send(userId, contactId);
        }, function(err) {
          console.log(err.data)
        });

    };

    $scope.confirm = function(contact) {
      $http.post('/api/contacts/request', contact)
        .then(function(res) {
          $scope.contacts.confirm(contactId, requesterId);
        }, function(err) {
          console.log(err.data)
        });

    };

  }]);
};
