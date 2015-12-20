module.exports = function(app) {

  app.controller('PanicCtrl', ['$scope', '$rootscope', '$ionicPopup',
    function($scope, $rootscope, $ionicPopup) {

    var lat = $rootScope.lat;
    var lng = $rootScope.lng;

      $scope.showAlert = function() {
        $ionicPopup.alert({
          title: 'Catch',
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
            position: new google.maps.LatLng(lat, lng),
            title: "Current Position"
        });
        map.panTo(new google.maps.LatLng(lat, lng));
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
          new google.maps.LatLng(lat, lng)
        );
      }
  }]);
};
