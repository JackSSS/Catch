module.exports = function(app) {
  app.controller('SearchController', ['$scope', function($scope) {
    var data = [{ username: "jack"}, {username: "motley"}]
    var search = [{ username: "jack"}, {username: "motley"}]
    $scope.users = [];

   $scope.getAll = function() {
      $scope.users = data;
    };

    $scope.search = function() {
      $scope.users = search;
    };
  }]);
};
