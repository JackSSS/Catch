module.exports = function(app) {
  app.controller('CheckinCtrl', ['$scope', '$http', '$ionicLoading', '$ionicPopup', '$cookies',
  function($scope, $http, $ionicLoading, $ionicPopup, $cookies) {
  	var cookieToken = $cookies.get('token');

	 	$scope.lastUpdate = '';

	 	if(!$scope.lastUpdate) {
	 		$http({
		    url: 'api/user', 
		    method: "GET",
		    headers: {
		    	token: cookieToken
		    }
		 	}).then(function(res) {
		 		res.data.lastCheckin = Date.now();
		 		res.data.lat = $scope.lat;
		 		res.data.lng = $scope.lng;
		 	}, function(err) {
		 		console.log('/api/user error = ' + err);
		 	});
		}

		$scope.checkIn = function() {
			var dateNow = new Date();
			$scope.lastUpdate = dateNow;
			$http({
				url: 'api/user',
				method: 'POST',
				json: {
					lng: $scope.lng,
					lat: $scope.lat,
					lastCheckin: dateNow
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