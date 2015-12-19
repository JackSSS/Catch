module.exports = function(app) {
  app.controller('CheckinCtrl', ['$scope', '$http', '$ionicLoading', '$ionicPopup', '$cookies',
  function($scope, $http, $ionicLoading, $ionicPopup, $cookies) {
  	var cookieToken = $cookies.get('token');

	 	$scope.updateUser = function() {
	 		$http({
		    url: 'api/user', 
		    method: "GET",
		    headers: {
		    	token: cookieToken
		    }
		 	}).then(function(res) {
		 		console.log('setting scope.currentUser...');
		 		$scope.currentUser = res.user;
		 		$scope.currentUser.lat = $scope.lat;
		 		$scope.currentUser.lng = $scope.lng;
		 		$scope.currentUser.lastCheckin = Date.now();
		 	}, function(err) {
		 		console.log(err);
		 	});
	 	}
	 	
		$scope.checkIn = function() {
			$scope.updateUser();

			console.log($scope.currentUser);

			var dateNow = new Date();
			$scope.lastUpdate = dateNow;

			$http({
				url: 'api/user',
				method: 'POST',
				data: {
					_id: $scope.currentUser._id,
					lng: $scope.lng,
					lat: $scope.lat,
					lastCheckin: dateNow	
				},
				headers: {
					token: cookieToken
				}
			}).then(function(res) {
				console.log('Successfully sent user location data')
			}, function(err) {
				console.log('Error sending user location data: ' + err);
			});

			$ionicPopup.alert({
				title: 'Check In',
				template: 'Checked in at ' + dateNow.toLocaleTimeString(),
				okType: 'button-dark'
			});
		};
	}]);
};