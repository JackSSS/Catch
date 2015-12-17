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
      // $scope.contacts = contacts;
      // $scope.receivedRequests = receivedRequests;
    };

    $scope.addContact = function(contact) {
      console.log(contact);
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
