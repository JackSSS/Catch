module.exports = function(app) {
  app.controller('SearchController', ['$scope', '$http', function($scope, $http) {
    $scope.contacts = [];
    $scope.search = '';
    $scope.userId = '';
    $scope.contactId = '';

    $scope.getAll = function() {
     $http.get('/api/users')
        .then(function(res) {
          $scope.contacts = res.data;
          }, function(err) {
            console.log(err.data);
          });
    };

    $scope.doSearch = function(search) {
      $http.post('/api/contacts/search', {search: search})
        .then(function(res) {
          $scope.contacts = res.data;
        }, function(err) {
          console.log(err.data);
        });

    };

    $scope.add = function(contact) {
      $http.post('/api/contacts/add', {userId: $scope.currentUser.id, contactId: contact._id})
        .then(function(res) {
          console.log(res.data)
          // $scope.contacts = res.push();
        }, function(err) {
          console.log(err.data);
        });

    };

    // $scope.confirm = function(contact) {
    //   $http.post('/api/contacts/request', contact)
    //     .then(function(res) {
    //       $scope.contacts.confirm(contactId, requesterId);
    //     }, function(err) {
    //       console.log(err.data);
    //     });

    // };

  }]);
};
