module.exports = function(app) {

  app.controller('PanicCtrl', ['$scope', '$ionicPopup', function($scope, $ionicPopup) {

      $scope.showAlert = function() {
        $ionicPopup.alert({
          title: 'C A T C H',
          template: 'The panic button has been pushed!',
          okType: 'button-dark'
        });
      };

      $scope.displayAndWatch = function(position) {
        setCurrentPosition(position);
        watchCurrentPosition();
      }

      $scope.setCurrentPosition = function(pos) {
        currentPositionMarker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(
              pos.coords.latitude,
              pos.coords.longitude
            ),
            title: "Current Position"
        });
        map.panTo(new google.maps.LatLng(
              pos.coords.latitude,
              pos.coords.longitude
            ));
      }

      $scope.watchCurrentPosition = function() {
        var positionTimer = navigator.geolocation.watchPosition(
          function (position) {
            setMarkerPosition(
              currentPositionMarker,
              position
            );
          });
      }

      $scope.setMarkerPosition = function(marker, position) {
        marker.setPosition(
          new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude)
        );
      }
  }]);
};
