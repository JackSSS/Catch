module.exports = function(app) {
  app.controller('ContactsController', ['$scope', function($scope) {
    var data = [{ username: "jack"}, {username: "Jack Sneed"}];
    $scope.contacts = [];
    // $scope.errors = [];

    $scope.getAll = function() {
      $scope.contacts = data;
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
