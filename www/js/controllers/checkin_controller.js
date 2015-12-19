module.exports = function(app) {
  app.controller('CheckinCtrl', ['$scope', '$http', '$ionicLoading', '$ionicPopup', '$cookies',
  function($scope, $http, $ionicLoading, $ionicPopup, $cookies) {
  	var cookieToken = $cookies.get('token');

	 	$scope.lastUpdate;

	 	if(!$scope.lastUpdate) {
	 		$http({
		    url: 'api/user', 
		    method: "GET",
		    headers: {
		    	token: cookieToken
		    }
		 	}).then(function(res) {
		 		res.data.lastCheckin = Date.now();
		 		console.log(res.data.lastCheckin);
		 	}, function(err) {
		 		console.log('/api/user error = ' + err);
		 	});
		}

		$scope.showAlert = function() {
			var dateNow = new Date();

			$http({
				url: 'api/user',
				method: 'POST',
				data: {

				}
			});

			$ionicPopup.alert({
				title: 'Check In',
				template: 'Checked in at ' + dateNow.toLocaleTimeString(),
				okType: 'button-dark'
			});
		};
	}]);
};