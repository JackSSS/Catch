module.exports = function(app) {
  app.controller('CheckinCtrl', ['$scope', '$http', '$ionicLoading', '$ionicPopup', '$cookies',
  function($scope, $http, $ionicLoading, $ionicPopup, $cookies) {
  	var cookieToken = $cookies.get('token');

	 	$scope.lastUpdate = $http({
	    url: 'api/user', 
	    method: "GET",
	    headers: {
	    	token: cookieToken
	    }
	 	}).then(function(res) {
	 		console.log('/api/user response = ' + res);
	 	}, function(err) {
	 		console.log('/api/user error = ' + err);
	 	});

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