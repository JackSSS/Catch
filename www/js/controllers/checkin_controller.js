module.exports = function(app) {
  app.controller('CheckinCtrl', ['$scope', '$http', '$ionicLoading', '$ionicPopup', 
  function($scope, $http, $ionicLoading, $ionicPopup) {
 		$scope.lastUpdate = $http.get('/api/user');

		$scope.showAlert = function() {
			var dateNow = new Date();


			$ionicPopup.alert({
				title: 'Check In',
				template: 'Checked in at ' + dateNow.toLocaleTimeString(),
				okType: 'button-dark'
			});
		};
	}]);
};