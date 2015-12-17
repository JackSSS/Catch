module.exports = function(app) {
  app.controller('ContactsController', ['$scope', '$http', function($scope, $http) {
    var contacts = [
        {username: 'bill'},
        {username: 'jill'},
        {username: 'sarah'},
        {username: 'jim'}
    ];
    var receivedRequests = [
        {username: 'dan'},
        {username: 'mark'},
        {username: 'matt'},
        {username: 'nick'}
    ];
    $scope.contacts = [];
    $scope.receivedRequests = [];
    // $scope.errors = [];

    $scope.getAll = function() {
      $http.get('http://localhost:3000/api/contacts/' + $scope.currentUser.id)
        .then(function(res) {
          $scope.contacts = res.data.contacts;
          $scope.receivedRequests = res.data.receivedRequests;
        }, function(err) {
          console.log(err);
        });
    };

    $scope.acceptRequest = function(contact) {
      console.log(contact);
      $http.post('http://localhost:3000/api/contacts/confirm', {
        userId: $scope.currentUser.id,
        requesterId: contact._id
      })
        .then(function(res) {
          $scope.getAll();
        }, function(err) {
          console.log(err);
        });
    };

    // $scope.update = function(user) {
    //   user.editing = false;
    //   $http.post('/api/user' + user._id, user)
    //     .then(function(res) {
    //       $scope.users.push(res.data);
    //       $push: {contacts:
    //         {$each: [{user._id: res.data},
    //           {name: res.data},
    //           {location: res.data}]
    //         };
    //     }, function(err) {
    //       console.log(err.data)
    //     });
    //   };
    }]);
};
