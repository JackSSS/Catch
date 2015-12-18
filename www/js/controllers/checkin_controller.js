module.exports = function(app) {
  app.controller('CheckinCtrl', ['$scope', '$http', '$ionicLoading', 
  	function($scope, $http, $ionicLoading) {
 		$scope.lastUpdate = $http.get('/api/user');
	}]);
};